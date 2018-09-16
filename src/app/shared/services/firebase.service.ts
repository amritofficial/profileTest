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
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from '../models/message';
import { Upload } from '../models/upload';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FirebaseService {
  currentFireUserData: AngularFireList<User>;
  private basePath: string = '/avatars';
  avatarUrl: string = '';
  uploadingAvatar: boolean = false;
  avatarUploaded: boolean = false;
  closeChooseAvatarModal = new BehaviorSubject<boolean>(false);
  currentUser: User;
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
    // everytime a user signs up, the current user object is stored in the service 
    // to be used by other classes because of subscription not working issue
    this.currentUser = userData;

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
    this.avatarUploaded = false;
    
    let storageRef = firebase.storage().ref(`${this.basePath}/${upload.user.email}.jpg`);
    let uploadTask = storageRef.putString(upload.imageFile, 'data_url');

    // storageRef.putString(upload.imageFile, 'data_url');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        console.log('Image Upload in progress');
      },
      (error) => {
        console.log("HERE")
        console.log(error)
      },
      () => {
        console.log("DONE")
        this.uploadingAvatar = false;
        this.avatarUploaded = true;
        // upload.imageUrl = uploadTask.snapshot.downloadURL;
        storageRef.getDownloadURL().then(url => {
          this.avatarUrl = url;
          this.angularFireDatabase.object(`/users/${upload.user.userId}`).update({avatar: url});
          this.closeChooseAvatarModal.next(true);
        })
      }
    )
  }

  storeImageAndUpdateUser(upload: Upload) {
    console.log("CALLED")
    this.avatarUploaded = false;
    this.uploadingAvatar = true;
    let storageRef = firebase.storage().ref(`${this.basePath}/${upload.user.email}.jpg`);
    // the following line simply performs a refresh of the url
    this.deleteAvatarUrl(upload.user.userId);
    this.storeImage(upload);
  }

  // the reason of this function is to refresh the profile url
  deleteAvatarUrl(userId: any) {
    this.angularFireDatabase.object(`/users/${userId}`).update({avatar: ''});
  }

}
