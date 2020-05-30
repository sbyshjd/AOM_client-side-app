import React, { Component } from 'react';
import bellIcon from '../images/bell2.svg';
import message from '../images/message.svg';

class DashTop extends Component {
    constructor(props) {
        super(props);
        this.state={
            loggedUser:this.props.user
        }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         ...this.state, loggedUser:nextProps['user']
    //     })
    //     console.log(this.state.loggedUser)
    // }
    render() {
        return (
            <nav id='dash-top' className='navbar navbar-expand navbar-light bg-light d-flex justify-content-between pl-3 pr-3' 
            style={{height:'70px'}}>
                <form className="form-inline d-none d-sm-block" style={{width:'50%'}}>
                <div className="input-group" style={{width:'100%'}}>
                    <input type="text" className="form-control" placeholder="search for..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">search</button>
                </div>
                </div>     
                </form>
                <ul className='navbar-nav mt-3 mb-3'>
                    <li className='nav-item pr-3'>
                        <img src={message} alt="message"/>
                    </li>
                
                    <li className='nav-item pr-3 border-right'>
                        <img src={bellIcon} alt="bell"/>
                    </li>
                    <li className='nav-item pl-3 pr-3 text-muted'>
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