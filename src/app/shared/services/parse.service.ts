import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { catchError } from 'rxjs/operators';

const Parse = require('parse');

@Injectable()
export class ParseService {

  constructor(private firebaseService: FirebaseService) {
    console.log('Parse initialized!')
    Parse.initialize("angular-parse-chat");
    Parse.serverURL = 'https://angular-parse-chat.herokuapp.com/parse'
  }

  public login(email: string, password: string): Observable<any> {
    return new Observable(success => {
      Parse.User.logIn(email, password)
        .then(() => success.next(true));
    });
  }

  // public register(username: string, email: string, password: string): Observable<boolean> {
  //   console.log(username + email + password);
  //   return new Observable(observer => {
  //     var user = new Parse.User();
  //     user.set("email", email);
  //     user.set("username", username);
  //     user.set("password", password);
  //     // user.set("email", "email@example.com");
  //     user.signUp(null, {
  //       success: (user) => {
  //         console.log('User created')
  //         observer.next(true);
  //         observer.complete();
  //       },
  //       error: (user, error) => {
  //         observer.error(error)
  //       }
  //     });
  //   });
  // }

  // public register(username: string, email: string, password: string): Observable<boolean> {
  //   return new Observable(observer => {
  //     var user = new Parse.User()
  //     user.set("email", email);
  //     user.set("username", username);
  //     user.set("password", password);
  //     // user.set("email", "email@example.com");
  //     user.signUp(null, {
  //       success: (user) => {
  //         console.log("created");
  //         observer.next(true)
  //         observer.complete()
  //       },
  //       error: (user, error) => {
  //         observer.error(error)
  //       }
  //     })
  //   })
  // }

  public register(username: string, email: string, password: string): Observable<any> {
    let userObject;
    const observer = new Observable( (observer) => { var user = new Parse.User()
      user.set("email", email);
      user.set("username", username);
      user.set("password", password);
      user.signUp().then((data) => {
        this.firebaseService.storeUserData(username, email, data.id);
        console.log(data.id);
      }).catch((e: any) => Observable.throw(this.errorHandler(e)));
      // console.log(userObject);
    })

    return observer;
    // return new Observable(success => {
    //   var user = new Parse.User()
    //   user.set("email", email);
    //   user.set("username", username);
    //   user.set("password", password);
    //   user.signUp(null, {
    //     success: (user) => {
    //       console.log("created");
    //       success.next(true)
    //       success.complete()
    //     },
    //     error: (user, error) => {
    //       success.error(error)
    //     }
    //   });
    // });
  }

  errorHandler(error: any): void {
    console.log(error);
    // console.log(error)
  }

  public logout(): Observable<boolean> {
    return new Observable(data => {
      Parse.User.logOut().then(() => data.next(true));
    });
  }

  public get currentUser() {
    // this gives the current session token
    // to retreive the current session id use Parse.Session.current()
    // console.log(Parse.User.current().getSessionToken());
    // console.log(Parse.Session.sessionToken);
    return Parse.User.current();
  }

}
