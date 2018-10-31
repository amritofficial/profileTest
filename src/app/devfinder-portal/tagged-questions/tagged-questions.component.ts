import { Component, OnInit } from '@angular/core';
import { PortalService } from 'app/shared/services/portal.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DevFinderTag } from 'app/shared/models/devfinder-tag';
import { OpenIssue } from 'app/shared/models/open-issue';
import { IssueCard } from 'app/shared/view-models/issue-card';
import { DistanceService } from 'app/shared/services/distance.service';

@Component({
  selector: 'app-tagged-questions',
  templateUrl: './tagged-questions.component.html',
  styleUrls: ['./tagged-questions.component.css']
})
export class TaggedQuestionsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  questionTagName: String = '';
  openedIssues: OpenIssue[] = new Array();
  issueCardArray: IssueCard[] = [];

  constructor(private route: ActivatedRoute,
    private portalService: PortalService,
    private distanceService: DistanceService) { }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((params) => {
        this.questionTagName = params.tagName;
        let tag = this.portalService.devFinderTags.find(tags => { return tags.tagName == this.questionTagName});
        this.getIssuesWithTagId(tag.objectId);
      });
  }

  getIssuesWithTagId(tagId: any) {
    this.portalService.getIssuesWithTagId(tagId).then((data) => {
      console.log("Current Open Issues for " + this.questionTagName);
      console.log(data);
      if(!(data.length <=0)) {
        data.forEach(data => {
          console.log(data);
          // console.log(data.id)
          let openedIssueObject: OpenIssue = {
            objectId: data.id,
            answers: data.attributes.answers,
            childrenTags: data.attributes.childrenTags,
            issueCodeDescription: data.attributes.issueCodeDescription,
            issueTextDescription: data.attributes.issueTextDescription,
            location: data.attributes.location,
            parentTag: data.attributes.parentTag,
            parentTagObjectId: data.attributes.parentTagObjectId,
            timestamp: data.attributes.timestamp,
            title: data.attributes.title,
            userId: data.attributes.userId,
            username: data.attributes.username
          }
          this.openedIssues.push(openedIssueObject);
        });
        // console.log("Opened Issues for " + this.questionTagName)
        // console.log(this.openedIssues)
        this.createIssueCards();
      }
    });
  }

  createIssueCards() {
    console.log(this.openedIssues);
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
    console.log(this.issueCardArray);
  }

}
