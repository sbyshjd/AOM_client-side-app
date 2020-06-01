import React, { Component } from 'react';
import EventCreateModal from './EventCreateModal';
import EventService from './service/EventService';
import EventCard from './EventCard';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCreateModal:false,
            events:[]
        }
        this.service = new EventService();
    }

    setModalShow=(boolean) => {
        this.setState({showCreateModal:boolean})
    }

    componentDidMount() {
        this.reloadEvents();
    }

    reloadEvents =() => {
        this.service.get()
        .then(response => {
            this.setState({events:response})
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='overflow-auto pl-5 pr-5'>
                {this.state.events.map((e,i)=> <EventCard user={this.props.user} key={e._id} reload={this.reloadEvents} {...e}/>)}
                <div className='d-flex flex-row-reverse'>
                <button className="btn" onClick={()=>this.setModalShow(true)} style={{backgroundColor:'orange',color:'white'}}>
                Add a new Event
                </button>
                </div>
                
                    <EventCreateModal
                        reload = {this.reloadEvents}
                        owner = {this.props.user}
                        show={this.state.showCreateModal}
                        onHide={()=>this.setModalShow(false)}
                    />
            </div>
        );
    }
}

export default Events;