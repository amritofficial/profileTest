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

  // the variable is used to store current user data in the service without having to subscribe it
  // from each component utilizing the same variable
  currentUser: User = this.user;

  // the variable would be used to store list of users 
  // components that will be using this variable will be user-list-bar and messenger
  listOfUsers: User[] = [this.user];

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

  getAllUsersFromFirebase() {
    return this.firebaseService.getAllFireUsers();
  }

}