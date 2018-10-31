import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../models/location';

@Pipe({
  name: 'location'
})
export class LocationPipe implements PipeTransform {

  transform(locations: Location[]): any {
    return locations.filter(location => {return location.status == "public"});
  }

}
