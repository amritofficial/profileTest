import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuestProfileService } from '../../shared/services/guest-profile.service';
import { Education } from '../../shared/models/education';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'guest-profile-education',
  templateUrl: './guest-profile-education.component.html',
  styleUrls: ['./guest-profile-education.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileEducationComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  guestEducationArray: Education[] = [];
  loadingEducation: boolean = true;

  constructor(private route: ActivatedRoute,
    private guestProfileService: GuestProfileService) { }

  ngOnInit() {
    this.route.parent.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      this.loadingEducation = true;
      this.guestProfileService.getGuestProfileEducation(params.guestId).then((data) => {
        for (let i = 0; i < data.length; i++) {
          var object = data[i];
          this.guestEducationArray.push(object.attributes);
        }
        this.loadingEducation = false;
      });
    });
  }

}
