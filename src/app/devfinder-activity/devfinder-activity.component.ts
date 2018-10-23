import { Component, OnInit } from '@angular/core';

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

  constructor() {
    Object.assign(this, {
      colorSets
    });
    this.calendarData = this.getCalendarData();
    this.setColorScheme('custom');
  }

  ngOnInit() {
    this.calendarData = this.getCalendarData();
  }

  title = 'calendarHeat';
  view: any[] = [800, 170];
  colorScheme: any;
  schemeType: string = 'ordinal';
  selectedColorScheme: string;
  rangeFillOpacity: number = 0.15;
  calendarData: any[];
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
        const value = dayOfWeek < 6 ? date.getMonth() + 1 : 0;

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