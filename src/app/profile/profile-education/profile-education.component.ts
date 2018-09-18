import { Component, OnInit } from '@angular/core';
import { Education } from '../../shared/models/education';
import { ProfileService } from '../../shared/services/profile.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileEducationComponent implements OnInit {

  addProfileEducation: boolean = false;
  addEducation: Education = this.profileService.education;

  constructor(private profileService: ProfileService,
    private userService: UserService) { }

  saveEducation() {
    console.log('Save Education');
    this.addEducation.user = this.userService.currentUser;
    console.log(this.addEducation);
  }

  ngOnInit() {
  }

}
