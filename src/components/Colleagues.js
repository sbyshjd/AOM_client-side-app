import React, { Component } from 'react';
import AuthService from './service/AuthService';

class Colleagues extends Component {
    constructor(props) {
        super(props);
        this.state={
            colleagues:[]
        }
        this.service = new AuthService();
    }

    componentDidMount() {
        this.service.getAllTheUsers()
        .then(response => {
            this.setState({colleagues:response})
        })
    }


    render() {
        return (
            <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">City</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.colleagues.map((p,i)=> {
                    return (<tr key={p._id}>
                    <th scope="row">{i+1}</th>
                    <td>{p.username}</td>
                    <td>{p.firstname}</td>
                    <td>{p.lastname}</td>
                    <td>{p.email}</td>
                    <td>{p.phone}</td>
                    <td>{p.city}</td>
                    </tr>)
                })}
                    
                </tbody>
            </table>
                
            </div>
        );
    }
}

export default Colleagues;