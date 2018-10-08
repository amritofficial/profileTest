import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../shared/services/portal.service';
import { User } from '../../shared/models/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'devfinder-developers',
  templateUrl: './devfinder-developers.component.html',
  styleUrls: ['./devfinder-developers.component.css']
})
export class DevfinderDevelopersComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  developers
  users: User[] = new Array();

  constructor(private portalService: PortalService) { }

  ngOnInit() {
  }

  getAllDevelopers() {
    this.portalService.getAllUsersFromFirebase().pipe(takeUntil(this.ngUnsubscribe)).subscribe(users => {
      this.users = users;
    });
  }

}
