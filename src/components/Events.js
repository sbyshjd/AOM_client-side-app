import React, { Component } from 'react';
import EventCreateModal from './EventCreateModal';
import EventService from './service/EventService';

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
        this.service.get()
        .then(response => {
            this.setState({events:response})
        })
    }

    render() {
        return (
            <div>
                {this.state.events.map((e,i)=> <div key={e._id}>{i},{e.eventname},{e.owner.username}</div>   )}
                <button className="btn" onClick={()=>this.setModalShow(true)}>Add a new Event</button>
                    <EventCreateModal
                        owner = {this.props.user}
                        show={this.state.showCreateModal}
                        onHide={()=>this.setModalShow(false)}
                    />
            </div>
        );
    }
}

export default Events;