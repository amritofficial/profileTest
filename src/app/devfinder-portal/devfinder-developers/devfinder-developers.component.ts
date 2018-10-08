import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../shared/services/portal.service';
import { User } from '../../shared/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Developer } from '../../shared/models/developer';
import { FinderTags } from '../../shared/models/finder-tags';
import { Location } from '../../shared/models/location';

@Component({
  selector: 'devfinder-developers',
  templateUrl: './devfinder-developers.component.html',
  styleUrls: ['./devfinder-developers.component.css']
})
export class DevfinderDevelopersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  developers: Developer[] = new Array();
  users: User[] = new Array();
  usersLocation: Location[] = new Array();
  userFinderTags: FinderTags[] = new Array();

  constructor(private portalService: PortalService) { }

  ngOnInit() {
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
    this.portalService.getAllLocations().pipe(takeUntil(this.ngUnsubscribe)).subscribe((location: Location[]) => {
      console.log("Locations")
      this.usersLocation = location;
      console.log(this.usersLocation);
    });
  }

  getAllUsersFinderTags() {
    this.portalService.getAllUsersFinderTags().pipe(takeUntil(this.ngUnsubscribe)).subscribe((finderTags: FinderTags[]) => {
      console.log(finderTags)
    });
  }

}
