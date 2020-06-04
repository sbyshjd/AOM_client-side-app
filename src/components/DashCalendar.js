import React, { Component } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";


const calendars=[
{
    id:'0',
    name:'Meeting',
    bgColor:'#5cb85c',
    borderColor: '#5cb85c'
},
{
    id:'1',
    name:'Holiday',
    bgColor:'#d9534f',
    borderColor:'#d9534f'
},
{
    id:'2',
    name:'Activity',
    bgColor:'#9e5fff',
    borderColor:'#9e5fff'
}
]

class DashCalendar extends Component {
    render() {
        return (
            <div className='overflow-auto' style={{height:'650px'}}>
                <Calendar
    height="900px"
    calendars={calendars}
    disableDblClick={false}
    disableClick={true}
    isReadOnly={false}
    month={{
      startDayOfWeek: 0
    }}
    schedules={[
      {
        id: '1',
        calendarId: '1',
        title: 'TOAST UI Calendar Study',
        category: 'time',
        dueDateClass: '',
        // start: today.toISOString(),
        start:'2020-06-04T14:48:00.000Z',
        // end: getDate('hours', today, 3, '+').toISOString()
        end:'2020-06-04T15:48:00.000Z'
      },
      {
        id: '2',
        calendarId: '2',
        title: 'Practice',
        category: 'milestone',
        dueDateClass: '',
        // start: getDate('date', today, 1, '+').toISOString(),
        // end: getDate('date', today, 1, '+').toISOString(),
        start:'2020-06-05T14:48:00.000Z',
        end:'2020-06-05T15:48:00.000Z',

        isReadOnly: true
      },
      {
        id: '3',
        calendarId: '3',
        title: 'FE Workshop',
        category: 'allday',
        dueDateClass: '',
        // start: getDate('date', today, 2, '-').toISOString(),
        // end: getDate('date', today, 1, '-').toISOString(),
        start:'2020-06-03T14:48:00.000Z',
        end:'2020-06-03T15:48:00.000Z',
        isReadOnly: true
      },
      {
        id: '4',
        calendarId: '2',
        title: 'Report',
        category: 'time',
        dueDateClass: '',
        // start: today.toISOString(),
        // end: getDate('hours', today, 1, '+').toISOString()
        start:'2020-06-03T14:48:00.000Z',
        end:'2020-06-03T15:48:00.000Z',

      }
    ]}
    scheduleView
    taskView={false}
    template={{
      milestone(schedule) {
        return `<span style="color:#fff;background-color: ${schedule.bgColor};">${
          schedule.title
        }</span>`;
      },
      milestoneTitle() {
        return 'Milestone';
      },
      allday(schedule) {
        return `${schedule.title}<i class="fa fa-refresh"></i>`;
      },
      alldayTitle() {
        return 'All Day';
      }
    }}
    // theme={myTheme}
    // timezones={[
    //   {
    //     timezoneOffset: 540,
    //     displayLabel: 'GMT+09:00',
    //     tooltip: 'Seoul'
    //   },
    //   {
    //     timezoneOffset: -420,
    //     displayLabel: 'GMT-08:00',
    //     tooltip: 'Los Angeles'
    //   }
    // ]}
    useDetailPopup={true}
    useCreationPopup={true}
    // view={selectedView} // You can also set the `defaultView` option.
    view='week'
    week={{
    //   showTimezoneCollapseButton: true,
    //   timezonesCollapsed: true
        startDayOfWeek:1,
        narrowWeekend:true,
        hourStart:7,
        hourEnd:22
    }}
  />
            </div>
        );
    }
}

export default DashCalendar;