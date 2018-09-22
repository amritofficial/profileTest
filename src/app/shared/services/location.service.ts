import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Location } from '../models/location';

@Injectable()
export class LocationService {

  constructor(private parseService: ParseService) { }

  saveLocation(location: Location) {
    return this.parseService.storeLocation(location);
  }

}
