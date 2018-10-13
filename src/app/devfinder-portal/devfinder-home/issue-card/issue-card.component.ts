import { Component, OnInit, Input } from '@angular/core';
import { IssueCard } from 'app/shared/view-models/issue-card';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.css']
})
export class IssueCardComponent implements OnInit {
  @Input() issueCard: IssueCard;

  constructor() { }

  ngOnInit() {
  }


}
