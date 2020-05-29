import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

class LogIn extends Component {
    render() {
        return (
            <div id='log-in' className='pt-5'>
             <div className='container' >
              <div className="card o-hidden border-0 shadow-lg p-0">
               <div className='card-body p-0'>
                <div className="row">
                    <div className='col-5 bg-image rounded-left rounded-lg d-none d-md-block' >
                    </div>
                    <div className='col-12 col-md-7 pl-5 pl-md-5 pt-5 pb-3 pr-5'>
                        <form className='text-center'>
                            <h3>Login your Account</h3>
                            <div className='form-group mt-4'>
                                <input type="text" placeholder='Username' className='form-control pt-4 pb-4 rounded-pill text-muted'/>
                            </div>
                            <div className='form-group mt-2'>
                                <input type="text" placeholder='Email Adress' className='form-control pt-4 pb-4 rounded-pill text-muted'/>
                            </div>
                            <div className='row'>
                                <div className='form-group col-6'>
                                    <input type="text" placeholder='Password' className='form-control pt-4 pb-4 rounded-pill text-muted'/>
                                </div>
                                <div className='form-group col-6'>
                                    <input type="text" placeholder='Repeat password' className='form-control pt-4 pb-4 rounded-pill text-muted'/>
                                </div>
                            </div>
                            <Link to='/' type='submit' className='btn btn-block btn-primary pt-2 pb-2 rounded-pill'>Register</Link>
                        </form>
                        <hr/>
                        <Link to='/' type='submit' className='btn btn-block btn-danger pt-2 pb-2 rounded-pill'>Register with Google</Link>
                        <Link to='/' type='submit' className='btn btn-block btn-info pt-2 pb-2 rounded-pill'>Register with Facebook</Link>
                        <hr/>
                        <Link to='/login' className='d-block text-center text-primary mt-3' style={{fontSize:'0.8rem'}}>Forgot your password?</Link>
                        <Link to='/login' className='d-block text-center text-primary mb-3' style={{fontSize:'0.8rem'}}>Arleady have an account? Log in!</Link>
                    </div>
                </div>
               </div>     
              </div>
             </div>
            </div>
        );
    }
}

export default LogIn;