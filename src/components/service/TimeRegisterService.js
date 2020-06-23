import axios from 'axios';

class TimeRegisterService {
    constructor() {
        let service = axios.create({
            baseURL:`${process.env.REACT_APP_API_URL}/api/worktimes`,
            withCredentials:true
        })
        this.service = service;
    }

    create=(weekofyear,year,creator,project,monday,tuesday,wednesday,thursday,friday,saturday,sunday) => {
        return this.service.post('/',{weekofyear,year,creator,project,monday,tuesday,wednesday,thursday,friday,saturday,sunday})
        .then(response => response.data)
    }

    getWeekAndUser=(creator,year,week) => {
        return this.service.get(`/${creator}/${year}/${week}`)
        .then(response => response.data)
    }

    getAllAndUser = (creator) => {
        return this.service.get(`/${creator}`)
        .then(response => response.data)
    }

    delete = (id) => {
        return this.service.delete(`/${id}`)
        .then(response => response.data)
    }

    // getOne = (id) => {
    //     return this.service.get(`/${id}`)
    //     .then(response => response.data)
    // }

    edit=(monday,tuesday,wednesday,thursday,friday,saturday,sunday,id) => {
        return this.service.put(`/edit/${id}`,{monday,tuesday,wednesday,thursday,friday,saturday,sunday})
        .then(response => response.data)
    }
}

export default TimeRegisterService;