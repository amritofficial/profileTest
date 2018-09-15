import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { ParseService } from './parse.service';
import { User } from '../models/user';

@Injectable()
export class UserService {
  loadingUser: boolean = false;
  user: User = {
    avatar: '',
    email: '',
    userId: null,
    username: '',
    userStatus: 1
  }
  currentUser: User = {
    avatar: '',
    email: '',
    userId: null,
    username: '',
    userStatus: 1
  };
  userAvatarUrl: string = '';

  constructor(private firebaseService: FirebaseService,
    private parseService: ParseService) { }

  getCurrentUserDataFromFirebase() {
    return this.firebaseService.getFireUserData(this.getCurrentUserId());
  }

  getCurrentUserId() {
    let currentUser = this.parseService.currentUser;
    let currentUserId = currentUser.id
    return currentUserId;
  }

}