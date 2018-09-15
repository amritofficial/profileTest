import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../../shared/models/user';

@Component({
  selector: 'profile-thumb',
  templateUrl: './profile-thumb.component.html',
  styleUrls: ['./profile-thumb.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileThumbComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  changeProfilePicture: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    // this.userService.loadingUser = true;
    
  }



}
