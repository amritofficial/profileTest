import { Component, OnInit, OnChanges } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '../../shared/models/location';
import { FirebaseService } from '../../shared/services/firebase.service';
import { User } from '../../shared/models/user';
import { LocationService } from '../../shared/services/location.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'profile-location-modal',
  templateUrl: './profile-location-modal.component.html',
  styleUrls: ['./profile-location-modal.component.css']
})
export class ProfileLocationModalComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();

  currentLat: any;
  currentLong: any;
  postalCode: string;
  currentUser: User;
  currentLocation: Location = {
    lat: null,
    long: null,
    postal: '',
    status: '',
    user: {
      avatar: '',
      email: '',
      userId: null,
      username: '',
      userStatus: 1
    }
  }

  updateLocationObjectId: any;
  radioGroupForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private locationService: LocationService) { }

  ngOnInit() {
    this.getSavedLocation();
    this.radioGroupForm = this.formBuilder.group({
      'locationForm': 'public'
    });

    this.firebaseService.getFireUserData(window.sessionStorage.getItem("current_user_id"))
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  ngOnChanges() {

  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("This application requires to access Geolocation for the best experience");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;
    console.log(this.currentLat);
    console.log(this.currentLat + " " + this.currentLong);
  }

  getNewLocationCordinates(event) {
    this.currentLat = event.coords.lat;
    this.currentLong = event.coords.lng;
    console.log(event)
    console.log(this.currentLat + " " + this.currentLong);
  }

  saveLocation() {
    console.log(this.radioGroupForm.value);
    let locationData: Location = {
      lat: this.currentLat,
      long: this.currentLong,
      postal: this.postalCode,
      status: this.radioGroupForm.value['locationForm'],
      user: this.currentUser
    }

    this.locationService.saveLocation(locationData)
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((location) => {
        console.log(location);
        console.log("Location saved");
        this.activeModal.close();
      });
  }

  getSavedLocation() {
    let userId = window.sessionStorage.getItem("current_user_id");
    console.log(userId);
    this.locationService.getLocation(this.currentUser).then((location) => {
      if ((location.length !== 0)) {
        console.log(location);
        this.currentLocation = location[0].attributes;
        this.updateLocationObjectId = location[0].id;
        this.currentLat = location[0].attributes.lat;
        this.currentLong = location[0].attributes.long;
        this.postalCode = location[0].attributes.postal;
        this.radioGroupForm = this.formBuilder.group({
          'locationForm': location[0].attributes.status
        });
      } else {
        this.findMe();
      }
    });
  }

}
