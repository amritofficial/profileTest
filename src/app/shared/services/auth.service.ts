import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';

@Injectable()
export class AuthService {

  constructor(private parseService: ParseService) { }

  login(email: string, password: string) {
    return this.parseService.login(email, password);
  }

  signup(username: string, email: string, password: string) {
    return this.parseService.register(username, email, password);
  }

  logout() {
    return this.parseService.logout();
  }

  getAuthenticated(): boolean {
    return this.parseService.currentUser !== null;
  }
}
