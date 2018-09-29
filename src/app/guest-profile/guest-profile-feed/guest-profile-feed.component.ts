import { Component, OnInit, Input, DoCheck, OnChanges } from '@angular/core';
import { User } from '../../shared/models/user';
import { Feed } from '../../shared/models/feed';
import { Like } from '../../shared/models/like';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'guest-profile-feed',
  templateUrl: './guest-profile-feed.component.html',
  styleUrls: ['./guest-profile-feed.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileFeedComponent implements OnInit, DoCheck, OnChanges{
  @Input() guestFeed: Feed[];
  @Input() guestUser: User;
  temporaryAvatar = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
  loadingFeed: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    
  }

  ngDoCheck() {
    console.log("Guest Feed from Feed Componenet");
    console.log(this.guestFeed)
  }

  ngOnChanges() {
    if(this.guestFeed == null || this.guestFeed == undefined) {
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

}
