import axios from 'axios'

export default class ApiService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.themoviedb.org/3'
            
        })
    }
    moviesTrending = () => this.api.get('/trending/movie/week?api_key=9fafbea01209e6ebcaea05055a80313b')
    seriesTrending = () => this.api.get('/trending/tv/week?api_key=9fafbea01209e6ebcaea05055a80313b')   
    celebritiesTrending = () => this.api.get('/trending/person/week?api_key=9fafbea01209e6ebcaea05055a80313b')

    findMovies = id => this.api.get(`/movie/${id}?api_key=9fafbea01209e6ebcaea05055a80313b`)
    findSeries = id => this.api.get(`/tv/${id}?api_key=9fafbea01209e6ebcaea05055a80313b`)
    findImageMovies = id => this.api.get(`/movie/${id}/images?api_key=9fafbea01209e6ebcaea05055a80313b`)

    upComing = () => this.api.get('/movie/upcoming?api_key=9fafbea01209e6ebcaea05055a80313b&language=es-ES&page=1')
}