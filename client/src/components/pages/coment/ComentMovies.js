import React, { Component } from 'react'

import ComentCard from './ComentCard.js'
import comentService from '../../../service/coment.service.js'
import { Spinner } from 'react-bootstrap'

//ESTE COMPONENTE SALE EN CADA UNA DE LAS PELICULAS.
class ComentMovies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coment:[]
        }
        this.comentService = new comentService()
    }

    getComentMovie() {
        //console.log('id : +++++++++', this.props.match.params.id)
        this.comentService
            .allComentMovie({movieId : this.props.match.params.id})
            .then(response => {
                let joined = this.state.coment.concat(response.data)
                this.setState({ coment: joined })
                //console.log(this.state.coment)
            })
            .catch(err => console.log('error en allComent', err))
    }
    componentDidMount() {
        this.getComentMovie()
    }
    componentDidUpdate(prevProps) {
        //console.log(prevProps.match.params.id)
        //console.log(this.props.match.params.id)
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.getComentMovie()
        }
    }

    render() {
        return (
            <div>
                <div className="row" style={{marginLeft:'0px', justifyContent:'space-evenly'}}>
                    {!this.state.coment ? <Spinner /> : this.state.coment.map(elm => <ComentCard data={elm} {...this.props}/>) }
                </div>               
            </div>
        )
    }
}

export default ComentMovies

// BOTON DE AÑADIR COMENTARIO PONER EN LA PAGINA DESEADA.
// {this.props.loggedInUser && <Link className="btn btn-dark" to='/coment/form' >añadir comentario</Link>} 