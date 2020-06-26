import React, { Component } from 'react';
import EventCreateModal from './EventCreateModal';
import EventService from './service/EventService';
import EventCard from './EventCard';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal:false,
            // events:[]
        }
        this.service = new EventService();
    }

    setModalShow=(boolean) => {
        this.setState({showCreateModal:boolean})
    }

    // componentDidMount() {
    //     this.reloadEvents();
    // }

    // reloadEvents =() => {
    //     this.service.get()
    //     .then(response => {
    //         this.setState({events:response})
    //     })
    //     .catch(err => console.log(err))
    // }

    checkResponse=() => {
        const isResponsed = this.props.events.every(e=> e.responses.includes(this.props.user._id));
        console.log(isResponsed)
        this.props.checkResponse(isResponsed);
    }

    // componentDidMount() {
    //     this.checkResponse();
    // }

    render() {
        return (
            <div className='overflow-auto pl-5 pr-5' style={{maxHeight:'600px'}}>
                {this.props.events.map((e,i)=> <EventCard user={this.props.user} key={e._id} reload={this.props.reload} {...e}/>)}
                <div className='d-flex flex-row-reverse'>
                <button className="btn" onClick={()=>this.setModalShow(true)} style={{backgroundColor:'orange',color:'white'}}>
                Add a new Event
                </button>
                </div>
                
                    <EventCreateModal
                        reload = {this.props.reload}
                        owner = {this.props.user}
                        show={this.state.showCreateModal}
                        onHide={()=>this.setModalShow(false)}
                    />
            </div>
        );
    }
}

export default Events;