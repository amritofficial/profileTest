import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../shared/models/user';

@Component({
  selector: 'user-list-bar',
  templateUrl: './user-list-bar.component.html',
  styleUrls: ['./user-list-bar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class UserListBarComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  loading: boolean;
  users: User[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loading = true;
    this.firebaseService.getAllFireUsers()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((users: User[]) => {
        this.users = users;
        console.log("LIST OF USERS: ");
        console.log(this.users);
        this.loading = false;
      });
  }

}
