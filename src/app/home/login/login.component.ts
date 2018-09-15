import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ParseService } from '../../shared/services/parse.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading: boolean = false;

  fireUsersArray: User;

  constructor(private router: Router, 
    private authService: AuthService, 
    private parseService: ParseService,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.email, this.password)
      .subscribe(success => {
        console.log('Login Success');
        this.loading = false;
        this.router.navigateByUrl('/dashboard');
        if (success) {
          // this.router.navigateByUrl('/dashboard');
          console.log(this.parseService.currentUser.id);
          this.firebaseService.getFireUserData(this.parseService.currentUser.id);

          this.firebaseService.getAllFireUsers()
            .subscribe((users) => {
              this.fireUsersArray = users;
            })
        }
      }, error => {
        alert(error);
      })
  }

}
