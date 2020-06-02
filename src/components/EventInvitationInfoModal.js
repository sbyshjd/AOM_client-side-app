import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';

class EventInvitationInfoModal extends Component {

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
                Invitation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className='list-group'>
                    {this.props.forwho.map(p => <li className='list-group-item' key={p._id}>{p.username}</li>)}
                </ul>
            </Modal.Body>
          </Modal>
        );
    }
}

export default EventInvitationInfoModal;