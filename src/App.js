import React, { Component } from 'react';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

class App extends Component {
  render() {
    return (
      
      <Switch>
        <Route exact path='/' render={props => <Home {...props}/> }/>
        <Route exact path='/signup' render={props => <SignUp {...props}/> }/>
        <Route exact path='/login' render={props => <LogIn {...props}/> }/>
      </Switch>
      
    );
  }
}

export default App;
