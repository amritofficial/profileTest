import { Component, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GuestProfileService } from '../../shared/services/guest-profile.service';
import { FinderTags } from '../../shared/models/finder-tags';

@Component({
  selector: 'guest-finder-tags',
  templateUrl: './guest-finder-tags.component.html',
  styleUrls: ['./guest-finder-tags.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestFinderTagsComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();

  guestFinderTags: FinderTags = {
    userId: null,
    tags: []
  }
  loadingTags: boolean = false;
  guestId: any;

  constructor(private route: ActivatedRoute,
    private guestProfileService: GuestProfileService) {
      route.params.subscribe(params => {
        this.requestFinderTags(params.guestId);
      });
  }

  ngOnInit() {
    this.loadingTags = true;
    this.route.params.subscribe((params) => {
      console.log(params)
      console.log(params.guestId);
      this.guestId = params.guestId;
      this.requestFinderTags(params.guestId);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.guestId) {
      console.log("RoUTE CHANGE")
    }
  }

  requestFinderTags(guestId: any) {
    this.guestProfileService.getGuestFinderTags(guestId).then((tags) => {
      if (tags.length != 0) {
        this.guestFinderTags = tags[0].attributes;
        console.log("GUEST TAGS");
        console.log(this.guestFinderTags);
        this.loadingTags = false;
      }
      else {
        this.loadingTags = false;
      }
    });
  }

}
