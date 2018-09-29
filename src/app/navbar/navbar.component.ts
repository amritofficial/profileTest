import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ParseService } from '../shared/services/parse.service';
import { Router } from '@angular/router';
import { LinkRequest } from '../shared/models/link-request';
import { RequestService } from '../shared/services/request.service';
import { User } from '../shared/models/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostService } from '../shared/services/post.service';
import { Feed } from '../shared/models/feed';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css', '../../assets/css/magnific-popup.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  feedList: Feed[] = new Array();
  notificationList: any[] = new Array();

  linkRequestArray: LinkRequest[] = [{
    from: this.userService.user,
    senderId: null,
    status: '',
    to: this.userService.user
  }];

  sentLinkRequestArray: LinkRequest[] = [{
    from: this.userService.user,
    senderId: null,
    status: '',
    to: this.userService.user
  }];

  approvedRequestArray: any[] = [];
  showConnectionSuccess: boolean = false;
  currentUserId = window.sessionStorage.getItem("current_user_id");

  receivedRequestCount: number;
  approvedSentRequestCount: number;

  constructor(private userService: UserService,
    private requestService: RequestService,
    private parseService: ParseService,
    private postService: PostService,
    private router: Router) { }

  ngOnInit() {
    // TODO
    // Check if this actually works, and re-applies the profile picture once
    // it gets the data
    this.getReceivedLinkRequest();
    this.getSentLinkRequest();
    this.createNotificationFromGlobalFeed();
  }

  ngOnDestroy() {
    this.approvedRequestArray = null;
  }

  print() {
    console.log("Profile Clicked");
  }

  logoutUser() {
    this.parseService.logoutUsingRest().subscribe(data => {
      console.log("user logged out");
      window.sessionStorage.setItem("session_token", null);
      window.sessionStorage.setItem("current_user_id", null);
      this.router.navigateByUrl('/home/(form-outlet:login)');
    });
  }

  getReceivedLinkRequest() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.requestService.getReceivedLinkRequest(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((receivedRequest: LinkRequest[]) => {
      console.log("request");
      this.linkRequestArray = receivedRequest;
      this.receivedRequestCount = this.linkRequestArray.length;
      console.log(this.linkRequestArray);
    });
  }

  getSentLinkRequest() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.requestService.getSentLinkRequest(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((sentRequest: LinkRequest[]) => {
      this.sentLinkRequestArray = sentRequest;
      this.approvedSentRequestCount = 0;

      for (let i = 0; i < this.sentLinkRequestArray.length; i++) {
        if (this.sentLinkRequestArray[i].status === 'approved') {
          this.approvedSentRequestCount += 1;
        }
      }

      console.log(this.approvedSentRequestCount);
      // this.approvedSentRequestCount = this.sentLinkRequestArray.length;
      console.log(this.sentLinkRequestArray);
    });
  }

  // toId is current user id to whom the request has been sent
  // Once the response of delete is received, ngIf can be used to display friendship
  approveLinkRequest(request: LinkRequest, i: any) {
    console.log(request);
    console.log("index: " + i)

    this.requestService.approveLinkRequest(request);
    // this can throw error
    this.approvedRequestArray.push(request.from);
    // Behaviour Subject Subscription was here
  }

  declineLinkRequest(request: LinkRequest) {

  }

  // ToDo remove the sent request node on click from firebase database
  removeApprovedRequestNotification() {
    console.log("Removed Notification");
  }

  createNotificationFromGlobalFeed() {
    let currentUserId = this.userService.getCurrentUserId();
    this.postService.getGlobalFeed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((feed) => {
      console.log("FROM NOTIFICATION COMPONENT");
      if (feed !== undefined || feed !== null) {
        let object = JSON.parse(JSON.stringify(feed[0]));
        this.feedList = [];
        for (var x in object) {
          this.feedList.push(object[x]);
          this.notificationList.push(object[x]);
        }
      }
      console.log(this.feedList);
      console.log("NOTIFICATIONS");
      console.log(this.notificationList);
    });
  }

}
