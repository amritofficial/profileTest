import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";

@Component({
  selector: 'profile-thumb-edit',
  templateUrl: './profile-thumb-edit.component.html',
  styleUrls: ['./profile-thumb-edit.component.css', '../../../../assets/css/blocks.css', '../../../../assets/css/theme-styles.css']
})
export class ProfileThumbEditComponent implements OnInit {

  data2: any;
  imageSelected: boolean = false;
  imageChangeEvent: any = '';
  croppedImage: any;
  cropperSettings2: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {
    //Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 200;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 200;

    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 300;

    this.cropperSettings2.minWidth = 100;
    this.cropperSettings2.minHeight = 100;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = false;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.noFileInput = true;

    this.data2 = {};

  }

  cropped(bounds: Bounds) {
    //console.log(bounds);
  }

  /**
   * Used to send image to second cropper
   * @param $event
   */
  fileChangeListener($event) {
    this.imageChangeEvent = $event;
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };
    this.imageSelected = true;
    myReader.readAsDataURL(file);
    // this.croppedImage = data2.image;
  }

  imageCropped(image: string) {
    //this.croppedImage = image;
    console.log("Cropped");
    this.croppedImage = this.data2.image;
  }

  croppedImageFile(event: any) {
    console.log("File")
  }

  saveImage() {
    // Save this.croppedImage
  }

  ngOnInit() {
  }

}
