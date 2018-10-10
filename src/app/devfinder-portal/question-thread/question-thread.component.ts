import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'question-thread',
  templateUrl: './question-thread.component.html',
  styleUrls: ['./question-thread.component.css']
})
export class QuestionThreadComponent implements OnInit, OnChanges{
  @ViewChild("codeTextArea") codeTextArea: ElementRef;

  codeActivated: boolean = false;
  answer: string;
  answerCode: string = '';
  dummyCode: string = `
  public static void main(String[] args) {
    String username;
    String city;
    String postalCode;
    
    @Override
    public void findLocation() {

    }

    public void storeLocation() {
      
    }
  }
  `;

  constructor() { }

  ngOnInit() {
    console.log(this.answer)
  }

  activateCodeMode() {
    if (this.codeActivated === true) {
      this.codeActivated = false;
    }
    else {
      this.codeActivated = true;
      // this.codeTextArea.nativeElement.focus();
    }
  }

  ngOnChanges() {
    console.log(this.answer)
  }

}
