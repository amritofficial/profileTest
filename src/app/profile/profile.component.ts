import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { Education } from '../shared/models/education';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css', '../../assets/css/magnific-popup.css']
})
export class ProfileComponent implements OnInit {
  skillTagsArray: Array<string> = ["HTML", "Swift", "Android", "Java", "Angular", "NodeJs", "ExpressJs", "Javascript"]
  private ngUnsubscribe = new Subject();
  currentUser: User = this.userService.user;
  showFeed: boolean = true;
  showRightSidebar: boolean = true;
  showRouterOutlet: boolean = false;

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    // this.userService.loadingUser = true;
    // this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((user: User) => {
    //     this.currentUser = user;
    //     this.userService.currentUser = user;
    //     // this.userService.userAvatarUrl = this.currentUser.avatar;
    //     this.userService.loadingUser = false;
    //     console.log('Subscribed Firebase User');
    //     console.log(this.currentUser);
    //   });
    this.checkActivatedRoute();
  }

  checkActivatedRoute() {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        let currentUrl = event.url;
        if (currentUrl === '/profile/education') {
          this.showRouterOutlet = true;
          this.showFeed = false;
          this.showRightSidebar = false;
        }
        else if (currentUrl === '/profile/work-experience') {
          this.showRouterOutlet = true;
          this.showFeed = false;
          this.showRightSidebar = false;
        }
        else if (currentUrl === '/profile/timeline') {
          this.showRouterOutlet = false;
          this.showFeed = true;
          this.showRightSidebar = true;
        }
        else {
          this.showRouterOutlet = false;
          this.showFeed = true;
          this.showRightSidebar = true;
        }
        console.log(currentUrl);
      }
    });
  }

}
