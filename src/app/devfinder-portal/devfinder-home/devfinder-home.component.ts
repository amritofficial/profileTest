import { Component, OnInit } from '@angular/core';
import { PortalService } from 'app/shared/services/portal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OpenIssue } from 'app/shared/models/open-issue';
import { IssueCard } from 'app/shared/view-models/issue-card';
import { DistanceService } from 'app/shared/services/distance.service';
import { ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'devfinder-home',
  templateUrl: './devfinder-home.component.html',
  styleUrls: ['./devfinder-home.component.css']
})
export class DevfinderHomeComponent implements OnInit {
  p: number = 1;
  private ngxLoadingAnimationTypes = ANIMATION_TYPES;
  private ngUnsubscribe = new Subject();
  openedIssues: OpenIssue[];
  issueCardArray: IssueCard[] = [];
  loadingIssues: boolean = true;

  constructor(private portalService: PortalService,
    private distanceService: DistanceService) { }

  ngOnInit() {
    this.loadingIssues = true;
    this.portalService.getAllIssues().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        if(!(data['results'].length <=0)) {
          this.openedIssues = data['results'];
          this.createIssueCards();
        }
        console.log(this.openedIssues);
      });
  }

  createIssueCards() {
    this.openedIssues.forEach(oi => {
      let tags: string[] = oi.childrenTags;
      tags.unshift(oi.parentTag); 
      let issueCardData: IssueCard = {
        issueId: oi.objectId,
        answerCount: oi.answers.length,
        distance: this.distanceService.calculateDistance(oi.location),
        issueTags: tags,
        issueTitle: oi.title,
        pollCount: 0,
        timestamp: oi.timestamp,
        userId: oi.userId,
        username: oi.username
      }

      this.issueCardArray.push(issueCardData);
    });
    this.loadingIssues = false;
    console.log(this.issueCardArray);
  }

}
