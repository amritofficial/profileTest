import { Component, OnInit, Input } from '@angular/core';
import { ResultCard } from 'app/shared/view-models/result-card';

@Component({
  selector: 'result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {
  @Input() resultCard: ResultCard;

  constructor() { }

  ngOnInit() {
  }

  resultCardMouseEnter(userId: any) {
    console.log("Mouse Entered " + userId);
  }

  resultCardMouseLeave(userId: any) {
    console.log("Mouse Left " + userId);
  }

}
