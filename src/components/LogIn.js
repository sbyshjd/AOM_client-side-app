import React, { Component } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import AuthService from './service/AuthService';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isSubmit:false
        }
        this.service = new AuthService();
    }

    changeHandler=(e) => {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    submitHandler=(e)=> {
        e.preventDefault();
        let username = this.state.username;
        let password = this.state.password;
        this.service.login(username,password)
        .then(response => {
            this.setState({
                username:'',
                password:'',
                isSubmit:true
            })
            this.props.getUser(response)
        })
    }


    render() {
        if(this.state.isSubmit) {
            return <Redirect to='/'/>
        }
        return (
            <div id='log-in' className='pt-5'>
             <div className='container' >
              <div className="card o-hidden border-0 shadow-lg p-0">
               <div className='card-body p-0'>
                <div className="row">
                    <div className='col-6 bg-image rounded-left rounded-lg d-none d-md-block' >
                    </div>
                    <div className='col-12 col-md-6 pl-5 pl-md-5 pt-5 pb-3 pr-5'>
                        <form className='text-center' onSubmit={(e)=>this.submitHandler(e)}>
                            <h3>Welcome back!</h3>
                            <div className='form-group mt-4'>
                                <input type="text" placeholder='Username' 
                                className='form-control pt-4 pb-4 rounded-pill text-muted' 
                                name='username' value={this.state.username} onChange={(e)=>this.changeHandler(e)}/>
                            </div>
                            
                            <div className='form-group mt-2'>
                                <input type="password" placeholder='Password' 
                                className='form-control pt-4 pb-4 rounded-pill text-muted' 
                                name='password' value={this.state.password} onChange={(e)=>this.changeHandler(e)}/>
                            </div>
                                
                            
                            <button type='submit' className='btn btn-block btn-primary pt-2 pb-2 rounded-pill'>Log in</button>
                        </form>
                        <hr/>
                        <Link to='/' type='submit' className='btn btn-block btn-danger pt-2 pb-2 rounded-pill'>Register with Google</Link>
                        <Link to='/' type='submit' className='btn btn-block btn-info pt-2 pb-2 rounded-pill'>Register with Facebook</Link>
                        <hr/>
                        <Link to='/login' className='d-block text-center text-primary mt-3' style={{fontSize:'0.8rem'}}>Forgot your password?</Link>
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

export default LogIn;