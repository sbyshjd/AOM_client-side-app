import React, { Component } from 'react';
import moment from 'moment';
import TimeRegisterService from '../service/TimeRegisterService';


class DashTimeRegister extends Component {

    constructor(props) {
        super(props);
        this.state={
            timeRegisters:[],
            selectID:'',
            weekNum: moment().week(),
            yearNum: moment().year()
        }
        this.service = new TimeRegisterService();
    }


    //change add or minus the week number by click
    changeTheWeekNum =(e,num) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            weekNum:this.state.weekNum + num
        },this.getWeekTimeRegister)
    }

    //set the week number to current week
    setTheCurrentWeek = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            weekNum:moment().week(),
            yearNum:moment().year()
        },this.getWeekTimeRegister)
    }

    getWeekTimeRegister = () => {
        const creator = this.props.user._id;
        const year = this.state.yearNum;
        const week = this.state.weekNum;
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
        const year = this.state.yearNum;
        const weekofyear = this.state.weekNum;
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
    }

    timeRegisterDeleteHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const result = window.confirm("Are you sure to delete")
        if(result) {
            this.service.delete(e.target.value)
            .then(response => {
                this.getWeekTimeRegister();
            })
        }
        
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
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-2'>
                        <h5 className='pt-3 pb-3'>Project Selection</h5>
                        <select className='d-block form-control' onChange={(e)=>this.projectChangeHandler(e)} >
                            <option disabled selected hidden>selected project</option>
                            {this.props.projects.map(p => <option key={p._id} value={p._id}>{p.projectname}</option>)}
                        </select>
                        <button className='btn btn-warning float-right mt-3' onClick={(e)=>this.projectAddHandler(e)}>+</button>
                    </div>
                    <div className='col-9'>
                        <div className='d-flex justify-content-between pt-3 pb-3'>
                            <h5>Time Registration: {moment().isoWeek(this.state.weekNum).startOf('isoWeek').format('YYYY-MMM-DD')} t/m {moment().isoWeek(this.state.weekNum).endOf('isoWeek').format('YYYY-MMM-DD')} --- week {this.state.weekNum}</h5>
                            <div>
                                <button className='btn' onClick={(e) => this.changeTheWeekNum(e,-1)}>{'<'}</button><button className='btn' onClick={(e)=>this.setTheCurrentWeek(e)}>today</button><button className='btn' onClick={(e) => this.changeTheWeekNum(e,1)}>{'>'}</button>
                            </div>
                        </div>
                        
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Project</th>
                                    <th scope="col">Action</th>
                                    <th scope="col">Mon</th>
                                    <th scope="col">Tue</th>
                                    <th scope="col">Wed</th>
                                    <th scope="col">Thu</th>
                                    <th scope="col">Fri</th>
                                    <th scope="col">Sat</th>
                                    <th scope="col">Sun</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.timeRegisters.map(t => (<tr className='time-register-project' key={t._id} value={t._id}>
                                    <th scope="row" className='h6'>{t.project.projectname}</th>
                                    <th><button className='btn btn-danger' value={t._id} onClick={(e)=>this.timeRegisterDeleteHandler(e)}>remove</button></th>
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
                        </table>
                        <button className='btn btn-warning float-right' onClick={(e)=>this.saveWeekTime(e)}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashTimeRegister;