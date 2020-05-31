import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import EventService from './service/EventService';

class EventCreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventname:'',
            description:'',
            starttime:'',
            endtime:'',
            owner:this.props.owner._id,
        }
        this.service = new EventService();
    }

    changeHandler=(e) => {
        const { name,value } = e.target;
        this.setState({
            [name]:value
        })
    }

    submitHandler=(e) => {
        e.preventDefault();
        const eventname = this.state.eventname;
        const description = this.state.description;
        const starttime = this.state.starttime;
        const endtime = this.state.endtime;
        const owner = this.state.owner;
        this.service.create(eventname,description,starttime,endtime,owner)
        .then(response => {
            
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
                Update your Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form className='m-3' id='event-create'>
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
                            value={this.state.lastname} onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                        <div className='form-group col-6'>
                            <h5>End Time</h5>
                            <input className='form-control' type="datetime-local" name='endtime' 
                            value={this.state.address} onChange={(e)=>this.changeHandler(e)}/>
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

export default EventCreateModal;