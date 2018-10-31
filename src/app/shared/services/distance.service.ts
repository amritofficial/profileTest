import { Injectable } from '@angular/core';
import { LocationService } from './location.service';
import { Location } from '../models/location';
import * as geoLib from 'geolib';

@Injectable()
export class DistanceService {
  currentUserLocation: Location;

  constructor(private locationService: LocationService) { }

  calculateDistance(location: Location) {
    let coords;
    this.currentUserLocation = this.locationService.currentLocation;
    if (this.currentUserLocation.lat != undefined) {
      coords = {
        latitude: this.currentUserLocation.lat,
        longitude: this.currentUserLocation.long
      }
    }
    else {
      // this.getCurrentUserLocation();
      coords = {
        latitude: this.currentUserLocation.lat,
        longitude: this.currentUserLocation.long
      }
    }

    let distance = geoLib.getDistance(coords, { latitude: location.lat, longitude: location.long });
    return Math.round((distance / 1000) * 100) / 100
  }

}
