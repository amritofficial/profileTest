import { Component, OnInit } from '@angular/core';
import { DevfinderActivity } from 'app/shared/models/activity';
import { UserService } from 'app/shared/services/user.service';
import { DevfinderActivityService } from 'app/shared/services/devfinder-activity.service';
import { Calendar } from 'app/shared/models/calendar';
import { Series } from 'app/shared/models/series';

const monthName = new Intl.DateTimeFormat('en-us', { month: 'short' });
const weekdayName = new Intl.DateTimeFormat('en-us', { weekday: 'short' });

function multiFormat(value) {
  if (value < 1000) return `${value.toFixed(2)}ms`;
  value /= 1000;
  if (value < 60) return `${value.toFixed(2)}s`;
  value /= 60;
  if (value < 60) return `${value.toFixed(2)}mins`;
  value /= 60;
  return `${value.toFixed(2)}hrs`;
}


@Component({
  selector: 'devfinder-activity',
  templateUrl: './devfinder-activity.component.html',
  styleUrls: ['./devfinder-activity.component.css']
})
export class DevfinderActivityComponent implements OnInit {
  activity: DevfinderActivity;
  calendar: Calendar[] = [];
  title = 'calendarHeat';
  view: any[] = [800, 170];
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;
  calendarData: Calendar[];
  showLegend = false;
  gradient = false;
  showXAxis = true;
  showYAxis = true;
  innerPadding = '10%';
  tooltipDisabled = false;
  chartType = "calendar";
  width: number = 1000;
  height: number = 300;
  colorSets: any;


  constructor(private devfinderActivityService: DevfinderActivityService,
    private userService: UserService) {
    Object.assign(this, {
      colorSets
    });
    this.calendarData = this.getCalendarData();
    this.setColorScheme('custom');
  }

  ngOnInit() {
    this.calendarData = this.getCalendarData();
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
          for (var i = 0; i < seriesArray.length; i++) {
            if (seriesArray[i].name != weekdayName.format(date)) {
              found = false;
              this.calendarData[this.calendarData.length - 1].series.push({
                date: new Date(),
                name: weekdayName.format(date),
                value: 0
              });
              this.devfinderActivityService.updateActivity(this.userService.getCurrentUserId(), this.calendarData);
              break;
            }
          }

          if (found == false) {
            this.devfinderActivityService.getActivity(this.userService.getCurrentUserId()).then((data) => {
              if (data.length != 0) {
                this.calendar = data[0].attributes;
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
        this.devfinderActivityService.createActivity(activity).subscribe(data => {
          console.log(data);
          console.log("SAVED ACTIVITY");
        });
      }
    });
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }

  calendarAxisTickFormatting(mondayString: string) {
    const monday = new Date(mondayString);
    const month = monday.getMonth();
    const day = monday.getDate();
    const year = monday.getFullYear();
    const lastSunday = new Date(year, month, day - 1);
    const nextSunday = new Date(year, month, day + 6);
    return lastSunday.getMonth() !== nextSunday.getMonth() ? monthName.format(nextSunday) : '';
  }

  calendarTooltipText(c): string {
    return `
      <span class="tooltip-label">${c.label} • ${c.cell.date.toLocaleDateString()}</span>
      <span class="tooltip-val">${c.data.toLocaleString()}</span>
    `;
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

  select(data) {
    console.log('Item clicked', data);
  }

  saveActivity() {
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
    console.log("value should be inserted")
    console.log(this.calendarData);
    this.devfinderActivityService.updateActivity(this.userService.getCurrentUserId(), this.calendarData);
    // console.log(series)
  }

}

export let colorSets = [
  {
    name: 'custom',
    selectable: true,
    group: 'Ordinal',
    domain: [
      '#e8eef1', '#2e7fc2'
    ]
  }
]