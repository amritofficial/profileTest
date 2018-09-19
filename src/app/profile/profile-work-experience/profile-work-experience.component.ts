import { Component, OnInit, OnChanges } from '@angular/core';
import { WorkExperience } from '../../shared/models/work-experience';
import { ProfileService } from '../../shared/services/profile.service';
import { UserService } from '../../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile-work-experience',
  templateUrl: './profile-work-experience.component.html',
  styleUrls: ['./profile-work-experience.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileWorkExperienceComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  workExperience: WorkExperience = this.profileService.workExperience;
  savingWorkExperience: boolean = false;
  addWorkExperience: boolean = false;
  workExperienceArray: WorkExperience[];
  filteredWorkExperience: WorkExperience[] = [this.profileService.workExperience];
  loadingProfile: boolean = false;

  constructor(private profileService: ProfileService,
    private userService: UserService) { }

  ngOnInit() {
    this.loadingProfile = true;
    this.getCurrentUserWorkExperience();
  }

  ngOnChanges() {
    console.log("::");
    console.log(this.workExperienceArray);
  }

  openAddWorkForm() {
    this.addWorkExperience = true;
  }

  closeAddWorkForm() {
    this.addWorkExperience = false;
  }

  saveWorkExperience() {
    this.savingWorkExperience = true;
    this.workExperience.userId = window.sessionStorage.getItem("current_user_id");
    this.profileService.saveCurrentUserWorkExperience(this.workExperience)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((workExperience) => {
        console.log(workExperience);
        console.log("added successfully");
        this.filteredWorkExperience.push(this.workExperience);
        this.savingWorkExperience = false;
        this.closeAddWorkForm();
      });
    console.log(this.workExperience);
  }

  checkValue(event) {
    console.log(event);
  }

  getCurrentUserWorkExperience() {
    this.profileService.getCurrentUserWorkExperience()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((workExperience) => {
        let objectArray = JSON.stringify(workExperience.results);
        this.workExperienceArray = JSON.parse(objectArray);
        this.filterWorkExperience();
        console.log(workExperience);
      })
  }

  filterWorkExperience() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.filteredWorkExperience = this.workExperienceArray.filter(we => we.userId === userId);
    this.loadingProfile = false;
    console.log(this.filteredWorkExperience);
  }

}
