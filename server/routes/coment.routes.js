const express = require('express')
const router = express.Router()

const Coment = require('../models/coment.model')

router.post('/coment/newcoment', (req, res) => {
    const idMovie = req.body.idMovie
    const userID = req.body.userID
    const username= req.body.username
    const coment = req.body.coment
    const tmdbId = req.body.tmdbId
    

    Coment.create({ 
        tmdbId: tmdbId,
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
    Coment.find({ userID: user })
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

router.post('/coment/allComentMovie', (req, res) => {
    const movieId = req.body.movieId
    Coment.find({ $or: [ { idMovie: movieId }, { tmdbId: movieId } ] })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


module.exports = router