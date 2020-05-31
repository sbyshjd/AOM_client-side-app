import axios from 'axios';

class EventService {
    constructor() {
        let service = axios.create({
            baseURL:'http://localhost:5000/api/events',
            withCredentials:true
        })
        this.service = service;
    }

    create=(eventname,description,starttime,endtime,owner) => {
        return this.service.post('/',{eventname,description,starttime,endtime,owner})
        .then(response => response.data)
    }

    get = () => {
        return this.service.get('/')
        .then(response => response.data)
    }
}

export default EventService;