import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Image from 'react-bootstrap/Image'

import moviesService from '../../../service/movies.service.js'
import ComentMovies from '../coment/ComentMovies.js'

class MovieDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            array: [],
            favoriteMovies: []
        }
        this.moviesService = new moviesService()
    }

       
    getFindMovie(id) {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=9fafbea01209e6ebcaea05055a80313b`)
      .then((response) => { 
        this.setState({ movies: response.data });
      })
      .catch((error) => console.log(error));
    }
    componentDidMount() {
        this.getFindMovie(this.props.match.params.id)

    }


    handleFav = () => {

        this.moviesService
            .saveMovie(this.props.match.params.id, this.props.loggedInUser,this.state.movies)
            .then(response => {
                console.log('respose de movie details', response)
                this.props.fetchUser()
            })
            .catch(err => console.log(err))

    }
    
    componentDidUpdate(prevProps) {
        //console.log(prevProps.match.params.id)
        //console.log(this.props.match.params.id)
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.getFindMovie(this.props.match.params.id)
        }
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row MvDetails">
                        <div className="col-lg-6 col-xs-12">
                            <Image src={'https://image.tmdb.org/t/p/original' + this.state.movies.poster_path} alt={this.state.movies.original_title} rounded/>
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
                                <a target="_blank" href={this.state.movies.homepage} className="btn btn-dark">Ver película</a>
                                {this.props.loggedInUser && <button className="btn btn-danger like"  onClick={() => this.handleFav()}>LIKE</button>}

                            </div>
                        </div>
                        <div className="row" style={{display:'flex', flexDirection:'column', width:'100%',paddingLeft: '6%'}}>
                            <div className="h" style={{width:'100%'}}>
                                <h1>Comentarios</h1>
                            </div>
                            <div className="row profileComent">
                                <ComentMovies {...this.props} />
                            </div>
                            {this.props.loggedInUser && <Link className="btn btn-dark btnAdd" to={'/coment/form/' + this.state.movies.id}  >añadir comentario</Link>} 
                        </div>
                    </div>
                </div>
            </>
        )       
    }
}

export default MovieDetails