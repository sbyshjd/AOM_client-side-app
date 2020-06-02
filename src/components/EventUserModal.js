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

        const modal = document.getElementById('event-user-modal');
        const inputArr = [...modal.childNodes].map(e=>e.childNodes[0]);
        let checkAllInput = inputArr.shift();
        const forwhoInput = inputArr.filter(input => input.checked);
        if(forwhoInput.length < inputArr.length) {
           checkAllInput.checked = false;
        }
        console.log(checkAllInput.checked);
        const forwhoId = forwhoInput.map(input => input.value);
        console.log(forwhoId);
        this.setState({forwhoID:forwhoId});
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

    closeHandler = () => {
        this.props.onHide();
    }

    checkAllHandler = (e) => {
        const modal = document.getElementById('event-user-modal')
        const inputArr = [...modal.childNodes].map(e=>e.childNodes[0]);
        if(e.target.checked) {
            inputArr.forEach(e=>e.checked=true)
        } else {
            inputArr.forEach(e=>e.checked=false)
        }
        this.checkBoxHandler(e);
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
            <div id='event-user-modal'>
              <div className='form-check'>
                  <input className="form-check-input" type="checkbox" id='check-all' 
                     onChange={(e)=>this.checkAllHandler(e)} />
                  <label className="form-check-label" htmlFor='check-all'>Ckeck All</label>
              </div>
              {this.state.allTheUsers.map((p,i) => (<div className='form-check' key={p._id}>
                <input className="form-check-input" type="checkbox"  
                name={p.username} id={p._id} value={p._id} onChange={(e)=>this.checkBoxHandler(e)} defaultChecked={this.isChecked(i)}/>
                <label className="form-check-label" htmlFor={p._id}>
                <img style={{width:'30px',height:'30px',borderRadius:'30px'}} src={p.photo} alt=""/>{p.username}
                </label>
              </div>)
              )}
            </div>
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' className='btn' onClick={this.submitHandler}>Confirm</button>
              <button className='btn' onClick={this.closeHandler}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default EventUserModal;