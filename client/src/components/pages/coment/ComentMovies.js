import React, { Component } from 'react'

import ComentCard from './ComentCard.js'
import comentService from '../../../service/coment.service.js'
import { Spinner } from 'react-bootstrap'

class ComentMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coment:[]
        }
        this.comentService = new comentService()
    }

    getComentMovie() {
        this.comentService
            .allComentMovie({movieId : this.props.match.params.id})
            .then(response => {
                let joined = this.state.coment.concat(response.data)
                this.setState({ coment: joined })
            })
            .catch(err => console.log('error en allComent', err))
    }
    componentDidMount() {
        this.getComentMovie()
    }

    updateComent() {
        this.setState({coment: []})
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.updateComent()
            this.getComentMovie()
        }
    }

    render() {
        return (
            <div>
                <div className="row" style={{marginLeft:'0px', justifyContent:'space-evenly'}}>
                    {!this.state.coment ? <Spinner /> : this.state.coment.map(elm => <ComentCard key={elm._id} data={elm} {...this.props} />) }
                </div>               
            </div>
        )
    }
}

export default ComentMovies