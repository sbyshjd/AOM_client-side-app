import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import EventService from './service/EventService';

class EventDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.service = new EventService();
    }

    deleteHandler = () => {
        this.service.delete(this.props.id)
        .then(response => {
            this.props.onHide()
            this.props.reload()
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
                Delete
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Do you really want to delete this event?
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' form='event-create' className='btn' onClick={()=>this.deleteHandler()}>Delete</button>
              <button className='btn' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default EventDeleteModal;