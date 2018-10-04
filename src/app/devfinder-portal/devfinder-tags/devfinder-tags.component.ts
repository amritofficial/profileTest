import { Component, OnInit } from '@angular/core';
import { DevFinderTag } from '../../shared/models/devfinder-tag';

@Component({
  selector: 'devfinder-tags',
  templateUrl: './devfinder-tags.component.html',
  styleUrls: ['./devfinder-tags.component.css']
})
export class DevfinderTagsComponent implements OnInit {
  devFinderTagsArray: DevFinderTag[] = [
    {
      tagDescription: 'Lorem Ipsum',
      tagName: 'Javacript',
      tagOpenIssues: 20,
      vacinityDevelopers: 1
    },
    {
      tagDescription: 'Lorem Ipsum',
      tagName: 'Angular',
      tagOpenIssues: 20,
      vacinityDevelopers: 1
    },
    {
      tagDescription: 'Lorem Ipsum',
      tagName: 'Typescript',
      tagOpenIssues: 20,
      vacinityDevelopers: 1
    },
    {
      tagDescription: 'Lorem Ipsum',
      tagName: 'Java',
      tagOpenIssues: 20,
      vacinityDevelopers: 1
    },
    {
      tagDescription: 'Lorem Ipsum',
      tagName: 'C#',
      tagOpenIssues: 20,
      vacinityDevelopers: 1
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
