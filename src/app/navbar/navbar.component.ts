import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ParseService } from '../shared/services/parse.service';
import { Router } from '@angular/router';
import { LinkRequest } from '../shared/models/link-request';
import { RequestService } from '../shared/services/request.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css', '../../assets/css/magnific-popup.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

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

  approvedRequestArray: User[] = [];
  showConnectionSuccess: boolean = false;
  currentUserId = window.sessionStorage.getItem("current_user_id");

  receivedRequestCount: number;
  approvedSentRequestCount: number;

  constructor(private userService: UserService,
    private requestService: RequestService,
    private parseService: ParseService,
    private router: Router) { }

  ngOnInit() {
    // TODO
    // Check if this actually works, and re-applies the profile picture once
    // it gets the data
    this.getReceivedLinkRequest();
    this.getSentLinkRequest();
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
      this.router.navigateByUrl('/home/(form-outlet:login)');
    })
  }

  getReceivedLinkRequest() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.requestService.getReceivedLinkRequest(userId).subscribe((receivedRequest: LinkRequest[]) => {
      console.log("request");
      this.linkRequestArray = receivedRequest;
      this.receivedRequestCount = this.linkRequestArray.length;
      console.log(this.linkRequestArray);
    });
  }

  getSentLinkRequest() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.requestService.getSentLinkRequest(userId).subscribe((sentRequest: LinkRequest[]) => {
      this.sentLinkRequestArray = sentRequest;
      this.approvedSentRequestCount = 0;

      for(let i=0; i < this.sentLinkRequestArray.length; i++) {
        if(this.sentLinkRequestArray[i].status === 'approved') {
          this.approvedSentRequestCount +=1;
        }
      }
      
      console.log(this.approvedSentRequestCount);
      // this.approvedSentRequestCount = this.sentLinkRequestArray.length;
      console.log(this.sentLinkRequestArray);
    });
  }

  // toId is current user id to whom the request has been sent
  // Once the response of delete is received, ngIf can be used to display friendship
  approveLinkRequest(request: LinkRequest) {
    console.log(request);

    this.requestService.approveLinkRequest(request)
      .subscribe((status) => {
        if (status === 'approved') {
          this.approvedRequestArray.push(request.from);
          console.log(this.approvedRequestArray);
          this.showConnectionSuccess = true;
          console.log(status);
        }
      });
  }

  declineLinkRequest(request: LinkRequest) {

  }

  // showConnectionSuccessCard(request: LinkRequest) {
  //   if(request.from.userId !== this.approvedRequestArray[this.approvedRequestArray.indexOf(request.from)].userId) {

  //   }
  // }

}
