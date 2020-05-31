import axios from 'axios';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL:'http://localhost:5000/api/users',
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

}

export default AuthService;