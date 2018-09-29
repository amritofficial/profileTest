import { Component, OnInit, Input, DoCheck, OnChanges } from '@angular/core';
import { User } from '../../shared/models/user';
import { Feed } from '../../shared/models/feed';
import { Like } from '../../shared/models/like';
import { UserService } from '../../shared/services/user.service';
import { Comment } from '../../shared/models/comment';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'guest-profile-feed',
  templateUrl: './guest-profile-feed.component.html',
  styleUrls: ['./guest-profile-feed.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileFeedComponent implements OnInit, DoCheck, OnChanges {
  private ngUnsubscribe = new Subject();
  @Input() guestFeed: Feed[];
  @Input() guestUser: User;
  temporaryAvatar = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
  loadingFeed: boolean = false;
  commentBody: string = '';

  constructor(private userService: UserService,
    private postService: PostService) { }

  ngOnInit() {

  }

  ngDoCheck() {
    console.log("Guest Feed from Feed Componenet");
    console.log(this.guestFeed)
  }

  ngOnChanges() {
    if (this.guestFeed == null || this.guestFeed == undefined) {
      this.loadingFeed = true;
      console.log("On Change currently null")
    } else {
      this.loadingFeed = false;
      console.log(this.guestFeed)
      console.log("Updated data");
    }
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

}
