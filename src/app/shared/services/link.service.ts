import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user';
import { LinkRequest } from '../models/link-request';

@Injectable()
export class LinkService {

  links: User[] = [{
    avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
    email: '',
    userId: null,
    username: '',
    userStatus: 1
  }];
  receivedRequests: LinkRequest[] = [{
    from: {
      avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    },
    senderId: null,
    status: '',
    to: {
      avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    }
  }];
  sentRequests: LinkRequest[] = [{
    from: {
      avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    },
    senderId: null,
    status: '',
    to: {
      avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    }
  }];;
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
