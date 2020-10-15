import React, { Component } from 'react'

import moviesService from '../../../service/movies.service.js'
import ComentCard from '../coment/ComentCard.js'
import ComentForm from '../coment/ComentForm.js'
import ApiService from '../../../service/api.service.js'
import comentService from '../../../service/coment.service.js'
import logo from './video.png'

import Image from 'react-bootstrap/Image'
import Modal from 'react-bootstrap/Modal'
import { Spinner } from 'react-bootstrap'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel'

class MovieDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            array: [],
            favoriteMovies: [],
            imageCarousel: [],
            coment: [],
            view: false
        }
        this.moviesService = new moviesService()
        this.ApiService = new ApiService()
        this.comentService = new comentService()
    }

    handleModal = view => this.setState({ view })
    //COMENT SERVICE
    getComentMovie() {
        this.comentService
            .allComentMovie({movieId : this.props.match.params.id})
            .then(response => {
                let joined = this.state.coment.concat(response.data)
                this.setState({ coment: joined })
            })
            .catch(err => console.log('error en allComent', err))
    }
    updateComent() {
        this.setState({coment: []})
    }
    
    //BUSQUEDA DE PELICULAS
    getFindMovie(id) {
        this.ApiService
            .findMovies(id)
            .then(response => {this.setState({movies: response.data})})
            .catch(err => console.log(err))
    }

    getImageCarousel(id) {
        this.ApiService
            .findImageMovies(id)
            .then(response => {
                this.setState({imageCarousel: response.data.backdrops})
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getFindMovie(this.props.match.params.id)
        this.getImageCarousel(this.props.match.params.id)
        this.getComentMovie()
    }


    handleFav = () => {

        this.moviesService
            .saveMovie(this.state.movies.imdb_id, this.props.loggedInUser, this.state.movies)
            .then(response => {
                this.props.fetchUser()
            })
            .catch(err => console.log(err))

    }
    
    componentDidUpdate(prevProps,prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.getFindMovie(this.props.match.params.id)
            this.getImageCarousel(this.props.match.params.id)
            this.updateComent()
            this.getComentMovie()
        }   
    }

    update() {
        this.updateComent()
        this.getComentMovie()
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row MvDetails">
                        <div className="col-lg-6 col-xs-12">
                            <Image src={'https://image.tmdb.org/t/p/original' + this.state.movies.poster_path} alt={this.state.movies.original_title} rounded style={{marginBottom:'40px'}}/>
                            <Carousel autoPlay interval="3000" transitionTime="3000" showArrows={true} infiniteLoop width='70%' showIndicators={false} >
                                {this.state.imageCarousel && this.state.imageCarousel.map(elm => <div><img src={'https://image.tmdb.org/t/p/original' + elm.file_path} alt={elm.vote_average} /></div>)}
                            </Carousel>
                        </div>
                        <div className="col-lg-6 col-xs-12">
                            <div className="divTitle">
                                <h1>{this.state.movies.original_title}</h1>
                                <h4>Popularidad : {this.state.movies.popularity}</h4>
                            </div> 
                            <hr />
                            <h4>Fecha de estreno : {this.state.movies.release_date}</h4>
                            <h4>Sinopsis : </h4>
                            <p>{this.state.movies.overview}</p>
                            <h6> Duración : {this.state.movies.runtime} min  ||  Recaudación : {this.state.movies.revenue}$ || Votación : {this.state.movies.vote_average}/10 </h6>
                            <div>
                                <h4>Productores : </h4>
                                <ul>
                                    {!this.state.movies.production_companies ? <h4>spiner</h4> : this.state.movies.production_companies.map(elm => <li className="li" key={elm.id}>{elm.name}</li>)}
                                </ul>
                            </div>
                            <div>
                                <a target="_blank" href={this.state.movies.homepage} className="btn video">Ver película<img src={logo} alt='movie' style={{width:'30px', marginLeft:'5px'}}/></a>
                                {this.props.loggedInUser && <button className="btn btn-dark like"  onClick={() => this.handleFav()}>+ añadir a favoritos</button>}

                            </div>
                        </div>
                        <div className="row" style={{display:'flex', flexDirection:'column', width:'100%',paddingLeft: '6%'}}>
                            <div className="h" style={{width:'100%'}}>
                                <h2 style={{fontWeight:'600'}}>Comentarios</h2>
                            </div>
                            <div className="row profileComent">
                                <div className="row" style={{marginLeft:'0px', justifyContent:'space-evenly'}}>
                                    {!this.state.coment ? <Spinner /> : this.state.coment.map(elm => <ComentCard key={elm._id} data={elm} {...this.props} />) }
                                </div>                  
                            </div>
                            {this.props.loggedInUser && <button className="btn btn-dark btnAdd" onClick={() => this.handleModal(true)}  >añadir comentario</button>} 
                        </div>
                        <Modal show={this.state.view} onHide={() => this.handleModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title style={{fontWeight:'700'}}>Nuevo Comentario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ComentForm imdb_id={this.state.movies.imdb_id} tmdb_id={this.state.movies.id} loggedInUser={this.props.loggedInUser} closeModal={() => this.handleModal(false)} update={() => this.update()}/>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </>
        )       
    }
}

export default MovieDetails