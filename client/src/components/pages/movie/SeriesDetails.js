import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Image from 'react-bootstrap/Image'

import ApiService from '../../../service/api.service.js'
import moviesService from '../../../service/movies.service.js'
import ComentMovies from '../coment/ComentMovies.js'

import logo from './video.png'
class SeriesDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            series: [],
            favoriteSeries:[],
            path: ''
        }
        this.moviesService = new moviesService()
        this.ApiService = new ApiService()
    }

       
    getFindSeries(id) {
    this.ApiService
            .findSeries(id)
            .then(response => {this.setState({series: response.data})})
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getFindSeries(this.props.match.params.id)
    }

    handleFav = () => {

        this.moviesService
            .saveSerie(this.props.match.params.id, this.props.loggedInUser, this.state.series)
            .then(response => this.props.fetchUser())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row MvDetails">
                        <div className="col-6">
                            <Image src={'https://image.tmdb.org/t/p/original' + this.state.series.poster_path} alt={this.state.series.name} rounded/>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="divTitle">
                                <h1>{this.state.series.name}</h1>
                                <div className="divTitle2">
                                    {!this.state.series.networks ? <h4>Spiner</h4> : <img src={'https://image.tmdb.org/t/p/original' + this.state.series.networks[0].logo_path} alt="logo" classname="logo" /> }
                                    <h4>Popularidad : {this.state.series.popularity}</h4>
                                </div>
                            </div> 
                            <hr />
                            <h4>Fecha de estreno : {this.state.series.first_air_date}</h4>
                            <h4>Sinopsis : </h4>
                            <p>{this.state.series.overview}</p>
                            <h5> Duración : {this.state.series.episode_run_time} min  ||  Votación : {this.state.series.vote_average}/10 </h5>
                            <h5> Temporadas : {this.state.series.number_of_seasons}   ||  Episodios : {this.state.series.number_of_episodes} </h5>
                            <div>
                                <h4>Productores : </h4>
                                <ul>
                                    {!this.state.series.production_companies ? <h4>spiner</h4> : this.state.series.production_companies.map(elm => <li className="li">{elm.name}</li>)}
                                </ul>
                            </div>
                            <div>
                                <a target="_blank" href={this.state.series.homepage} className="btn video">Ver serie<img src={logo} alt='movie' style={{width:'30px', marginLeft:'5px'}}/></a>
                                {this.props.loggedInUser && <Link className="btn btn-dark like" onClick={() => this.handleFav()}>+ añadir a favoritos</Link>}

                            </div>
                        </div>
                        <div className="row" style={{display:'flex', flexDirection:'column', width:'100%',paddingLeft: '6%'}}>
                            <div className="h" style={{width:'100%', marginTop:'30px'}}>
                                <h2 style={{fontWeight:'600'}}>Comentarios</h2>
                            </div>
                            <div className="row profileComent">
                                <ComentMovies {...this.props} />
                            </div>
                            {this.props.loggedInUser && <Link className="btn btn-dark btnAdd" to={'/coment/form/' + this.state.series.id} idMovie={this.state.series.id} >añadir comentario</Link>} 
                        </div>
                    </div>
                </div>
            </>
        )       
    }
}

export default SeriesDetails