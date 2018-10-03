import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileLocationModalComponent } from './profile-location-modal/profile-location-modal.component';
import { Profile } from '../shared/models/profile';
import { LinkList } from '../shared/models/link-list';
import { LinkService } from '../shared/services/link.service';
import { takeUntil } from 'rxjs/operators';

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
  currentUserLinks: User[] = new Array();
  guestProfiles: Profile[] = new Array();
  linkListObject: LinkList[] = new Array();

  modalRef: any;
  subscription: Subscription;

  constructor(private router: Router,
    private userService: UserService,
    private linkService: LinkService,
    private modalService: NgbModal) { }

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
    this.getCurrentUserLinks();
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
        else if (currentUrl === '/profile/links') {
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

  openSetLocationModal() {
    this.modalRef = this.modalService.open(ProfileLocationModalComponent, {
      size: 'lg'
    });
  }

  setLocation() {
    this.openSetLocationModal();
  }

  getCurrentUserLinks() {
    let userId = this.userService.getCurrentUserId();
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((links: User[]) => {
        this.currentUserLinks = links;
      });
    // this.linkService.linkList((links: User[]) => {
    //   this.currentUserLinks = links;
    // });
  }


}
