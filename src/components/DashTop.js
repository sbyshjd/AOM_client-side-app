import React, { Component } from 'react';
// import bellIcon from '../images/bell2.svg';
import { IoIosMailUnread } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
// import message from '../images/message.svg';

class DashTop extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:this.props.user,
            searchInput:''
        }
    }

    changeHandler=(e) => {
        const { name, value } = e.target;
        this.setState({
            [name]:value
        })
    }

    submitHandler=(e) => {
        e.preventDefault();
        e.stopPropagation();
        let input = this.state.searchInput.toLowerCase();
        if(input.includes('home')) {
            this.props.history.push('/')
        } else if (input.includes('office') || input.includes('colleague')) {
            this.props.history.push('/office')
        } else if (input.includes('page') || input.includes('profile') || input.includes('time') || input.includes('register') || input.includes('user')) {
            this.props.history.push('/user')
        } else if (input.includes('project') || input.includes('plan')) {
            this.props.history.push('projects')
        } else if (input.includes('calendar') || input.includes('schedule')) {
            this.props.history.push('/calendar')
        } else {
            this.props.history.push('/notfound')
        }
    }


    render() {
        return (
            <nav id='dash-top' className='navbar navbar-expand navbar-light bg-light d-flex justify-content-between pl-3 pr-3' 
            style={{height:'70px'}}>
                <form className="form-inline d-none d-sm-block" style={{width:'50%'}}>
                <div className="input-group" style={{width:'100%'}}>
                    <input type="text" className="form-control" placeholder="search for..." name='searchInput' onChange={(e)=> this.changeHandler(e)}/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2" onClick={(e) => this.submitHandler(e)}>search</button>
                </div>
                </div>     
                </form>
                <ul className='navbar-nav mt-3 mb-3'>
                    {/* <li className='nav-item pr-3'>
                        <img src={message} alt="message"/>
                    </li> */}
                
                    <li className='nav-item pr-3 border-right' >
                        {/* <img src={bellIcon} alt="bell"/> */}
                        {this.props.responseAll===false && <IoIosMailUnread className='text-danger' style={{fontSize:'1.25rem'}}/> }
                        {this.props.responseAll===true && <IoIosMail className='text-muted' style={{fontSize:'1.25rem'}}/> }
                    </li>
                    <li className='nav-item pl-3 pr-3 text-muted' >
                        {this.state.loggedUser.username}
                    </li>
                    <li className='nav-item'>
                        <img style={{height:'30px',borderRadius:'50px'}} src={this.state.loggedUser.photo} alt="profile"/>
                    </li>
                </ul>
                
            </nav>
        );
    }
}

export default DashTop;