import axios from 'axios';
require('dotenv').config();

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL:`${process.env.REACT_APP_API_URL}/api/users`,
            withCredentials:true
        })
        this.service = service;
    }

    signup=(username,password,email)=> {
        return this.service.post('/signup',{username,password,email})
        .then(response => response.data)
    }

    login=(username,password) => {
        return this.service.post('/login',{username,password})
        .then(response => response.data)
    }

    isLogged=()=> {
        return this.service.get('/isLogged')
        .then(response => response.data)
    }

    logout=() => {
        return this.service.get('logout')
        .then(response => response.data)
    }

    update=(username,firstname,lastname,address,zipcode,city,country,phone,email,birthday,birthplace,nationality) => {
        return this.service.put('/edit',{username,firstname,lastname,address,zipcode,city,country,phone,email,birthday,birthplace,nationality})
        .then(response => response.data)
    }

    upload=(theFile) => {
        return this.service.put('/upload',theFile)
        .then(response => response.data)
    }

    getAllTheUsers=() => {
        return this.service.get('/')
        .then(response => response.data )
    }

    googleLogIn = (response) => {
        const { accessToken } = response;
        if(!accessToken) {
            return null;
        }
        const googleResponse = {
            access_token: accessToken
        }
        return this.service.post('/login/google',googleResponse)
        .then(response => response.data)
    }

    deleteById = (id) => {
        return this.service.delete(`/delete/${id}`)
        .then(response => response.data)
    }

    changeRoleById = (role,id) => {
        return this.service.put(`/changerole/${id}`,{role})
        .then(response => response.data)
    }

    changeStatusById = (status,id) => {
        return this.service.put(`/changestatus/${id}`,{status})
        .then(response => response.data)
    }

}

export default AuthService;