import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class EventPaticipantsInfoModal extends Component {

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
              Participants
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className='list-group'>
                    {this.props.participants.map(p => (<li className='list-group-item' key={p._id}> 
                    <img style={{width:'20px',height:'20px',borderRadius:'30px'}} src={p.photo} alt="profile"/>{p.username}</li>))}
                </ul>
            </Modal.Body>
          </Modal>
        );
    }
}

export default EventPaticipantsInfoModal;