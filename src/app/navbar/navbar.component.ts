import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css', '../../assets/css/magnific-popup.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    // TODO
    // Check if this actually works, and re-applies the profile picture once
    // it gets the data
    if (this.userService.currentUser.avatar === null) {
      this.userService.currentUser.avatar = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
    }
  }

  print() {
    console.log("Profile Clicked");
  }

}
