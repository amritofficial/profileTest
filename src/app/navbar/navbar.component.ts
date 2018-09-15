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
  }

  print() {
    console.log("Profile Clicked");
  }

}
