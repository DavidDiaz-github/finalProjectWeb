import React, { Component } from 'react'

import ApiService from '../../../service/api.service.js'

export default class ComentEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageCarousel: []
        }
        this.ApiService = new ApiService()
    }

    getTrendingtCelebrities() {
        const id = 'tt4566758'
        this.ApiService
            .findImageMovies(id)
            .then(response => {
                console.log(response.data.backdrops)
                this.setState({imageCarousel: response.data.backdrops})
            })
            .catch(err => console.log(err))
    }
    componentDidMount() {
        this.getTrendingtCelebrities()
    }
    render() {
        return (
            <div>
                <h1>hola soy la prueba</h1>
                <h2>se veeeee!!!!!!!</h2>
                {!this.state.imageCarousel ? <h2>esperando...</h2> : this.state.imageCarousel.map(elm => <img src={'https://image.tmdb.org/t/p/original' + elm.file_path} style={{width:'50%', objectFit:'cover'}}/>)}
            </div>
        )
    }
}


