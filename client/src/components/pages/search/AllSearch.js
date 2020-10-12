import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

import AllSearchCard from './AllSearchCard.js'

export default class AllSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            array: this.props.Search
        }
    }
    render() {
        //console.log('PROPS FIRST',this.props)
        return (
            <div>
                {!this.props.Search ? <Spinner /> : this.state.array.map(elm => <AllSearchCard {...elm} {...this.props}/>)}              
            </div>
        )
    }
}
