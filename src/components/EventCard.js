import React, { Component } from 'react';
import moment from 'moment';
import EventService from './service/EventService';
import EventEditModal from './EventEditModal';
import EventDeleteModal from './EventDeleteModal';
import EventUserModal from './EventUserModal';

class EventCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEventEditModal: false,
            showEventDeleteModal:false,
            showEventUserModal:false,
            participants:this.props.participants,
            isJoined:null
        }
        this.service = new EventService();
    }
    bgColor = (type) => {
        switch(type) {
            case 'meeting':
                return '#5cb85c';
            case 'holiday':
                return '#d9534f';
            case 'activity':
                return '#5bc0de';
            default:
                return '#f7f7f7';
        }
    };

    setModalShow=(boolean) => {
        this.setState({showEventEditModal:boolean})
    }

    setDeleteModalShow=(boolean) => {
        this.setState({showEventDeleteModal:boolean})
    }

    setUserModalShow=(boolean) => {
        this.setState({showEventUserModal:boolean})
    }

    deleteHandler = () => {
        this.service.delete(this.props._id)
        .then(response => {
            this.props.reload()
        })
    }

    isJoin=()=> {
        if(this.state.participants===0) {
            return false;
        }
        const participantsID = this.props.participants.map(p=>p._id);
        const userID = this.props.user._id;
        if(participantsID.includes(userID)) {
            return true;
        }
        return false;

    }

    componentDidMount() {
        this.setState({
            isJoined:this.isJoin()
        })
    }

    joinHandler=() => {
        const participantID = this.props.user._id;
        if(!this.state.isJoined) {
            this.service.join(participantID,this.props._id)
            .then(response => {
                this.setState({
                    isJoined:!this.state.isJoined
                })
                this.props.reload()
            })
            .catch(err => console.log(err))
        } else {
            this.service.unjoin(participantID,this.props._id)
            .then(response => {
                this.setState({
                    isJoined: !this.state.isJoined
                })
                    this.props.reload()
                })
            .catch(err => console.log(err))
        }

    }

    render() {
        console.log(this.props.user._id)
        return (
            <div className="card mt-3 mb-3">
                <div className="card-header text-white" style={{backgroundColor:this.bgColor(this.props.type)}}>
                    {this.props.type}
                </div>
                <div className="card-body">
                    <h3 className="card-title">{this.props.eventname}</h3>
                    <h5 className="card-text mt-3 mb-3">{this.props.description}</h5>
                    <p className='mb-0'>From: {moment(this.props.starttime).format("dddd, MMMM Do YYYY, h:mm:ss a")} </p>
                    <p>To: {moment(this.props.endtime).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
                    <p>created by: {this.props.owner.firstname}</p>
                    <div className='d-flex justify-content-between'>
                        <button className="btn" style={{backgroundColor:this.bgColor(this.props.type)}} onClick={this.joinHandler}>
                            {this.state.isJoined ? 'unJoin':'Join'}
                        </button>
                        <div>
                            <button className='btn'>Participants:{this.props.participants.length}</button>
                            <button className='btn'>Invited:{this.props.forwho.length}</button>
                        </div>
                        
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-between" style={{color:this.bgColor(this.props.type)}}>
                    <div>
                        {moment(this.props.starttime).fromNow()}
                    </div>
                    <div>
                        <button className='btn btn-outline-info' onClick={()=>this.setModalShow(true)} >Edit</button>
                        <EventEditModal
                            id={this.props._id}
                            type={this.props.type}
                            eventname = {this.props.eventname}
                            description = {this.props.description}
                            starttime = {this.props.starttime}
                            endtime = {this.props.endtime}
                            reload = {this.props.reload}
                            show={this.state.showEventEditModal}
                            onHide={()=>this.setModalShow(false)}
                        />
                        <button className='btn btn-outline-dark ml-3' onClick={()=>this.setUserModalShow(true)}>Assign Participants</button>
                            <EventUserModal
                                id = {this.props._id}
                                reload ={this.props.reload}
                                forwho = {this.props.forwho}
                                show={this.state.showEventUserModal}
                                onHide={()=>this.setUserModalShow(false)}
                            />
                        <button className='btn btn-outline-danger ml-3' onClick={()=>this.setDeleteModalShow(true)}>Delete</button>
                            <EventDeleteModal
                                id = {this.props._id}
                                reload ={this.props.reload}
                                delete = {this.deleteHandler}
                                show={this.state.showEventDeleteModal}
                                onHide={()=>this.setDeleteModalShow(false)}
                            />
                    </div>
                </div>
            </div>
        );
    }
}

export default EventCard;