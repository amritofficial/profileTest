import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { MessengerService } from '../../shared/services/messenger.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messenger-user-options',
  templateUrl: './messenger-user-options.component.html',
  styleUrls: ['./messenger-user-options.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class MessengerUserOptionsComponent implements OnInit {
  
  constructor() {
   
  }
  
  ngOnInit() {
   
  }

}
