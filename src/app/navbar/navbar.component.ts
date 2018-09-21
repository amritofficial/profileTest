import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ParseService } from '../shared/services/parse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css', '../../assets/css/magnific-popup.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
    private parseService: ParseService,
    private router: Router) { }

  ngOnInit() {
    // TODO
    // Check if this actually works, and re-applies the profile picture once
    // it gets the data
  }

  print() {
    console.log("Profile Clicked");
  }

  logoutUser() {
    this.parseService.logoutUsingRest().subscribe(data => {
      console.log("user logged out");
      window.sessionStorage.setItem("session_token", null);
      this.router.navigateByUrl('/home/(form-outlet:login)');
    })
  }

}
