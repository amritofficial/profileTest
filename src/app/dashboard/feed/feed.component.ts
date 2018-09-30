import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Feed } from '../../shared/models/feed';
import { UserService } from '../../shared/services/user.service';
import { Like } from '../../shared/models/like';
import { PostService } from '../../shared/services/post.service';
import { User } from '../../shared/models/user';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Comment } from '../../shared/models/comment';

@Component({
  selector: 'dashboard-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class FeedComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  @Input() feedList: Feed[];
  commentBody: string = '';
  loadingFeed: boolean = false;

  constructor(private userService: UserService,
    private postService: PostService) { }

  ngOnInit() {
    this.loadingFeed = true;
  }

  ngOnChanges() {
    if (this.feedList.length <= 0) {
      this.loadingFeed = true;
      console.log("Feed List is null");
    }

    if (this.feedList.length > 0) {
      this.loadingFeed = false;
      console.log("OnChange Feed List");
      console.log(this.feedList);
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

  postComment(feed: Feed, event) {
    if (event.key === 'Enter') {
      console.log(this.commentBody);
      console.log(feed);
      if ((this.commentBody !== '') || (this.commentBody !== null)) {
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
            this.commentBody = '';
          });
      }
    }
  }

  deleteComment(feed: Feed, index: any) {
    console.log(feed.comment)
    let commentArray: Comment[] = feed.comment;
    commentArray.splice(index, 1);
    console.log(index);
    console.log(commentArray);

    this.postService.deleteCommentFeed(feed.user.userId, feed.feedId, commentArray).then(() => {
      console.log("Comment Deleted");
    });
  }

  deletePost(feed: Feed) {
    let userId = this.userService.getCurrentUserId();
    this.postService.deleteFeed(userId, feed.feedId);
  }

}
