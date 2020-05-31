import React, { Component } from 'react';
import UserUpdate from './UserUpdate';
import moment from 'moment';
import AuthService from './service/AuthService';
import loader from '../images/loader.gif';

class DashUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:this.props.user,
            showUpdateForm:false,
            isUploading:false,
        }
        this.service = new AuthService();
    }

    setModalShow=(boolean) => {
        this.setState({showUpdateForm:boolean})
    }

    timeFormat=(timeFromMongo) => {
        let time = moment(timeFromMongo).format("YYYY-MM-DD");
        return time
    }

    uploadHandler = (e) => {
        
        this.setState({isUploading:true},this.uploadImage(e))
        
    }

    uploadImage = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('photo',e.target.files[0]);
        this.service.upload(uploadFile)
        .then(response => {
            this.setState({isUploading:false})
            this.props.getUser(null)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='container pt-3'>
                <h3>My Profile</h3>
                <div className='row'>
                <div className='col-6 col-md-3'>
                <div className="card">
                {this.state.isUploading ? 
                <img src={loader} alt="loader"/>
                :<img src={this.state.loggedUser.photo} className="card-img-top" alt="profile"/>}
                    
                    <div className="card-body">
                        <h5 className="card-text">Your Profile Image</h5>
                        <form>
                            <div class="form-group mt-5">
                            <label for="exampleFormControlFile1" className='p'>upload new one</label>
                            <input type="file" class="form-control-file" onChange={(e)=>this.uploadHandler(e)}/>
                            </div>
                        </form>                        
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