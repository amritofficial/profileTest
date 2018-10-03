import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../shared/models/user';

@Component({
  selector: 'profile-right-sidebar',
  templateUrl: './profile-right-sidebar.component.html',
  styleUrls: ['./profile-right-sidebar.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileRightSidebarComponent implements OnInit, OnChanges{
  @Input() links: User[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("links")
    console.log(this.links);
  }

}
