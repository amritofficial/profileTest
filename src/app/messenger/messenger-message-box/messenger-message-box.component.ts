import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../../shared/models/user';
import { ParseService } from '../../shared/services/parse.service';
import { MessengerService } from '../../shared/services/messenger.service';
import { Message } from '../../shared/models/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'messenger-message-box',
  templateUrl: './messenger-message-box.component.html',
  styleUrls: ['./messenger-message-box.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class MessengerMessageBoxComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  @Input() selectedUser: User;

  messageBody: string = '';
  loading: boolean = false;
  currentUserData: User;
  messages: Message[];

  constructor(private messengerService: MessengerService) { }

  ngOnInit() {
    if (this.selectedUser.userId === null) {
      this.loading = true;
    }

    this.messengerService.getCurrentUserData().pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
      console.log(":::CURRENT USERDATA:::");
      // this.currentUsername = user.username
      this.currentUserData = user;
      console.log(this.currentUserData);
    });
  }

  ngOnChanges() {
    this.loading = true;
    this.messengerService.getAllMessages(this.selectedUser.userId)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((messages: Message[]) => {
        console.log("MESSAGES:::::");
        this.messages = messages;
        console.log(this.messages);
      });
    this.loading = false;
    console.log(this.selectedUser);
  }

  formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var minutes: any = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime);
    return strTime;
  }

  sendMessage(event) {
    let messageData: Message = {
      body: this.messageBody,
      senderId: this.messengerService.getCurrentUserId(),
      receiverId: this.selectedUser.userId,
      timeSent: this.formatAMPM(),
      user: this.currentUserData
    }
    console.log('sent');
    // console.log(this.messageBody);
    this.messengerService.sendAndSaveMessage(messageData)
    this.messageBody = '';
  }

}
