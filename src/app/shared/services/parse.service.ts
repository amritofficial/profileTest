import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { catchError } from 'rxjs/operators';
import { Education } from '../models/education';
import { WorkExperience } from '../models/work-experience';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Location } from '../models/location';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import { Profile } from '../models/profile';
import { FinderTags } from '../models/finder-tags';

const Parse = require('parse');

const httpOptions = {
  headers: new HttpHeaders({
    'X-Parse-Application-Id': environment.parseServer.newAppId,
    'X-Parse-REST-API-Key': environment.parseServer.restNewKey,
    'Content-Type': 'application/json'
  })
}


@Injectable()
export class ParseService {

  signingUp: boolean = false;
  constructor(private firebaseService: FirebaseService,
    private http: HttpClient) {
    console.log('Parse initialized!')
    Parse.initialize("13161197ab22343bdb876503d3edf547cdc4b8bf", "412bf95c90ea08fc4c95cbdd75a404bea254872e");
    Parse.serverURL = 'https://18.218.232.41/parse'
  }

  public loginUsingRest(email: string, password: string) {
    let user = {
      email: email,
      password: password
    }
    return this.http.get(Parse.serverURL + "/login?email=" + email + "&password=" + password, httpOptions);
  }

  public registerUsingRest(email: string, password: string, username: string) {
    var user = new Parse.User();
    user.set("email", email);
    user.set("username", username);
    user.set("password", password);
    return this.http.post(Parse.serverURL + "/users", user, httpOptions);
  }

  // public login(email: string, password: string): Observable<any> {
  //   return new Observable(success => {
  //     Parse.User.logIn(email, password)
  //       .then(() => success.next(true));
  //   });
  // }

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

  // public register(username: string, email: string, password: string): Observable<any> {
  //   let userObject;
  //   this.signingUp = true;
  //   const observer = new Observable((observer) => {
  //     var user = new Parse.User()
  //     user.set("email", email);
  //     user.set("username", username);
  //     user.set("password", password);
  //     user.signUp().then((data) => {
  //       this.firebaseService.storeUserData(username, email, data.id);
  //       this.signingUp = false;
  //       console.log(data.id);
  //     }).catch((e: any) => Observable.throw(this.errorHandler(e)));
  //     // console.log(userObject);
  //   })

  //   return observer;
  // }

  errorHandler(error: any): void {
    console.log(error);
    // console.log(error)
  }

  public logout(): Observable<boolean> {
    return new Observable(data => {
      Parse.User.logOut().then(() => data.next(true));
    });
  }

  public logoutUsingRest() {
    console.log(window.sessionStorage.getItem('session_token'));
    let httpCustomOption = {
      headers: new HttpHeaders({
        'X-Parse-Application-Id': environment.parseServer.newAppId,
        'X-Parse-REST-API-Key': environment.parseServer.restNewKey,
        "X-Parse-Session-Token": window.sessionStorage.getItem('session_token')
      })
    }
    return this.http.post(Parse.serverURL + "/logout", {}, httpCustomOption);
  }

  public currentLoggedInUser() {
    let httpCustomOption = {
      headers: new HttpHeaders({
        'X-Parse-Application-Id': environment.parseServer.newAppId,
        'X-Parse-REST-API-Key': environment.parseServer.restNewKey,
        "X-Parse-Session-Token": window.sessionStorage.getItem('session_token')
      })
    }
    return this.http.get(Parse.serverURL + "/users/me", httpCustomOption);
  }

  public get currentUser() {
    // this gives the current session token
    // to retreive the current session id use Parse.Session.current()
    // console.log(Parse.User.current().getSessionToken());
    // console.log(Parse.Session.sessionToken);
    return Parse.User.current();
  }

  // the http options need to contain session token to work
  // this method can be used to find out if a user is logged in or not
  // public CurrentLoggedInUser() {
  //   return this.http.get(Parse.serverURL + "/users/me", httpOptions);
  // }

  public storeProfile(profile: Profile) {
    return this.http.post(Parse.serverURL + "/classes/profile", profile, httpOptions);
  }

  public storeWorkExperience(workExperience: WorkExperience) {
    return this.http.post(Parse.serverURL + "/classes/workExperience", workExperience, httpOptions);
  }

  public storeEducation(education: Education) {
    return this.http.post(Parse.serverURL + "/classes/education", education, httpOptions);
  }

  public storeLocation(location: Location) {
    return this.http.post(Parse.serverURL + "/classes/location", location, httpOptions);
  }

  public storeFinderTags(finderTags: FinderTags) {
    return this.http.post(Parse.serverURL + "/classes/tags", finderTags, httpOptions);
  }

  public getCurrentUserEducation(userId: any): Observable<any> {
    return this.http.get(Parse.serverURL + '/classes/education', httpOptions);
  }

  public getCurrentUserWorkExperience(): Observable<any> {
    return this.http.get(Parse.serverURL + "/classes/workExperience", httpOptions);
  }

  public async getCurrentUserFinderTags(userId: any) {
    const tags = Parse.Object.extend("tags");
    const query = new Parse.Query(tags);
    query.equalTo("userId", userId);

    return await query.find();
  }

  public updateCurrentUserFinderTags(objectId: any) {
    const tags = Parse.Object.extend("tags");
    const query = new Parse.Query(tags);
    return query.get(objectId);
  }

  public updateCurrentUserProfile(updatedProfile: Profile, objectId: any) {
    const profile = Parse.Object.extend("profile");
    const query = new Parse.Query(profile);
    return query.get(objectId);
    // return this.http.put(Parse.serverURL + "/classes/profile/" + objectId, updatedProfile, httpOptions);
  }

  public async getCurrentUserProfile(userId: any) {
    const profile = Parse.Object.extend("profile");
    const query = new Parse.Query(profile);
    query.equalTo("userId", userId);

    return await query.find();
  }

  public async getGuestUserEducation(guestId: any) {
    const education = Parse.Object.extend("education");
    const query = new Parse.Query(education);
    query.equalTo("userId", guestId);

    return await query.find();
  }

  public async getGuestUserWorkExperience(guestId: any) {
    const workExperience = Parse.Object.extend("workExperience");
    const query = new Parse.Query(workExperience);
    query.equalTo("userId", guestId);

    return await query.find();
  }

  public async getGuestUserFinderTags(guestId: any) {
    const tags = Parse.Object.extend("tags");
    const query = new Parse.Query(tags);
    query.equalTo("userId", guestId);

    return await query.find();
  } 

  // public getEducation() {
  //   let education = Parse.Object.extend("Education");
  //   let query = new Parse.Query(education);
  //   query.get("Wk0YlAw5Bt").then((education) => {
  //     console.log(education);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  //   )
  // }


}
