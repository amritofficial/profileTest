import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { Subject } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
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
