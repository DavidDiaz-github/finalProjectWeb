import React from 'react'



const ComentCard = props => {
    return (
        <div className="col-lg-2 col-md-4 col-sm-6 comentCard ">
            <h3>{props.data.username}</h3>
            <p>{props.data.coment}</p>
        </div>
    )
}

export default ComentCard