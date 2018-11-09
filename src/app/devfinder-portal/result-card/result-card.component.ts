import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ResultCard } from 'app/shared/view-models/result-card';

@Component({
  selector: 'result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.css']
})
export class ResultCardComponent implements OnInit {
  @Input() resultCard: ResultCard;
  @Output() mouseEnterEvent = new EventEmitter<any>();
  @Output() mouseLeaveEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  resultCardMouseEnter(userId: any) {
    this.mouseEnterEvent.emit(userId);
  }

  resultCardMouseLeave(userId: any) {
    this.mouseLeaveEvent.emit(userId);
  }

}
