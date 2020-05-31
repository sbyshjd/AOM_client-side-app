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
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="events">
                    <Tab eventKey="events" title="Office Events">
                    <Events user={this.state.loggedUser}/>
                    </Tab>
                    <Tab eventKey="colleagues" title="Colleagues">
                    <Colleagues />
                    </Tab>
                    <Tab eventKey="info" title="Office Information">
                    office-infomation
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default DashOffice;