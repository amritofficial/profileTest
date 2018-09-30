import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { GuestProfileService } from '../shared/services/guest-profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { LinkRequest } from '../shared/models/link-request';
import { UserService } from '../shared/services/user.service';
import { RequestService } from '../shared/services/request.service';
import { LinkService } from '../shared/services/link.service';
import { Profile } from '../shared/models/profile';
import { FinderTags } from '../shared/models/finder-tags';
import { PostService } from '../shared/services/post.service';
import { Feed } from '../shared/models/feed';

@Component({
  selector: 'guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class GuestProfileComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  showFeed: boolean = true;
  showRightSidebar: boolean = true;
  guestId: any;
  guestUser: User = this.guestProfileService.guestUser;
  guestStatus: string = '';
  loadingGuestStatus: boolean = false;
  headerImageSrc: any;
  showRouterOutlet: boolean = false; // this is to disable the router outlet unless we use it
  guestUserFeed: Feed[];

  headerImageArray: string[] = [
    "https://wallpapercave.com/wp/Ou1L18s.jpg",
    "https://playdauntless.com/images/media-wallpapers/island-mossy-falls-wallpaper-dauntless-tablet2048x2732.jpg",
    "http://www.wallpapereast.com/static/images/Wallpaper-686.jpg",
    "http://getwallpapers.com/wallpaper/full/b/5/0/615768.jpg",
    "https://www.wallpaperflare.com/static/441/970/354/counter-strike-global-offensive-french-gign-sas-4k-wallpaper.jpg",
    "https://wallpapersultra.net/wp-content/uploads/HD-Wallpaper-High-Quality.jpg",
    "https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/180921.jpg",
    "https://yo-toronto.com/wp-content/uploads/2017/05/COVER_FINAL02.jpg"]

  currentUser: User;
  guestProfile: Profile = {
    aboutUser: 'Write a bit about yourself',
    aboutSecondCategory: '',
    secondCategory: '',
    userId: null
  };

  guestFinderTags: FinderTags = {
    userId: null,
    tags: []
  };
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private guestProfileService: GuestProfileService,
    private userService: UserService,
    private requestService: RequestService,
    private postService: PostService,
    private linkService: LinkService) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      this.guestId = params.guestId;
      this.guestProfileService.guestId = this.guestId;
      console.log("Params");
      console.log(this.guestId)
      // this.getGuestUserFinderTags();
      this.getCurrentUserData();
      this.getGuestUserProfile();
      this.getGuestFeed();
      this.guestProfileService.getGuestUserData(this.guestId)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
          this.guestUser = user;
          console.log("GUEST USER");
          console.log(this.guestUser);
        });
      this.generateRandomHeaderImage();
      this.guestStatus = '';
      this.checkGuestStatusType();
    });
    this.checkActivatedRoute();
  }

  checkActivatedRoute() {
    this.router.events.subscribe((event) => {
      // console.log(event);
      if (event instanceof NavigationEnd) {
        let currentUrl = event.url;
        if (currentUrl === `/guest-profile/${this.guestId}/education`) {
          this.showRouterOutlet = true;
          this.showFeed = false;
          this.showRightSidebar = false;
        }
        else if (currentUrl === `/guest-profile/${this.guestId}/work-experience`) {
          this.showRouterOutlet = true;
          this.showFeed = false;
          this.showRightSidebar = false;
        }
        else {
          this.showFeed = true;
          this.showRightSidebar = true;
          this.showRouterOutlet = false;
        }
      }
    });
  }

  addLinkRequest() {
    let linkRequestData: LinkRequest = {
      to: this.guestUser,
      from: this.currentUser,
      senderId: window.sessionStorage.getItem("current_user_id"),
      status: "sent"
    }
    console.log(linkRequestData);
    this.requestService.sendLinkRequest(linkRequestData);
    this.checkGuestStatusType();
    // this.userService.sendLinkRequest(linkRequestData);
  }

  getCurrentUserData() {
    this.userService.getCurrentUserDataFromFirebase()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
        this.userService.currentUser = user;
        this.currentUser = user;
      });
  }

  getGuestUserProfile() {
    this.guestProfileService.getGuestUserProfile(this.guestId).then((profile) => {
      console.log(profile);
      console.log(profile.attributes);
      console.log(profile);
      if (!(profile.length <= 0)) {
        this.guestProfile = profile[0].attributes;
      }
    });
  }

  // the method is not being called yet
  getGuestUserFinderTags() {
    this.guestProfileService.getGuestFinderTags(this.guestId).then((tags) => {
      if (!(tags.length <= 0)) {
        this.guestFinderTags = tags[0].attributes;
        console.log("TAGS")
        console.log(this.guestFinderTags.tags)
      }
    });
  }

  // the method performs a real-time check if the visited guest is a friend or a person whom the request has been sent
  // or has been received from
  checkGuestStatusType() {
    let userId = window.sessionStorage.getItem("current_user_id");
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((links: User[]) => {
      if (links.length !== 0) {
        links.forEach(link => {
          if (link.userId !== this.guestId) {
            this.guestStatus = '';
          } else if (link.userId === this.guestId) {
            this.guestStatus = 'approved';
          }
        });
      }
    });
    this.requestService.getReceivedLinkRequest(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((receivedRequest: LinkRequest[]) => {
      if (receivedRequest.length !== 0) {
        receivedRequest.forEach(request => {
          if (request.from.userId === this.guestId) {
            if (request.status === 'waiting') {
              this.guestStatus = 'waiting';
            }
          }
        });
      } else {
        this.requestService.getSentLinkRequest(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((sentRequests: LinkRequest[]) => {
          sentRequests.forEach(request => {
            if (request.to.userId === this.guestId) {
              if (request.status === 'sent') {
                this.guestStatus = 'sent';
              } else if (request.status === 'approved') {
                this.guestStatus = 'approved';
              }
            }
          });
        });
      }
    });
  }

  generateRandomHeaderImage() {
    let random = Math.floor(Math.random() * this.headerImageArray.length) + 0;
    this.headerImageSrc = this.headerImageArray[random];
  }

  getGuestFeed() {
    this.postService.getFeed(this.guestId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((feed: Feed[]) => {
        console.log("guest feed");
        console.log(feed);
        this.guestUserFeed = feed;
        this.guestUserFeed.sort((a, b) => {
          var aTime = new Date(a.timeStamp).getTime();
          var bTime = new Date(b.timeStamp).getTime();
          return bTime - aTime;
        });
      });
  }

}
