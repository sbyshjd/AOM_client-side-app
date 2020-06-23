import React, { Component } from 'react';
import './ResetPassword.css';
import { Link } from 'react-router-dom';
import ForgotPasswordService from './service/ForgotPasswordService';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:null,
            password:'',
            repeatPassword:'',
            validPassword:null,
            validToken:null,
            passwordReseted:null,
        }
        this.service = new ForgotPasswordService() ;
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        console.log(token);
        this.service.sendToken(token)
        .then(response => {
            if(!response.success) {
                this.setState({
                    validToken:false
                })
            } else {
                this.setState({
                    validToken:true,
                    user:response.user
                })
            }

        })
    }

    changeHandler=(e) => {
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    checkPassword = (e) => {
        if(this.state.password===this.state.repeatPassword && this.state.password!=='') {
            this.setState({
                validPassword:true
            })
        } else {
            this.setState({
                validPassword:false
            })
        }
    }

    submitHandler=(e)=> {
        e.preventDefault();
        const password=this.state.password;
        const id = this.state.user._id;
        this.service.submitPassword(password,id)
        .then(response => {
            if(response.success) {
                this.setState({
                    passwordReseted:true
                })
            } else {
                this.setState({
                    passwordReseted:false
                })
            }
        })
        .catch(err => {
            this.setState({
                passwordReseted:false
            })
        })
        
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
                            <h3>Reset your password</h3>
                            {this.state.user && (<div>
                                <p className='text-secondary'>Your Username:{this.state.user.username}</p>
                                <p className='text-secondary'>Your Email:{this.state.user.email}</p>
                            </div>) }
                            
                            <div className='form-group mt-4'>
                                <input type="password" placeholder='Password'
                                className='form-control pt-4 pb-4 rounded-pill text-muted' 
                                name='password' value={this.state.password} onChange={(e)=>this.changeHandler(e)}/>
                            </div>
                            <div className='form-group mt-4'>
                                <input type="password" placeholder='Repeat password'
                                className='form-control pt-4 pb-4 rounded-pill text-muted' 
                                name='repeatPassword' value={this.state.repeatPassword} 
                                onChange={(e)=>this.changeHandler(e)}
                                onBlur={(e)=> this.checkPassword(e)}
                                />
                            </div>
                            {this.state.validPassword===true && (
                                <p className='text-success'>Valid password</p>
                            )}
                            {this.state.validPassword===false && (
                                <p className='text-danger'>repeat password is invalid, please check again</p>
                            )}
                            <button type='submit' className='btn btn-block btn-primary pt-2 pb-2 rounded-pill'
                            onClick={(e)=>this.submitHandler(e)}
                            disabled={this.state.validPassword ? false : true}
                            >Reset Password</button>
                        </form>
                        {this.state.passwordReseted && (
                                <p className='text-success'>Password is successfully changed. Please try to log in!</p>
                            )}
                        
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

export default ResetPassword;