import axios from 'axios';

class TaskService {
    constructor() {
        let service = axios.create({
            baseURL:'http://localhost:5000/api/tasks',
            withCredentials:true
        })
        this.service = service;
    }

    create=(taskname,startdate,enddate,user,project) => {
        return this.service.post('/',{taskname,startdate,enddate,user,project})
        .then(response => response.data)
    }

    get = (projectID) => {
        return this.service.get(`/${projectID}`)
        .then(response => response.data)
    }

    getAll=() => {
        return this.service.get('/')
        .then(response => response.data)
    }

    delete = (id) => {
        return this.service.delete(`/${id}`)
        .then(response => response.data)
    }

}

export default TaskService;