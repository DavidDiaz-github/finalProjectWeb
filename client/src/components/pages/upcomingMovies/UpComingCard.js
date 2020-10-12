import React from 'react'

import {Card} from 'react-bootstrap'

const UpComingCard = props => {
    return (
        <div className="col-lg-3 col-md-6 col-xs-12 CardUpcoming">
            <Card className="card" style={{ width: '23rem' }}>
                <Card.Img variant="top" src={'https://image.tmdb.org/t/p/original' + props.poster_path} />
                <Card.Body className="bodyUpComing">
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>Popularidad : {props.popularity}</Card.Text>
                    <Card.Text>Lanzamiento : {props.release_date}</Card.Text>
                    <Card.Text>Puntuación : {props.vote_average}/10</Card.Text>
                    {/* <Card.Subtitle>Descripción : </Card.Subtitle> */}
                    {/* <Card.Text>{props.overview}</Card.Text> */}
                </Card.Body>
            </Card>
        </div>
    )
}

export default UpComingCard