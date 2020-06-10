import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Projects from './Projects';

class DashOffice extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
    }

    render() {
        return (
            <div>
                <Tabs defaultActiveKey="projects">
                    <Tab eventKey="projects" title="Projects">
                    <Projects users={this.props.users} user={this.props.user}/>
                    </Tab>
                    <Tab eventKey="planing" title="Planing">
                     planing
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default DashOffice;