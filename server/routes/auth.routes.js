const express = require("express")
const router = express.Router()
const passport = require("passport")
const bcrypt = require("bcrypt")

const User = require("../models/user.model")


router.post('/signup', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || !password || !email) {
        res.status(400).json({
            message: 'Rellena todos los campos.'
        });
        return;
    }

    if (password.length < 2) {
        res.status(400).json({
            message: 'contraseña debil.'
        });
        return;
    }

    User.findOne({
        username
    }, (err, foundUser) => {

        if (err) {
            res.status(500).json({
                message: "Nombre de usuario incorrecto."
            });
            return;
        }

        if (foundUser) {
            res.status(400).json({
                message: ' El nombre de usuario ya existe.'
            });
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const aNewUser = new User({
            username: username,
            password: hashPass,
            email: email
        });

        aNewUser.save(err => {
            if (err) {
                res.status(500).json({
                    message: 'Error al guardar el usuario en la DB.'
                });
                return;
            }

            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {

                if (err) {
                    res.status(500).json({
                        message: 'Login error'
                    });
                    return;
                }

                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({
                message: 'Error al autenticar al usuario.'
            });
            return;
        }

        if (!theUser) {
            // "failureDetails" contains the error messages
            // from our logic in "LocalStrategy" { message: '...' }.
            res.status(401).json(failureDetails);
            return;
        }

        // save user in session
        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({
                    message: 'Session error'
                });
                return;
            }

            // We are now logged in (that's why we can also send req.user)
            res.status(200).json(theUser);
        });
    })(req, res, next);
});



router.post('/logout', (req, res) => {
    // req.logout() is defined by passport
    req.logout();
    res.status(200).json({
        message: 'Log out success!'
    });
});


router.get('/loggedin', (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({
        message: 'Unauthorized'
    });
});


module.exports = router