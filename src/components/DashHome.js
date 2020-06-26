import React, { Component } from 'react';
import TimeRegisterService from './service/TimeRegisterService';
import moment from 'moment';

class DashHome extends Component {
    constructor(props) {
        super(props);
        this.state={
            myWorkTime:[]
        }
        this.workTimeService = new TimeRegisterService();
    }

    totalTime=() => {
       return  this.state.myWorkTime.reduce((a,c)=> {
            return a+c.monday+c.tuesday+c.wednesday+c.thursday+c.friday+c.saturday+c.sunday
        },0)
    }

    weekProjectAndTime =() => {
        const weekWorkTime = this.state.myWorkTime.filter(w=> w.year===moment().year()&&w.weekofyear===moment().week());
        return weekWorkTime.map(w => <h5 key={w._id}><i>{w.project.projectname} for {w.monday+w.tuesday+w.wednesday+w.thursday+w.friday+w.saturday+w.sunday} hours</i></h5>)
    }


    componentDidMount() {
        this.workTimeService.getAllAndUser(this.props.user._id)
        .then(response => {
            this.setState({
                myWorkTime:response
            })
        })
    }



    render() {
        return (
            <div className='bg-light pt-4 pl-4' style={{height:'calc(100vh - 70px)'}}>
                <h3 className='text-muted mb-0'>Welcome to office,{this.props.user.username}</h3>
                <p className='mb-4'>Totally we have {this.props.projects.length} projects. and working on {this.props.projects.filter(p => p.status==='ongoing').length} projects right now </p>
                
                <div className='mt-3'>You are assigned to projects (you could check in project-planing ): <i>{this.props.projects.filter(p=>p.team.map(u=>u._id).includes(this.props.user._id)).map(p => <h5 key={p._id}>{p.projectname}</h5> )}</i></div>
                <div className='mt-3'>This week, You have workd on(you could check in time-registration) {this.state.myWorkTime.length>0 ? this.weekProjectAndTime() : (<h5><i>no projects and worktime yet, please sign in Time register</i></h5>)} </div>
                
                <p className='mt-4 mb-0'>You aleady worked in our office for: {this.totalTime()} hours totally.</p>
                <h3 className='text-muted'>Enjoy working and have fun!</h3>
            </div>
        );
    }
}

export default DashHome;