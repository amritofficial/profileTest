import { Component, OnInit } from '@angular/core';
import { DevFinderTag } from '../../shared/models/devfinder-tag';
import { PortalService } from 'app/shared/services/portal.service';
import { ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'devfinder-tags',
  templateUrl: './devfinder-tags.component.html',
  styleUrls: ['./devfinder-tags.component.css']
})
export class DevfinderTagsComponent implements OnInit {
  p: number = 1;
  tags: DevFinderTag[];
  loadingTags: boolean = false;
  private ngxLoadingAnimationTypes = ANIMATION_TYPES;

  constructor(private portalService: PortalService) { }

  ngOnInit() {
    this.loadingTags = true;
    this.portalService.getAllDevFinderTags().subscribe((data) => {
      // console.log("DevFinder Tags")
      // console.log(data);
      this.tags = data['results'];
      this.portalService.devFinderTags = this.tags;
      // console.log(this.tags);
      // console.log(this.tags[0]);
      this.loadingTags = false;
    });
  }

}
