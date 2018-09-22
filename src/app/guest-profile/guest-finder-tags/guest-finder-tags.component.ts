import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { GuestProfileService } from '../../shared/services/guest-profile.service';
import { FinderTags } from '../../shared/models/finder-tags';

@Component({
  selector: 'guest-finder-tags',
  templateUrl: './guest-finder-tags.component.html',
  styleUrls: ['./guest-finder-tags.component.css','../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestFinderTagsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
 
  guestFinderTags: FinderTags = {
    userId: null,
    tags: []
  }
  loadingTags: boolean = false;

  constructor(private route: ActivatedRoute,
    private guestProfileService: GuestProfileService) { }

  ngOnInit() {
    this.loadingTags = true;
    this.route.params.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((params) => {
      console.log(params)
      console.log(params.guestId);
      console.log()
      this.guestProfileService.getGuestFinderTags(params.guestId).then((tags) => {
        if(tags.length != 0) {
          this.guestFinderTags = tags[0].attributes;
          console.log(this.guestFinderTags);
          this.loadingTags = false;
        }
        else {
          this.loadingTags = false;
        }
      });
    });
  }

}
