import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import EventService from './service/EventService';

class EventCreateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type:'meeting',
            eventname:'',
            description:'',
            starttime:'',
            endtime:'',
            owner:this.props.owner._id,
            forwho:[this.props.owner._id],
            participants:[],
            responses:[],
            isallday:false,
            isforall:false

        }
        this.service = new EventService();
    }

    changeHandler=(e) => {
        const { name,value } = e.target;
        this.setState({
            [name]:value
        })
    }

    checkboxHandler=(e) => {
      const{name,checked} = e.target;
      this.setState({
        [name]:checked
      })
    }

    submitHandler=(e) => {
        e.preventDefault();
        const type = this.state.type;
        const eventname = this.state.eventname;
        const description = this.state.description;
        const starttime = this.state.starttime;
        const endtime = this.state.endtime;
        const owner = this.state.owner;
        const mode = 'group';
        const forwho = this.state.forwho;
        const participants = this.state.participants;
        const responses = this.state.responses;
        const isallday = this.state.isallday;
        const isforall=this.state.isforall;
        const project='non-project';

        this.service.create(type,eventname,description,starttime,endtime,owner,mode,forwho,participants,responses,isallday,isforall,project)
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
                Create A new Event
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
                            value={this.state.lastname} onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                        <div className='form-group col-6'>
                            <h5>End Time</h5>
                            <input className='form-control' type="datetime-local" name='endtime' 
                            value={this.state.address} onChange={(e)=>this.changeHandler(e)}/>
                        </div>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" name='isallday' onChange={(e)=>this.checkboxHandler(e)}/>
                      <label class="form-check-label">isAllDay</label>
                    </div>
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" name='isforall' onChange={(e)=>this.checkboxHandler(e)}/>
                      <label class="form-check-label">isForAll</label>
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