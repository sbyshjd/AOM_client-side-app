import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import AuthService from './service/AuthService';


class UserEditModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            role:'',
            status:''
        }
        this.service = new AuthService();
    }

    editHandler = () => {
        this.service.changeRoleById(this.state.role,this.props.id)
        .then(response => {
            return this.service.changeStatusById(this.state.status,this.props.id)
        })
        .then(response => {
            this.props.reload();
            this.props.onHide();
        })
    }

    changeHandler=(e) => {
        const { name,value } = e.target;
        this.setState({
            [name]:value
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
                Edit
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You are editing <i>{this.props.username}</i></p>
              <div>
                Change Role:
                <select class="custom-select" name='role' onChange={(e)=> this.changeHandler(e)}>
                    <option selected>Choose...</option>
                    <option value="admin">Admin</option>
                    <option value="employee">Employee</option>
                </select>
              </div>
              <div>
                Change Status:
                <select class="custom-select" name='status' onChange={(e)=> this.changeHandler(e)}>
                    <option selected>Choose...</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' form='event-create' className='btn' onClick={()=>this.editHandler()}>Save</button>
              <button className='btn' onClick={this.props.onHide}>Close</button>
            </Modal.Footer>
          </Modal>
        );
    }
}

export default UserEditModal;