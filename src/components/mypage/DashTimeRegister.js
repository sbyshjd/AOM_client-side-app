import React, { Component } from 'react';
import moment from 'moment';
import TimeRegisterService from '../service/TimeRegisterService';

const today = moment();
const beginOfWeek = today.startOf('isoWeek').format('dddd, MMMM Do YYYY');
const endOfWeek = today.endOf('isoWeek').format('dddd, MMMM Do YYYY');

class DashTimeRegister extends Component {

    constructor(props) {
        super(props);
        this.state={
            timeRegisters:[],
            selectID:'',
        }
        this.service = new TimeRegisterService();
    }

    getWeekTimeRegister = () => {
        const creator = this.props.user._id;
        const year = moment().year();
        const week = moment().week();
        this.service.getWeekAndUser(creator, year, week)
        .then(foundtimeRegisters => {
            this.setState({
                timeRegisters:foundtimeRegisters
            })
        })
    }

    projectChangeHandler=(e) => {
        this.setState({
            selectID: e.target.value
        })
    }

    projectAddHandler=(e) => {
        // const selectedProject = this.props.projects.find(p => p._id===this.state.selectID);
        const year = moment().year();
        const weekofyear = moment().week();
        const creator = this.props.user._id;
        const project = this.state.selectID;
        const monday = 0;
        const tuesday = 0;
        const wednesday = 0;
        const thursday = 0;
        const friday = 0;
        const saturday = 0;
        const sunday = 0;
        this.service.create(weekofyear,year,creator,project,monday,tuesday,wednesday,thursday,friday,saturday,sunday)
        .then(response => {
            this.getWeekTimeRegister()
        })
        //push the new project into the existing selected projects
    }

    timeRegisterDeleteHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.service.delete(e.target.value)
        .then(response => {
            this.getWeekTimeRegister();
        })
    }

    saveWeekTime = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const timeRegisters = document.querySelectorAll('.time-register-project');
        console.log(timeRegisters);
        const timeRegistersValue = [...timeRegisters].map(timeRegister => {
            const timeRegisterID = timeRegister.attributes[1].nodeValue;
            const inputs = timeRegister.querySelectorAll('td input');
            const inputsValue = [...inputs].map(input => Number(input.value));
            inputsValue.push(timeRegisterID)
            return inputsValue;
        })
        console.log(timeRegistersValue)
        const timeWeekPromise = timeRegistersValue.map(params => {
            const monday = params[0];
            const tuesday = params[1];
            const wednesday = params[2];
            const thursday = params[3];
            const friday = params[4];
            const saturday = params[5];
            const sunday = params[6];
            const id = params[7];
            return this.service.edit(monday,tuesday,wednesday,thursday,friday,saturday,sunday,id)
        })
        Promise.all(timeWeekPromise)
        .then(response => {
            this.getWeekTimeRegister()
        })
    }

    componentDidMount() {
        this.getWeekTimeRegister()
    }


    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                        <p>project selection</p>
                        <select className='d-block' onChange={(e)=>this.projectChangeHandler(e)} >
                            <option disabled selected hidden>selected project</option>
                            {this.props.projects.map(p => <option key={p._id} value={p._id}>{p.projectname}</option>)}
                        </select>
                        <button onClick={(e)=>this.projectAddHandler(e)}>+</button>
                    </div>
                    <div className='col-9'>
                        <h5>Time Registration: {beginOfWeek} t/m {endOfWeek}--- week {moment().week()}</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Project</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Monday</th>
                                    <th scope="col">Tuesday</th>
                                    <th scope="col">Wednesday</th>
                                    <th scope="col">Thursday</th>
                                    <th scope="col">Friday</th>
                                    <th scope="col">Saturday</th>
                                    <th scope="col">Sunday</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.timeRegisters.map(t => (<tr className='time-register-project' key={t._id} value={t._id}>
                                    <th scope="row" className='h6'>{t.project.projectname}</th>
                                    <th><button value={t._id} onClick={(e)=>this.timeRegisterDeleteHandler(e)}>remove</button></th>
                                    <td><input min='0' max='24' defaultValue={t.monday} style={{width:'50px'}} type="number"/></td>
                                    <td><input min='0' max='24' defaultValue={t.tuesday} style={{width:'50px'}} type="number"/></td>
                                    <td><input min='0' max='24' defaultValue={t.wednesday} style={{width:'50px'}} type="number"/></td>
                                    <td><input min='0' max='24' defaultValue={t.thursday} style={{width:'50px'}} type="number"/></td>
                                    <td><input min='0' max='24' defaultValue={t.friday} style={{width:'50px'}} type="number"/></td>
                                    <td><input min='0' max='24' defaultValue={t.saturday} style={{width:'50px'}} type="number"/></td>
                                    <td><input min='0' max='24' defaultValue={t.sunday} style={{width:'50px'}} type="number"/></td>
                                </tr>)
                                )}
                            </tbody>
                            <button onClick={(e)=>this.saveWeekTime(e)}>Save</button>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashTimeRegister;