import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Observable, Subject } from 'rxjs';

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

  getAuthenticated(): Observable<boolean> {
    return this.parseService.currentLoggedInUser().map(res => {
      if (res) {
        console.log("Auth ")
        console.log(res);
        return true;
      } else {
        return false;
      }
    });
  }
}
