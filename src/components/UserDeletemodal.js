import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import AuthService from './service/AuthService';


class UserDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.service = new AuthService();
    }

    deleteHandler = () => {
        this.service.deleteById(this.props.id)
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
              Do you really want to delete <i>{this.props.username}</i>?
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' form='event-create' className='btn' onClick={()=>this.deleteHandler()}>Delete</button>
              <button className='btn' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default UserDeleteModal;