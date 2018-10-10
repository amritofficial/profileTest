import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'open-issue',
  templateUrl: './open-issue.component.html',
  styleUrls: ['./open-issue.component.css']
})
export class OpenIssueComponent implements OnInit {

  codeActivated: boolean = false;
  question: string;
  questionCode: string = '';
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
  questionTags: string[] = new Array();

  constructor() { }

  ngOnInit() {
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

  onTagAdded(event) {
    this.questionTags.push(event.value);
    console.log(this.questionTags);
  }

  onTagRemoved(event) {
    this.questionTags.splice(this.questionTags.indexOf(event.value), 1);
    console.log(this.questionTags);
  }

}