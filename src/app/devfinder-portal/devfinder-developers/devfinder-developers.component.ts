import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../shared/services/portal.service';
import { User } from '../../shared/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Developer } from '../../shared/models/developer';
import { FinderTags } from '../../shared/models/finder-tags';
import { Location } from '../../shared/models/location';
import { UserService } from '../../shared/services/user.service';
import { LocationService } from '../../shared/services/location.service';
import { Distance } from '../../shared/models/distance';
import * as geoLib from 'geolib';

@Component({
  selector: 'devfinder-developers',
  templateUrl: './devfinder-developers.component.html',
  styleUrls: ['./devfinder-developers.component.css']
})
export class DevfinderDevelopersComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  developers: Developer[] = new Array();
  users: User[] = new Array();
  currentUserLocation: Location;
  usersLocation: Location[] = new Array();
  usersDistance: Distance[] = new Array();
  userFinderTags: FinderTags[] = [];

  constructor(private portalService: PortalService,
    private userService: UserService,
    private locationService: LocationService) { }

  ngOnInit() {
    // this.getCurrentUserLocation();
    this.getAllUsers();
    this.getAllUsersLocation();
    this.getAllUsersFinderTags();
  }

  getAllUsers() {
    this.portalService.getAllUsersFromFirebase().pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
      this.users = users;
    });
  }

  getAllUsersLocation() {
    this.portalService.getAllLocations().pipe(takeUntil(this.ngUnsubscribe)).subscribe((location) => {
      console.log("Locations")
      if (location['results'].length != 0) {
        this.usersLocation = location['results'];
        console.log(this.usersLocation);
        console.log(this.usersLocation[0])

        this.usersLocation.forEach(location => {
          if (location.lat != undefined) {
            let distance = this.calculateDistance(location);
            this.usersDistance.push({ userId: location.userId, distance: distance });
          }
        });
      }
      console.log(this.usersDistance);
      // this.getAllUsersFinderTags();
    });
  }

  getAllUsersFinderTags() {
    this.portalService.getAllUsersFinderTags().pipe(takeUntil(this.ngUnsubscribe)).subscribe((finderTags) => {
      this.userFinderTags = finderTags['results'];
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
      for (let j = 0; j < this.userFinderTags.length; j++) {
        if (this.users[i].userId === this.userFinderTags[j].userId) {
          console.log(this.userFinderTags[j])
          developerObject.tags = this.userFinderTags[j];
        }
      }
      for (let k = 0; k < this.usersDistance.length; k++) {
        if (this.users[i].userId === this.usersDistance[k].userId) {
          developerObject.distance = this.usersDistance[k].distance;
        }
      }
      this.developers.push(developerObject);
    }
    console.log(this.developers);
  }

  calculateDistance(location: Location) {
    let coords;
    this.currentUserLocation = this.locationService.currentLocation;
    if (this.currentUserLocation.lat != undefined) {
      coords = {
        latitude: this.currentUserLocation.lat,
        longitude: this.currentUserLocation.long
      }
    }
    else {
      this.getCurrentUserLocation();
      coords = {
        latitude: this.currentUserLocation.lat,
        longitude: this.currentUserLocation.long
      }
    }

    let distance = geoLib.getDistance(coords, { latitude: location.lat, longitude: location.long });
    return Math.round((distance / 1000) * 100) / 100
  }

  getCurrentUserLocation() {
    let userId = this.userService.getCurrentUserId();
    console.log("Current User Id" + userId);
    this.locationService.getLocation(userId).then((location) => {
      if (location.length != 0) {
        this.currentUserLocation = location[0].attributes;
        console.log(this.currentUserLocation);
      }
    });
  }

}
