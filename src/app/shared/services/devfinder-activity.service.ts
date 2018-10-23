import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { DevfinderActivity } from '../models/activity';
import { Calendar } from '../models/calendar';

@Injectable()
export class DevfinderActivityService {

  constructor(private parseService: ParseService) { }

  createActivity(devfinderActivity: DevfinderActivity) {
    return this.parseService.createDevfinderActivity(devfinderActivity);
  }

  getActivity(userId: any) {
    return this.parseService.getDevfinderActivity(userId);
  }

  updateActivity(userId: any, updatedCalendar: Calendar[]) {
    return this.parseService.updateDevfinderActivity(userId, updatedCalendar);
  }
}