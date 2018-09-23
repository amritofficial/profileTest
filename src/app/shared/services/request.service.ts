import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { LinkRequest } from '../models/link-request';

@Injectable()
export class RequestService {

  constructor(private firebaseService: FirebaseService) { }

  sendLinkRequest(linkRequest: LinkRequest) {
    return this.firebaseService.sendLinkRequest(linkRequest);
  }

  getReceivedLinkRequest(userId: any) {
    return this.firebaseService.getReceivedLinkRequest(userId);
  }

  getSentLinkRequest(userId: any) {
    return this.firebaseService.getSentLinkRequest(userId);
  }

  // the following method will delete the request from the Received node in firebase
  // but it will be still existent in the sent node of another user until the user clicks
  // the card to delete it
  approveLinkRequest(request: LinkRequest) {
    this.firebaseService.approveLinkRequest(request);
    return this.firebaseService.approveLinkRequestSubject;
  }

}
