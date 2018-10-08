import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../shared/services/portal.service';
import { User } from '../../shared/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Developer } from '../../shared/models/developer';
import { FinderTags } from '../../shared/models/finder-tags';
import { Location } from '../../shared/models/location';
import { element } from 'protractor';
import { UserService } from '../../shared/services/user.service';
import { LocationService } from '../../shared/services/location.service';
import { Distance } from '../../shared/models/distance';

@Component({
  selector: 'devfinder-developers',
  templateUrl: './devfinder-developers.component.html',
  styleUrls: ['./devfinder-developers.component.css']
})
export class DevfinderDevelopersComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  developers: Developer[] = [{
    user: {
      avatar: '',
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    },
    distance: null,
    tags: {
      tags: [],
      userId: null
    }
  }];
  users: User[] = new Array();
  currentUserLocation: Location;
  usersLocation: Location[] = new Array();
  usersDistance: Distance[] = new Array();
  userFinderTags: FinderTags[] = [];

  constructor(private portalService: PortalService,
    private userService: UserService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.getCurrentUserLocation();
    this.getAllUsers();
    this.getAllUsersLocation();
    this.getAllUsersFinderTags();
  }

  getAllUsers() {
    this.portalService.getAllUsersFromFirebase().pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
      this.users = users;
      // this.getAllUsersLocation();
    });
  }

  getAllUsersLocation() {
    this.portalService.getAllLocations().pipe(takeUntil(this.ngUnsubscribe)).subscribe((location) => {
      console.log("Locations")
      this.usersLocation = location['results'];
      console.log(this.usersLocation);
      console.log(this.usersLocation[0])
      // this.getAllUsersFinderTags();
    });
  }

  getAllUsersFinderTags() {
    this.portalService.getAllUsersFinderTags().pipe(takeUntil(this.ngUnsubscribe)).subscribe((finderTags) => {
      this.userFinderTags = finderTags['results'];
      // this.userFinderTags = finderTags.att;
      console.log(this.userFinderTags);
      console.log(this.userFinderTags[0])

      this.getDevelopers();
    });
  }

  getDevelopers() {
    for (let i = 0; i < this.users.length; i++) {
      let developerObject: Developer = {
        user: {
          avatar: '',
          email: '',
          userId: null,
          username: '',
          userStatus: 1
        },
        distance: null,
        tags: {
          tags: [],
          userId: null
        }
      };
      developerObject.user = this.users[i];
      console.log(this.users[i].username)
      for (let j = 0; j < this.userFinderTags.length; j++) {
        if (this.users[i].userId === this.userFinderTags[j].userId) {
          console.log(this.userFinderTags[j])
          developerObject.tags = this.userFinderTags[j];
        }
      }
      this.developers.push(developerObject);
    }
    console.log(this.developers);
  }

  calculateDistance() {

  }

  getCurrentUserLocation() {
    let userId = this.userService.getCurrentUserId();
    this.locationService.getLocation(userId).then((location) => {
      this.currentUserLocation = location;
    });
  }

}
