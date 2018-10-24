import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable()
export class ActivityService {

  constructor(private parseService: ParseService) { }

  public getIssues() {
    return this.parseService.getIssues();
  }
}
