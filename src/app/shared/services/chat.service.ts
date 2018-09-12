import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { FirebaseService } from './firebase.service';
import { Message } from '../models/message';

@Injectable()
export class ChatService {
  openChatBox: boolean = false;

  constructor(private parseService: ParseService,
    private firebaseService: FirebaseService) { }

  // getCurrentUserId() {
  //   let user = this.parseService.currentUser;
  //   return user.id;
  // }

  // getMessengerRoomPath(selectedUserId: any) {
  //   let currentUserId = this.getCurrentUserId();
  //   let path = selectedUserId > currentUserId ? selectedUserId + currentUserId : selectedUserId < currentUserId ? currentUserId + selectedUserId : currentUserId + selectedUserId;
  //   return path;
  // }

  // getAllMessages(selectedUserId: any) {
  //   return this.firebaseService.getAllMessagesFromRoomPath(this.getMessengerRoomPath(selectedUserId));
  // }

  // sendAndSaveMessage(messageData: Message) {
  //   let path = `messages/${this.getMessengerRoomPath(messageData.receiverId)}`;
  //   console.log(messageData + " " + path);
  //   return this.firebaseService.saveMessage(messageData, path);
  // }
}
