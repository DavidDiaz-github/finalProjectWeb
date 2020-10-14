import React, { Component } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AllSearch from './AllSearch.js'

export default class Search extends Component {
    constructor() {
        super()
        this.state = {
            search: '',
            arraySearch: [],
            view: false
        }
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        axios
            .get(`http://www.omdbapi.com/?apikey=b709d124&s=${this.state.search}`)
            .then((response) => { 
                this.setState({
                    arraySearch: response.data,
                    search: '',
                    view: true
                });
            })
            .catch((error) => console.log(error));
    }

    handleModal = view => this.setState({ view })
    render() {
        return (
            <div className="Search">
                <form onSubmit={this.handleFormSubmit}>
                    <input type="text" name="search" placeholder="Buscar película" value={this.state.search} onChange={this.handleInputChange} />
                    <Button type="submit" variant="outline-info">Buscar</Button>
                </form> 
                <Modal show={this.state.view} onHide={() => this.handleModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{fontWeight:'700'}}>Resultados</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AllSearch {...this.state.arraySearch} closeModal={() => this.handleModal(false)}/>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
