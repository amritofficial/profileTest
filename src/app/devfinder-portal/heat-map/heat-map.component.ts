import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'app/shared/services/location.service';
import { HeatmapLayer } from '@ngui/map';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from 'app/shared/models/location';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';

var similarity = require('compute-cosine-similarity');

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @ViewChild(HeatmapLayer) heatMapLayer: HeatmapLayer;
  heatMap: google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  points = [];
  code: string;
  developerLocations: Location[] = [];
  developers: User[] = [];

  constructor(private locationService: LocationService,
    private userService: UserService) { }

  ngOnInit() {
    let x = ["python", "machine learning", "c#", "swift", "firebase", "javascript"];
    let y = ['angular', 'python', 'machine learning', "firebase", "c#"];
    let datasetOne = this.createDataset(x);
    let datasetTwo = this.createDataset(y);

    if (datasetOne.length > datasetTwo.length) {
      let length = datasetOne.length - datasetTwo.length;
      for (let index = 0; index < length; index++) {
        datasetTwo.push(0);
      }
    }
    else if (datasetOne.length < datasetTwo.length) {
      let length = datasetTwo.length - datasetOne.length;
      for (let index = 0; index < length; index++) {
        datasetOne.push(0);
      }
    }

    let s = similarity(datasetOne, datasetTwo);
    console.log(":::: ");
    console.log(s);
    this.locationService.getAllDevelopersLocation().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locations) => {
        console.log("Locations");
        this.developerLocations = locations['results'];
        this.developerLocations.forEach(location => {
          this.points.push(new google.maps.LatLng(location.lat, location.long));
        });
        this.heatMapLayer['initialized$'].subscribe(heatMap => {
          this.heatMap = heatMap;
          this.map = this.heatMap.getMap();
          this.heatMap.set('radius', this.heatMap.get('radius') ? null : 50);
          this.heatMap.set('opacity', this.heatMap.get('opacity') ? null : 0.3);
        });
      });
    this.userService.getAllUsersFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((users: User[]) => {
        this.developers = users;
      });
    // this.heatMap.setMap(this.heatMap.getMap() ? null : this.map);
    // this.heatMap.set('radius', this.heatMap.get('radius') ? 50 : 50);
    // this.heatMap.set('opacity', this.heatMap.get('opacity') ? 0.2 : 0.2);
  }

  addMapConfig() {
    this.heatMap.setMap(this.heatMap.getMap() ? null : this.map);
    this.heatMap.set('radius', this.heatMap.get('radius') ? null : 50);
    this.heatMap.set('opacity', this.heatMap.get('opacity') ? null : 0.2);
  }

  toggleHeatmap() {
    this.heatMap.setMap(this.heatMap.getMap() ? null : this.map);
  }

  changeGradient() {
    let gradient = [
      'rgba(0, 255, 255, 0)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 191, 255, 1)',
      'rgba(0, 127, 255, 1)',
      'rgba(0, 63, 255, 1)',
      'rgba(0, 0, 255, 1)',
      'rgba(0, 0, 223, 1)',
      'rgba(0, 0, 191, 1)',
      'rgba(0, 0, 159, 1)',
      'rgba(0, 0, 127, 1)',
      'rgba(63, 0, 91, 1)',
      'rgba(127, 0, 63, 1)',
      'rgba(191, 0, 31, 1)',
      'rgba(255, 0, 0, 1)'
    ];
    this.heatMap.set('gradient', this.heatMap.get('gradient') ? null : gradient);
  }

  changeRadius() {
    this.heatMap.set('radius', this.heatMap.get('radius') ? null : 50);
  }

  changeOpacity() {
    this.heatMap.set('opacity', this.heatMap.get('opacity') ? null : 0.2);
  }

  loadRandomPoints() {
    this.points = [];

    for (let i = 0; i < 9; i++) {
      this.addPoint();
    }
  }

  addPoint() {
    let randomLat = Math.random() * 0.0099 + 37.782551;
    let randomLng = Math.random() * 0.0099 + -122.445368;
    let latlng = new google.maps.LatLng(randomLat, randomLng);
    this.points.push(latlng);
  }

  createDataset(x: string[]) {
    let dictionary = {
      "javascript": 1,
      "java": 2,
      "angular": 3,
      "c#": 4,
      "android": 5,
      "python": 6,
      "node.js": 7,
      "mysql": 8,
      "css": 9,
      "ios": 10,
      "swift": 11,
      "html": 12,
      "php": 13,
      "asp.net": 14,
      "xml": 15,
      "c++": 16,
      "spring": 17,
      "reactjs": 18,
      "mongodb": 19,
      "scala": 20,
      "machine learning": 21,
      "firebase": 22
    }

    let dataset: number[] = [];
    for (var key in dictionary) {
      if (x.indexOf(key) > -1) {
        console.log(key);
        dataset.push(dictionary[key]);
      }
    }

    console.log(dataset);
    return dataset;
  }

  getAvatar(userId: any) {
    let developer: User = this.developers.find(d => {return d.userId == userId });
    return developer.avatar;
  }

}
