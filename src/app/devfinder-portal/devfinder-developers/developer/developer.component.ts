import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Developer } from '../../../shared/models/developer';

@Component({
  selector: 'devfinder-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit, OnChanges {
  @Input() developer: Developer;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
   
  }

  getDistanceBoolean() {
    if (this.developer.distance === null || this.developer.distance === 0 ) {
      return false;
    }
    else {
      return true;
    }
  }

}
