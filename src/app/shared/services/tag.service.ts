import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { FinderTags } from '../models/finder-tags';

@Injectable()
export class TagService {

  constructor(private parseService: ParseService) { }

  saveFinderTags(finderTags: FinderTags) {
    return this.parseService.storeFinderTags(finderTags);
  }

  getCurrentUserTags(userId: any) {
    return this.parseService.getCurrentUserFinderTags(userId);
  }

  updateCurrentFinderTags(objectId: any) {
    return this.parseService.updateCurrentUserFinderTags(objectId);
  }

  getAllUsersFinderTags() {
    return this.parseService.getAllUsersFinderTags();
  }

}
