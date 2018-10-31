import { Component, OnInit } from '@angular/core';
import { DevfinderActivity } from 'app/shared/models/activity';
import { Calendar } from 'app/shared/models/calendar';
import { DevfinderActivityService } from 'app/shared/services/devfinder-activity.service';
import { UserService } from 'app/shared/services/user.service';
import { Series } from 'app/shared/models/series';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  selector: 'guest-devfinder-activity',
  templateUrl: './guest-devfinder-activity.component.html',
  styleUrls: ['./guest-devfinder-activity.component.css']
})
export class GuestDevfinderActivityComponent implements OnInit {
  private ngUnsubscribe = new Subject();

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
  guestId: any;


  constructor(private devfinderActivityService: DevfinderActivityService,
    private userService: UserService,
    private route: ActivatedRoute) {
    Object.assign(this, {
      colorSets
    });
    this.setColorScheme('custom');
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe((params) => {
      this.guestId = params.guestId;
      this.getDevfinderActivity(this.guestId);
    });
  }

  getDevfinderActivity(guestId: any) {
    this.devfinderActivityService.getActivity(guestId).then((data) => {
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
      }
    });
    console.log("From Guest Component");
    console.log(this.calendarData);
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

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
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