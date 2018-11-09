import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'app/shared/services/location.service';
import { HeatmapLayer, NguiMapComponent } from '@ngui/map';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from 'app/shared/models/location';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';
import { Profile } from 'app/shared/models/profile';
import { ProfileService } from 'app/shared/services/profile.service';
import { FinderTags } from 'app/shared/models/finder-tags';
import { TagService } from 'app/shared/services/tag.service';
import { SearchService } from 'app/shared/services/search.service';
import { PortalService } from 'app/shared/services/portal.service';
import { WorkExperience } from 'app/shared/models/work-experience';
import { ResultCard } from 'app/shared/view-models/result-card';
import { ANIMATION_TYPES } from 'ngx-loading';
import { LocationPipe } from 'app/shared/pipes/location.pipe';

var similarity = require('compute-cosine-similarity');
var stringSimilarity = require('string-similarity');

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css'],
  providers: [LocationPipe]
})
export class HeatMapComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  private ngxLoadingAnimationTypes = ANIMATION_TYPES;
  @ViewChild(HeatmapLayer) heatMapLayer: HeatmapLayer;
  @ViewChild(NguiMapComponent) ngUiMapComponent: NguiMapComponent;
  heatMap: google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  points = [];
  code: string;
  developerLocations: Location[] = [];
  developers: User[] = [];
  developersProfile: Profile[] = [];
  developersFinderTags: FinderTags[] = [];
  search: string = "";
  showMarkerInfoWindow: boolean = false;
  customMarkers: any[] = [];
  developersWorkExperiences: WorkExperience[] = [];
  developerFinderTags: FinderTags = {
    tags: ["javascript", "machine learning", "python"],
    userId: null
  };
  cachedLocations: Location[] = [];
  resultCards: ResultCard[] = [];
  makeSearch: boolean = false;
  loadingSearch: boolean = false;

  constructor(private locationService: LocationService,
    private userService: UserService,
    private profileService: ProfileService,
    private tagService: TagService,
    private searchService: SearchService,
    private portalService: PortalService,
    private locationPipe: LocationPipe) { }

  ngOnInit() {
    this.locationService.getAllDevelopersLocation().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((locations) => {
        console.log("Locations");
        this.developerLocations = locations['results'];
        let developer = this.developerLocations.find(d => { return d.userId === this.userService.getCurrentUserId() });
        this.developerLocations.splice(this.developerLocations.indexOf(developer), 1);
        this.cachedLocations = JSON.parse(JSON.stringify(this.developerLocations));
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
    this.profileService.getAllUsersProfile().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((profilesData) => {
        console.log("Profiles");
        this.developersProfile = profilesData['results'];
        console.log(this.developersProfile);
      });
    this.tagService.getAllUsersFinderTags().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((tags) => {
        this.developersFinderTags = tags['results'];
        console.log(this.developersFinderTags);
      });
    this.portalService.getAllWorkExperiences().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((workExperiences) => {
        this.developersWorkExperiences = workExperiences['results'];
        console.log(this.developersWorkExperiences);
      });
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
      "nodejs": 7,
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
      "react.js": 18,
      "mongodb": 19,
      "scala": 20,
      "machine learning": 21,
      "firebase": 22,
      "machinelearning": 21,
      "json": 23,
      "kotlin": 24,
      "ai": 25,
      "r": 26,
      "bootstrap": 27,
      "web": 28,
      "odbc": 29,
      "ui": 30,
      "ux": 31,
      "spring-boot": 32,
      "spring boot": 32,
      "springboot": 32,
      "ado.net": 33,
      "dom": 34,
      "jvm": 35,
      "entity": 36,
      "hibernate": 37,
      "rexx": 38,
      "mainframe": 39,
      "z os": 40,
      "zos": 40,
      "objectivec": 41,
      "objective c": 41,
      "tensor flow": 42,
      "tensorflow": 42,
      "tensorflows": 42,
      "sha": 43,
      "data science": 44,
      "datascience": 44,
      "css3": 45,
      "statistics": 46,
      "artificial intelligence": 47,
      "artificialintelligence": 47,
      "jpa": 48,
      "linux": 49,
      "materialdesign": 50,
      "material design": 50,
      "c": 51
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
    let developer: User = this.developers.find(d => { return d.userId == userId });
    if (developer == undefined) {
      return "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png";
    } else {
      return developer.avatar;
    }
  }

  getUsername(userId: any) {
    let developer: User = this.developers.find(d => { return d.userId == userId });
    if (developer == undefined) {
      return "Problem fetching name";
    } else {
      return developer.username;
    }
  }

  getWork(userId: any) {
    let work: WorkExperience = this.developersWorkExperiences.find(w => { return w.userId == userId });
    if (work == undefined) {
      return "The user is jobless :(";
    } else {
      return work.jobTitle;
    }
  }

  getTags(userId: any) {
    this.developerFinderTags = this.developersFinderTags.find(t => { return t.userId == userId });
    return this.developerFinderTags == undefined ? ["javascript", "angular", "c#"] : this.developerFinderTags.tags;
  }

  searchDevelopers() {
    console.log("Searching Developers");
    let searchStringWithSpace = this.createSearchStringWithSpace(this.search);
    this.makeSearch = true;
    this.loadingSearch = true;
    setTimeout(() => {
      this.processSearch(searchStringWithSpace);
    }, 3000);
    // let searchTags: string[] = search.split(",");
    // console.log(searchTags);
    // let x = this.searchService.searchDevelopers(searchTags, this.developersFinderTags, this.developers, this.developersProfile)
    // console.log("Service ");
    // console.log(x);
    this.search = "";
  }

  createSearchStringWithSpace(searchWithCommas: string) {
    let searchString = searchWithCommas.replace(/,/g, ' ');
    return searchString;
  }

  processSearch(searchString: string) {
    let searchedDevelopersLocation: Location[] = [];
    this.developersFinderTags.forEach(finderTags => {
      let finderTagArray = finderTags.tags.join();
      let finderTagSearch = this.createSearchStringWithSpace(finderTagArray);
      let similarity = stringSimilarity.compareTwoStrings(searchString, finderTagSearch);
      let similarityPercentage = Math.round(similarity * 10000) / 100;
      console.log(searchString);
      console.log(finderTagSearch);
      console.log(similarityPercentage);
      let developer: User = this.developers.find(developer => { return developer.userId == finderTags.userId });
      if (developer != undefined) {
        let profile: Profile = this.developersProfile.find(profile => { return finderTags.userId == profile.userId });
        let resultCard: ResultCard = {
          avatar: developer.avatar,
          distance: 0,
          jobTitle: "Full-Stack Developer",
          percentMatch: Math.round(similarityPercentage),
          username: developer.username,
          userId: developer.userId
        }
        if (similarityPercentage > 38) {
          let location = this.developerLocations.find(location => { return location.userId == developer.userId })
          if (location != undefined) {
            searchedDevelopersLocation.push(location);
          }
          this.resultCards.push(resultCard);
          this.resultCards.sort((a, b) => (a.percentMatch < b.percentMatch) ? 1 : ((b.percentMatch < a.percentMatch) ? -1 : 0));
        }
      }
    });
    if (this.resultCards.length > 0) {
      this.developerLocations = [];
      this.developerLocations = searchedDevelopersLocation;
      this.makeSearch = true;
    }
    this.loadingSearch = false;
    console.log(searchedDevelopersLocation);
    console.log(this.resultCards);
  }

  openInfoWindow(index, userId) {
    console.log(index, userId);
    this.developerFinderTags = this.developersFinderTags.find(t => { return t.userId == userId });
    this.ngUiMapComponent.openInfoWindow(userId, this.customMarkers[index]);
  }


  onCustomMarkerInit(customMarker) {
    this.customMarkers.push(customMarker);
  }

  infoWindowOptions() {
    return { pixelOffset: { height: -45, width: 0 } }
  }

  clearSearchResults() {
    this.developerLocations = this.cachedLocations;
    this.makeSearch = false;
    this.resultCards = [];
  }

  //the method used to open info window
  mouseEntered(userId) {
    if (userId !== undefined) {
      let index = this.getLocationIndex(userId);
      console.log(index);
      if (index >= 0) {
        this.ngUiMapComponent.openInfoWindow(userId, this.customMarkers[index]);
      }
    }
  }

  //the method used to close info window
  mouseLeft(userId) {
    if (userId != undefined) {
      this.ngUiMapComponent.closeInfoWindow(userId);
    }
  }

  getLocationIndex(userId: any): number {
    let locations: Location[] = this.locationPipe.transform(this.cachedLocations);
    let location = locations.find(l => { return l.userId == userId });
    let index = locations.indexOf(location);
    console.log(locations);
    return index;
  }

}