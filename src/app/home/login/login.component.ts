import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ParseService } from '../../shared/services/parse.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { User } from '../../shared/models/user';
import { LoginUser } from '../../shared/models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loading: boolean = false;
  showError: boolean = false;

  fireUsersArray: User;

  constructor(private router: Router,
    private authService: AuthService,
    private parseService: ParseService,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.loginUsingRest(this.email, this.password)
      .subscribe((data: LoginUser) => {
        this.loading = false;
        console.log(data.objectId);
        window.sessionStorage.setItem('current_user_id', data.objectId);
        window.sessionStorage.setItem('session_token', data.sessionToken);
        this.firebaseService.loginUser(data.objectId);
        console.log(window.sessionStorage.getItem('current_user_id'));
        this.router.navigateByUrl('/dashboard');
        // window.sessionStorage.setItem
      },
      err => {
        console.log("error occured")
        console.log(err);
        console.log(err.status);
        if (err.status === 404) {
          this.loading = false;
          this.showError = true;
        }
      });
    // this.authService.login(this.email, this.password)
    //   .subscribe(success => {
    //     console.log('Login Success');
    //     this.loading = false;
    //     this.router.navigateByUrl('/dashboard');
    //     if (success) {
    //       // this.router.navigateByUrl('/dashboard');
    //       console.log(this.parseService.currentUser.id);
    //       this.firebaseService.getFireUserData(this.parseService.currentUser.id);

    //       this.firebaseService.getAllFireUsers()
    //         .subscribe((users) => {
    //           this.fireUsersArray = users;
    //         })
    //     }
    //   }, error => {
    //     alert(error);
    //   })
  }

}
