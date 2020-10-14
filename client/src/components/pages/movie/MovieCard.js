import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import moviesService from '../../../service/movies.service.js'

class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.moviesService = new moviesService()
    }
    render() {
        return (
            <>
                <div className="col-lg-2 col-md-4 col-sm-6">
                    <Link to={'/movie/' + this.props.elm.imdb_id} key={this.props.elm.id}><Image src={'https://image.tmdb.org/t/p/original' + this.props.elm.poster_path} rounded style={{ width: '90%', objectFit: 'cover', marginBottom: '10px' }} {...this.props}/></Link>
                    <Button className="btn btn-danger delete" style={{ borderRadius: '50%' }} onClick={() => this.props.DeleteFavMovie(this.props.elm.imdb_id)} {...this.props}>x</Button>
                </div>
            </>
        )        
    }
}

export default MovieCard
