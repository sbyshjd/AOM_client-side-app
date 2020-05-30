import React, { Component } from 'react';
import UserUpdate from './UserUpdate';
import moment from 'moment';

class DashUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:this.props.user,
            showUpdateForm:false
        }
    }

    setModalShow=(boolean) => {
        this.setState({showUpdateForm:boolean})
    }

    timeFormat=(timeFromMongo) => {
        let time = moment(timeFromMongo).format("YYYY-MM-DD");
        return time
    }


    render() {
        return (
            <div className='container pt-3'>
                <h3>My Profile</h3>
                <div className='row'>
                <div className='col-6 col-md-3'>
                <div className="card">
                    <img src={this.state.loggedUser.photo} className="card-img-top" alt="profile"/>
                    <div className="card-body">
                        <p className="card-text">Nice profile picture here!</p>                        
                    </div>
                </div>
                </div>
                <div className='col-12 col-md-9'>
                <div className="card">
                    <h5 className="card-header">Personal Information</h5>
                    <div className="card-body row">
                        <div className='col-6'>
                        <h3 className="card-title mb-3">Data</h3>
                        <p className="card-text"><strong>UserName: </strong>{this.state.loggedUser.username}</p>
                        <p className="card-text"><strong>First Name: </strong>{this.state.loggedUser.firstname}</p>
                        <p className="card-text"><strong>Last Name: </strong>{this.state.loggedUser.lastname}</p>
                        <p className="card-text"><strong>Address: </strong>{this.state.loggedUser.address}</p>
                        <p className="card-text"><strong>ZipCode: </strong>{this.state.loggedUser.zipcode}</p>
                        <p className="card-text"><strong>City: </strong>{this.state.loggedUser.city}</p>
                        <p className="card-text"><strong>Country: </strong>{this.state.loggedUser.country}</p>
                        </div>
                        <div className='col-6'>
                        <h3 className="card-title mb-3">Contact</h3>
                        <p className="card-text"><strong>Mobile Phone: </strong>{this.state.loggedUser.phone}</p>
                        <p className="card-text"><strong>E-mail Address: </strong>{this.state.loggedUser.email}</p>
                        <h3 className="card-title mb-3">Other</h3>
                        <p className="card-text"><strong>Birthday: </strong>{this.timeFormat(this.state.loggedUser.birthday)}</p>
                        <p className="card-text"><strong>Birth Place: </strong>{this.state.loggedUser.birthplace}</p>
                        <p className="card-text"><strong>Nationality: </strong>{this.state.loggedUser.nationality}</p>
                        </div>    
                    </div>
                    
                    <button className="card-footer btn" onClick={()=>this.setModalShow(true)}>Edit Profile</button>
                    <UserUpdate
                        {...this.state.loggedUser}
                        updateUser={this.props.getUser}
                        show={this.state.showUpdateForm}
                        onHide={()=>this.setModalShow(false)}
                    />
                </div>
                </div>
                
                </div>
                
            </div>
        );
    }
}

export default DashUser;