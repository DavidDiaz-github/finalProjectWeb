import React, { Component } from 'react'

import { Spinner } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import MovieCard from '../movie/MovieCard.js'
import SerieCard from '../movie/SerieCard.js'
import moviesService from '../../../service/movies.service.js'
import Coment from '../coment/Coment.js'
import ProfileEditForm from './ProfileEditForm.js'
import ApiService from '../../../service/api.service.js'

import './profile.css'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayMovies: [],
            arraySeries: [],
            coment: [],
            arrayMoviesId: this.props.loggedInUser.favoriteMovies,
            view: false            
        }
        this.moviesService = new moviesService()
        this.ApiService = new ApiService()
    }

    handleModal = view => this.setState({ view })

    getMoviesFavorite() {
        this.props.fetchUser()
        this.props.loggedInUser && this.state.arrayMoviesId.map(id => {

            this.ApiService
                .findMovies(id)
                .then(response => {
                    let joined = this.state.arrayMovies.concat(response.data)
                    this.setState({ arrayMovies: joined})
                })
                .catch(err => console.log(err))
            })       
    }

    

    getSeriesFavorite() {
        this.props.loggedInUser.favoriteSeries.map(id => {

            this.ApiService
                .findSeries(id)
                .then(response => {
                    let joined = this.state.arraySeries.concat(response.data)
                    this.setState({ arraySeries: joined})
                })
                .catch(err => console.log(err))
        })     
    }

    componentDidMount() {
        this.getMoviesFavorite()
        this.getSeriesFavorite()
    }
    
    DeleteFavMovie = (id) => {

        this.moviesService
            .deleteMovie(id, this.props.loggedInUser)
            .then(response => {
                this.setState({ arrayMoviesId: response.data.favoriteMovies, arrayMovies: [] }, () => this.getMoviesFavorite())
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="bgProfile">
                <div className="container profile">
                    <div className="row" style={{justifyContent:'space-between'}}>
                        <h1>BIENVENID@ -  {this.props.loggedInUser.username}</h1>
                        <button className="btn btn-dark btnAdd" onClick={() => this.handleModal(true)} >Editar Perfil</button>
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
                    <Modal show={this.state.view} onHide={() => this.handleModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontWeight:'700'}}>Editar Usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ProfileEditForm user_id={this.props.loggedInUser._id} loggedInUser={this.props.loggedInUser} closeModal={() => this.handleModal(false)} setTheUser={this.props.setTheUser} fetchUser={this.props.fetchUser}/>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
            
        )
    }
}

export default Profile