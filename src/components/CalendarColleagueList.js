import React, { Component } from 'react';

class CalendarColleagueList extends Component {
    constructor(props) {
        super(props);
        this.state= {
            checkedUsers:[]
        }
    }

    changeHandler=() => {
        const checkAllInput = document.querySelector('#calendar-colleague-list .calendar-colleague-list-checkall');
        const checkOneInput = document.querySelectorAll('#calendar-colleague-list .calendar-colleague-list-checkone');
        
        const checkedInput = [...checkOneInput].filter(input => input.checked);
        if(checkedInput.length===checkOneInput.length) {
            checkAllInput.checked=true;
        } else {
            checkAllInput.checked=false;
        }
        const checkedUserIds = checkedInput.map(input=> input.value);
        console.log(checkedUserIds);

        this.props.rerenderCalendar(checkedUserIds);
    }

    changeAllHandler=() => {
        const checkAllInput = document.querySelector('#calendar-colleague-list .calendar-colleague-list-checkall');
        const checkOneInput = document.querySelectorAll('#calendar-colleague-list .calendar-colleague-list-checkone');
        if(checkAllInput.checked) {
            [...checkOneInput].forEach(input => input.checked=true)
        } else {
            [...checkOneInput].forEach(input => input.checked=false)
        }
        const checkedInput = [...checkOneInput].filter(input => input.checked);
        const checkedUserIds = checkedInput.map(input=> input.value);
        console.log(checkedUserIds);
        this.props.rerenderCalendar(checkedUserIds);
    }

    render() {
        return (
            <div id='calendar-colleague-list' style={{width:'150px'}}>
                <p>Colleagues</p>   
                <input class='calendar-colleague-list-checkall' type="checkbox" name='colleague-list' defaultChecked='checked' onChange={this.changeAllHandler}/>
                <label>select all</label>
                {this.props.users.map(user=>(<div key={user._id}>
                        <input class='calendar-colleague-list-checkone' type='checkbox' name='colleague-list' value={user._id} defaultChecked='checked' onChange={this.changeHandler}/>
                        <label>{user.username}</label>
                    </div>))}
            </div>
        );
    }
}

export default CalendarColleagueList;