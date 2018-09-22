import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from '../models/user';
import { ParseService } from './parse.service';
import { Education } from '../models/education';

@Injectable()
export class GuestProfileService {
  guestUser: User = {
    avatar: "https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png",
    email: '',
    userId: null,
    username: '',
    userStatus: 1
  }

  education: Education = {
    description: '',
    endDate: {
      day: null,
      month: null,
      year: null
    },
    startDate: {
      day: null,
      month: null,
      year: null
    },
    program: '',
    school: '',
    schoolCity: '',
    schoolCountry: '',
    userId: null
  }

  guestId: any;

  constructor(private firebaseService: FirebaseService,
    private parseService: ParseService) { }

  getGuestProfile(guestId: any) {
    return this.firebaseService.getFireUserData(guestId);
  }

  getGuestProfileEducation(guestId: any) {
    return this.parseService.getGuestUserEducation(guestId);
  }

  getGuestProfileWorkExperience(guestId: any) {
    return this.parseService.getGuestUserWorkExperience(guestId);
  }

  getGuestFinderTags(guestId: any) {
    return this.parseService.getGuestUserFinderTags(guestId);
  }

  // getEducation() {
  //   this.parseService.getEducation();
  // }
}
