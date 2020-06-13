import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import DashUser from './DashUser';
import DashTimeRegister from './DashTimeRegister';

class DashMyPage extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="user-info">
                    <Tab eventKey="user-info" title="User-Info">
                    <DashUser user={this.props.user} getUser={this.props.getUser}/>
                    </Tab>
                    <Tab eventKey="time-register" title="Time-Registration">
                     <DashTimeRegister user={this.props.user} projects={this.props.projects} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default DashMyPage;