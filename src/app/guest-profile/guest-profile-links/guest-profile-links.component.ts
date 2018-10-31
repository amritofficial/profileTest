import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { LinkList } from '../../shared/models/link-list';
import { User } from 'app/shared/models/user';
import { LinkService } from 'app/shared/services/link.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GuestProfileService } from 'app/shared/services/guest-profile.service';
import { FinderTags } from 'app/shared/models/finder-tags';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'guest-profile-links',
  templateUrl: './guest-profile-links.component.html',
  styleUrls: ['./guest-profile-links.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileLinksComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();

  guestUserLinks: User[] = new Array();
  guestLinkList: LinkList[] = new Array();
  loadingGuestLinkList: boolean;

  constructor(private linkService: LinkService,
    private guestProfileService: GuestProfileService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getGuestUserLinks();
  }

  ngOnChanges() {

  }

  getGuestUserLinks() {
    this.loadingGuestLinkList = true;
    this.route.parent.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.linkService.linkList(params.guestId).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((links: User[]) => {
            this.guestUserLinks = links;
            console.log("current user links")
            console.log(this.guestUserLinks)
            this.getLinkProfileInfo();
          });
      });
  }

  getLinkProfileInfo() {
    this.guestUserLinks.forEach(link => {
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
            this.guestLinkList.push(linkList);
          } else if (tags.length <= 0) {
            let linkList: LinkList = {
              profile: profile[0].attributes,
              user: link,
              finderTags: {
                tags: [],
                userId: link.userId
              }
            }
            this.guestLinkList.push(linkList);
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
            this.guestLinkList.push(linkList);
          }

        });
      });
    });
    this.loadingGuestLinkList = false;
    console.log("Guest Links")
    console.log(this.guestLinkList);
  }

}
