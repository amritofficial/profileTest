import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileThumbEditComponent } from '../edit/profile-thumb-edit/profile-thumb-edit.component';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-option',
  templateUrl: './profile-option.component.html',
  styleUrls: ['./profile-option.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileOptionComponent implements OnInit, OnDestroy{

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
    this.subscription = this.firebaseService.closeChooseAvatarModal.subscribe((item) => {
      if(item)  {
        this.modalRef.close();
      }
    })
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
