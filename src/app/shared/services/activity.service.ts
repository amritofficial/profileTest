import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ActivityService {
  public updateActivityFeedSubject = new BehaviorSubject<string>("");

  constructor(private parseService: ParseService) { }

  public getIssues() {
    return this.parseService.getIssues();
  }
}
