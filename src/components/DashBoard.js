import React, { Component } from 'react';
import AuthService from './service/AuthService';
import { Redirect, Link } from 'react-router-dom';
import './dashboard.css';

class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:this.props.user
        }
        this.service=new AuthService();
    }

    logout =() => {
        this.service.logout()
        .then(response => {
            this.setState({
                loggedUser:null
            })
            this.props.getUser(null);
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         ...this.state, loggedUser:nextProps['user']
    //     })
    //     console.log(this.state.loggedUser)
    // }

    render() {
        if(!this.state.loggedUser) {
            return <Redirect to='/'/>
        }
        return (
                <nav id='sidebar' className='text-center pl-3 pr-3 '>
                <ul className='navbar-nav'>
                <li  className='nav-item d-flex align-items-center' style={{height:'70px'}}>
                    <Link to='/' className='nav-link m-auto'>
                        <div className='d-none d-md-block text-white'>Archi-Office</div>  
                    </Link>
                    
                </li>
                
                <li className='nav-item'>
                    <hr className='mt-0' style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                    <Link to='/office' className='nav-link text-white'>Office</Link>
                    <hr style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                </li>
                
                
                <li className="nav-item"> 
                    <Link to='/user' className='nav-link text-white'>My Page</Link>
                    <hr style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                </li>
                
                <li className="nav-item active"> 
                    <Link to='/' className='nav-link text-white'>Projects</Link>
                    <hr style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                </li>
                <li className="nav-item active"> 
                    <Link to='/calendar' className='nav-link text-white'>Calendar</Link>
                    <hr style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                </li>
                <li className="nav-item active"> 
                    <Link to='/' className='nav-link text-white'>Blog</Link>
                    <hr style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                </li>
                <li className="nav-item active"> 
                    <Link to='/' className='nav-link text-white'>Chat</Link>
                    <hr style={{borderTop :'1px solid rgba(255,255,255,0.5)'}}/>
                </li>
                </ul>
                    
                <div id='content'>
                    <Link to='/' className='nav-link text-white' onClick={(e)=>this.logout(e)}>Log Out</Link>
                </div> 
                </nav>
                
                
           
        );
    }
}

export default DashBoard;