import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Feed } from '../../shared/models/feed';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Like } from '../../shared/models/like';
import { Comment } from '../../shared/models/comment';
import { PostService } from '../../shared/services/post.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileFeedComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  feedBody: string = '';
  feedArray: Feed[] = [];
  feed: Feed = new Feed();
  commentBody: string = '';
  // feed: Feed = {
  //   timeStamp: null,
  //   feedBody: '',
  //   user: {
  //     avatar: '',
  //     email: '',
  //     userId: null,
  //     username: ''
  //   } as User,
  //   feedId: '',
  //   like: [
  //     {
  //       like: false,
  //       liker: {
  //         avatar: '',
  //         email: '',
  //         userId: null,
  //         username: ''
  //       }
  //     }
  //   ] as Like[],
  //   comment: [
  //     {
  //       commentBody: '',
  //       commentor: {
  //         avatar: '',
  //         email: '',
  //         userId: null,
  //         username: ''
  //       }
  //     }
  //   ] as Comment[]
  // }

  constructor(private userService: UserService,
    private postService: PostService) { }

  ngOnInit() {
    this.postService.getFeed(this.userService.getCurrentUserId()).subscribe((feed: Feed[]) => {
      this.feedArray = feed;
    })
  }

  postFeed() {
    let userId = window.sessionStorage.getItem("current_user_id");
    let timeStamp = new Date().getTime();
    console.log(timeStamp);
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.feed.user = user;
        this.feed.feedBody = this.feedBody;
        this.feed.timeStamp = new Date().getTime();
        this.postService.storeFeed(this.feed, userId).then((data) => {
          console.log("Feed Stored");
          this.feedBody = '';
          this.getTime();
        });
        console.log(this.feed);
      });
  }

  getTime() {
    var ts = Math.round(new Date().getTime() / 1000);
    var tsYesterday = ts - (24 * 3600);

    console.log(tsYesterday);
  }

  getFeed() {

  }

  showLikes(feed: Feed) {
    if (feed.like.length > 1) {
      return true;
    }
    else if (feed.like.length === 1) {
      if (feed.like[0].like === true) {
        return true;
      }
    }
    else {
      return false;
    }
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
        // the reason feed.user.userId is used is because the firebase needs to access 
        // the person posting the feed not the current user
        // cause current user will change depending upon the scenarios
        let likeArray: Like[] = new Array();
        likeArray = feed.like != undefined ? feed.like : new Array();
        likeArray.forEach((like, i) => {
          if (like.liker.userId === currentUser.userId) {
            alreadyLiked = true;
            this.dislikeFeed(feed.user.userId, feed.feedId, likeArray, i);
            console.log(i);
          }
        });

        if (alreadyLiked === false) {
          console.log("LIKE IT")
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