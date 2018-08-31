import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileThumbEditComponent } from '../edit/profile-thumb-edit/profile-thumb-edit.component';

@Component({
  selector: 'profile-option',
  templateUrl: './profile-option.component.html',
  styleUrls: ['./profile-option.component.css', '../../../assets/css/blocks.css', '../../../assets/css/theme-styles.css']
})
export class ProfileOptionComponent implements OnInit {

  updateProfilePictureModal: boolean = false;

  constructor(private profileService: ProfileService, private modalService: NgbModal) { }

  open() {
    this.modalService.open(ProfileThumbEditComponent);
  }

  ngOnInit() {
  }

  updateProfilePicture() {
    this.profileService.editProfileThumb = true;
    this.updateProfilePictureModal = true;
    console.log("Modal should open")
  }
}
