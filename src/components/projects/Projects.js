import React, { Component } from 'react';
import ProjectCreateModal from './ProjectCreateModal';
import ProjectService from '../service/ProjectService';
import moment from 'moment';
import ProjectDeleteModal from './ProjectDeleteModal';
import ProjectEditModal from './ProjectEditModal';
import TaskPanelModal from './TaskPanelModal';
import TaskService from '../service/TaskService';


class Projects extends Component {
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
                        <th scope="col">Tasks</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
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
                        <td><button className='btn btn-outline-info' value={project._id} onClick={(e)=>this.openTaskModal(e)}>Check Tasks</button></td>
                        <td><button className='btn btn-outline-warning' value={project._id} onClick={(e)=>this.editClickHandler(e)}>Edit</button></td>
                        <td><button className='btn btn-outline-danger' value={project._id} onClick={(e)=>this.deleteClickHandler(e)}>Delete</button></td>
                    </tr>))}
                    
                </tbody>
            </table>
                <button className='btn btn-warning float-right mr-3' onClick={() => this.setModalShow(true)}>Create New Project</button>
                <ProjectCreateModal
                    users = {this.props.users}
                    reload = {this.props.getAllProjects}
                    partner = {this.props.user}
                    show={this.state.showCreateModal}
                    onHide={()=>this.setModalShow(false)}
                />
                <ProjectDeleteModal
                    reload = {this.props.getAllProjects}
                    id={this.state.deleteID}
                    show={this.state.showDeleteModal}
                    onHide={()=>this.closeDeleteModal()}
                />
                <ProjectEditModal
                    users = {this.props.users}
                    reload = {this.props.getAllProjects}
                    id={this.state.editID}
                    partner = {this.props.user}
                    show={this.state.showEditModal}
                    onHide={()=>this.closeEditModal()}
                />
                <TaskPanelModal
                    reload={this.props.getAllTasks}
                    project={this.state.theTaskProject}
                    tasks = {this.state.theTasks}
                    show={this.state.showTaskModal}
                    onHide={()=>this.closeTaskModal()}
                />
            </div>
        );
    }
}

export default Projects;