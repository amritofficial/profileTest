import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ParseService } from './parse.service';
import { User } from '../models/user';
import { WorkExperience } from '../models/work-experience';
import { Education } from '../models/education';
import { Location } from '../models/location';
import { LinkRequest } from '../models/link-request';

@Injectable()
export class UserService {
  loadingUser: boolean = false;
  user: User = {
    avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
    email: '',
    userId: null,
    username: '',
    userStatus: 1
  }

  // the variable is used to store current user data in the service without having to subscribe it
  // from each component utilizing the same variable
  currentUser: User = this.user;

  // the variable would be used to store list of users 
  // components that will be using this variable will be user-list-bar and messenger
  listOfUsers: User[] = [this.user];

  userAvatarUrl: string = '';

  constructor(private firebaseService: FirebaseService,
    private parseService: ParseService) { }

  getCurrentUserDataFromFirebase() {
    return this.firebaseService.getFireUserData(this.getCurrentUserId());
  }

  getCurrentUserId() {
    // let currentUser = this.parseService.currentUser;
    let currentUserId = window.sessionStorage.getItem('current_user_id');
    return currentUserId;
  }

  getGuestUserFromFirebase(guestId: any) {
    return this.firebaseService.getFireUserData(guestId);
  }

  getAllUsersFromFirebase() {
    return this.firebaseService.getAllFireUsers();
  }

  storeWorkExperience(workExperience: WorkExperience) {
    return this.parseService.storeWorkExperience(workExperience);
  }

  storeEducation(education: Education) {
    return this.parseService.storeEducation(education);
  }

  storeLocation(location: Location) {
    return this.parseService.storeLocation(location);
  }

  sendLinkRequest(linkRequest: LinkRequest) {
    return this.firebaseService.sendLinkRequest(linkRequest);
  }

  getReceivedLinkRequest() {
    
  }

}