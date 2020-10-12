import axios from 'axios'

export default class MoviesService {

    constructor() {
        this.api = axios.create({
            //baseURL: 'http://localhost:5000/api/profile',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }
    
    saveProfile =  (id,user) => this.api.post(`/profile/edit/${id}`, user)

    saveMovie = (id, user, movie) => this.api.post(`/profile/addmovie/${id}`, user, movie)
    deleteMovie = (id, user) => this.api.post(`/profile/deleteFavMovie/${id}`, user)

    saveSerie = (id, user, serie) => this.api.post(`/profile/addserie/${id}`, user, serie)
    deleteSerie = (id, user) => this.api.post(`/profile/deleteFavSerie/${id}`, user)

}