const express = require('express')
const router = express.Router()

const Coment = require('../models/coment.model')

router.post('/coment/newcoment', (req, res) => {
    //console.log('esto es en el servidor',req.body)
    const idMovie = req.body.idMovie
    const userID = req.body.userID
    const username= req.body.username
    const coment = req.body.coment

    

    Coment.create({ 
        idMovie: idMovie,
        userID: userID,
        username: username,
        coment: coment
    })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))


})

router.post('/coment/allComent', (req, res) => {
    const user = req.body.userID
    //console.log('+++user++++ :', user)
    Coment.find({ userID: user })
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

router.post('/coment/allComentMovie', (req, res) => {
    const movieId = req.body.movieId
    //console.log('+++id++++ :', movieId)
    Coment.find({
            idMovie: movieId
        })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router