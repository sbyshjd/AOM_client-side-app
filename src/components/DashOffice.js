import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import Colleagues from './Colleagues';
import Events from './Events';

class DashOffice extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:this.props.user
        }
    }

    // eventsFilterHandler = (events) => {
    //    return  events.filter(e => {
    //         return e.mode==='group'&& (e.forwho.findIndex(user => user._id===this.props.user._id) >=0 || e.owner._id===this.props.user._id || e.isforall===true )
    //    })
    // }
    
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="events">
                    <Tab eventKey="events" title="Office Events">
                    <Events user={this.state.loggedUser} events={this.props.events} reload={()=>this.props.reload()}/>
                    </Tab>
                    <Tab eventKey="colleagues" title="Colleagues">
                    <Colleagues user={this.props.user} getAllUsers={()=>this.props.getAllUsers()} users={this.props.users}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default DashOffice;