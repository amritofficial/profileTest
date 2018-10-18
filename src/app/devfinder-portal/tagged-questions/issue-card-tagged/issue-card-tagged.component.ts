import { Component, OnInit, Input } from '@angular/core';
import { IssueCard } from 'app/shared/view-models/issue-card';

@Component({
  selector: 'issue-card-tagged',
  templateUrl: './issue-card-tagged.component.html',
  styleUrls: ['./issue-card-tagged.component.css']
})
export class IssueCardTaggedComponent implements OnInit {
  @Input() issueCard: IssueCard;

  constructor() { }

  ngOnInit() {
  }

  print() {
    console.log("Issue Id " + this.issueCard.issueId);
  }

}
