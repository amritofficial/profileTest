import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
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
import { MessengerService } from '../shared/services/messenger.service';
import { LinkService } from '../shared/services/link.service';
import { Message } from '../shared/models/message';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css', '../../assets/css/magnific-popup.css']
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  private ngUnsubscribe = new Subject();

  feedList: Feed[] = new Array();
  globalFeednotificationList: Feed[] = new Array();
  feedLikeCommentNotification: Feed[] = new Array();
  messageRoomPaths: any[] = new Array();
  notificationMessages: Message[] = new Array();
  notificationCount: number = null;

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
    private messageService: MessengerService,
    private linkService: LinkService,
    private router: Router) { }

  ngOnInit() {
    // TODO
    // Check if this actually works, and re-applies the profile picture once
    // it gets the data
    let roomPath = this.messageService.getMessengerRoomPath('S8QKLkPv4z');
    this.messageService.getLastMessage(roomPath).orderByKey()
      .limitToLast(1).on("child_added", function (snapshot) {
        var key = snapshot.key;
        var val = snapshot.val();
        console.log("OnInit Last Message");
        let message: Message = snapshot.val();
        console.log(message);
        // console.log(key);

      });
    this.getReceivedLinkRequest();
    this.getSentLinkRequest();
    this.createNotificationFromGlobalFeed();
    this.createNotificationForLikesComments();
    this.notificationMessages = this.getCurrentUserLastMessages();
  }

  ngOnChanges() {
    let roomPath = this.messageService.getMessengerRoomPath('S8QKLkPv4z');
    this.messageService.getLastMessage(roomPath).orderByKey()
      .limitToLast(1).on("child_added", function (snapshot) {
        var key = snapshot.key;
        var val = snapshot.val();
        console.log("OnChange Last Message");
        let message: Message = snapshot.val();
        console.log(message);
        // console.log(key);

      });
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
    this.postService.getGlobalFeed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((feed) => {
      console.log("FROM NOTIFICATION COMPONENT");
      if (feed !== undefined || feed !== null) {
        this.feedList = [];
        this.globalFeednotificationList = [];
        for (var i = 0; i < feed.length; i++) {
          let object = JSON.parse(JSON.stringify(feed[i]));
          this.feedList = [];
          for (var x in object) {
            if (object[x].user.userId !== this.userService.currentUser.userId) {
              this.feedList.push(object[x]);
              this.globalFeednotificationList.push(object[x]);
            }
          }
        }
      }
      // this.getNotificationCount();
      console.log(this.feedList);
      console.log("NOTIFICATIONS");
      console.log(this.globalFeednotificationList);
    });
  }

  createNotificationForLikesComments() {
    let currentUserId = this.userService.getCurrentUserId();
    this.postService.getFeed(currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((feed: Feed[]) => {
      if (feed.length !== 0) {
        this.feedLikeCommentNotification = feed;
        console.log("feed like notification")
        console.log(this.feedLikeCommentNotification);
      }
    });
    // this.getNotificationCount();
  }

  getCommentors(notification: Feed) {
    if (notification.comment.length === 1) {
      return `${notification.comment[0].commentor.username}`;
    }
    if (notification.comment.length === 2) {
      return `${notification.comment[0].commentor.username} & ${notification.comment[1].commentor.username}`
    }
    if (notification.comment.length > 2) {
      return `${notification.comment[0].commentor.username}, ${notification.comment[1].commentor.username} & ${notification.comment.length - 2}`
    }
  }

  getCommentorAvatar(notification: Feed) {
    if (notification.comment !== undefined) {
      return notification.comment[0].commentor.avatar;
    }
  }

  getCommentTimeStamp(notification: Feed) {
    if (notification.comment !== undefined) {
      return notification.comment[notification.comment.length - 1].timeStamp;
    }
  }

  getLikers(notification: Feed) {
    if (notification.like !== undefined) {
      if (notification.like.length === 1) {
        return `${notification.like[0].liker.username}`;
      }
      else if (notification.like.length === 2) {
        return `${notification.like[0].liker.username} & ${notification.like[1].liker.username}`;
      }
      else if (notification.like.length > 2) {
        return `${notification.like[0].liker.username}, ${notification.like[1].liker.username} & ${notification.like.length - 2} other`;
      }
    }
  }

  getLikerAvatar(notification: Feed) {
    if (notification.like !== undefined) {
      if (notification.like.length > 0) {
        return notification.like[notification.like.length - 1].liker.avatar;
      }
    }
  }

  getNotificationCount() {
    let count = 0;
    // if ((this.globalFeednotificationList.length > 0) && (this.feedLikeCommentNotification.length > 0)) {
    //   this.globalFeednotificationList.forEach((globalFeed, i) => {
    //     console.log("Inside loop")
    //     // for(var j = i; j < this.feedLikeCommentNotification.length; i++) {
    //     //   if(globalFeed.user.userId === this.feedLikeCommentNotification[j].user.userId) {
    //     //     console.log("Match found")
    //     //   }
    //     // }
    //     // if(element.user.userId === this.userService.currentUser.userId) {
    //     //   console.log("Id is there");
    //     // }
    //   });
    // }
    // if ((this.globalFeednotificationList.length > 0) && (this.feedLikeCommentNotification.length > 0)) {
    //   for (var i = 0; i < this.globalFeednotificationList.length; i++) {
    //     console.log(this.feedLikeCommentNotification)
    //     if (this.feedLikeCommentNotification[0].user.userId === this.userService.currentUser.userId) {
    //       if (this.feedLikeCommentNotification[i].like.length > 0) {
    //         count += 1;
    //       }
    //       if (this.feedLikeCommentNotification[i].comment.length > 0) {
    //         count += 1;
    //       }
    //       else if ((this.feedLikeCommentNotification[i].like.length > 0) && (this.feedLikeCommentNotification[i].comment.length > 0)) {
    //         count += 1;
    //       }
    //     }
    //   }
    // }
    return this.globalFeednotificationList.length + count;
  }

  getCurrentUserLastMessages() {
    let userId = this.userService.getCurrentUserId();
    let lastMessageArray: Message[] = new Array();
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((links: User[]) => {
        links.forEach((link, i) => {
          this.messageRoomPaths.push(this.messageService.getMessengerRoomPath(link.userId));

          this.messageService.getLastMessage(this.messageService.getMessengerRoomPath(link.userId)).orderByKey()
            .limitToLast(1).on("child_added", function (snapshot) {
              var key = snapshot.key;
              var val = snapshot.val();
              console.log("Last Message");
              let message: Message = snapshot.val();
              console.log(message);
              // console.log(key);
              if (val.user.userId !== userId) {
                lastMessageArray.push(message);
              }
            });
        });

        // console.log("Room Paths");
        // console.log(this.messageRoomPaths);
      });

    return lastMessageArray;
  }

}
