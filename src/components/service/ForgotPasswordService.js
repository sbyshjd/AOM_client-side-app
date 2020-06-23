import axios from 'axios';

class ForgotPasswordService {
    constructor() {
        let service = axios.create({
            baseURL:'http://localhost:5000/api/forgotPassword',
            withCredentials:true
        })
        this.service = service;
    }

    reset=(email) => {
        return this.service.post('/',{email})
        .then(response => response.data)
    }

    sendToken = (token) => {
        return this.service.get(`/${token}`)
        .then(response => response.data)
    }

    submitPassword = (password,id) => {
        return this.service.put(`/resetpassword/${id}`,{password})
        .then(response => response.data)
    }



}

export default ForgotPasswordService;