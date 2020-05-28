import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className='container-fluid'>
            <div id='homepage'className='row d-flex flex-row-reverse'>
                <div className='col-4'>
                <h1 style={{color:'white',fontSize:'3rem'}}>Mana-Arch</h1>
                <h5>to be the best Architecture Office Management system, for all the architecture office from small atelier to giant company</h5>
                <Link to='/signup' style={{fontSize:'1rem',borderRadius:'10rem'}} className='btn btn-light btn-block btn-user' >Sign Up</Link>
                <Link to='/login' style={{fontSize:'1rem',borderRadius:'10rem'}} className='btn btn-light btn-block btn-user'>Log in</Link> 
                </div>
            </div>
            </div>
        );
    }
}

export default Home;