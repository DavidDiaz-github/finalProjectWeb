import React from 'react'
import {Link} from 'react-router-dom'
import Image from 'react-bootstrap/Image'

const trendingCard = props => {
    return (
        <div className="trending">
            <Link key={props.id} to={'/movie/' + props.id} {...props}>
                <Image src={'https://image.tmdb.org/t/p/original' + props.poster_path} alt={props.original_title} {...props} rounded />
            </Link>
        </div>
    )
}

export default trendingCard