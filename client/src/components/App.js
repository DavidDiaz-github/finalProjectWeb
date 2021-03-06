import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './layout/navbar/NavBar.js'
import Footer from './layout/footer/Footer.js'
import Home from './pages/home/Home.js'
import MovieDetails from './pages/movie/MovieDetails.js'
import SeriesDetails from './pages/movie/SeriesDetails.js'
import UpComing from './pages/upcomingMovies/UpcomingMovies.js'
import Profile from './pages/profile/Profile.js'

import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'

import authService from './../service/auth.service'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
  }


  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))
  }

  render() {
    return (
      <>
        <NavBar setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} />
        <Switch>
          <Route path="/" exact render={() => <Home setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser}/>} />
          <Route path="/movie/:id" render={props => <MovieDetails {...props} loggedInUser={this.state.loggedInUser} fetchUser={this.fetchUser}/>} />
          <Route path="/tv/:id" render={props => <SeriesDetails {...props} loggedInUser={this.state.loggedInUser} fetchUser={this.fetchUser}/>} />
          <Route path="/upcoming" render={props => <UpComing {...props}/>} />

          <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
          <Route path="/profile"  exact render={props => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser}  {...props} fetchUser={this.fetchUser} setTheUser={this.setTheUser}/> : <Redirect to="/login" />} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
