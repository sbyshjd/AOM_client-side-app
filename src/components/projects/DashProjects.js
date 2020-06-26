import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Projects from './Projects';
import ProjectService from '../service/ProjectService';
import TaskService from '../service/TaskService';
import Planing from './Planing';
import ProjectsEmployee from './ProjectsEmployee';

class DashProjects extends Component {
    constructor(props) {
        super(props);
        this.state={
            tasks:[],
            isAdmin:null
        }
        this.projectService = new ProjectService();
        this.taskService = new TaskService();
    }

    // getAllProjects= () => {
    //     this.projectService.get()
    //     .then(response => {
    //         this.setState({
    //             projects: response
    //         })
    //     })
    // }

    getAllTasks=() => {
        this.taskService.getAll()
        .then(response => {
            this.setState({
                tasks:response
            })
        })
    }

    componentDidMount() {
        if(this.props.user.role==='employee'){
            this.setState({
                isAdmin:false
            })
        } else {
            this.setState({
                isAdmin:true
            })
        }
        this.getAllTasks();
    }


    render() {
        return (
            <div style={{width:'100%'}}>
                <Tabs defaultActiveKey="planing">
                    <Tab eventKey="projects" title="Projects">
                        {this.state.isAdmin && <Projects users={this.props.users} user={this.props.user} getAllProjects={this.props.getAllProjects} projects={this.props.projects} getAllTasks={this.getAllTasks}/> }
                        {!this.state.isAdmin && <ProjectsEmployee users={this.props.users} user={this.props.user} getAllProjects={this.props.getAllProjects} projects={this.props.projects} getAllTasks={this.getAllTasks}/> }
                    </Tab>
                    <Tab eventKey="planing" title="Planing">
                        <Planing user={this.props.user} projects={this.props.projects} tasks={this.state.tasks}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default DashProjects;