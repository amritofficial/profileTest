import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import { RouteService } from 'app/shared/services/route.service';

@Component({
  selector: 'messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class MessengerComponent implements OnInit {
  selectedUser: User = {userId: null, username: 'DevFinder', userStatus: 1, avatar: '', email: ''};

  constructor(private route: ActivatedRoute,
    private routeService: RouteService) {
    // this.route.data.map(data => data.Users.json()).subscribe(data => {
    //   console.log(data);
    // })
  
  }

  ngOnInit() {
    this.routeService.activatedRouteName = "Messenger";
    console.log('Called');
    // this.route.data.map(data => data.messengerUsers).subscribe(data => {
    //   console.log(data);
    // })
  }

  getSelectedUser(event) {
    this.selectedUser = event;
    console.log(this.selectedUser);
  }

}
