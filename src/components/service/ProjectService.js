import axios from 'axios';

class ProjectService {
    constructor() {
        let service = axios.create({
            baseURL:'http://localhost:5000/api/projects',
            withCredentials:true
        })
        this.service = service;
    }

    create=(projectname,projectcode,startdate,enddate,status,partner,leader,team,phase) => {
        return this.service.post('/',{projectname,projectcode,startdate,enddate,status,partner,leader,team,phase})
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

    getOne = (id) => {
        return this.service.get(`/${id}`)
        .then(response => response.data)
    }

    edit=(projectname,projectcode,startdate,enddate,status,owner,leader,team,phase,id) => {
        return this.service.put(`/${id}`,{projectname,projectcode,startdate,enddate,status,owner,leader,team,phase})
        .then(response => response.data)
    }
}

export default ProjectService;