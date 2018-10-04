import { Component, OnInit, Input } from '@angular/core';
import { DevFinderTag } from '../../../shared/models/devfinder-tag';

@Component({
  selector: 'devfinder-question-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() devfinderTag: DevFinderTag;

  constructor() { }

  ngOnInit() {
  }

}
