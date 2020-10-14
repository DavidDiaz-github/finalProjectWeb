import React, { Component } from 'react'

import { Spinner } from 'react-bootstrap'

import ApiService from '../../../service/api.service.js'
import TrendingCardMovie from '../trending/TrendingCardMovie.js'
import TrendingCardTv from '../trending/TrendingCardTv.js'
import TrendingCelebritiesCard from '../trending/TrendingCelebritis.js'

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            trendingMovies: [],
            trendingTv: [],
            trendingCelebrities: []
        }
      this.ApiService = new ApiService()
    }

    getTrendingMovies() {
        this.ApiService
            .moviesTrending()
            .then(response => {
                let joined = this.state.trendingMovies.concat(response.data.results)
                this.setState({ trendingMovies: joined })
            })
            .catch(err => console.log(err))
    }

    getTrendingTv() {
        this.ApiService
            .seriesTrending()
            .then(response => {
                let joined = this.state.trendingTv.concat(response.data.results)
                this.setState({ trendingTv: joined })
            })
            .catch(err => console.log(err))
    }

    getTrendingtCelebrities() {
        this.ApiService
            .celebritiesTrending()
            .then(response => {
                let joined = this.state.trendingCelebrities.concat(response.data.results)
                this.setState({ trendingCelebrities: joined })
            })
            .catch(err => console.log(err))
    }
  
    componentDidMount() {
        this.getTrendingMovies()
        this.getTrendingTv()
        this.getTrendingtCelebrities()
    }

    render() {
        return (
            <>
                <div className="bg">
                <div className="container ">
                        <h1>Tendencias esta semana : 'Peliculas'</h1>    
                    <div className="row"> 
                  {!this.state.trendingMovies ? <Spinner animation="border" /> : this.state.trendingMovies.map(elm => <TrendingCardMovie key={elm.id}  {...elm} />)}
                    </div><br/>
                    <h1>Tendencias esta semana : 'Series'</h1>
                    <div className="row">
                        {!this.state.trendingTv ? <Spinner animation="border"/> : this.state.trendingTv.map(elm => <TrendingCardTv key={elm.id} {...elm} />)}
                    </div><br/>
                    <h1>Celebrities más valorados</h1>
                    <div className="row">
                        {!this.state.trendingCelebrities ? <Spinner animation="border"/> : this.state.trendingCelebrities.map(elm => <TrendingCelebritiesCard key={elm.id} {...elm}/>)}
                    </div>
                </div>
                </div>
            </>
        )
    }
}

export default Home
