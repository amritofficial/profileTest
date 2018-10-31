import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { PortalService } from 'app/shared/services/portal.service';
import { OpenIssue } from 'app/shared/models/open-issue';
import { QuestionThread } from 'app/shared/view-models/question-thread';
import { DistanceService } from 'app/shared/services/distance.service';
import { AnswerIssue } from 'app/shared/models/answer-issue';
import { UserService } from 'app/shared/services/user.service';
import { DevfinderActivity } from 'app/shared/models/activity';
import { Calendar } from 'app/shared/models/calendar';
import { Series } from 'app/shared/models/series';
import { DevfinderActivityService } from 'app/shared/services/devfinder-activity.service';

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

@Component({
  selector: 'question-thread',
  templateUrl: './question-thread.component.html',
  styleUrls: ['./question-thread.component.css']
})
export class QuestionThreadComponent implements OnInit, OnChanges {
  private ngUnsubscribe = new Subject();
  @ViewChild("codeTextArea") codeTextArea: ElementRef;
  activity: DevfinderActivity;
  calendar: Calendar[] = [];
  calendarData: Calendar[];

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
    private userService: UserService,
    private devfinderActivityService: DevfinderActivityService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log("Activated Route");
      console.log(params);
      this.issueId = params.issueId;
      this.getCurrentOpenIssue(params.issueId);
    });
    this.createDevfinderActivity();
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
          objectId: null,
          username: this.openedIssue.username,
          answers: this.openedIssue.answers,
          distance: this.distanceService.calculateDistance(this.openedIssue.location),
          issueCodeDescription: this.openedIssue.issueCodeDescription,
          issueTags: issueTags,
          issueTextDescription: this.openedIssue.issueTextDescription,
          issueTitle: this.openedIssue.title,
          timestamp: this.openedIssue.timestamp,
          userId: this.openedIssue.userId
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
        this.updateActivity();
      });

    } else {
      console.log("Answer already exists")
    }
    this.answer = "";
    this.answerCode = "";
    console.log(this.issueAnswers)
  }

  updateActivity() {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);

    let series = this.calendarData[this.calendarData.length - 1].series;
    const date = new Date();
    let seriesArray: any[] = this.calendarData[this.calendarData.length - 1].series;
    let found = false;
    for (var i = 0; i < seriesArray.length; i++) {
      if (seriesArray[i].name == weekdayName.format(date)) {
        found = true;
        this.calendarData[this.calendarData.length - 1].series[i].value += 1;
        break;
      }
    }
    if (found == false) {
      this.calendarData[this.calendarData.length - 1].series.push({
        date: new Date(),
        name: weekdayName.format(date),
        value: 1
      });
    }
    console.log("value should be inserted")
    console.log(this.calendarData);
    this.devfinderActivityService.updateActivity(this.userService.getCurrentUserId(), this.calendarData);
    // console.log(series)
  }

  createDevfinderActivity() {
    // initializing object
    let activity: DevfinderActivity = {
      calendar: this.calendarData,
      userId: this.userService.getCurrentUserId()
    }
    this.devfinderActivityService.getActivity(this.userService.getCurrentUserId()).then((data) => {
      if (data.length != 0) {
        console.log(data)
        this.activity = data[0].attributes;
        // to convert calendar series date from string to Date Format
        this.activity.calendar.forEach(calendar => {
          let calendarData: Calendar = {
            name: calendar.name,
            series: []
          }
          let seriesData: Series[] = [];
          calendar.series.forEach((series, i) => {
            let sd: Series = {
              name: series.name,
              value: series.value,
              date: new Date(JSON.parse(JSON.stringify(series.date)))
            }
            seriesData.push(sd);
          });
          calendarData.series = seriesData;
          this.calendar.push(calendarData);
        });
        this.calendarData = this.calendar;
        // the following code is to insert an empty cell into the table everytime the day changes

        // today
        const now = new Date();
        const todaysDay = now.getDate();
        const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

        // Monday
        const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
        const thisMondayDay = thisMonday.getDate();
        const thisMondayYear = thisMonday.getFullYear();
        const thisMondayMonth = thisMonday.getMonth();
        const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);

        let series = this.calendarData[this.calendarData.length - 1].series;
        const date = new Date();
        let seriesArray: any[] = this.calendarData[this.calendarData.length - 1].series;
        // perform a check if the day exists in the calendar
        if (seriesArray.length >= 0) {
          let found = true;
          // it will insert that day if it doesnt exist
          let seriesDay = seriesArray.find(s => { return s.name == weekdayName.format(date) });
          if (seriesDay == undefined) {
            found = false;
            this.calendarData[this.calendarData.length - 1].series.push({
              date: new Date(),
              name: weekdayName.format(date),
              value: 0
            });
            this.devfinderActivityService.updateActivity(this.userService.getCurrentUserId(), this.calendarData);
          }
          else {
            found = true;
          }

          if (found == false) {
            this.calendar = [];
            this.devfinderActivityService.getActivity(this.userService.getCurrentUserId()).then((data) => {
              if (data.length != 0) {
                this.activity = data[0].attributes;
                this.activity.calendar.forEach(calendar => {
                  let calendarData: Calendar = {
                    name: calendar.name,
                    series: []
                  }
                  let seriesData: Series[] = [];
                  calendar.series.forEach((series, i) => {
                    let sd: Series = {
                      name: series.name,
                      value: series.value,
                      date: new Date(JSON.parse(JSON.stringify(series.date)))
                    }
                    seriesData.push(sd);
                  });
                  calendarData.series = seriesData;
                  this.calendar.push(calendarData);
                });
                this.calendarData = this.calendar
              }
            });
          } else if (found == true) {
            console.log("Day Found");
            this.calendarData = this.calendar;
          }
          // if it exists continue doing the same thing
        }
        // this.calendarData = this.calendar;

      }
      else {
        this.calendarData = this.getCalendarData();
        let activity: DevfinderActivity = {
          calendar: this.calendarData,
          userId: this.userService.getCurrentUserId()
        }
        this.devfinderActivityService.createActivity(activity).subscribe(data => {
          console.log(data);
          console.log("SAVED ACTIVITY");
        });
      }
    });
  }

  getCalendarData(): any[] {
    // today
    const now = new Date();
    const todaysDay = now.getDate();
    const thisDay = new Date(now.getFullYear(), now.getMonth(), todaysDay);

    // Monday
    const thisMonday = new Date(thisDay.getFullYear(), thisDay.getMonth(), todaysDay - thisDay.getDay() + 1);
    const thisMondayDay = thisMonday.getDate();
    const thisMondayYear = thisMonday.getFullYear();
    const thisMondayMonth = thisMonday.getMonth();

    // 52 weeks before monday
    const calendarData = [];
    const getDate = d => new Date(thisMondayYear, thisMondayMonth, d);
    for (let week = -52; week <= 0; week++) {
      const mondayDay = thisMondayDay + week * 7;
      const monday = getDate(mondayDay);

      // one week
      const series = [];
      for (let dayOfWeek = 7; dayOfWeek > 0; dayOfWeek--) {
        const date = getDate(mondayDay - 1 + dayOfWeek);

        // skip future dates
        if (date > now) {
          continue;
        }

        // value
        // const value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;
        const value = 0;

        series.push({
          date,
          name: weekdayName.format(date),
          value
        });
      }

      calendarData.push({
        name: monday.toString(),
        series
      });
    }
    console.log(calendarData);
    return calendarData;
  }

}