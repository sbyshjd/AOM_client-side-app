import React, { Component } from 'react';
import moment from 'moment';

const today = moment();
const beginOfWeek = today.startOf('isoWeek').format('dddd, MMMM Do YYYY');
const endOfWeek = today.endOf('isoWeek').format('dddd, MMMM Do YYYY');

class DashTimeRegister extends Component {

    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-3'>
                        <p>project selection</p>
                        <select className='d-block'>
                            {this.props.projects.map(p => <option>{p.projectname}</option>)}
                        </select>
                        <button>+</button>
                    </div>
                    <div className='col-9'>
                        Time Registration: {beginOfWeek} t/m {endOfWeek}--- week {moment().week()}
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashTimeRegister;