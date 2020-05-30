import React, { Component } from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import AuthService from './components/service/AuthService';
import DashBoard from './components/DashBoard';
import DashTop from './components/DashTop';
import DashOffice from './components/DashOffice';
import DashUser from './components/DashUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      loggedUser:null,
    }
    this.service = new AuthService();
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
            <Route exact path='/' render={props => <DashOffice {...props} getUser={this.getTheUser} user={this.state.loggedUser} /> }/>
            <Route exact path='/user' render={props => <DashUser {...props} getUser={this.getTheUser} user={this.state.loggedUser} /> }/>
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
