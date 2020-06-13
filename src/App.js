import React, { Component } from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import AuthService from './components/service/AuthService';
import DashBoard from './components/DashBoard';
import DashTop from './components/DashTop';
import DashOffice from './components/DashOffice';
import DashMyPage from './components/mypage/DashMyPage';
import DashCalendar from './components/DashCalendar';
import DashProjects from './components/projects/DashProjects';


import EventService from './components/service/EventService';
import ProjectService from './components/service/ProjectService';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedUser:null,
      events:[],
      projects:[],
      calendarEvents:[],
      users:[],
      calendarUserIds:[]
    }
    this.service = new AuthService();
    this.eventService = new EventService();
    this.projectService = new ProjectService();
  }

  componentDidMount() {
    //get all the events from database
    this.eventService.get()
    .then(response => {
      this.setState({
        events:response,
        calendarEvents:response
      })
    })
    //get all the users
    this.service.getAllTheUsers()
    .then(response => {
      const userIds = response.map(u => u._id)
      this.setState({
        users:response,
        calendarUserIds:userIds
      })
    })

    //get all the projects from database
    this.projectService.get()
    .then(response => {
        this.setState({
            projects: response
        })
    })

  }
//check if events need to render in the calendar
  qualifyEvent =(event,ids)=> {
    let isOwner = ids.includes(event.owner._id)
    let eventParticipantsId = event.forwho.map(p => p._id);
    let isParticipants = eventParticipantsId.some(id => ids.includes(id))
    return isOwner || isParticipants;
  }
  //get the users for calendar render
  calendarEventsByUserId = (ids) => {
    const calendarEvents = this.state.events.filter(e => this.qualifyEvent(e,ids));
    this.setState({
      calendarUserIds:ids,
      calendarEvents:calendarEvents
    })

  }

  //get all the events from database

  getAllTheEvents=() => {
    this.eventService.get()
    .then(response => {
      this.setState({
        events:response,
        calendarEvents:response.filter(e => this.qualifyEvent(e,this.state.calendarUserIds))
      })
    })
  }



  getTheUser=(user)=> {
    this.setState({
      loggedUser:user
    })
  }

  checkAuth=() => {
    if(this.state.loggedUser===null) {
      this.service.isLogged()
    .then(response => {
      this.setState({
        loggedUser:response
      })
    })
    .catch(err => {
      this.setState({
        loggedUser:false
      })
    })
    }
  }



  render() {
    this.checkAuth();
    if(this.state.loggedUser) {
      return (
         <div id='dashboard' className='d-flex'>
            <Route path='/' render={props => <DashBoard {...props} getUser={this.getTheUser} user={this.state.loggedUser} /> }/>
            <div style={{width:'100%'}}>
            <Route path='/' render={props => <DashTop {...props} getUser={this.getTheUser} user={this.state.loggedUser} /> }/>
            <Route exact path='/office' render={props => <DashOffice {...props} getUser={this.getTheUser} user={this.state.loggedUser} events={this.state.events} reload={()=>this.getAllTheEvents()} /> }/>
            <Route exact path='/user' render={props => <DashMyPage {...props} getUser={this.getTheUser} user={this.state.loggedUser} projects={this.state.projects} /> }/>
            <Route exact path='/projects' render={props => <DashProjects {...props} getUser={this.getTheUser} user={this.state.loggedUser} users={this.state.users} /> }/>
            <Route exact path='/calendar' render={props => <DashCalendar {...props} reload={()=>this.getAllTheEvents()} users={this.state.users} events={this.state.calendarEvents} renderedEvents={this.calendarEventsByUserId} getUser={this.getTheUser} user={this.state.loggedUser} projects={this.state.projects}/>}/>
            </div>
            
        </div>
      )
    }
    return (
      
      <Switch>
        <Route exact path='/' render={props => <Home {...props}/> }/>
        <Route exact path='/signup' render={props => <SignUp {...props} getUser={this.getTheUser}/> }/>
        <Route exact path='/login' render={props => <LogIn {...props} getUser={this.getTheUser}/> }/>
      </Switch>
      
    );
  }
}

export default App;
