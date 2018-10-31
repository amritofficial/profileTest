import { Injectable } from '@angular/core';
import { Education } from '../models/education';
import { ParseService } from './parse.service';
import { User } from '../models/user';
import { WorkExperience } from '../models/work-experience';
import { Profile } from '../models/profile';

@Injectable()
export class ProfileService {

  editProfileIntro: boolean = false;
  editProfileThumb: boolean = false;

  workExperience: WorkExperience = {
    city: '',
    company: '',
    country: '',
    description: '',
    endDate: {
      day: null,
      year: null,
      month: null
    },
    startDate: {
      day: null,
      year: null,
      month: null
    },
    jobStatus: false,
    jobTitle: '',
    userId: null
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

  constructor(private parseService: ParseService) { }

  public getCurrentUserEducation(userId: any) {
    return this.parseService.getCurrentUserEducation(userId);
  }

  public saveCurrentUserEducation(education: Education) {
    return this.parseService.storeEducation(education);
  }

  public getCurrentUserWorkExperience() {
    return this.parseService.getCurrentUserWorkExperience();
  }

  public saveCurrentUserWorkExperience(workExperience: WorkExperience) {
    return this.parseService.storeWorkExperience(workExperience);
  }

  public saveCurrentUserProfile(profile: Profile) {
    return this.parseService.storeProfile(profile);
  }

  public updateCurrentUserProfile(updatedProfile: Profile, objectId: any) {
    return this.parseService.updateCurrentUserProfile(updatedProfile, objectId);
  }

  public getCurrentUserProfile(userId: any) {
    return this.parseService.getCurrentUserProfile(userId);
  }

  public getAllUsersProfile() {
    return this.parseService.getAllUsersProfile();
  }
}