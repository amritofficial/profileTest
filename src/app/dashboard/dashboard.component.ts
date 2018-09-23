import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { LinkService } from '../shared/services/link.service';
import { LinkRequest } from '../shared/models/link-request';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  currentUser: User = this.userService.user;
  constructor(private userService: UserService,
    private linkService: LinkService) { }

  ngOnInit() {
    this.userService.loadingUser = true;
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.currentUser = user;
        this.userService.currentUser = user;
        // this.userService.userAvatarUrl = this.currentUser.avatar;
        this.userService.loadingUser = false;
        console.log('Subscribed Firebase User');
        console.log(this.currentUser);
      });
    this.getCurrentUserLinks();
    this.getCurrentReceivedRequests();
    this.getCurrentSentRequests();
  }

  getCurrentUserLinks() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User[]) => {
        this.linkService.links = user;
        console.log("User Friends");
        console.log(this.linkService.links);
      });
  }

  getCurrentReceivedRequests() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.linkService.getCurrentUserReceivedRequests(userId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((receivedRequests: LinkRequest[]) => {
        this.linkService.receivedRequests = receivedRequests;
        console.log("Received Requests");
        console.log(this.linkService.receivedRequests);
      });
  }

  getCurrentSentRequests() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.linkService.getCurrentUserSentRequests(userId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((sentRequests: LinkRequest[]) => {
        this.linkService.sentRequests = sentRequests;
        console.log("Sent Requests");
        console.log(this.linkService.sentRequests);
      });
  }

}