import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Profile } from '../../shared/models/profile';

@Component({
  selector: 'guest-profile-intro',
  templateUrl: './guest-profile-intro.component.html',
  styleUrls: ['./guest-profile-intro.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileIntroComponent implements OnInit {
  @Input() guestProfileIntro: Profile;
  // userProfile: Profile = {
  //   aboutUser: 'Write a bit about yourself',
  //   aboutSecondCategory: '',
  //   secondCategory: '',
  //   userId: null
  // };

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges() {
    if(this.guestProfileIntro) {
      console.log("GOT THE VALUE");
    }
  }

}
