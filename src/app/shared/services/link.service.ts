import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user';
import { LinkRequest } from '../models/link-request';

@Injectable()
export class LinkService {

  links: User[];
  receivedRequests: LinkRequest[];
  sentRequests: LinkRequest[];
  constructor(private firebaseService: FirebaseService) { }

  // the method is being called in dashboard component
  // means friend list
  linkList(userId: any) {
    return this.firebaseService.getCurrentUserLinks(userId);
  }
  
  // the method is being called in dashboard component
  getCurrentUserReceivedRequests(userId: any) {
    return this.firebaseService.getCurrentUserReceivedRequests(userId);
  }

  // the method is being called in dashboard component
  getCurrentUserSentRequests(userId: any) {
    return this.firebaseService.getCurrentUserSentRequests(userId);
  }

}
