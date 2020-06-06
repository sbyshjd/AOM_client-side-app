import React, { Component } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import EventService from './service/EventService';
import { v4 as uuidv4 } from 'uuid';


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

const scheduleFromEvents = (events) => {
  const schedules = events.map(e => {
    const schedule={};
    schedule.id=e._id;
    schedule.calendarId=changeTypeToId(e.type);
    schedule.title=e.eventname;
    schedule.start=e.starttime;
    schedule.category= 'time';
    schedule.attendees=e.forwho.map(p=>p.username)
    schedule.end=e.endtime
    return schedule;
  })
  return schedules;
}

const changeTypeToId = (type) => {
  let id='';
  switch(type) {
    //'meeting','holiday','activity'
    case 'meeting':
      id='0';
      break;
    case 'holiday':
      id='1';
      break;
    case 'activity':
      id='2';
      break;
    default:
      id='0';
  }
  return id
}

const changeIdToType = (id) => {
  let type = '';
  switch(id) {
    case '0':
      type='meeting';
      break;
    case '1':
      type='holiday';
      break;
    case '2':
      type='activity';
    break;
    default:
      type='meeting';
  }
  return type;
}





//-------------------start of the calendar component--------------------------------
class DashCalendar extends Component {

  constructor(props) {
    super(props);
    this.state={

    }
    this.service = new EventService();
    //create a instance of the calendaar to use method
    this.cal=React.createRef();

  }

  repalceLocationwithDescription = (e) => {
    const locationElement = document.querySelector('.tui-full-calendar-popup-section-item.tui-full-calendar-section-location');
    console.log(locationElement);
    const locationInput = locationElement.querySelector('#tui-full-calendar-schedule-location');
    locationInput.placeholder='Description';
    
  }

  addProjects=() => {
    const locationElement = document.querySelector('.tui-full-calendar-popup-section-item.tui-full-calendar-section-location');
    locationElement.parentElement.insertAdjacentHTML('afterend','<select id="tui-full-calendar-schedule-project"style="z-index: 1004"></select>')
    const projects = document.querySelector('#tui-full-calendar-schedule-project');
    const optionArr = [1,2,3].map(n=>`<option>${n}</option>`).join('');
    projects.innerHTML=`<option>
                             Projects
                         </option>
                         ${optionArr}`
  }

  replaceStatewithOffice = (e) => {
    const stateElement = document.querySelector('.tui-full-calendar-icon.tui-full-calendar-ic-state');
    const sectionElement = stateElement.parentElement.parentElement;
    const defaultState = document.querySelector('#tui-full-calendar-schedule-state');
    defaultState.innerHTML='office';
    const lists = sectionElement.querySelectorAll('li')
    lists[0].children[1].innerHTML='office';
    lists[1].children[1].innerHTML='unoffice';
  }

  addTheColleaguesButton = (e) => {
    const stateElement = document.querySelector('.tui-full-calendar-icon.tui-full-calendar-ic-state');
    const sectionElement = stateElement.parentElement.parentElement;
    sectionElement.insertAdjacentHTML('afterend','<button id="pop-up-add-colleagues">add colleagues</button>');
    const addColleaguesButton = document.querySelector('#pop-up-add-colleagues');
    addColleaguesButton.addEventListener('click',()=> {
      const colleaguesList = document.querySelector('#colleagues-list');
      if(colleaguesList.style.visibility==='hidden') {
        colleaguesList.style.visibility='visible';
      } else {
        colleaguesList.style.visibility='hidden';
      }
      
    })
  }

  colleaguesList = () => {
    const addButton = document.querySelector('#pop-up-add-colleagues');
    addButton.insertAdjacentHTML('afterend','<div style="postion: relative;"><select style="visibility: hidden; position: absolute" id="colleagues-list" multiple></select></div>');
    const colleaguesArr = this.props.users.map(user=>`<option value="${user._id}">${user.username}</option>`).join('');
    const colleaguesSeclection = document.querySelector('#colleagues-list');
    colleaguesSeclection.innerHTML= colleaguesArr
  }

  hideTheAddColleagues = ()=> {
    this.showPopUp = false;
  }
  

  clickScheduleHandler = (e) => {
    console.log(e);
  }

  createScheduleHandler = (e) => {
    console.log(e);
    console.log(e.start._date.toISOString())
    //get the project info
    const project = document.querySelector('#tui-full-calendar-schedule-project');
    e.project=project.value;
    //get the description
    const descriptionInput = document.querySelector('#tui-full-calendar-schedule-location');
    e.description=descriptionInput.value;
    // get the forwho
    const colleaguesInput = document.querySelectorAll('#colleagues-list option:checked');
    const colleaguesArr = [...colleaguesInput].map(option => option.value)
    console.log(colleaguesArr);


    // const schedule= {
    //   id: uuidv4(),
    //   calendarId:e.calendarId,
    //   title:e.title,
    //   isAllDay:e.isAllDay,
    //   start:e.start,
    //   end:e.end,
    //   category:e.isAllDay ? 'allday':'time',
    //   dueDateClass:'',
    //   raw:{
    //     class:e.raw['class']
    //   },
    //   state:e.state
    // };
    
    // const calIns = this.cal.current.getInstance();
    // calIns.createSchedules([schedule]);
    //create the event property for the mongodb model
    const type = changeIdToType(e.calendarId);
    const eventname = e.title;
    const description = e.description;
    const starttime = e.start._date.toISOString();
    const endtime = e.end._date.toISOString();
    const owner = this.props.user._id;
    const forwho = colleaguesArr;
    const participants = [];
    //save the event into the backend database;
    this.service.create(type,eventname,description,starttime,endtime,owner,forwho,participants)
    .then(response => {
      this.props.reload();
    })
    .catch(err => console.log(err))


    
  }

  doubleClickHandler=(e) => {
    console.log(e.target)
    if(!e.target.classList.contains('tui-full-calendar-time-date-schedule-block-wrap') && !e.target.classList.contains('tui-full-calendar-weekday-schedules') && !e.target.classList.contains('tui-full-calendar-time-date')) {
      return;
    }
    this.repalceLocationwithDescription(e);
    this.replaceStatewithOffice(e);
    this.addTheColleaguesButton(e);
    this.colleaguesList();
    this.addProjects();
    console.log(e.target)
  }

//-------------------------- render method starts-----------------------------------------------
    render() {
        return (
            <div className='overflow-auto' style={{height:'650px'}} onDoubleClick={(e)=>this.doubleClickHandler(e)}>
                <Calendar
                ref={this.cal}
                height="900px"
                calendars={calendars}
                disableDblClick={false}
                disableClick={true}
                isReadOnly={false}
                month={{
                  startDayOfWeek: 0
                }}
                schedules={scheduleFromEvents(this.props.events)}
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