import React, { Component } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';
import ForgotPasswordService from './service/ForgotPasswordService';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            email:'',
            showError:false,
            showResult:false,
            isLoading:false
        }
        this.service = new ForgotPasswordService() ;
    }

    changeHandler=(e) => {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    submitHandler=(e)=> {
        e.preventDefault();
        let email = this.state.email;
        if(email==='') {
            this.setState({
                showError:true
            })
        } else {
            this.setState({
                isLoading: true
            })
            this.service.reset(email)
            .then(response => {
                if(response.success) {
                    this.setState({
                        email:'',
                        showError:false,
                        showResult:true,
                        isLoading:false
                    })
                } else {
                    this.setState({
                        email:'',
                        showError:true,
                        showResult:false,
                        isLoading:false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    email:'',
                    showError:true,
                    showResult:false,
                    isLoading:false
                })
            })
        }
        
    }


    render() {
        return (
            <div id='forgot-password' className='pt-5'>
             <div className='container' >
              <div className="card o-hidden border-0 shadow-lg p-0">
               <div className='card-body p-0'>
                <div className="row">
                    <div className='col-6 bg-image rounded-left rounded-lg d-none d-md-block' >
                    </div>
                    <div className='col-12 col-md-6 pl-5 pl-md-5 pt-5 pb-3 pr-5'>
                        <form className='text-center' onSubmit={(e)=>this.submitHandler(e)}>
                            <h3>Forgot your password?</h3>
                            <p className='text-secondary'>You could fill in your registered email.Then you will get an email with a link from us to reset your password.</p>
                            <div className='form-group mt-4'>
                                <input type="text" placeholder='email' 
                                className='form-control pt-4 pb-4 rounded-pill text-muted' 
                                name='email' value={this.state.email} onChange={(e)=>this.changeHandler(e)}/>
                            </div>
                            <button type='submit' className='btn btn-block btn-primary pt-2 pb-2 rounded-pill'>Send the Email</button>
                        </form>
                        {this.state.showError && (
                            <div className='rounded-pill border text-center pt-2 pb-2 mt-3 border-danger text-danger'>
                            Invalid Email, please check your input or create a new one.
                            </div>
                        )
                        }
                        {this.state.showResult && (
                            <div className='rounded-pill border text-center pt-2 pb-2 mt-3 border-success text-success'>
                            Recovery Email is sent, please check your Email Inbox.
                            </div>
                        )
                        }
                        {this.state.isLoading && (
                            <div className='rounded-pill border text-center pt-2 pb-2 mt-3 border-warning text-warning'>
                            Your input is sent to the server, Please wait...
                            </div>
                        )
                        }
                        
                        <hr/>
                        
                        <Link to='/login' className='d-block text-center text-primary mt-3' style={{fontSize:'0.8rem'}}>Log In</Link>
                        <Link to='/signup' className='d-block text-center text-primary mb-3' style={{fontSize:'0.8rem'}}>Create a account</Link>
                    </div>
                </div>
               </div>     
              </div>
             </div>
            </div>
        );
    }
}

export default ForgotPassword;