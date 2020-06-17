import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import TaskService from '../service/TaskService';

class TaskPanelModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskname:'',
            startdate:'',
            enddate:'',
            user:''
        }
        this.service = new TaskService();
    }

    changeHandler=(e) => {
        const { name,value } = e.target;
        this.setState({
            [name]:value
        })
    }

    submitHandler=(e) => {
        e.preventDefault();
        e.preventDefault();
        const taskname = this.state.taskname;
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        const user = this.state.user;
        const project = this.props.project._id;

        this.service.create(taskname,startdate,enddate,user,project)
        .then(response => {
            this.props.reload();
            this.props.onHide();
        })
    }

    deleteHandler=(e) => {
        e.preventDefault();
        e.preventDefault();
        console.log(e.target.value);
        this.service.delete(e.target.value)
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
                Check this project's tasks
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>The Tasks List</h5>
                <table class="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">task</th>
                            <th scope="col">user</th>
                            <th scope="col">finished</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tasks.map((t,i) =>(<tr key={t._id}>
                        <td>{i+1}</td>
                        <td>{t.taskname}</td>
                        <td>{t.user.username}</td>
                        <td><button value={t._id} className='btn btn-outline-light' onClick={(e)=>this.deleteHandler(e)}>Delete</button></td> 
                        </tr>))}
                    </tbody>
                </table>
                <h5>Create a new task</h5>
                <form className='m-3' id='project-create'>
                    <div className='form-group'>
                      <p>Task Content</p>
                      <input className='form-control' type="text" name='taskname' 
                      value={this.state.taskname} onChange={(e)=>this.changeHandler(e)}/>
                    </div>
                    <div className='row'>
                        <div className='form-group col-6'>
                            <p>Start Date</p>
                            <input className='form-control' type="date" name='startdate' 
                             onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                        <div className='form-group col-6'>
                            <p>End Time</p>
                            <input className='form-control' type="date" name='enddate' 
                             onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                    </div>
                    <div class="form-group">
                      <label>Assign User:</label>
                      <select class="form-control" name='user' onChange={(e)=>this.changeHandler(e)}>
                        <option>Add the user</option>
                        {this.props.project.team ? this.props.project.team.map((user,i) => <option key={user._id} value={user._id}>
                        {user.username}</option>) : null} 
                      </select>
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

export default TaskPanelModal;