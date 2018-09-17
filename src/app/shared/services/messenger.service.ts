import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ParseService } from './parse.service';
import { User } from '../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from '../models/message';

@Injectable()
export class MessengerService {

  message: Message = {
    body: '',
    receiverId: null,
    senderId: null,
    timeSent: null,
    user: {
      avatar: '',
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    } as User
  }

  constructor(private firebaseService: FirebaseService, 
    public parseService: ParseService,
    private angularFireDatabase: AngularFireDatabase) { }

  getAllUsers() {
   return this.firebaseService.getAllFireUsers();
  }
  
  getCurrentUserId() {
    let user = this.parseService.currentUser;
    let userId = window.sessionStorage.getItem('current_user_id');
    console.log("Current_user_id");
    console.log(userId);
    return userId;
  }

  getCurrentUserData() {
    let userId = this.getCurrentUserId();
    return this.firebaseService.getFireUserData(userId);
  }

  getMessengerRoomPath(selectedUserId: any) {
    let currentUserId = this.getCurrentUserId();
    let path = selectedUserId > currentUserId ? selectedUserId+currentUserId : selectedUserId < currentUserId ? currentUserId+selectedUserId : currentUserId+selectedUserId;
    return path;
  }

  sendAndSaveMessage(messageData: Message) {
    let path = `messages/${this.getMessengerRoomPath(messageData.receiverId)}`;
    console.log(messageData + " " + path);
    return this.firebaseService.saveMessage(messageData, path);
  }

  getAllMessages(selectedUserId: any) {
    return this.firebaseService.getAllMessagesFromRoomPath(this.getMessengerRoomPath(selectedUserId));
  }

}
