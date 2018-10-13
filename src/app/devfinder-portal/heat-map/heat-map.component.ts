import { Component, OnInit, ViewChild } from '@angular/core';
import { LocationService } from 'app/shared/services/location.service';
import { HeatmapLayer } from '@ngui/map';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent implements OnInit {
  @ViewChild(HeatmapLayer) heatMapLayer: HeatmapLayer;
  heatMap: google.maps.visualization.HeatmapLayer;
  map: google.maps.Map;
  points = [];
  code: string;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.heatMapLayer['initialized$'].subscribe(heatMap => {
      this.points = [
        new google.maps.LatLng(43.65614403322342, -79.74013949586174)
        // new google.maps.LatLng(37.782745, -122.444586),
        // new google.maps.LatLng(37.782842, -122.443688)
      ];
      this.heatMap = heatMap;
      this.map = this.heatMap.getMap();
    });
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

    for (let i = 0 ; i < 9; i++) {
      this.addPoint();
    }
  }

  addPoint() {
    let randomLat = Math.random() * 0.0099 + 37.782551;
    let randomLng = Math.random() * 0.0099 + -122.445368;
    let latlng = new google.maps.LatLng(randomLat, randomLng);
    this.points.push(latlng);
  }
  
}
