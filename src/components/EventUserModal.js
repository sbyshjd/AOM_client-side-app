import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import EventService from './service/EventService';
import AuthService from './service/AuthService';

class EventUserModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            allTheUsers:[],
            forwhoID:this.props.forwho.map(p=>p._id)
        }
        this.eventService = new EventService();
        this.userService = new AuthService();
    }
    componentDidMount() {
        this.userService.getAllTheUsers()
        .then(response => {
            this.setState({allTheUsers:response})
        })
        .catch(err => console.log(err))
    }

    isChecked=(i) => {
        if(this.state.forwhoID.length===0) {
            return false
        }
        let isParticipated = this.state.forwhoID.includes(this.state.allTheUsers[i]._id);
        if(isParticipated) {
            return true;
        }
        return false;
    }

    checkBoxHandler=(e) => {
        console.log(e.target.checked)
        const participantsID = this.state.forwhoID;
        if(e.target.checked) {
            participantsID.push(e.target.value) 
        } else {
            let index = participantsID.findIndex(p=>p===e.target.value);
            participantsID.splice(index,1)
        }
        this.setState({forwho:participantsID})
    }

    submitHandler=() => {
        const forwhoID = this.state.forwhoID;
        this.eventService.invite(forwhoID,this.props.id)
        .then(response => {
            this.props.reload();
            this.props.onHide();
        })
        .catch(err=>console.log(err))
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
                Who will see the event?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.allTheUsers.map((p,i) => (<div className='form-check' key={p._id}>
                <input className="form-check-input" type="checkbox"  
                name={p.username} id={p._id} value={p._id} onChange={(e)=>this.checkBoxHandler(e)} defaultChecked={this.isChecked(i)}/>
                <label className="form-check-label" htmlFor={p._id}>
                <img style={{width:'30px',height:'30px',borderRadius:'30px'}} src={p.photo} alt=""/>{p.username}
                </label>
              </div>)
              )}
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' className='btn' onClick={this.submitHandler}>Add</button>
              <button className='btn' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default EventUserModal;