import React, { Component } from 'react';
import './login.css';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import AuthService from './service/AuthService';


class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            logInFail: false
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
            if(response.success) {
                this.props.getUser(response.user)
                this.props.history.push('/');
                this.setState({
                    username:'',
                    password:'',
                    logInFail:false
                })
            } 
        })
        .catch(error => {
            this.setState({
                logInFail:true
            })
        })
    }

    handleGoogleLogin = (response) => {
        this.service.googleLogIn(response)
        .then(response => {
            this.setState({
                username:'',
                password:'',
                isSubmit:true
            })
            this.props.history.push('/');
            this.props.getUser(response)
        })
    }


    render() {
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
                        <div className='rounded-pill border text-center pt-2 pb-2 mt-3 border-danger text-danger' style={this.state.logInFail ? {display:'block'} : {display:'none'}}>
                            Invalid username or password, please check again!
                        </div>
                        <hr/>
                        <GoogleLogin
                            clientId='403475566780-89vdhumrng12v39d51f7mi1rnsr10vo5.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <button
                                type='button'
                                className='btn btn-block btn-danger pt-2 pb-2 rounded-pill'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                >
                                <FcGoogle />
                                   Sign in with Google
                                </button>
                            )}
                            buttonText='Login'
                            onSuccess={this.handleGoogleLogin}
                            onFailure={this.handleGoogleLogin}
                            cookiePolicy={'single_host_origin'}
                        />
                        <hr/>
                        <Link to='/forgot-password' className='d-block text-center text-primary mt-3' style={{fontSize:'0.8rem'}}>Forgot your password?</Link>
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