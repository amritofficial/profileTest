import { Component, OnInit, OnChanges } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../shared/models/user';
import { ChatService } from '../shared/services/chat.service';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { LinkService } from 'app/shared/services/link.service';

@Component({
  selector: 'user-list-bar',
  templateUrl: './user-list-bar.component.html',
  styleUrls: ['./user-list-bar.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class UserListBarComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  selectedUser: User = { userId: null, avatar: '', email: '', username: '', userStatus: 1 };
  loading: boolean;
  users: User[] = [];

  constructor(private firebaseService: FirebaseService,
    private chatService: ChatService,
    private authService: AuthService,
    private userService: UserService,
    private linkService: LinkService) { }

  ngOnInit() {
    this.loading = true;

    this.userService.getAllUsersFromFirebase()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((users: User[]) => {
        // this.users = users;
        console.log("LIST OF USERS: ");
        console.log(this.users);
        this.userService.listOfUsers = users;
        this.loading = false;
      });

    let userId = this.userService.getCurrentUserId();
    // the following code gets the links list for a currently logged in user.
    // the loops are used to get the real time status if the user logged out/in the application
    // so when the value changes instead of getting a stale link list, the code filters out the updated 
    // user list from the global users
    this.linkService.linkList(userId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((links: User[]) => {
      console.log("Current User Links");
      links.forEach(link => {
        this.userService.getGuestUserFromFirebase(link.userId).pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((user: User) => {
            let userChanged = this.users.find(u => { return u.userId === user.userId});
            if (userChanged != undefined) {
              this.users.forEach((user,i) => {
                if (user.userId === userChanged.userId) {
                  this.users.splice(i, 1);
                }
              });
              this.users.push(user);
            } else {
              this.users.push(user);
            }
          });
      });
    });

  }

  getCurrentUserLinks(userId: any) {

  }

  selectedUserFromList(user: User) {
    this.selectedUser = user;
    this.chatService.openChatBox = true;
    console.log("Selected user from list");
    console.log(user);
  }

  ngOnChanges() {
    console.log("User Status Changed");
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
