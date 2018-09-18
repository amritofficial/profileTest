import { Injectable } from '@angular/core';
import { Education } from '../models/education';
import { ParseService } from './parse.service';
import { User } from '../models/user';

@Injectable()
export class ProfileService {

  editProfileIntro: boolean = false;
  editProfileThumb: boolean = false;

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
    user: {
      avatar: '',
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    }
  }

  constructor(private parseService: ParseService) { }

  public getCurrentUserEducation(user: User) {
    return this.parseService.getCurrentUserEducation(user);
  }

  public saveCurrentUserEducation(education: Education) {
    return this.parseService.storeEducation(education);
  }

}
