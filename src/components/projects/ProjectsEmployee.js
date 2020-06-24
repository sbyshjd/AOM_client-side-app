import React, { Component } from 'react';

import ProjectService from '../service/ProjectService';
import moment from 'moment';
import TaskService from '../service/TaskService';


class ProjectsEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            projects:[],
            showDeleteModal: false,
            deleteID:'',
            showEditModal:false,
            editID:'',
            showTaskModal:false,
            theTaskProject:{},
            theTasks:[]
        }
        this.service = new ProjectService();
        this.taskService = new TaskService();

    }
    setModalShow = (boolean) => {
        this.setState({
            showCreateModal:boolean
        })
    }

    //delete the project modal
    deleteClickHandler=(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.value);
        this.setState({
            deleteID:e.target.value,
            showDeleteModal: true
        })
    }

    //edit the project modal
    editClickHandler=(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.target.value);
        this.setState({
            editID:e.target.value,
            showEditModal:true
        })

    }

    //open the task modal
    openTaskModal=(e) => {
        e.preventDefault();
        e.stopPropagation();
        //get the project by click
        this.service.getOne(e.target.value)
        .then(project => {
        //get all the task of this project
            this.taskService.get(project._id)
            .then(tasks => {
                this.setState({
                    theTaskProject:project,
                    theTasks:tasks,
                    showTaskModal:true 
                })
            })  
        })   
    }

    closeDeleteModal=() => {
        this.setState({
            showDeleteModal:false
        })
    }

    closeEditModal=() => {
        this.setState({
            showEditModal:false
        })
    }

    closeTaskModal=() => {
        this.setState({
            showTaskModal:false
        })
    }


    render() {
        return (
            <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Phase</th>
                        <th scope="col">Project Leader</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Status</th>
                        
                    </tr>
                </thead>
                <tbody>
                {this.props.projects.map(project => (<tr key={project._id}>
                        <th scope="row">{project.projectcode}</th>
                        <td>{project.projectname}</td>
                        <td>{project.phase}</td>
                        <td>{project.leader.username}</td>
                        <td>{moment(project.startdate).format('YYYY-MMM-DD')}</td>
                        <td>{moment(project.enddate).format('YYYY-MMM-DD')}</td>
                        <td>{project.status}</td>
                        
                        
                        
                    </tr>))}
                    
                </tbody>
            </table>
            </div>
        );
    }
}

export default ProjectsEmployee;