import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../shared/services/profile.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";
import { Upload } from '../../../shared/models/upload';
import { ParseService } from '../../../shared/services/parse.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { UserService } from '../../../shared/services/user.service';

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

  constructor(public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private parseService: ParseService,
    private firebaseService: FirebaseService,
    private userService: UserService) {
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
    console.log('USER:::: ');
    let currentUser = this.parseService.currentUser;
    let userId = currentUser.id;

    currentUser.fetch().then((user) => {

      let uploadData: Upload = {
        imageFile: this.croppedImage,
        imageUrl: '',
        user: {
          avatar: null,
          email: user.getEmail(),
          userId: userId,
          username: user.getUsername(),
          userStatus: 0
        }
      }
      this.firebaseService.storeImageAndUpdateUser(uploadData);
    });
    // let uploadData: Upload = {
    //   imageFile: this.croppedImage,
    //   imageUrl: '',
    //   user: {
    //     avatar: null,
    //     email: 
    //   }
    // }
    // let uploadData: Upload = {
    //   imageFile: this.croppedImage,
    //   imageUrl: '',
    //   user: {
    //     avatar: null,
    //     email: 'test@test.com',
    //     userId: null,
    //     username: this.username,
    //     userStatus: 1
    //   }
    // }

    // this.firebaseService.storeImage(uploadData);

  }

  ngOnInit() {
  }

}
