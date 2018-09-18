import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileThumbEditComponent } from '../edit/profile-thumb-edit/profile-thumb-edit.component';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'profile-option',
  templateUrl: './profile-option.component.html',
  styleUrls: ['./profile-option.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileOptionComponent implements OnInit, OnDestroy, OnChanges {
  private ngUnsubscribe = new Subject();

  updateProfilePictureModal: boolean = false;
  modalRef: any;
  subscription: Subscription;

  constructor(private profileService: ProfileService,
    private modalService: NgbModal,
    private firebaseService: FirebaseService) { }

  open() {
    this.modalRef = this.modalService.open(ProfileThumbEditComponent, {
      size: 'lg'
    });
  }

  ngOnInit() {
    this.modalRef = this.modalService.open('', {
      size: 'lg'
    });
    this.subscription = this.firebaseService.closeChooseAvatarModal.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((item) => {
        if (item !== null) {
          this.modalRef.close();
        }
      });
  }

  ngOnChanges() {

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateProfilePicture() {
    this.profileService.editProfileThumb = true;
    this.updateProfilePictureModal = true;
    console.log("Modal should open")
  }
}
