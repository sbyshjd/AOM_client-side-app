import React, { Component } from 'react';
import ProjectCreateModal from './ProjectCreateModal';
import ProjectService from '../service/ProjectService';
import moment from 'moment';
import ProjectDeleteModal from './ProjectDeleteModal';


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            projects:[],
            showDeleteModal: false,
            deleteID:''
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

    closeDeleteModal=() => {
        this.setState({
            showDeleteModal:false
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
                        <td><button>Edit</button></td>
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
            </div>
        );
    }
}

export default Projects;