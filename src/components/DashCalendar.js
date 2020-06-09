import React, { Component } from 'react';
import Calendar from '@toast-ui/react-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";
import EventService from './service/EventService';
import moment from 'moment';
import CalendarColleagueList from './CalendarColleagueList';


const calendars=[
{
    id:'0',
    name:'Meeting',
    bgColor:'#5cb85c',
    borderColor: '#5cb85c',
    dragBgColor:'#b8ffb8'
},
{
    id:'1',
    name:'Holiday',
    bgColor:'#d9534f',
    borderColor:'#d9534f',
    dragBgColor:'#ffb2b0'
},
{
    id:'2',
    name:'Activity',
    bgColor:'#5bc0de',
    borderColor:'#5bc0de',
    dragBgColor:'#c9f3ff'
}
];

const scheduleFromEvents = (events) => {
  const schedules = events.map(e => {
    const schedule={};
    schedule.id=e._id;
    schedule.calendarId=changeTypeToId(e.type);
    schedule.title=e.eventname;
    schedule.body = e.description;
    schedule.start=e.starttime;
    schedule.category= 'time';
    schedule.attendees=e.forwho.map(p=>p.username);
    schedule.end=e.endtime;
    schedule.isAllDay = e.isallday;
    schedule.state=e.mode;
    schedule.raw=e.project;
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
      monday:'',
      sunday:''
    };
    this.service = new EventService();
    this.showDeleteModal = false;
    //create a instance of the calendaar to use method
    this.cal=React.createRef();
  }


  repalceLocationwithDescription = () => {
    const locationElement = document.querySelector('.tui-full-calendar-popup-section-item.tui-full-calendar-section-location');
    if(!locationElement) {
      return;
    }
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

  hideCalendarState = () => {
    const stateElement = document.querySelector('.tui-full-calendar-popup-section.tui-full-calendar-dropdown.tui-full-calendar-close.tui-full-calendar-section-state');
    stateElement.style.display='none';
  }

  replaceStatewithOffice = () => {
    const stateElement = document.querySelector('.tui-full-calendar-popup-section.tui-full-calendar-dropdown.tui-full-calendar-close.tui-full-calendar-section-state');
    stateElement.insertAdjacentHTML('afterend','<div id="tui-full-calendar-schedule-office"></div>')
    const officeElement = document.querySelector('#tui-full-calendar-schedule-office')
    officeElement.innerHTML = '<select id="calendar-state-select"></select>'
    const officeSelect = document.querySelector('#calendar-state-select');
    officeSelect.innerHTML = '<option value="group" selected>group</opyion value="self"><option>self</option>'
  }

  addTheColleaguesButton = () => {
    const officeElement = document.querySelector('#tui-full-calendar-schedule-office')
    officeElement.insertAdjacentHTML('afterend','<button id="pop-up-add-colleagues">add colleagues</button>');
    const addColleaguesButton = document.querySelector('#pop-up-add-colleagues');
    addColleaguesButton.addEventListener('click',()=> {
      const colleaguesList = document.querySelector('#colleagues-list');
      if(colleaguesList.style.visibility==='hidden') {
        colleaguesList.style.visibility='visible';
      } else {
        colleaguesList.style.visibility='hidden';
      }
    })

    const stateSelect = document.querySelector('#calendar-state-select');
    stateSelect.addEventListener("change", ()=> {
      const colleaguesList = document.querySelector('#colleagues-list');
      if(stateSelect.value==='self') {
        addColleaguesButton.style.visibility='hidden';
        colleaguesList.style.visibility='hidden';
        return;
      } else {
        addColleaguesButton.style.visibility='visible';
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
  
//change the detail pop up layout to show more detail information
  clickScheduleHandler = (e) => {
    const detailPopUp = document.querySelector('.tui-full-calendar-popup.tui-full-calendar-popup-detail .tui-full-calendar-popup-container .tui-full-calendar-popup-section.tui-full-calendar-section-header div')
    detailPopUp.insertAdjacentHTML('afterend',`<div>description</div>`)
    console.log(detailPopUp);
    console.log(e);
  }

  createScheduleHandler = (e) => {

    console.log(e);
    console.log(e.start._date.toISOString())
    //get the project info
    const projectInput = document.querySelector('#tui-full-calendar-schedule-project');
    e.raw=projectInput.value;
    const project = e.raw;
    //get the description
    const descriptionInput = document.querySelector('#tui-full-calendar-schedule-location');
    e.body=descriptionInput.value;
    // get the forwho
    const colleaguesInput = document.querySelectorAll('#colleagues-list option:checked');
    const colleaguesArr = [...colleaguesInput].map(option => option.value)
    console.log(colleaguesArr);
    //get the group-self option;
    const stateSelect = document.querySelector('#calendar-state-select');
    e.state = stateSelect.value;
    //get is allday property;
    const isallday = e.isAllDay;
    const type = changeIdToType(e.calendarId);
    const eventname = e.title;
    const description = e.body;
    const starttime = e.start._date.toISOString();
    const endtime = e.end._date.toISOString();
    const owner = this.props.user._id;
    const mode = e.state;
    //assign the forwho
    let forwho = [this.props.user._id];
    if(mode==='group') {
      if(!colleaguesArr.includes(this.props.user._id)) {
        colleaguesArr.unshift(this.props.user._id)
      }
      forwho = colleaguesArr
    }
    const participants = [];
    //save the event into the backend database;
    this.service.create(type,eventname,description,starttime,endtime,owner,mode,forwho,participants,isallday,project)
    .then(response => {
      this.props.reload();
    })
    .catch(err => console.log(err))
  }

  deleteScheduleHandler= (e) => {
    // console.log(e);
    const confirmBox = window.confirm('Do you want to delete this event?');
    if(confirmBox) {
    //delete the event from the backend database
    this.service.delete(e.schedule.id)
    .then(response => {
      this.props.reload();
    })
    .catch(err => console.log(err))
    } else {
      console.log('cancel')
    }
  }

  doubleClickHandler=(e) => {
    console.log(e.target)
    if(!e.target.classList.contains('tui-full-calendar-time-date-schedule-block-wrap') && !e.target.classList.contains('tui-full-calendar-weekday-schedules') && !e.target.classList.contains('tui-full-calendar-time-date')) {
      return;
    }
    this.repalceLocationwithDescription();
    this.replaceStatewithOffice();
    this.hideCalendarState();
    this.addTheColleaguesButton();
    this.colleaguesList();
    this.addProjects();
  }

  dragHandler=(e) => {

    if(!e.target.classList.contains('tui-full-calendar-time-guide-creation') && !e.target.classList.contains('tui-full-calendar-time-guide-creation-label')) {
      return;
    }
    const calIns = this.cal.current.getInstance();
    calIns.render();
    //use set timeout to excute the callback
    setTimeout(()=>{
          this.repalceLocationwithDescription();
    this.replaceStatewithOffice();
    this.hideCalendarState();
    this.addTheColleaguesButton();
    this.colleaguesList();
    this.addProjects();
    },0)
    // const floatingLayer = document.querySelector('.tui-full-calendar-floating-layer')
    //     console.log(floatingLayer)
    // this.repalceLocationwithDescription();
    // this.replaceStatewithOffice();
    // this.hideCalendarState();
    // this.addTheColleaguesButton();
    // this.colleaguesList();
    // this.addProjects();
  }

// the update button click to show the update pop up widnow
  updateClickHandler=(e) => {
    if(!e.target.classList.contains('tui-full-calendar-popup-edit') && !e.target.parentElement.classList.contains('tui-full-calendar-popup-edit')) {
      return;
    }

    this.repalceLocationwithDescription();
    this.replaceStatewithOffice();
    this.hideCalendarState();
    this.addTheColleaguesButton();
    this.colleaguesList();
    this.addProjects();
  }

// update the schedule;
  updateScheduleHandler=(e) => {
    console.log(e);
    console.log(e.start._date.toISOString())
    console.log(e.schedule.id);
    //get the project info
    const projectInput = document.querySelector('#tui-full-calendar-schedule-project');
    e.schedule.project= projectInput ? projectInput.value : e.schedule.project;
    //get the description
    const descriptionInput = document.querySelector('#tui-full-calendar-schedule-location');
    const description = descriptionInput ? descriptionInput.value : e.schedule.body;
    // get the forwho
    const colleaguesInput = document.querySelectorAll('#colleagues-list option:checked');
    const invitedUsers = this.props.users.filter(user => e.schedule.attendees.some(username=>username===user.username))
    console.log(e.schedule.attendees);
    const colleaguesArr = colleaguesInput.length > 0 ? [...colleaguesInput].map(option => option.value) : invitedUsers.map(user => user._id);
    const forwho = colleaguesArr;
     //get the group-self option;
     const stateSelect = document.querySelector('#calendar-state-select');
     const mode = stateSelect ?  stateSelect.value : e.schedule.state;

    const type = changeIdToType(e.changes.calendarId || e.schedule.calendarId);
    const eventname = e.changes.title || e.schedule.title;
    const starttime = e.changes.start ? e.changes.start._date.toISOString() : e.schedule.start._date.toISOString();
    const endtime = e.changes.end ? e.changes.end._date.toISOString() : e.schedule.end._date.toISOString();
    //send the update schedule to database
    this.service.edit(type,eventname,description,starttime,endtime,mode,e.schedule.id)
    .then(response => {
      this.props.reload();
      return this.service.invite(forwho,e.schedule.id)
    })
    .then(response => {
      this.props.reload();
    })
    .catch(err => console.log(err))
  }

  nextButtonHandler=() => {
    const calIns = this.cal.current.getInstance();
    calIns.next();
    this.setState({
      monday:calIns.getDateRangeStart(),
      sunday:calIns.getDateRangeEnd()
    })
  }

  prevButtonHandler=() => {
    const calIns = this.cal.current.getInstance();
    calIns.prev();
    this.setState({
      monday:calIns.getDateRangeStart(),
      sunday:calIns.getDateRangeEnd()
    })
  }
  moveToToday=() => {
    const calIns = this.cal.current.getInstance();
    calIns.setDate(new Date())
  }

//-------------------------- render method starts-----------------------------------------------
    render() {
      // console.log(moment().isoWeekday(1).format('YYYY MMM DD'))
        return (
            <div className='overflow-auto d-flex' style={{height:'650px'}} onDoubleClick={(e)=>this.doubleClickHandler(e)} onClick={(e)=>this.updateClickHandler(e)} onMouseUp={(e)=>this.dragHandler(e)}>
            <CalendarColleagueList
              users={this.props.users}
              rerenderCalendar = {this.props.renderedEvents}
            />
            <div style={{width:'100%'}}>  
              <div className='d-flex'>
                <button onClick={this.moveToToday}>{'today'}</button> <button onClick={this.prevButtonHandler}>{'<'}</button> <button onClick={this.nextButtonHandler}>{'>'}</button> 
                <p>{moment(this.state.monday._date).format('YYYY MMM DD') || moment().isoWeekday(1).format('YYYY MMM DD')}-{moment(this.state.sunday._date).format('YYYY MMM DD') || moment().isoWeekday(7).format('YYYY MMM DD')}</p>
              </div>
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
                onBeforeDeleteSchedule={this.deleteScheduleHandler}
                onBeforeUpdateSchedule={this.updateScheduleHandler}
                onClickDayname
              />
            </div>
              
            </div>
            
        );
    }
}

export default DashCalendar;