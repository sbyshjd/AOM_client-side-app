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
];

const schedules = [
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
    attendees:['1','2'],
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
];







//-------------------start of the calendar component--------------------------------
class DashCalendar extends Component {

  constructor(props) {
    super(props);
    this.state={
      showPopUp:false
    }
    this.project = '';
  }

  repalceLocationwithProject = (e) => {
    if(!e.target.classList.contains('tui-full-calendar-time-date-schedule-block-wrap') && !e.target.classList.contains('tui-full-calendar-weekday-schedules')) {
      return;
    }
    const locationElement = document.querySelector('.tui-full-calendar-popup-section-item.tui-full-calendar-section-location');
    locationElement.style.display='none';
    const sectionElement = locationElement.parentElement;
    const optionArr = [1,2,3].map(n=>`<option class="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item" data-calendar-id="0"><span class="tui-full-calendar-content">${n}</span></option>`).join('');
    sectionElement.className = '';
//     sectionElement.classList.add('tui-full-calendar-popup-section','tui-full-calendar-dropdown','tui-full-calendar-close', 'tui-full-calendar-section-calendar')
//     sectionElement.innerHTML=`<button class="tui-full-calendar-button tui-full-calendar-dropdown-button tui-full-calendar-popup-section-item">
//     <span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color: #5cb85c"></span>
//     <span id="tui-full-calendar-schedule-calendar" class="tui-full-calendar-content">Project</span>
//     <span class="tui-full-calendar-icon tui-full-calendar-dropdown-arrow"></span>
// </button>
// <ul id="tui-full-calendar-schedule-project" class="tui-full-calendar-dropdown-menu" style="z-index: 1004">
//                     <li class="tui-full-calendar-popup-section-item tui-full-calendar-dropdown-menu-item" data-calendar-id="0">
//                         <span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color: #5cb85c"></span>
//                         <span class="tui-full-calendar-content">Meeting</span>
//                     </li>
//                     ${optionArr}
//             </ul>
//     </div>`
    sectionElement.innerHTML=`<select id="tui-full-calendar-schedule-project"style="z-index: 1004">
                         <option>
                             <span class="tui-full-calendar-icon tui-full-calendar-calendar-dot" style="background-color: #5cb85c"></span>
                             <span class="tui-full-calendar-content">Meeting</span>
                         </option>
                         ${optionArr}
                 </select>`
    const projectInput = document.querySelector('#tui-full-calendar-schedule-project');
    projectInput.addEventListener('click',(e)=> {
      this.project=e.target;
      console.log(e.target);
    })
  }

  replaceStatewithColleagues = (e) => {
    if(!e.target.classList.contains('tui-full-calendar-time-date-schedule-block-wrap') && !e.target.classList.contains('tui-full-calendar-weekday-schedules')) {
      return;
    }
    const stateElement = document.querySelector('.tui-full-calendar-icon.tui-full-calendar-ic-state');
    const sectionElement = stateElement.parentElement.parentElement;
    sectionElement.className='';
    sectionElement.innerHTML=`<button>add colleagues</button>`
   console.log(stateElement);
  }

  calendarRef = React.createRef();

  clickScheduleHandler = (e) => {
    console.log(e);
  }

  createScheduleHandler = (e) => {
    e.project='project';
    console.log(e);
    
  }

  doubleClickHandler=(e) => {
    this.repalceLocationwithProject(e);
    this.replaceStatewithColleagues(e);
    console.log(e.target)
  }

    render() {
        return (
            <div className='overflow-auto' style={{height:'650px'}} onDoubleClick={(e)=>this.doubleClickHandler(e)}>
                <Calendar
                ref={this.calendarRef}
                height="900px"
                calendars={calendars}
                disableDblClick={false}
                disableClick={true}
                isReadOnly={false}
                month={{
                  startDayOfWeek: 0
                }}
                schedules={schedules}
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

                useDetailPopup={true}
                useCreationPopup={true}
                view='week'
                // onClickSchedule={onClickSchedule}
                week={{
                  startDayOfWeek:1,
                  narrowWeekend:true,
                  hourStart:7,
                  hourEnd:22
                }}
                onClickSchedule={this.clickScheduleHandler}
                onBeforeCreateSchedule={this.createScheduleHandler}
                onClickDayname
              />
            </div>
            
        );
    }
}

export default DashCalendar;