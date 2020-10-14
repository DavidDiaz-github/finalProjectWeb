import React, { Component } from 'react'

import comentService from '../../../service/coment.service.js'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class ComentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tmdbId: this.props.tmdb_id,
            idMovie: this.props.imdb_id,
            userID: this.props.loggedInUser._id,
            username: this.props.loggedInUser.username,
            coment:''
        }
        this.comentService = new comentService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.comentService
            .newComent(this.state)
            .then(response => {
                this.props.closeModal()
                this.props.update()
            })
            .catch(err => console.log('-------ErroooooorComentForm:--------', { err }))

    }

    render() {
        return (
            <Container className="login">
                <main>
                    <Row className="justify-content-center">
                        <Col md={{ span: 12 }}>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Comentario : </Form.Label>
                                    <Form.Control rows={6} as="textarea" type="textarea" name="coment" value={this.state.coment} onChange={this.handleInputChange} placeholder='Escribe tu comentario aqui.'/>
                                </Form.Group>
                                <Button variant="dark" type="submit">Guardar</Button>
                            </Form>
                        </Col>
                    </Row>
                </main>
            </Container>
        )
    }
}

export default ComentForm