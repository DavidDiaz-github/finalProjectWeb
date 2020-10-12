import React, { Component } from 'react'

import axios from 'axios'

import { Spinner } from 'react-bootstrap'


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
    }

    getTrendingMovies() {

    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=9fafbea01209e6ebcaea05055a80313b`)
      .then((response) => { 
        this.setState({ trendingMovies: response.data.results });
      })
      .catch((error) => console.log(error));
    }

    getTrendingtv() {

    axios
      .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=9fafbea01209e6ebcaea05055a80313b`)
      .then((response) => {
        this.setState({ trendingTv: response.data.results });
      })
      .catch((error) => console.log(error));
    }

    getTrendingtCelebrities() {

    axios
      .get(`https://api.themoviedb.org/3/trending/person/week?api_key=9fafbea01209e6ebcaea05055a80313b`)
      .then((response) => { 
        this.setState({ trendingCelebrities: response.data.results });
      })
      .catch((error) => console.log(error));
    }
    componentDidMount() {
        this.getTrendingMovies()
        this.getTrendingtv()
        this.getTrendingtCelebrities()
    }

    render() {
        // const id = this.props.match.params.id
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
