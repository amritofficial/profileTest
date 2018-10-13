import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ParseService } from './parse.service';
import { OpenIssue } from '../models/open-issue';

@Injectable()
export class PortalService {

  constructor(private firebaseService: FirebaseService,
    private parseService: ParseService) { }

  // the function would return all the stored users from Firebase
  getAllUsersFromFirebase() {
    return this.firebaseService.getAllFireUsers();
  }

  getAllLocations() {
    return this.parseService.getAllUsersLocation();
  }

  getAllUsersFinderTags() {
    return this.parseService.getAllUsersFinderTags();
  }

  getAllDevFinderTags() {
    return this.parseService.getAllDevFinderTags();
  }

  saveIssue(openIssueData: OpenIssue) {
    return this.parseService.saveIssue(openIssueData);
  }

  getAllIssues() {
    return this.parseService.getIssues();
  }

}
