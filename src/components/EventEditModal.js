import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import EventService from './service/EventService';
import moment from 'moment';

class EventEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            eventname: this.props.eventname,
            description: this.props.description,
            starttime:this.props.starttime,
            endtime:this.props.endtime
        }
        this.service = new EventService();
    }

    changeHandler=(e) => {
        const { name,value } = e.target;
        this.setState({
            [name]:value
        })
    }

    changeTimeFormat=(time) => {
        return moment(time).format('YYYY-MM-DDTHH:mm:ss');
    }

    submitHandler=(e) => {
        e.preventDefault();
        const type = this.state.type;
        const eventname = this.state.eventname;
        const description = this.state.description;
        const starttime = this.state.starttime;
        const endtime = this.state.endtime;
        const mode = 'group';
        this.service.edit(type,eventname,description,starttime,endtime,mode,this.props.id)
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
                Edit this Event
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className='m-3' id='event-create'>
                    <div class="form-group">
                      <label>Event Type:</label>
                      <select class="form-control" name='type'
                      value={this.state.type} onChange={(e)=>this.changeHandler(e)}
                      >
                        <option value='meeting'>Meeting</option>
                        <option value='holiday'>Holiday</option>
                        <option value='activity'>Activity</option>
                        
                      </select>
                    </div>
                    <div className='form-group'>
                      <h5>Event Name</h5>
                      <input className='form-control' type="text" name='eventname' 
                      value={this.state.eventname} onChange={(e)=>this.changeHandler(e)}/>
                    </div>
                    <div className='form-group'>
                          <h5>Description</h5>
                          <input className='form-control' type="text" name='description' 
                          value={this.state.description} onChange={(e)=>this.changeHandler(e)}/>
                    </div>
                    <div className='row'>
                        <div className='form-group col-6'>
                            <h5>Start Time</h5>
                            <input className='form-control' type="datetime-local" name='starttime' 
                            value={this.changeTimeFormat(this.state.starttime)} onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                        <div className='form-group col-6'>
                            <h5>End Time</h5>
                            <input className='form-control' type="datetime-local" name='endtime' 
                            value={this.changeTimeFormat(this.state.endtime)} onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                    </div>
                    
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' form='event-create' className='btn' onClick={(e)=>this.submitHandler(e)}>Submit</button>
              <button className='btn' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default EventEditModal;