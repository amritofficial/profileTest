import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ParseService } from './parse.service';
import { User } from '../models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { Message } from '../models/message';

@Injectable()
export class MessengerService {

  constructor(private firebaseService: FirebaseService, 
    public parseService: ParseService,
    private angularFireDatabase: AngularFireDatabase) { }

  getAllUsers() {
   return this.firebaseService.getAllFireUsers();
  }
  
  getCurrentUserId() {
    let user = this.parseService.currentUser;
    return user.id;
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

}
