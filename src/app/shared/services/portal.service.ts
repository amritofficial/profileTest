import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ParseService } from './parse.service';
import { OpenIssue } from '../models/open-issue';
import { DevFinderTag } from '../models/devfinder-tag';
import { AnswerIssue } from '../models/answer-issue';

@Injectable()
export class PortalService {
  devFinderTags: DevFinderTag[];

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

  getOpenIssueWithId(issueId: any) {
    return this.parseService.getOpenIssueWithId(issueId);
  }

  getCurrentTagOpenIssuesCountWithTagId(tagId: any) {
    return this.parseService.getCurrentTagOpenIssuesCountWithTagId(tagId);
  }

  getOpenIssuesCountWithTagName(tagName: string) {
    return this.parseService.getOpenIssuesCountWithTagName(tagName);
  }

  getDevCountWithTagName(tagName: string) {
    return this.parseService.getDevCountWithTagName(tagName);
  }

  getDevWithTagName(tagName: string) {
    return this.parseService.getDevWithTagName(tagName);
  }

  getIssuesWithTagId(tagId: any) {
    return this.parseService.getIssuesWithTagId(tagId);
  }

  saveIssueAnswerWithIssueId(updatedAnswers: AnswerIssue[], issueId: any) {
    return this.parseService.saveIssueAnswerWithIssueId(updatedAnswers, issueId);
  }

  getAllWorkExperiences() {
    return this.parseService.getAllWorkExperiences();
  }
}