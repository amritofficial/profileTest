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
    let like: Like = {
      like: true,
      liker: {
        avatar: "https://firebasestorage.googleapis.com/v0/b/devfinder-chat.appspot.com/o/avatars%2Famrit%40test.com.jpg?alt=media&token=55771e75-155e-43d0-8b1c-c0b45ca7bf7d",
        email: "amrit@test.com",
        userId: "jF6jQ5oX1h",
        userStatus: 0,
        username: "Amrit Singh"
      }
    }

    let likeArray: Like[] = new Array();
    likeArray = feed.like != undefined ? feed.like : new Array();
    likeArray.forEach((like, i) => {
      if (like.liker.userId === like.liker.userId) {
        alreadyLiked = true;
        this.dislikeFeed(userId, feed.feedId, likeArray, i);
        console.log(i);
      }
    });
    
    if (alreadyLiked === false) {
      console.log("LIKE IT")
      likeArray.push(like);
      this.postService.likeFeed(userId, feed.feedId, likeArray);
    }

  }

  dislikeFeed(userId: any, feedId: any, likeArray: Like[], index) {
    likeArray.splice(index, 1);
    console.log(likeArray);
    this.postService.dislikeFeed(userId, feedId, likeArray)
    console.log('Feed Disliked');
  }

}