import { Component, OnInit, OnChanges } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../shared/models/user';
import { ChatService } from '../shared/services/chat.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'user-list-bar',
  templateUrl: './user-list-bar.component.html',
  styleUrls: ['./user-list-bar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class UserListBarComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  selectedUser: User = { userId: null, avatar: '', email: '', username: '', userStatus: 1 };
  loading: boolean;
  users: User[];

  constructor(private firebaseService: FirebaseService,
    private chatService: ChatService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.loading = true;
    
      this.userService.getAllUsersFromFirebase()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((users: User[]) => {
          this.users = users;
          console.log("LIST OF USERS: ");
          console.log(this.users);
          this.userService.listOfUsers = users;
          this.loading = false;
        });
    
  }

  selectedUserFromList(user: User) {
    this.selectedUser = user;
    this.chatService.openChatBox = true;
    console.log("Selected user from list");
    console.log(user);
  }

  // ngOnChanges() {
  //   if(this.authService.getAuthenticated()) {
  //     this.firebaseService.getAllFireUsers()
  //       .pipe(takeUntil(this.ngUnsubscribe)).subscribe((users: User[]) => {
  //         this.users = users;
  //         console.log("LIST OF USERS: ");
  //         console.log(this.users);
  //         this.loading = false;
  //       });
  //   }
  // }

}
