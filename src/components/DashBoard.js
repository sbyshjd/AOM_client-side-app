import React, { Component } from 'react';
import AuthService from './service/AuthService';
import { Redirect } from 'react-router-dom';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:null
        }
        this.service=new AuthService();
    }

    logout =() => {
        this.service.logout()
        .then(response => {
            this.setState({
                loggedUser:null
            })
            this.props.getUser(null);
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state, loggedUser:nextProps['user']
        })
    }

    render() {
        if(!this.state.loggedUser) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                dashboard page
                <button onClick={(e)=>this.logout(e)}>Log Out</button>
            </div>
        );
    }
}

export default DashBoard;