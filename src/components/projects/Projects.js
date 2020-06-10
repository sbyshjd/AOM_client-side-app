import React, { Component } from 'react';
import ProjectCreateModal from './ProjectCreateModal';
import ProjectService from '../service/ProjectService';


class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal: false,
            projects:[]
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

    componentDidMount() {
        this.getAllProjects();
    }

    render() {
        return (
            <div>
            {this.state.projects.map(project => <p>{project.projectname}</p>)}
                <button onClick={() => this.setModalShow(true)}>Create New Project</button>
                <ProjectCreateModal
                        users = {this.props.users}
                        reload = {this.getAllProjects}
                        partner = {this.props.user}
                        show={this.state.showCreateModal}
                        onHide={()=>this.setModalShow(false)}
                />
            </div>
        );
    }
}

export default Projects;