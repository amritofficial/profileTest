import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/shared/models/user';

@Component({
  selector: 'post-feed-box',
  templateUrl: './post-feed-box.component.html',
  styleUrls: ['./post-feed-box.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class PostFeedBoxComponent implements OnInit {
  @Input() currentUser: User;

  constructor() { }

  ngOnInit() {
  }

}
