import React, { Component } from 'react'

import ComentCard from './ComentCard.js'
import comentService from '../../../service/coment.service.js'
import { Spinner } from 'react-bootstrap'

//ESTE COMPONENTE SALE EN CADA UNA DE LAS PELICULAS.
class Coment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coment:[]
        }
        this.comentService = new comentService()
    }

    getAllComent() {
        this.comentService
            .allComentProfile({userID : this.props.loggedInUser._id})
            .then(response => {
                let joined = this.state.coment.concat(response.data)
                this.setState({ coment: joined })
            })
            .catch(err => console.log('error en allComent', err))
    }
    componentDidMount() {
        this.getAllComent()
    }

    render() {
        return (
            <div>
                <div className="row" style={{marginLeft:'0px', justifyContent:'space-evenly'}}>
                    {!this.state.coment ? <Spinner /> : this.state.coment.map(elm => <ComentCard key={elm._id} data={elm} {...this.props} updateComent={this.updateComent}/>) }
                </div>               
            </div>
        )
    }
}

export default Coment