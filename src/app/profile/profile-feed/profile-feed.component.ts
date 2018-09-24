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
  feed: Feed = {
    feedBody: '',
    user: {
      avatar: '',
      email: '',
      userId: null,
      username: ''
    } as User,
    feedId: '',
    like: [
      {
        like: false,
        liker: {
          avatar: '',
          email: '',
          userId: null,
          username: ''
        }
      }
    ] as Like[],
    comment: [
      {
        commentBody: '',
        commentor: {
          avatar: '',
          email: '',
          userId: null,
          username: ''
        }
      }
    ] as Comment[]

  }

  constructor(private userService: UserService,
    private postService: PostService) { }

  ngOnInit() {
  }

  postFeed() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.feed.user = user;
        this.feed.feedBody = this.feedBody;
        this.postService.storeFeed(this.feed, userId).then((data) => {
          console.log("Feed Stored");
          this.feedBody = '';
        });
        console.log(this.feed);
      });
  }

}