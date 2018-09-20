import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuestProfileService } from '../../shared/services/guest-profile.service';
import { Education } from '../../shared/models/education';

@Component({
  selector: 'guest-profile-education',
  templateUrl: './guest-profile-education.component.html',
  styleUrls: ['./guest-profile-education.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileEducationComponent implements OnInit {
  guestEducationArray: Education[] = [];
  loadingEducation: boolean = true;

  constructor(private route: ActivatedRoute,
    private guestProfileService: GuestProfileService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(this.guestProfileService.guestId);
      this.loadingEducation = true;
      this.guestProfileService.getGuestProfileEducation("7LkAPhJEYO").then((data) => {
        for (let i = 0; i < data.length; i++) {
          var object = data[i];
          this.guestEducationArray.push(object.attributes);
          console.log(object.attributes);
        }
        this.loadingEducation = false;
      });
    });
  }

}
