import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DevFinderTag } from '../../../shared/models/devfinder-tag';
import { PortalService } from 'app/shared/services/portal.service';
import { LocationService } from 'app/shared/services/location.service';
import { DistanceService } from 'app/shared/services/distance.service';
import { Location } from 'app/shared/models/location';

@Component({
  selector: 'devfinder-question-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnChanges {
  @Input() devfinderTag: DevFinderTag;
  openIssueCount: number = 0;
  devCount: number = 0;

  constructor(private portalService: PortalService,
    private locationService: LocationService,
    private distanceService: DistanceService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.getCurrentTagOpenIssueCount();
    this.getDevCountWithTagName();
    this.getDevWithTagName()
  }

  getCurrentTagOpenIssueCount() {
    this.portalService.getCurrentTagOpenIssuesCountWithTagId(this.devfinderTag.objectId).then((count) => {
      this.openIssueCount = count;
    });
  }

  getDevCountWithTagName() {
    this.portalService.getDevCountWithTagName(this.devfinderTag.tagName).then((count) => {
      // console.log("devcount");
      // console.log(count);
    });
  }

  getDevWithTagName() {
    this.portalService.getDevWithTagName(this.devfinderTag.tagName).then((data) => {
      if (data.length >= 0) {
        data.forEach(dev => {
          this.locationService.getLocation(dev.attributes.userId).then((locationData) => {
            console.log("::")
            let location: Location = locationData[0].attributes;
            let distance = this.distanceService.calculateDistance(location);
            if(distance <= 50) {
              this.devCount +=1;
              console.log("Entering" + this.devCount)
            }
          });
        });
      }
    });
  }
}

// create a view-model for tags and query each of them by name from parent to children tags