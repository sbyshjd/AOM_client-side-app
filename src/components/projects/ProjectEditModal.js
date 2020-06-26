import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import ProjectService from '../service/ProjectService';
import moment from 'moment';

class ProjectEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectname:'',
            projectcode:'',
            startdate:'',
            enddate:'',
            status:'',
            leader:'',
            team:[],
            phase:''
        }
        this.service = new ProjectService();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.id===this.props.id) {
            return;
        }
        this.service.getOne(this.props.id)
        .then(project => {
            console.log(project);
            const { projectname,projectcode,startdate,enddate,status,partner,leader,team,phase } = project;
            console.log(partner);
            this.setState({
                projectname:projectname,
                projectcode:projectcode,
                startdate: moment(startdate).format('YYYY-MM-DD'),
                enddate: moment(enddate).format('YYYY-MM-DD'),
                status: status,
                leader:leader._id,
                team: team.map(p => p._id),
                phase: phase
            })
        })
        .catch(err => console.log(err))
    }

    changeHandler=(e) => {
        const { name,value } = e.target;
        this.setState({
            [name]:value
        })
    }

    showTeamMembers=(e) => {
        e.preventDefault();
        e.stopPropagation();
        const usersList = document.querySelector('#team-members');
        if(usersList.style.visibility ==='hidden') {
            usersList.style.visibility = 'visible';
        } else {
            usersList.style.visibility = 'hidden';
        }
    }

    teamMemberListHanlder=(e) => {
        const usersList = document.querySelectorAll('#team-members option');
        const selectedOptions = [...usersList].filter(user => user.selected);
        console.log(selectedOptions);
        const selectedIDs = selectedOptions.map(user => user.value);
        this.setState({
            team:selectedIDs
        }) 

    }

    submitHandler=(e) => {
        e.preventDefault();
        e.preventDefault();
        const projectname = this.state.projectname;
        const projectcode = this.state.projectcode;
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        const status = this.state.status;
        const partner = this.props.partner._id;
        const leader = this.state.leader;
        const team = this.state.team;
        const phase = this.state.phase;

        this.service.edit(projectname,projectcode,startdate,enddate,status,partner,leader,team,phase,this.props.id)
        .then(response => {
            this.props.reload();
            this.props.onHide();
        })
    }


    render() {
        return (
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit the Project
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className='m-3' id='project-create'>
                    
                    <div className='form-group'>
                      <h5>Project Name</h5>
                      <input className='form-control' type="text" name='projectname' 
                      value={this.state.projectname} onChange={(e)=>this.changeHandler(e)}/>
                    </div>
                    <div className='form-group'>
                          <h5>Project Code</h5>
                          <input className='form-control' type="text" name='projectcode' 
                          value={this.state.projectcode} onChange={(e)=>this.changeHandler(e)}/>
                    </div>
                    <div class="form-group">
                      <label>Project Status:</label>
                      <select class="form-control" name='status'
                      value={this.state.status} onChange={(e)=>this.changeHandler(e)}
                      >
                        <option value='ongoing'>On-Going</option>
                        <option value='suspend'>Suspend</option>
                        <option value='finished'>Finished</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Project Phase:</label>
                      <select class="form-control" name='phase'
                      value={this.state.phase} onChange={(e)=>this.changeHandler(e)}
                      >
                        <option value='Tender'>Tender</option>
                        <option value='SO'>SO</option>
                        <option value='VO'>VO</option>
                        <option value='DO'>DO</option>
                        <option value='TO'>TO</option>
                        <option value='UO'>UO</option>
                        <option value='PR'>PR</option> 
                      </select>
                    </div>
                    <div className='row'>
                        <div className='form-group col-6'>
                            <h5>Start Date</h5>
                            <input className='form-control' type="date" name='startdate' value={this.state.startdate}
                             onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                        <div className='form-group col-6'>
                            <h5>End Time</h5>
                            <input className='form-control' type="date" name='enddate' value={this.state.enddate}
                             onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                    </div>
                    <div class="form-group">
                      <label>Project Leader:</label>
                      <select class="form-control" name='leader'
                       onChange={(e)=>this.changeHandler(e)}
                       defaultValue={this.state.leader}
                      >
                        {this.props.users.map(user => <option key={user._id} value={user._id} selected={this.state.leader===user._id}>
                        {user.username}</option>)} 
                      </select>
                    </div>
                    <div class="form-group">
                      <button onClick={(e)=>this.showTeamMembers(e)}>+Team</button>
                      <div id='team-members-box' style={{position:'relative'}}>
                      <select id='team-members' style={{visibility:'hidden',position:'absolute'}} name='team' 
                      onChange={(e)=>this.teamMemberListHanlder(e)} multiple>
                      {this.props.users.map(user => (<option key={user._id} value={user._id} selected={this.state.team.includes(user._id)}> 
                            {user.username}
                            </option>)
                            )}
                      </select> 
                      </div>
                    </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' form='project-create' className='btn' onClick={(e)=>this.submitHandler(e)}>Submit</button>
              <button className='btn' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default ProjectEditModal;