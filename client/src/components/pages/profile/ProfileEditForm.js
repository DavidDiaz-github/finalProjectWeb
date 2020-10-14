import React, { Component } from 'react'


import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import moviesService from '../../../service/movies.service.js'

class ProfileEditForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: this.props.loggedInUser.username,
            password: this.props.loggedInUser.password,
            email: this.props.loggedInUser.email
        }
        this.moviesService = new moviesService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()

        this.moviesService
            .saveProfile(this.props.loggedInUser._id ,this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.fetchUser()
                this.props.closeModal()
            })
            .catch(err => console.log('-------ErroooooorProfileform:', {err}))
    }

    render() {
        return (
            <Container className="login">
                <main>
                    <Row className="justify-content-center">
                        <Col md={{ span: 12 }}>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
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

export default ProfileEditForm