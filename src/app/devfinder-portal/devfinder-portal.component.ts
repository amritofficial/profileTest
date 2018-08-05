import { Component, OnInit, ViewChild } from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-devfinder-portal',
  templateUrl: './devfinder-portal.component.html',
  styleUrls: ['./devfinder-portal.component.css']
})
export class DevfinderPortalComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  currentLat: any;
  currentLong: any;

  currentLatLng: any;
  marker: google.maps.Marker;

  isTracking = false;

  constructor() { }


  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(43.648647, -79.727653),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var overlay = new google.maps.OverlayView();
    overlay.draw = function () {
     
      // this.getPanes().markerLayer.id = 'markerLayer';
      // var div = this.div= document.createElement('div');
      // div.className = 'marker';

      // div.style.position = 'absolute';
      // div.style.cursor = 'pointer';
      // div.style.width = '20px';
      // div.style.height = '20px';
      // div.style.background = 'blue';
      // div.style.borderRadius = '50%';
      // div.style.border = '2px solid red';

      // var panes = this.getPanes();
      // panes.overlayImage.appendChild(div);

      // var point = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(43.648647, -79.727653));
      // console.log(this.currentLatLng);

      // if (point) {
      //   div.style.left = point.x + 'px';
      //   div.style.top = point.y + 'px';
      // }

    }

    //this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    //Custom pins are supposed to go here

    //overlay.setMap(this.map);
  }

  customIcon = {
    url: "http://cdn.onlinewebfonts.com/svg/img_311846.png",
    //state your size parameters in terms of pixels
    size: new google.maps.Size(70, 60),
    scaledSize: new google.maps.Size(70, 60),
    origin: new google.maps.Point(0, 0)
  }

  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId)
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("This application requires to access Geolocation for the best experience");
    }
  }

  
  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    console.log(position);
    this.currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        optimized: false,
        title: 'Found you!',
        shape:{coords:[100, 200,18], type:'circle'},
        icon: {url:'https://www.gravatar.com/avatar/0a9745ea7ac5c90d7acadb02ab1020cd?s=32&d=identicon&r=PG&f=1'}
      });
    } else {
      this.marker.setPosition(location);
    }
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.currentLatLng = location;
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }



}
