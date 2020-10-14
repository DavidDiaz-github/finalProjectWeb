import React, { Component } from 'react'

import ApiService from '../../../service/api.service.js'

import UpComingCard from './UpComingCard.js'

class UpComing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moviesUpComing: []
        }
        this.ApiService = new ApiService()
    }
    getUpComing() {
        this.ApiService
            .upComing()
            .then(response => {
                let joined = this.state.moviesUpComing.concat(response.data.results)
                this.setState({ moviesUpComing: joined })
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getUpComing()
    }
    render() {
        return (
            <>
                <div className='bgUpcoming'>
                    <div className="container" style={{ paddingTop: '40px' }}>
                        <h1>Estrenos</h1>
                        <div className="row">
                            {this.state.moviesUpComing.map(elm => <UpComingCard key={elm.id} {...elm} />)}
                        </div>
                    </div> 
                </div>
                  
            </>
        )
    }
}

export default UpComing