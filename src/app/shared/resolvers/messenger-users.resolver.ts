import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { MessengerService } from '../services/messenger.service';
import { Observable } from 'rxjs';

@Injectable()
export class MessengerUsersResolver implements Resolve<any> {

    constructor(private messengerService: MessengerService, private firebaseService: FirebaseService) {}

    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.firebaseService.getAllFireUsers();
    }
}