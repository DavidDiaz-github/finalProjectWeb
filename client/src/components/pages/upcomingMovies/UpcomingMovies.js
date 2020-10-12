import React, { Component } from 'react'
import axios from 'axios'

import UpComingCard from './UpComingCard.js'

class UpComing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            upComing: []
        }
    }
    getUpComing() {

    axios
      .get('https://api.themoviedb.org/3/movie/upcoming?api_key=9fafbea01209e6ebcaea05055a80313b&language=es-ES&page=1')
      .then((response) => { 
        this.setState({ upComing: response.data.results });
      })
      .catch((error) => console.log(error));
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
                            {this.state.upComing.map(elm => <UpComingCard key={elm.id} {...elm} />)}
                        </div>
                    </div> 
                </div>
                  
            </>
        )
    }
}

export default UpComing