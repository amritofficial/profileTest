import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'guest-profile-thumb',
  templateUrl: './guest-profile-thumb.component.html',
  styleUrls: ['./guest-profile-thumb.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileThumbComponent implements OnInit {
  @Input() guestUser: User;
  temporaryAvatar: string = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
 
  constructor() { }

  ngOnInit() {
  }

}
