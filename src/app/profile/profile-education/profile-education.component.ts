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
  educationArray: any[];
  filterdEducationArray: Education[];
  loadingProfile: boolean = false;

  constructor(private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadingProfile = true;
    this.profileService.getCurrentUserEducation(this.userService.currentUser.userId)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((education) => {

        console.log(JSON.stringify(education.results));
        let objectArray = JSON.stringify(education.results);
        this.educationArray = JSON.parse(objectArray);
        console.log(this.educationArray);
        // console.log(this.educationArray);
        this.filterEducation();
        // console.log(this.educationArray);
        // console.log(education);
      });

    // this.getCurrentUserEducation();
  }

  saveEducation() {
    console.log('Save Education');
    this.savingEducation = true;
    this.addEducation.userId = this.userService.currentUser.userId;
    this.profileService.saveCurrentUserEducation(this.addEducation)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((education) => {
        console.log(education);
        this.savingEducation = false;
        this.closeAddEducationForm();
        console.log('Sava Successful');
      });
    // console.log(this.addEducation);
  }

  openAddEducationForm(event) {
    this.addProfileEducation = true;
  }

  closeAddEducationForm() {
    this.addProfileEducation = false;
  }

  getCurrentUserEducation() {
    this.profileService.getCurrentUserEducation(this.userService.currentUser.userId)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((education: Education[]) => {
        this.educationArray = education;
        console.log(this.educationArray);
        // console.log(education);
      });
  }

  filterEducation() {
    let userId = String(window.sessionStorage.getItem('current_user_id'));
    // console.log(window.sessionStorage.getItem('current_user_id'));
    // console.log(userId);
    console.log(this.userService.currentUser.userId)
    this.filterdEducationArray = this.educationArray.filter(education => education.userId === userId);
    console.log(this.filterdEducationArray);
    this.loadingProfile = false;
    console.log('filtered');
  }

}
