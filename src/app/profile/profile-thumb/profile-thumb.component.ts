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
  currentUser: User = this.userService.user;

  changeProfilePicture: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.currentUser = user;
        console.log('Subscribed Firebase User');
        console.log(this.currentUser);
      });
  }



}
