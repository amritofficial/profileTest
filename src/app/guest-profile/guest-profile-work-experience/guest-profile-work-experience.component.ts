import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GuestProfileService } from '../../shared/services/guest-profile.service';
import { WorkExperience } from '../../shared/models/work-experience';

@Component({
  selector: 'guest-profile-work-experience',
  templateUrl: './guest-profile-work-experience.component.html',
  styleUrls: ['./guest-profile-work-experience.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileWorkExperienceComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  guestWorkExperienceArray: WorkExperience[] = [];
  loadingWorkExperience: boolean = false;

  constructor(private route: ActivatedRoute,
    private guestProfileService: GuestProfileService) { }

  ngOnInit() {
    this.loadingWorkExperience = true;
    this.route.parent.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        console.log(params.guestId);
        this.guestProfileService.getGuestProfileWorkExperience(params.guestId).then((data) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            var object = data[i];
            this.guestWorkExperienceArray.push(object.attributes);
          }
          this.loadingWorkExperience = false;
        });
      });
  }

}
