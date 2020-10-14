import React from 'react'
import Image from 'react-bootstrap/Image'

const trendingCelebrities = props => {
    return (
        <div className="col-lg-6 col-md-12 celebritiesCard">
            <div className="a" key={props.id} to={props.id}>
                <div className="divCelCard">
                    <Image src={'https://image.tmdb.org/t/p/original' + props.profile_path} alt={props.original_title} rounded/>
                </div>
                <div className="divCenter">
                    <h3>{props.name} </h3>
                    <p>Popularidad : {props.popularity}</p>
                    <h5>Conocido por : </h5>
                    <ul>
                        {props.known_for.map(elm => <li key={elm.id}>{elm.original_title}</li>)}
                    </ul>
                </div>
            </div>
            <hr></hr>
        </div>
    )
}

export default trendingCelebrities