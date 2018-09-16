import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger, group, state, animateChild } from '@angular/animations';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ImageCropperComponent, CropperSettings, Bounds } from "ngx-img-cropper";
import { AuthService } from '../../shared/services/auth.service';
import { ParseService } from '../../shared/services/parse.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Upload } from '../../shared/models/upload';
import { User } from 'firebase';
import { CustomDate } from '../../shared/models/custom-date';
import { WorkExperience } from '../../shared/models/work-experience';
import { UserService } from '../../shared/services/user.service';
import { Education } from '../../shared/models/education';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('ngIfAnimation', [
      transition('void => *', [
        query('*', style({ opacity: 0 }), { optional: true }),
        query('*', stagger('100ms', [
          animate('0.2s ease-in', keyframes([
            style({ opacity: 0 }),
            style({ opacity: .5 }),
            style({ opacity: 1 }),
          ]))]), { optional: true }),
      ])
    ])
  ]
})
export class SignUpComponent implements OnInit {

  username: string = '';
  email: string = '';
  password: string = '';
  avatarUrl: string = '';

  signupComplete: boolean = false;
  signupLoading: boolean;

  tags = [];
  mainStep: boolean = true;
  workStep: boolean = false;
  educationStep: boolean = false;
  tagStep: boolean = false;
  finishRegisterStep: boolean = false;
  avatarStep: boolean = false;
  locationStep: boolean = false;

  company: string = 'RBC';
  workStartDate: CustomDate;
  workEndDate: CustomDate;
  workTitle: string = 'Developer'
  workStatus: boolean = false;
  workDescription: string = 'Afafafaf';
  workCountry: string = 'Canada';
  workCity: string = 'Toronto';

  postalCode: any;

  school: string = 'Sheridan';
  schoolProgram: string = 'SDNE';
  programStartDate: CustomDate;
  programEndDate: CustomDate;
  schoolCity: string = 'Toronto';
  schoolCountry: string = 'Canada';
  programDescription: string = 'ABOUT SDNE'

  data2: any;
  imageSelected: boolean = false;
  imageChangeEvent: any = '';
  croppedImage: any = null;
  cropperSettings2: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private router: Router,
    private authService: AuthService,
    private firebaseService: FirebaseService,
    private parseService: ParseService,
    private userService: UserService) {
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
    // assign a default image to the variable
    this.data2.image = 'https://d2x5ku95bkycr3.cloudfront.net/App_Themes/Common/images/profile/0_200.png';
  }

  jumpToWorkExperience() {
    console.log(this.firebaseService.avatarUrl);
    // this.saveImage();
    this.avatarStep = false;
    // this.mainStep = false;
    this.workStep = true;
  }

  jumpToEducation() {
    this.educationStep = true;
    this.workStep = false;
    // this.mainStep = false;  
  }

  jumpToTags() {
    this.tagStep = true;
    this.educationStep = false;
  }

  jumpToAvatar() {
    this.mainStep = false;
    // this.skillsStep = false;
    this.avatarStep = true;
  }

  jumpToLocation() {
    this.tagStep = false;
    this.locationStep = true;
  }

  finishRegister() {
    // this.saveImage();
    // this.signUp();
    let workExperience: WorkExperience = this.createWorkExperience();
    let education = this.createEducation();
    console.log(workExperience);
    console.log(education);
    this.locationStep = false;
    this.finishRegisterStep = true;
    console.log(this.tags);
  }

  createWorkExperience() {
    let workExperience: WorkExperience = {
      city: this.workCity,
      country: this.workCountry,
      company: this.company,
      description: this.workDescription,
      endDate: this.workEndDate,
      startDate: this.workStartDate,
      jobStatus: this.workStatus,
      jobTitle: this.workTitle,
      user: this.firebaseService.currentUser
    }
    return workExperience;
  }

  createEducation() {
    let education: Education = {
      description: this.programDescription,
      endDate: this.programEndDate,
      startDate: this.programStartDate,
      program: this.schoolProgram,
      school: this.school,
      schoolCity: this.schoolCity,
      schoolCountry: this.schoolCountry,
      user: this.firebaseService.currentUser
    }
    return education;
  }

  jumpToDashboard() {
    console.log('It should navigate');
    this.router.navigate(['dashboard']);
  }

  id = 0;
  onTagAdded(tag) {
    this.tags.push({ id: this.id, value: tag.value });
    this.id += 1;
  }

  onTagRemoved(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  signUp() {
    this.authService.signup(this.username, this.email, this.password)
      .subscribe(success => {
        console.log(success);
        console.log('User created successfully !');
        //this.router.navigateByUrl('/home');
      }, error => {
        alert(error.message)
      });
    this.signupComplete = true;
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

  imageCropped(event: any) {
    console.log("Cropped");
    this.croppedImage = this.data2.image;
  }


  saveImage() {
    let uploadData: Upload = {
      imageFile: this.croppedImage,
      imageUrl: '',
      user: this.firebaseService.currentUser
    }
    this.firebaseService.storeImage(uploadData);
  }

}
