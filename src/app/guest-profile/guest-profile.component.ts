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
          this.guestUser = user;
        });
      this.checkGuestStatusType();
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

  // the method performs a real-time check if the visited guest is a friend or a person whom the request has been sent
  // or has been received from
  checkGuestStatusType() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((links: User[]) => {
      if (links.length !== 0) {
        links.forEach(link => {
          if(link.userId !== this.guestId) {
            this.guestStatus = '';
          } else if (link.userId === this.guestId) {
            this.guestStatus = 'approved';
          }
        });
      }
    });
    this.requestService.getReceivedLinkRequest(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((receivedRequest: LinkRequest[]) => {
      if(receivedRequest.length !== 0) {
        receivedRequest.forEach(request => {
          if (request.status === 'waiting') {
            this.guestStatus = 'waiting';
          }
        });
      } else {
        this.requestService.getSentLinkRequest(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((sentRequests: LinkRequest[]) => {
          sentRequests.forEach(request => {
            if (request.status === 'sent') {
              this.guestStatus = 'sent';
            } else if (request.status === 'approved') {
              this.guestStatus = 'approved';
            }
          }); 
        });
      }
    });
  }

}
