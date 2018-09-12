import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  authState: any;
  private userData: any;

  constructor(private parseService: ParseService) { }

  login(email: string, password: string) {
    return this.parseService.login(email, password);
  }

  signup(username: string, email: string, password: string, avatar: any) {
    return this.parseService.register(username, email, password);
  }

  logout() {
    return this.parseService.logout();
  }

  getAuthenticated(): boolean {
    console.log(":::: " + this.parseService.currentUser);
    return this.parseService.currentUser !== null;
  }
}
