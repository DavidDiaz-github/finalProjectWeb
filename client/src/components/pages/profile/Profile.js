import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Spinner } from 'react-bootstrap'

import MovieCard from '../movie/MovieCard.js'
import SerieCard from '../movie/SerieCard.js'
import moviesService from '../../../service/movies.service.js'
import Coment from '../coment/Coment.js'

import './profile.css'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayMovies: [],
            arraySeries: [],
            coment: [],
            arrayMoviesId: this.props.loggedInUser.favoriteMovies
            
        }
        this.moviesService = new moviesService()
    }

    getMoviesFavorite() {
        //this.props.fetchUser()
        this.props.loggedInUser && this.state.arrayMoviesId.map(id => {

                axios
                    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=9fafbea01209e6ebcaea05055a80313b`)
                    .then((response) => {
                        let joined = this.state.arrayMovies.concat(response.data)
                        this.setState({ arrayMovies: joined })
                        //this.props.fetchUser()
                    })
                    .catch((error) => console.log(error))
            })
        
    }

    

    getSeriesFavorite() {
        this.props.loggedInUser.favoriteSeries.map(id => {

                axios
                    .get(`https://api.themoviedb.org/3/tv/${id}?api_key=9fafbea01209e6ebcaea05055a80313b`)
                    .then((response) => {
                        let joined = this.state.arraySeries.concat(response.data)
                        this.setState({ arraySeries: joined })
                    })
                    .catch((error) => console.log(error))
            })
        
    }

    componentDidMount() {
        this.getMoviesFavorite()
        this.getSeriesFavorite()
    }
    
    componentDidUpdate(prevState) {
        console.log('prevProps', prevState.loggedInUser.favoriteMovies.length)
        console.log('state', this.state.arrayMoviesId.length)
         if (prevState.loggedInUser.favoriteMovies.length != this.state.arrayMoviesId.length) {
            //this.setState(this.state.arrayMoviesId)
            //this.setState(this.props.fetchUser())
            alert('El estado ha cambiado')
            //this.getMoviesFavorite()
        }
    }


    DeleteFavMovie = (id) => {

        this.moviesService
            .deleteMovie(id, this.props.loggedInUser)
            //.then(() => this.getMoviesFavorite())
            .then(response => response.data.favoriteMovies)
                    //this.state.arrayMovies.concat(elm)
                    //this.setState({ arrayMovies: elm })
            
            .then(response => {
                console.log(response)
                this.setState({ arrayMoviesId: response })
                this.props.fetchUser()
            })
            // .then(res => console.log(res))
            // .then(() => this.props.fetchUser())
            //.then(() => this.getMoviesFavorite())
            //.then(() => this.getMoviesFavorite())
            .catch(err => console.log(err))
    }
    

    render() {
        console.log(this.state.arrayMoviesId)
        //console.log()
        return (
            <div className="bgProfile">
                <div className="container profile">
                    <div className="row" style={{justifyContent:'space-between'}}>
                        <h1>BIENVENID@ -  {this.props.loggedInUser.username}</h1>
                        <Link to={'/profile/edit/'+ this.props.loggedInUser._id}  className='btn btn-dark' style={{height:'40px', marginTop:'1%'}}>Editar Perfil</Link>
                    </div>
                    <hr />
                    <div className="row cardInfo">
                        {!this.state.arrayMovies && <Spinner animation="border" />}
                        <h1>PELICULAS FAVORITAS</h1>                       
                        <div className="row" style={{padding:'0px'}}>
                            {this.state.arrayMovies && this.state.arrayMovies.map(elm =>
                                <MovieCard key={elm.id} elm={elm} {...this.props} fetchUser={this.props.fetchUser} DeleteFavMovie={this.DeleteFavMovie} />
                            )}
                        </div>
                    </div>
                    <div className="row cardInfo">
                            <h1>SERIES FAVORITAS</h1>                       
                        <div className="row">
                            {this.state.arraySeries && this.state.arraySeries.map(elm =>
                                <SerieCard key={elm.id} elm={elm} {...this.props} fetchUser={this.props.fetchUser}/>
                            )}
                        </div>
                    </div>
                    <div className="row profileComent">
                        <h1>MIS COMENTARIOS</h1>
                        <Coment {...this.props}/>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Profile