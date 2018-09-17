import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class DashboardComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  currentUser: User = this.userService.user;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.loadingUser = true;
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.currentUser = user;
        this.userService.currentUser = user;
        // this.userService.userAvatarUrl = this.currentUser.avatar;
        this.userService.loadingUser = false;
        console.log('Subscribed Firebase User');
        console.log(this.currentUser);
      });
  }

}
