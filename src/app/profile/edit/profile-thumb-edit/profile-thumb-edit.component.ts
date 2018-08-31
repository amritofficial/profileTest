import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'profile-thumb-edit',
  templateUrl: './profile-thumb-edit.component.html',
  styleUrls: ['./profile-thumb-edit.component.css', '../../../../assets/css/blocks.css', '../../../../assets/css/theme-styles.css']
})
export class ProfileThumbEditComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit() {
  }

}
