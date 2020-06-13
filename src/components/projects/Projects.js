import React, { Component } from 'react';
import ProjectCreateModal from './ProjectCreateModal';
import ProjectService from '../service/ProjectService';
import moment from 'moment';
import ProjectDeleteModal from './ProjectDeleteModal';
import ProjectEditModal from './ProjectEditModal';


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            projects:[],
            showDeleteModal: false,
            deleteID:'',
            showEditModal:false,
            editID:''
        }
        this.service = new ProjectService();

    }
    setModalShow = (boolean) => {
        this.setState({
            showCreateModal:boolean
        })
    }

    getAllProjects= () => {
        this.service.get()
        .then(response => {
            this.setState({
                projects: response
            })
        })
    }

    deleteClickHandler=(e) => {
        console.log(e.target.value);
        this.setState({
            deleteID:e.target.value,
            showDeleteModal: true
        })
    }

    editClickHandler=(e) => {
        console.log(e.target.value);
        this.setState({
            editID:e.target.value,
            showEditModal:true
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

    componentDidMount() {
        this.getAllProjects();
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
                        <th scope="col">Project Team</th>
                        <th scope="col">Start Time</th>
                        <th scope="col">End Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.projects.map(project => (<tr key={project._id}>
                        <th scope="row">{project.projectcode}</th>
                        <td>{project.projectname}</td>
                        <td>{project.phase}</td>
                        <td>{project.leader.username}</td>
                        <td>{project.team.map(p => <li>{p.username}</li>)}</td>
                        <td>{moment(project.startdate).format('YYYY-MMM-DD')}</td>
                        <td>{moment(project.enddate).format('YYYY-MMM-DD')}</td>
                        <td>{project.status}</td>
                        <td><button value={project._id} onClick={(e)=>this.editClickHandler(e)}>Edit</button></td>
                        <td><button value={project._id} onClick={(e)=>this.deleteClickHandler(e)}>Delete</button></td>
                    </tr>))}
                    
                </tbody>
            </table>
                <button onClick={() => this.setModalShow(true)}>Create New Project</button>
                <ProjectCreateModal
                    users = {this.props.users}
                    reload = {this.getAllProjects}
                    partner = {this.props.user}
                    show={this.state.showCreateModal}
                    onHide={()=>this.setModalShow(false)}
                />
                <ProjectDeleteModal
                    reload = {this.getAllProjects}
                    id={this.state.deleteID}
                    show={this.state.showDeleteModal}
                    onHide={()=>this.closeDeleteModal()}
                />
                <ProjectEditModal
                    users = {this.props.users}
                    reload = {this.getAllProjects}
                    id={this.state.editID}
                    partner = {this.props.user}
                    show={this.state.showEditModal}
                    onHide={()=>this.closeEditModal()}
                />
            </div>
        );
    }
}

export default Projects;