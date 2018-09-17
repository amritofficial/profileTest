import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Observable, Subject } from 'rxjs';
import { Education } from '../models/education';
import { WorkExperience } from '../models/work-experience';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private ngUnsubscribe = new Subject();
  private user: Observable<firebase.User>;
  authState: any;
  private userData: any;

  constructor(private parseService: ParseService) { }

  // login(email: string, password: string) {
  //   return this.parseService.login(email, password);
  // }

  // signup(username: string, email: string, password: string) {
  //   return this.parseService.register(username, email, password);
  // }

  signupUsingRest(email: string, password: string, username: string) {
    return this.parseService.registerUsingRest(email, password, username);
  }

  loginUsingRest(email: string, password: string) {
    return this.parseService.loginUsingRest(email, password);
  }

  // signupAndStoreDate(username: string, email: string, password: string, education: Education, workExperience: WorkExperience) {
    
  // }

  logout() {
    return this.parseService.logout();
  }

  getAuthenticated() {
    // this block throws exceptions of length

    // console.log(this.parseService.currentUserFromRest());
    let authenticated: boolean = true;
    // this.parseService.currentLoggedInUser().pipe(takeUntil(this.ngUnsubscribe))
    //   .subscribe((user) => {
    //     if (user !== null) {
    //       authenticated = true;
    //       return true;
    //     }
    //     else {
    //       authenticated = false;
    //     }
    //   });
    // this.parseService.currentLoggedInUser().subscribe(user => {
    //   if(user !== null) {
    //     return true;
    //   } else
    // })
    return true;
  }
}
