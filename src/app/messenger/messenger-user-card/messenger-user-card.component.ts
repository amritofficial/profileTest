import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessengerService } from '../../shared/services/messenger.service';
import { User } from '../../shared/models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { log } from 'util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'messenger-user-card',
  templateUrl: './messenger-user-card.component.html',
  styleUrls: ['./messenger-user-card.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class MessengerUserCardComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  @Output() selectedUserEntry = new EventEmitter<User>();

  loading: boolean;
  users: User[];
  // selectedUserEntry: User;

  constructor(private messengerService: MessengerService, public db: AngularFireDatabase) { 
   
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.messengerService.getAllUsers()
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((userData: User[]) => {
        // this.users = userData;
        this.users = userData;
        this.loading = false;
        console.log(this.users);
      });
  }

  selectedUser(selectedUser: User) {
    this.selectedUserEntry.emit(selectedUser);
    let messageNodePath = this.messengerService.getMessengerRoomPath(selectedUser.userId);
    // this.selectedUserEntry = selectedUser;
    // this.messengerService.getMessengerRoomsWithUserIds(selectedUser);
  }

}