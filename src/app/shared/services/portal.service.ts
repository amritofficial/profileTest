import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable()
export class PortalService {

  constructor(private firebaseService: FirebaseService) { }

  // the function would return all the stored users from Firebase
  getAllUsersFromFirebase() {
    return this.firebaseService.getAllFireUsers();
  }

}
