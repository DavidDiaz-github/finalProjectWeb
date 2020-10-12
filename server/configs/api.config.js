const axios = require('axios')
const qs = require('qs')
const data = qs.stringify({})

class MoviesApiHandler {
    constructor() {
        this.config = axios.create({
            baseURL: 'https://api.themoviedb.org/3',
            
        })
    }
    getTrendingMovies = () => this.config('/trending/movie/week?api_key=9fafbea01209e6ebcaea05055a80313b')
    getTrendingTv = () => this.config('/trending/tv/week?api_key=9fafbea01209e6ebcaea05055a80313b')

}

module.exports = MoviesApiHandler;