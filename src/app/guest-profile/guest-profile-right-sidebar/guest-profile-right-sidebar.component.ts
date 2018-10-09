import { Component, OnInit, Input } from '@angular/core';
import { LinkList } from 'app/shared/models/link-list';

@Component({
  selector: 'guest-profile-right-sidebar',
  templateUrl: './guest-profile-right-sidebar.component.html',
  styleUrls: ['./guest-profile-right-sidebar.component.css',  '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class GuestProfileRightSidebarComponent implements OnInit {
  @Input() guestLinks: LinkList[];
  constructor() { }

  ngOnInit() {
  }

}
