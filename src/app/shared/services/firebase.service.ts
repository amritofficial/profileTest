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
import { LinkRequest } from '../models/link-request';
import { Feed } from '../models/feed';
import { Like } from '../models/like';
import { Comment } from '../models/comment';

@Injectable()
export class FirebaseService {
  currentFireUserData: AngularFireList<User>;
  private basePath: string = '/avatars';
  private feedImageBasePath: string = '/feedImage';
  avatarUrl: string = '';
  uploadingAvatar: boolean = false;
  avatarUploaded: boolean = false;
  closeChooseAvatarModal = new BehaviorSubject<boolean>(false);
  currentUser: User;
  linkRequestSubject = new BehaviorSubject('sent');
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
    this.uploadingAvatar = true;
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
          this.angularFireDatabase.object(`/users/${upload.user.userId}`).update({ avatar: url });
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
    this.angularFireDatabase.object(`/users/${userId}`).update({ avatar: '' });
  }

  sendLinkRequest(linkRequest: LinkRequest) {
    let linkRequestNodes = {};
    let senderLinkRequest: LinkRequest = JSON.parse(JSON.stringify(linkRequest));
    senderLinkRequest.status = 'sent';
    let receiverLinkRequest: LinkRequest = JSON.parse(JSON.stringify(linkRequest));
    receiverLinkRequest.status = 'waiting';
    // We are dividing the requests into different nodes to handle and are labelling each node with a unique
    // id based upon from whom we are receiving (RECEVIED NODE EMBEDED WITH fromID)
    // and sent (SENT NODE EMBEDED WITH toID)
    linkRequestNodes[`linkRequests/${linkRequest.from.userId}/sent/${linkRequest.to.userId}`] = senderLinkRequest;
    linkRequestNodes[`linkRequests/${linkRequest.to.userId}/received/${linkRequest.from.userId}`] = receiverLinkRequest;
    // this.linkRequestSubject.next()
    return this.angularFireDatabase.database.ref().update(linkRequestNodes);
  }

  getReceivedLinkRequest(userId: any): Observable<any> {
    return this.angularFireDatabase.list(`/linkRequests/${userId}/received`).valueChanges();
  }

  getSentLinkRequest(userId: any): Observable<any> {
    return this.angularFireDatabase.list(`linkRequests/${userId}/sent`).valueChanges();
  }

  // toId is current user id and fromId is the person from whom the request has been received
  approveLinkRequest(request: LinkRequest) {
    this.angularFireDatabase.database.ref(`/linkRequests/${request.to.userId}/received`).child(`${request.from.userId}`).remove().then(() => {
      this.angularFireDatabase.object(`/linkRequests/${request.from.userId}/sent/${request.to.userId}`).update({ status: 'approved' }).then((data) => {
        console.log("Approved");
        console.log(data);
        this.createLinksList(request);
      });
    });
  }

  // the function would create a link list (friend list) for both the users, once the 
  // request is approved by the user. Both of the users will be added to the friend list database
  createLinksList(request: LinkRequest) {
    let linksNode = {};

    linksNode[`links/${request.to.userId}/${request.from.userId}`] = request.from;
    linksNode[`links/${request.from.userId}/${request.to.userId}`] = request.to;
    return this.angularFireDatabase.database.ref().update(linksNode);
  }

  getCurrentUserLinks(userId: any) {
    return this.angularFireDatabase.list(`/links/${userId}`).valueChanges();
  }

  getCurrentUserReceivedRequests(userId: any) {
    return this.angularFireDatabase.list(`/linkRequests/${userId}/received`).valueChanges();
  }

  getCurrentUserSentRequests(userId: any) {
    return this.angularFireDatabase.list(`/linkRequests/${userId}/sent`).valueChanges();
  }

  // Feed Work Below

  storeFeed(feed: Feed, userId: any) {
    let postNewKey = this.angularFireDatabase.database.ref().child('feed').push().key;
    let path = `/feed/${userId}/${postNewKey}`;
    feed.feedId = postNewKey;
    return this.angularFireDatabase.object(path).update(feed);
  }

  deleteFeed(userId: any, feedId: any) {
    return this.angularFireDatabase.database.ref(`/feed/${userId}`).child(`${feedId}`).remove();
  }

  getFeed(userId: any) {
    return this.angularFireDatabase.list(`/feed/${userId}`).valueChanges();
  }

  likeFeed(feedUserId: any, feedId: any, likeArray: Like[]) {
    return this.angularFireDatabase.object(`/feed/${feedUserId}/${feedId}`).update({ like: likeArray });
  }

  dislikeFeed(feedUserId: any, feedId: any, likeArray: Like[]) {
    return this.angularFireDatabase.object(`/feed/${feedUserId}/${feedId}`).update({ like: likeArray });
  }

  commentFeed(feedUserId: any, feedId: any, commentArray: Comment[]) {
    return this.angularFireDatabase.object(`/feed/${feedUserId}/${feedId}`).update({ comment: commentArray });
  }

  deleteCommentFeed(feedUserId: any, feedId: any, commentArray: Comment[]) {
    return this.angularFireDatabase.object(`/feed/${feedUserId}/${feedId}`).update({ comment: commentArray });
  }

  getGlobalFeed() {
    return this.angularFireDatabase.list(`/feed`).valueChanges();
  }

  // Change status of user from online to offline
  logoutUser(userId: any) {
    this.angularFireDatabase.object(`/users/${userId}`).update({ userStatus: 1 });
  }

  loginUser(userId: any) {
    this.angularFireDatabase.object(`/users/${userId}`).update({ userStatus: 0 });
  }

  getGlobalMessages() {
    return this.angularFireDatabase.list(`/messages`).valueChanges();
  }

  getLastMessage(roomPath: any) {
    return this.angularFireDatabase.database.ref(`/messages/${roomPath}`);
  }

  storeFeedWithImage(feed: Feed, userId: any) {
    let postNewKey = this.angularFireDatabase.database.ref().child('feed').push().key;
    let path = `/feed/${userId}/${postNewKey}`;
    feed.feedId = postNewKey;
    if ((feed.feedImage !== null) || (feed.feedImage !== "" )|| (feed.feedImage != undefined)) {
      console.log("CALLED")
      let storageRef = firebase.storage().ref(`${this.feedImageBasePath}/${feed.user.userId}/${feed.feedId}.jpg`);
      let uploadTask = storageRef.putString(feed.feedImage, 'data_url');

      // storageRef.putString(upload.imageFile, 'data_url');
      return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          console.log('Image Upload in progress');
        },
        (error) => {
          console.log("HERE")
          console.log(error)
        },
        () => {
          console.log("DONE")
          // upload.imageUrl = uploadTask.snapshot.downloadURL;
          storageRef.getDownloadURL().then(url => {
            feed.feedImage = url;
            this.angularFireDatabase.object(path).update(feed);
          });
        }
      );
    } else if (feed.feedImage != null || feed.feedImage != "" || feed.feedImage != undefined) {
      console.log("no image Found");
      this.angularFireDatabase.object(path).update(feed);
    }
  }

}
