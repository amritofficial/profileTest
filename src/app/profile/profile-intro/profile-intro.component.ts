import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/models/profile';

@Component({
  selector: 'profile-intro',
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileIntroComponent implements OnInit {

  userProfile: Profile = {
    userName: '',
    aboutUser: 'Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in Pier 56.'
  }

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    console.log(this.profileService.editProfileIntro);
  }

  editProfileIntro() {
    this.profileService.editProfileIntro = true;
  }

}
