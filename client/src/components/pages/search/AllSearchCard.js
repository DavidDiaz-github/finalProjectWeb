import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class AllSearchCard extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        //console.log('props en ALLSEARCHCARD',this.props)
        return (
            <div>
                <div className='SearchCard'>
                    <Link key={this.props.imdbID} to={'/movie/' + this.props.imdbID} {...this.props} onClick={this.props.closeModal}>
                        <img src={this.props.Poster} alt={this.props.Title} />
                    </Link>
                    <div>
                        <span>{this.props.Title}</span>  
                        <p>Año : {this.props.Year}</p>
                    </div>
                </div>
                <hr style={{backgroundColor:'red'}}/>
            </div>
        )
    }
}
