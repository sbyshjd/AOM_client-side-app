import axios from 'axios';

class EventService {
    constructor() {
        let service = axios.create({
            baseURL:'http://localhost:5000/api/events',
            withCredentials:true
        })
        this.service = service;
    }

    create=(type,eventname,description,starttime,endtime,owner,forwho,participants) => {
        return this.service.post('/',{type,eventname,description,starttime,endtime,owner,forwho,participants})
        .then(response => response.data)
    }

    get = () => {
        return this.service.get('/')
        .then(response => response.data)
    }

    delete = (id) => {
        return this.service.delete(`/${id}`)
        .then(response => response.data)
    }

    edit = (type,eventname,description,starttime,endtime,id) => {
        return this.service.put(`/edit/${id}`,{type,eventname,description,starttime,endtime})
        .then(response => response.data)
    }

    invite = (forwhoID,id) => {
        return this.service.put(`/invite/${id}`,{forwhoID})
        .then(response => response.data)
    }

    join = (participantID,id) => {
        return this.service.put(`/join/${id}`,{participantID})
        .then(response => response.data)
    }
    unjoin = (participantID,id) => {
        return this.service.put(`/unjoin/${id}`,{participantID})
        .then(response => response.data)
    }
}

export default EventService;