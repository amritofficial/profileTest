import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GuestProfileService } from '../shared/services/guest-profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { LinkRequest } from '../shared/models/link-request';
import { UserService } from '../shared/services/user.service';
import { RequestService } from '../shared/services/request.service';
import { LinkService } from '../shared/services/link.service';

@Component({
  selector: 'guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class GuestProfileComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  showFeed: boolean = true;
  showRightSidebar: boolean = true;
  guestId: any;
  guestUser: User = this.guestProfileService.guestUser;
  guestStatus: string = '';
  loadingGuestStatus: boolean = false;

  currentUser: User;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private guestProfileService: GuestProfileService,
    private userService: UserService,
    private requestService: RequestService,
    private linkService: LinkService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.guestId = params.guestId;
      this.guestProfileService.guestId = this.guestId;
      this.getCurrentUserData();
      this.guestProfileService.getGuestProfile(this.guestId)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
          // this.checkGuestStatus();
          this.guestUser = user;
        });

      this.requestService.linkRequestSubscription().subscribe(() => {
        this.checkGuestStatus();
      });
    });
    this.checkActivatedRoute();
  }

  checkActivatedRoute() {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        let currentUrl = event.url;
        if (currentUrl === `/guest-profile/${this.guestId}/education`) {
          this.showFeed = false;
          this.showRightSidebar = false;
        }
        else if (currentUrl === `/guest-profile/${this.guestId}/work-experience`) {
          this.showFeed = false;
          this.showRightSidebar = false;
        }
        else {
          this.showFeed = true;
          this.showRightSidebar = true;
        }
      }
    });
  }

  addLinkRequest() {
    let linkRequestData: LinkRequest = {
      to: this.guestUser,
      from: this.currentUser,
      senderId: window.sessionStorage.getItem("current_user_id"),
      status: "sent"
    }
    console.log(linkRequestData);
    this.requestService.sendLinkRequest(linkRequestData);
    // this.userService.sendLinkRequest(linkRequestData);
    this.guestStatus = 'sent';
  }

  getCurrentUserData() {
    this.userService.getCurrentUserDataFromFirebase()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
        this.userService.currentUser = user;
        this.currentUser = user;
      });
  }

  // the method will perform a check if the visited guest is a friend, sender or receiver of a request
  checkGuestStatus() {
    this.loadingGuestStatus = true;
    for (let i = 0; i < this.linkService.links.length; i++) {
      if (this.guestId === this.linkService.links[i].userId) {
        this.guestStatus = "approved";
      }
    }

    for (let i = 0; i < this.linkService.receivedRequests.length; i++) {
      if (this.guestId === this.linkService.receivedRequests[i].from.userId) {
        this.guestStatus = "pending";
      }
    }

    for (let i = 0; i < this.linkService.sentRequests.length; i++) {
      if ((this.guestId === this.linkService.sentRequests[i].to.userId) && (this.linkService.sentRequests[i].status !== 'approved')) {
        this.guestStatus = "sent";
      }
    }
    this.loadingGuestStatus = false;
    console.log("Status");
    console.log(this.guestStatus);

  }

}
