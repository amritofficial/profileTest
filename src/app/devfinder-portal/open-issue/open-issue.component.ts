import { Component, OnInit } from '@angular/core';
import { DevFinderTag } from 'app/shared/models/devfinder-tag';
import { PortalService } from 'app/shared/services/portal.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OpenIssue } from 'app/shared/models/open-issue';
import { UserService } from 'app/shared/services/user.service';
import { User } from 'app/shared/models/user';
import { LocationService } from 'app/shared/services/location.service';
import { DevfinderActivityService } from 'app/shared/services/devfinder-activity.service';
import { DevfinderActivity } from 'app/shared/models/activity';
import { Calendar } from 'app/shared/models/calendar';
import { Series } from 'app/shared/models/series';
import { Router, ActivatedRoute } from '@angular/router';


const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

@Component({
  selector: 'open-issue',
  templateUrl: './open-issue.component.html',
  styleUrls: ['./open-issue.component.css']
})
export class OpenIssueComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  activity: DevfinderActivity;
  calendar: Calendar[] = [];
  calendarData: Calendar[];

  devfinderTags: DevFinderTag[] = [
    {
      description: '',
      objectId: null,
      tagName: 'java'
    },
    {
      description: '',
      objectId: null,
      tagName: 'javascript'
    }
  ]
  codeActivated: boolean = false;
  issueTextDescription: string = '';
  issueCodeDescription: string = '';
  parentTag: string = '';
  parentTagObjectId: any;
  issueTitle: string = '';
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
  childTags: string[] = new Array();
  currentUser: User;

  constructor(private portalService: PortalService,
    private userService: UserService,
    private locationService: LocationService,
    private devfinderActivityService: DevfinderActivityService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.calendarData = this.getCalendarData();
  }

  ngOnInit() {
    this.userService.getCurrentUserDataFromFirebase().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((user: User) => {
        this.currentUser = user;
      });
    this.portalService.getAllDevFinderTags().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(devfinderTags => {
        this.devfinderTags = devfinderTags['results'];
      });
    this.createDevfinderActivity();
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
    this.childTags.push(event.value);
    console.log(this.childTags);
  }

  onTagRemoved(event) {
    this.childTags.splice(this.childTags.indexOf(event.value), 1);
    console.log(this.childTags);
  }

  selectedParentTag(selectedTag: DevFinderTag) {
    console.log(selectedTag);
    console.log(selectedTag.objectId);
    this.parentTag = selectedTag.tagName;
    this.parentTagObjectId = selectedTag.objectId;
  }

  openIssue() {
    let openIssueData: OpenIssue = {
      childrenTags: this.childTags,
      issueCodeDescription: this.issueCodeDescription,
      issueTextDescription: this.issueTextDescription,
      title: this.issueTitle,
      answers: [],
      objectId: null,
      parentTag: this.parentTag,
      parentTagObjectId: this.parentTagObjectId,
      timestamp: new Date().getTime(),
      userId: this.currentUser.userId,
      username: this.currentUser.username,
      location: this.locationService.currentLocation
    }
    console.log("Opened Issue")
    console.log(openIssueData);
    this.portalService.saveIssue(openIssueData).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        console.log("Issue Opened");
        console.log(data);
        let id = data['objectId'];
        this.router.navigate(['../question', id], { relativeTo: this.activatedRoute });
        this.updateActivity();
      });
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