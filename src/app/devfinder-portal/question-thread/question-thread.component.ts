import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PortalService } from 'app/shared/services/portal.service';
import { OpenIssue } from 'app/shared/models/open-issue';
import { QuestionThread } from 'app/shared/view-models/question-thread';
import { DistanceService } from 'app/shared/services/distance.service';
import { AnswerIssue } from 'app/shared/models/answer-issue';
import { UserService } from 'app/shared/services/user.service';

@Component({
  selector: 'question-thread',
  templateUrl: './question-thread.component.html',
  styleUrls: ['./question-thread.component.css']
})
export class QuestionThreadComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  @ViewChild("codeTextArea") codeTextArea: ElementRef;

  issueId: any;
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
  openedIssue: OpenIssue;
  questionThread: QuestionThread;
  issueAnswers: AnswerIssue[] = [];

  constructor(private route: ActivatedRoute,
    private portalService: PortalService,
    private distanceService: DistanceService,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("Activated Route");
      console.log(params);
      this.issueId = params.issueId;
      this.getCurrentOpenIssue(params.issueId);
    });
    // console.log(this.answer)
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

  getCurrentOpenIssue(issueId: any) {
    this.portalService.getOpenIssueWithId(issueId).then((data) => {
      if (!(data.length <= 0)) {
        this.openedIssue = data[0].attributes;
        this.issueAnswers = this.openedIssue.answers;
        let issueTags: string[] = this.openedIssue.childrenTags;
        issueTags.unshift(this.openedIssue.parentTag);
        this.questionThread = {
          username: this.openedIssue.username,
          answers: this.openedIssue.answers,
          distance: this.distanceService.calculateDistance(this.openedIssue.location),
          issueCodeDescription: this.openedIssue.issueCodeDescription,
          issueTags: issueTags,
          issueTextDescription: this.openedIssue.issueTextDescription,
          issueTitle: this.openedIssue.title,
          timestamp: this.openedIssue.timestamp
        }
      }
      console.log(this.questionThread);
    });
  }

  postAnswer() {
    let issueAnswer: AnswerIssue = {
      answerCodeDescription: this.answerCode,
      answerDescription: this.answer,
      user: this.userService.currentUser,
      timestamp: new Date().getTime()
    }
    // console.log(issueAnswer);
    let answerExists: Boolean;
    answerExists = this.issueAnswers.find(a => {return a.user.userId === this.userService.currentUser.userId}) == null ? false: true;
    console.log("Answer Exists: " + answerExists);
    if(answerExists == false) {
      this.issueAnswers.push(issueAnswer);
      this.portalService.saveIssueAnswerWithIssueId(this.issueAnswers, this.issueId).then((updatedIssue) => {
        console.log("Answered")
        console.log(updatedIssue);
        this.questionThread.answers = updatedIssue.attributes.answers;
        console.log(this.questionThread);
      });

    } else {
      console.log("Answer already exists")
    }
    
    console.log(this.issueAnswers)
  }

}