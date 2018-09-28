import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { LinkService } from '../shared/services/link.service';
import { LinkRequest } from '../shared/models/link-request';
import { PostService } from '../shared/services/post.service';
import { Feed } from '../shared/models/feed';
import { AngularFireList } from '@angular/fire/database';
import { Like } from '../shared/models/like';
import { Comment } from '../shared/models/comment';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  currentUser: User = this.userService.user;
  feedList: Feed[] = new Array();
  commentBody: string = '';

  constructor(private userService: UserService,
    private linkService: LinkService,
    private postService: PostService) { }

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
    this.getGlobalFeed();
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

  getGlobalFeed() {
    this.postService.getGlobalFeed().pipe(takeUntil(this.ngUnsubscribe)).subscribe((feed) => {
      console.log("GLOBAL FEED");
      if (feed !== undefined || feed !== null) {
        let object = JSON.parse(JSON.stringify(feed[0]));
        this.feedList = [];
        for (var x in object) {
          this.feedList.push(object[x]);
        }
      }
      console.log(this.feedList);
    });
  }

  likeFeed(feed: Feed) {
    let alreadyLiked: boolean = false;
    let userId = this.userService.getCurrentUserId();
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((currentUser: User) => {
        let like: Like = {
          like: true,
          liker: currentUser
        }

        console.log("Current LIKING USer")
        console.log(currentUser);
        // the reason feed.user.userId is used is because the firebase needs to access 
        // the person posting the feed not the current user
        // cause current user will change depending upon the scenarios
        let likeArray: Like[] = new Array();
        likeArray = feed.like != undefined ? feed.like : new Array();
        likeArray.forEach((like, i) => {
          if (like.liker.userId === currentUser.userId) {
            alreadyLiked = true;
            console.log("Already Liked");
            this.dislikeFeed(feed.user.userId, feed.feedId, likeArray, i);
            console.log(i);
          }
        });

        if (alreadyLiked === false) {
          console.log("Not Liked")
          likeArray.push(like);
          this.postService.likeFeed(feed.user.userId, feed.feedId, likeArray);
        }
      });
  }

  dislikeFeed(userId: any, feedId: any, likeArray: Like[], index) {
    likeArray.splice(index, 1);
    console.log(likeArray);
    this.postService.dislikeFeed(userId, feedId, likeArray)
    console.log('Feed Disliked');
  }

  getLikerNameAndCount(feed: Feed) {
    let feedLike: Like[] = feed.like !== undefined ? feed.like : new Array();
    if (feedLike.length === 1) {
      return `${feedLike[0].liker.username} likes this`;
    }
    else if (feedLike.length === 2) {
      return `${feedLike[0].liker.username} and <br> ${feedLike[1].liker.username} like this`;
    }
    else if (feedLike.length > 2) {
      return `${feedLike[0].liker.username}, ${feedLike[1].liker.username} and <br> ${feedLike.length - 2} more like this`;
    }
  }


  postComment(feed: Feed) {
    console.log(this.commentBody);
    console.log(feed);
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((currentUser: User) => {
        let commentData: Comment = {
          commentBody: this.commentBody,
          timeStamp: new Date().getTime(),
          commentor: currentUser
        }

        let commentArray: Comment[] = feed.comment != undefined ? feed.comment : new Array();
        commentArray.push(commentData);
        this.postService.commentFeed(feed.user.userId, feed.feedId, commentArray)
          .then(() => {
            this.commentBody = '';
            console.log("Comment success!")
          }).catch(error => console.log(error));
      });
  }

  deleteComment(feed: Feed, index: any) {
    console.log(feed.comment)
    let commentArray: Comment[] = feed.comment;
    commentArray.splice(index, 1);

    this.postService.deleteCommentFeed(feed.user.userId, feed.feedId, commentArray).then(() => {
      console.log("Comment Deleted");
    });
  }

  deletePost(feed: Feed) {
    let userId = this.userService.getCurrentUserId();
    this.postService.deleteFeed(userId, feed.feedId);
  }

}