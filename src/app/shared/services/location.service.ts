import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Location } from '../models/location';
import { User } from '../models/user';

@Injectable()
export class LocationService {
  currentLocation: Location;

  constructor(private parseService: ParseService) { }

  saveLocation(location: Location) {
    return this.parseService.storeLocation(location);
  } 

  getLocation(userId: any) {
    return this.parseService.getCurrentUserLocation(userId);
  }
  
  updateLocation(objectId: any) {
    return this.parseService.updateCurrentUserLocation(objectId);
  }

}
