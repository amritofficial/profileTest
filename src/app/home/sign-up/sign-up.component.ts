import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger,group, state, animateChild } from '@angular/animations';
import { Router } from '@angular/router';


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

  constructor(private router: Router) { 

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

  finishRegister() {
    this.skillsStep = false;
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

}
