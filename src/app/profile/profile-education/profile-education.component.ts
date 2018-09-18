import { Component, OnInit } from '@angular/core';
import { Education } from '../../shared/models/education';
import { ProfileService } from '../../shared/services/profile.service';
import { UserService } from '../../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileEducationComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  addProfileEducation: boolean = false;
  addEducation: Education = this.profileService.education;
  savingEducation: boolean = false;

  constructor(private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
  }

  saveEducation() {
    console.log('Save Education');
    this.savingEducation = true;
    this.addEducation.user = this.userService.currentUser;
    this.profileService.saveCurrentUserEducation(this.addEducation)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((education) => {
        console.log(education);
        this.savingEducation = false;
        console.log('Sava Successful');
      });
    // console.log(this.addEducation);
  }

  openAddEducationForm(event) {
    this.addProfileEducation = true;
  }

  closeAddEducationForm(event) {
    this.addProfileEducation = false;
  }

}
