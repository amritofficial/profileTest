import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'profile-location-modal',
  templateUrl: './profile-location-modal.component.html',
  styleUrls: ['./profile-location-modal.component.css']
})
export class ProfileLocationModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal) { }

  ngOnInit() {
  }

}
