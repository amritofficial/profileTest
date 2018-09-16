import { Injectable } from '@angular/core';
import { ParseService } from './parse.service';
import { Observable } from 'rxjs';
import { Education } from '../models/education';
import { WorkExperience } from '../models/work-experience';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  authState: any;
  private userData: any;

  constructor(private parseService: ParseService) { }

  login(email: string, password: string) {
    return this.parseService.login(email, password);
  }

  signup(username: string, email: string, password: string) {
    return this.parseService.register(username, email, password);
  }

  // signupAndStoreDate(username: string, email: string, password: string, education: Education, workExperience: WorkExperience) {
    
  // }

  logout() {
    return this.parseService.logout();
  }

  getAuthenticated(): boolean {
    return this.parseService.currentUser !== null;
  }
}
