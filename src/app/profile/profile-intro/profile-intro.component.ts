import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/models/profile';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileIntroComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  userProfile: Profile = {
    userId: null,
    aboutUser: 'Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56.',
    secondCategory: 'Acheivements',
    aboutSecondCategory: 'Einstein Genius 2018, Hack the North 2016 Winner',
  }

  userProfileObjectId: any = null;

  editProfile: boolean = false;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getCurrentUserProfile();
    console.log(this.profileService.editProfileIntro);
  }

  editProfileIntro() {
    this.editProfile = true;
    // this.profileService.editProfileIntro = true;
  }

  closeEditProfileIntro() {
    this.editProfile = false;
  }

  saveProfileIntro() {
    this.userProfile.userId = window.sessionStorage.getItem("current_user_id");
    this.profileService.saveCurrentUserProfile(this.userProfile)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
        console.log("profile stored");
        console.log(data);
        this.editProfile = false;
      });
    console.log(this.userProfile);
  }

  getCurrentUserProfile() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.profileService.getCurrentUserProfile(userId).then((profile) => {
      console.log(profile);
      console.log(profile.attributes);
      this.userProfileObjectId = profile[0].id;
      this.userProfile = profile[0].attributes;
      console.log("::Profile Object Id=> " +this.userProfileObjectId);
      console.log("Profile Fetched!!!");
    })
  }

  updateProfileIntro() {
    this.profileService.updateCurrentUserProfile(this.userProfile, this.userProfileObjectId)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
        console.log(data);
        console.log("Profile Update Successful!");
      })
  }

}
