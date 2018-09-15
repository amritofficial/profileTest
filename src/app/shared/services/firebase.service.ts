import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseAuth } from "@angular/fire";
import { FirebaseDatabase } from "@angular/fire";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseStorage } from '@angular/fire';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { ParseService } from './parse.service';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Upload } from '../models/upload';

@Injectable()
export class FirebaseService {

  currentFireUserData: AngularFireList<User>;
  private basePath: string = '/avatars';
  // private imageUrl = "amrit"

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  storeUserData(username: string, email: string, userId: any) {
    // const userId;
    const path = `users/${userId}`;

    let userData: User = {
      userId: userId,
      username: username,
      email: email,
      userStatus: 0,
      avatar: 'NO AVATAR'
    }

    this.angularFireDatabase.object(path).update(userData)
      .catch(error => console.log("Error " + error));
    console.log("DATA STORED");
  }

  getFireUserData(userId: any) {
    return this.angularFireDatabase.object(`/users/${userId}`).valueChanges();
  }

  getAllFireUsers(): Observable<any> {
    return this.angularFireDatabase.list('/users').valueChanges();
  }

  getAllMessagesFromRoomPath(path: any): Observable<any> {
    return this.angularFireDatabase.list(`/messages/${path}`).valueChanges();
  }

  saveMessage(messageData: Message, path: any) {
    let messageNode = this.angularFireDatabase.list(path)
    messageNode.push(messageData);
    console.log('Message Sent')
    // return this.angularFireDatabase.object(path).
  }

  storeImage(upload: Upload) {
    console.log("CALLED")

    let storageRef = firebase.storage().ref(`${this.basePath}/${upload.user.email}`);
    // let uploadTask = storageRef.child(`${this.basePath}/${upload.user.email}.jpg`).putString(upload.imageFile);

    storageRef.putString(upload.imageFile);
    console.log("DONE");
    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //   (snapshot) => {
    //     console.log('Image Upload in progress');
    //   },
    //   (error) => {
    //     console.log("HERE")
    //     console.log(error)
    //   },
    //   () => {
    //     console.log("DONE")
    //     upload.imageUrl = uploadTask.snapshot.downloadURL;
    //     console.log("::: " + upload.imageUrl);
        
    //   }
    // )
  }

}
