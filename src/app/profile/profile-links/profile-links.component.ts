import { Component, OnInit } from '@angular/core';
import { LinkList } from '../../shared/models/link-list';
import { UserService } from '../../shared/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LinkService } from '../../shared/services/link.service';
import { User } from '../../shared/models/user';
import { GuestProfileService } from '../../shared/services/guest-profile.service';
import { FinderTags } from '../../shared/models/finder-tags';

@Component({
  selector: 'profile-links',
  templateUrl: './profile-links.component.html',
  styleUrls: ['./profile-links.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileLinksComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  currentUserLinks: User[] = new Array();
  linkList: LinkList[] = new Array();
  loadingLinkList: boolean = false;

  headerImageArray: string[] = [
    "https://wallpapercave.com/wp/Ou1L18s.jpg",
    "https://playdauntless.com/images/media-wallpapers/island-mossy-falls-wallpaper-dauntless-tablet2048x2732.jpg",
    "http://www.wallpapereast.com/static/images/Wallpaper-686.jpg",
    "http://getwallpapers.com/wallpaper/full/b/5/0/615768.jpg",
    "https://www.wallpaperflare.com/static/441/970/354/counter-strike-global-offensive-french-gign-sas-4k-wallpaper.jpg",
    "https://wallpapersultra.net/wp-content/uploads/HD-Wallpaper-High-Quality.jpg",
    "https://wallpaperstudio10.com/static/wpdb/wallpapers/1920x1080/180921.jpg",
    "https://yo-toronto.com/wp-content/uploads/2017/05/COVER_FINAL02.jpg"]

  constructor(private userService: UserService,
    private linkService: LinkService,
    private guestProfileService: GuestProfileService) { }

  ngOnInit() {
    this.loadingLinkList = true;
    this.getCurrentUserLinks();
  }

  getCurrentUserLinks() {
    let userId = this.userService.getCurrentUserId();
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((links: User[]) => {
        this.currentUserLinks = links;
        console.log("current user links")
        console.log(this.currentUserLinks)
        this.getLinkProfileInfo();
      });
  }

  getLinkProfileInfo() {
    this.currentUserLinks.forEach(link => {
      this.guestProfileService.getGuestUserProfile(link.userId).then((profile) => {
        this.guestProfileService.getGuestFinderTags(link.userId).then((tags) => {
          console.log(tags);
          if ((!(tags.length <= 0) && (!(profile.length <= 0)))) {
            let guestFinderTags: FinderTags = tags[0].attributes;
            let linkList: LinkList = {
              profile: profile[0].attributes,
              user: link,
              finderTags: guestFinderTags
            }
            this.linkList.push(linkList);
          } else if (tags.length <= 0) {
            let linkList: LinkList = {
              profile: profile[0].attributes,
              user: link,
              finderTags: {
                tags: [],
                userId: link.userId
              }
            }
            this.linkList.push(linkList);
          } else if (profile.length <= 0) {
            let guestFinderTags: FinderTags = tags[0].attributes;
            let linkList: LinkList = {
              profile: {
                aboutSecondCategory: '',
                aboutUser: '',
                secondCategory: '',
                userId: link.userId
              },
              user: link,
              finderTags: guestFinderTags
            }
            this.linkList.push(linkList);
          }

        });
      });
    });
    this.loadingLinkList = false;
    console.log(this.linkList);
  }

  generateRandomHeaderImage() {
    let random = Math.floor(Math.random() * this.headerImageArray.length) + 0;
    return this.headerImageArray[random];
  }

}
