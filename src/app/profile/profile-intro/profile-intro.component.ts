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
    aboutUser: 'Write a bit about yourself',
    aboutSecondCategory: '',
    secondCategory: '',
    userId: null
  };
  updatedUserProfile: Profile;

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
      console.log(profile);
      if (!(profile.length <= 0)) {
        this.userProfileObjectId = profile[0].id;
        this.userProfile = profile[0].attributes;
        this.updatedUserProfile = JSON.parse(JSON.stringify(this.userProfile));
        console.log("::Profile Object Id=> " + this.userProfileObjectId);
        console.log("Profile Fetched!!!");
      }
    });
  }

  updateProfileIntro() {
    console.log("afkhafkhafkahfk");
    console.log(this.updatedUserProfile);
    console.log(this.userProfileObjectId);
    this.profileService.updateCurrentUserProfile(this.updatedUserProfile, this.userProfileObjectId).then((profile) => {
      profile.set("aboutUser", this.updatedUserProfile.aboutUser);
      profile.set("secondCategory", this.updatedUserProfile.secondCategory);
      profile.set("aboutSecondCategory", this.updatedUserProfile.aboutSecondCategory);
      profile.save();
      this.getCurrentUserProfile();
      this.editProfile = false;
      console.log("profileSaved");
    });
  }

}
