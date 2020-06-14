import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import AuthService from '../service/AuthService';
import moment from 'moment';

class UserUpdate extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:this.props.username,
            firstname:this.props.firstname,
            lastname:this.props.lastname,
            address:this.props.address,
            zipcode:this.props.zipcode,
            city:this.props.city,
            country:this.props.country,
            phone:this.props.phone,
            email:this.props.email,
            birthday:this.props.birthday,
            birthplace:this.props.birthplace,
            nationality:this.props.nationality
        }
        this.service=new AuthService()
    }

    timeFormat=(timeFromMongo) => {
        let time = moment(timeFromMongo).format("YYYY-MM-DD");
        return time
    }

    changeHandler=(e)=> {
        const {name,value}=e.target;
        this.setState({
            [name]:value
        })
    }

    submitHandler=(e) => {
        e.preventDefault();
        const username = this.state.username;
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const address = this.state.address;
        const zipcode = this.state.zipcode;
        const city = this.state.city;
        const country = this.state.country;
        const phone = this.state.phone;
        const email = this.state.email;
        const birthday = this.state.birthday;
        const birthplace = this.state.birthplace;
        const nationality = this.state.nationality;
        this.service.update(username,firstname,lastname,address,zipcode,city,country,phone,email,birthday,birthplace,nationality)
        .then(response => {
            this.props.updateUser(null);
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
        <form className='m-3' id='user-edit'>
            <div className='form-group'>
                <h5>Username</h5>
                <input className='form-control' type="text" name='username' 
                value={this.state.username} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='row'>
                <div className='form-group col-6'>
                    <h5>First Name</h5>
                    <input className='form-control' type="text" name='firstname' 
                    value={this.state.firstname} onChange={(e)=>this.changeHandler(e)}/>
                </div>
                <div className='form-group col-6'>
                    <h5>Last Name</h5>
                    <input className='form-control' type="text" name='lastname' 
                    value={this.state.lastname} onChange={(e)=>this.changeHandler(e)}/>
                </div>
            </div>
            <div className='form-group'>
                <h5>Address</h5>
                <input className='form-control' type="text" name='address' 
                value={this.state.address} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Zip-Code</h5>
                <input className='form-control' type="text" name='zipcode' 
                value={this.state.zipcode} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>City</h5>
                <input className='form-control' type="text" name='city' 
                value={this.state.city} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Country</h5>
                <input className='form-control' type="text" name='country' 
                value={this.state.country} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Telephone</h5>
                <input className='form-control' type='text' name='phone' 
                value={this.state.phone} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Email</h5>
                <input className='form-control' type="text" name='email' 
                value={this.state.email} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Birthday</h5>
                <input className='form-control' type='date' name='birthday' 
                value={this.timeFormat(this.state.birthday)} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Birth-place</h5>
                <input className='form-control' type="text" name='birthplace' 
                value={this.state.birthplace} onChange={(e)=>this.changeHandler(e)}/>
            </div>
            <div className='form-group'>
                <h5>Nationality</h5>
                <input className='form-control' type="text" name='nationality' 
                value={this.state.nationality} onChange={(e)=>this.changeHandler(e)}/>
            </div>


            
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button type='submit' form='user-edit' className='btn' onClick={(e)=>this.submitHandler(e)}>Submit</button>
        <button className='btn' onClick={this.props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
        );
    }
}

export default UserUpdate;