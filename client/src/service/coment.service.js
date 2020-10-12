import axios from 'axios'

export default class ComentService {

    constructor() {
        this.api = axios.create({
            //baseURL: 'http://localhost:5000/api/profile',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }
    
    newComent =  coment => this.api.post('/coment/newcoment', coment)
    allComentProfile = (coment) => this.api.post('/coment/allComent', coment)
    allComentMovie = (coment) => this.api.post('/coment/allComentMovie', coment)

}