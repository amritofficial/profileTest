import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseAuth } from "@angular/fire";
import { FirebaseDatabase } from "@angular/fire";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { ParseService } from './parse.service';

@Injectable()
export class FirebaseService {

  currentFireUserData: AngularFireList<User>;

  constructor(private angularFireDatabase: AngularFireDatabase) { }

  storeUserData(username: string, email: string, userId: any) {
    // const userId;
    const path = `users/${userId}`;

    let userData: User = {
      userId: userId,
      username: username,
      email: email,
      userStatus: 0
    }

    this.angularFireDatabase.object(path).update(userData)
      .catch(error => console.log("Error " + error));
    console.log("DATA STORED");
  }

  getFireUserData(userId: any) {
    this.angularFireDatabase.object(`/users/${userId}`).valueChanges()
      .subscribe((data) => {
        console.log(data);
      })

    // this.angularFireStore.collection('users').valueChanges()
    //   .subscribe(data => {
    //     console.log(data);
    //   })
    // this.currentFireUserData = this.angularFireDatabase.list('/users')
    // .valueChanges().subscribe((data) => {
    //   console.log('Firebase');
    //   console.log(data)
    // });

    // console.log(this.currentFireUserData);
  }

}
