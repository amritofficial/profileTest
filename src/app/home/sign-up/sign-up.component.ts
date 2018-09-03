import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('ngIfAnimation', [
        transition('void => *', [
            query('*', style({ opacity: 0}), {optional: true}),
            query('*', stagger('100ms', [
                animate('0.2s ease-in', keyframes([
                    style({opacity: 0}),
                    style({opacity: .5}),
                    style({opacity: 1}),
                    ]))]), {optional: true}),
            ])
        ])
    ]
})
export class SignUpComponent implements OnInit {
  items = [];
  mainStep: boolean = true;
  workStep: boolean = false;
  educationStep: boolean = false;
  skillsStep: boolean = false;
  finishRegisterStep: boolean = false;
  avatarStep: boolean = false;

  data2: any;
  imageSelected: boolean = false;
  imageChangeEvent: any = '';
  croppedImage: any;
  cropperSettings2: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private router: Router) {
    //Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 100;
    this.cropperSettings2.height = 100;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 200;

    this.cropperSettings2.canvasWidth = 400;
    this.cropperSettings2.canvasHeight = 200;

    this.cropperSettings2.minWidth = 100;
    this.cropperSettings2.minHeight = 100;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = false;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.noFileInput = true;

    this.data2 = {};
  }

  ngOnInit() {
  }

  jumpToWorkExperience() {
    this.mainStep = false;
    this.workStep = true;
  }

  jumpToEducation() {
    this.educationStep = true;
    this.workStep = false;
    this.mainStep = false;  
  }

  jumpToSkills() {
    this.skillsStep = true;
    this.educationStep = false;
  }

  jumpToAvatar() {
    this.skillsStep = false;
    this.avatarStep = true;
  }

  finishRegister() {
    this.saveImage();
    this.avatarStep = false;
    this.finishRegisterStep = true;
    console.log(this.items);
  }

  jumpToDashboard() {
    console.log('It should navigate');
    this.router.navigate(['dashboard']);
  }

  id = 0;
  onItemAdded(item) {
    this.items.push({id: this.id, value: item.value});
    this.id +=1;
  }

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
    console.log("Image Save!")
    // Save this.croppedImage
  }

}
