import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../shared/models/user';
import { ChatService } from '../shared/services/chat.service';
import { MessengerService } from '../shared/services/messenger.service';
import { Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Message } from '../shared/models/message';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css', '../../assets/css/blocks.css', '../../assets/css/theme-styles.css']
})
export class ChatBoxComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  @Input() selectedUser: User;
  loading: boolean = false;
  messages: Message[];
  currentUserId: any;
  messageBody: string = '';
  currentUserData: User;

  constructor(private chatService: ChatService,
    private messengerService: MessengerService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    if (this.authService.getAuthenticated()) {
      this.currentUserId = this.messengerService.getCurrentUserId();
      this.messengerService.getCurrentUserData()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
          this.currentUserData = user;
        });
      console.log(this.currentUserId);
    }
  }

  ngOnChanges() {
    if (this.authService.getAuthenticated()) {
      this.currentUserId = this.messengerService.getCurrentUserId();
      this.messengerService.getCurrentUserData()
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: User) => {
          this.currentUserData = user;
        });
      console.log(this.currentUserId);
    }

    if (this.chatService.openChatBox === true) {
      this.loading = true;
      this.messengerService.getAllMessages(this.selectedUser.userId)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((messages: Message[]) => {
          this.messages = messages;
          console.log('FROM CHAT BOX::::: MESSAGES')
          console.log(this.messages);
          this.loading = false;
        });
    }
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
    console.log(messageData);
    console.log('sent');
    // console.log(this.messageBody);
    this.messengerService.sendAndSaveMessage(messageData)
    this.messageBody = '';
  }

  closeChatBox() {
    this.chatService.openChatBox = false;
  }

  getStyle(message: Message) {
    if (message.senderId === this.currentUserId) {
      return { float: 'right', color: 'white', backgroundColor: '#ff5e3a', marginRight: '10px' }
    } else {
      return { float: 'left', color: 'black', marginLeft: '-15px' }
    }
  }
  
  // returns an avatar based upon current user id
  getAvatar(message: Message) {
    if (message.senderId === this.currentUserId) {
      return this.currentUserData.avatar !== null ? this.currentUserData.avatar : 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
    } else {
      return this.selectedUser.avatar !== null ? this.selectedUser.avatar : 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
    }
  }

}
