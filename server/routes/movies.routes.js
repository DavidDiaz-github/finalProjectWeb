const express = require('express')
const router = express.Router()
const api = require('../configs/api.config')

const User = require('../models/user.model.js')
const Movie = require('../models/movie.model.js')


router.post('/profile/edit/:id', (req, res) => {

    //console.log('-----------',req.params.id)
    const id = req.params.id
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    User.findByIdAndUpdate(id, { username: username, password: password, email: email })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


router.post('/profile/addmovie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, { $addToSet: { favoriteMovies: req.params.id } } )
        .then(response => {
            //console.log('esto es response en servidor', response)
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.post('/profile/deleteFavMovie/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.body, { $pull: { favoriteMovies: req.params.id } }, {new: true})
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.post('/profile/addserie/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.body, { $addToSet: { favoriteSeries: req.params.id } } )
        .then(response => {
            //console.log('esto es response en servidor', response)
            res.json(response)
        })
        .catch(err => res.status(500).json(err))
})

router.post('/profile/deleteFavSerie/:id', (req, res, next) => {

    User.findByIdAndUpdate(req.body, { $pull: { favoriteSeries: req.params.id } })
        .then(response => res.json(response))
        .catch(err => next(err))
})

module.exports = router