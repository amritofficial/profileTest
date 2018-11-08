import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessengerService } from '../../shared/services/messenger.service';
import { User } from '../../shared/models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { log } from 'util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LinkService } from 'app/shared/services/link.service';
import { UserService } from 'app/shared/services/user.service';

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

  constructor(private messengerService: MessengerService, 
    public db: AngularFireDatabase,
    private linkService: LinkService,
    private userService: UserService) { 
   
  }

  ngOnInit() {
    this.getLinks();
  }

  getLinks() {
    this.loading = true;
    let currentUserId = this.userService.getCurrentUserId();
    this.linkService.linkList(currentUserId)
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