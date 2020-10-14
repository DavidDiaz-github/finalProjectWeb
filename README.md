# Movies SPA

- WEB SPA for movies, clebrities and series.

## Link

<img width="1440" alt="FinalProject" src="https://user-images.githubusercontent.com/60430655/96006957-50207e00-0e3e-11eb-9269-46340d69ac2a.png">

## Install

- Run `npm i` on the root directory

## Run

- Create a `.env` file on the root directory to populate the database (`DB`) and port (`PORT`).
- Get a themoviedb `API Key`.
- Run `npm run dev` command on the root directory server on port 5000
- Run `npm start` command on the root directory client on port 3000


## Endpoints

| Method | Path                | Description                   |
| ------ | ------------------- | ----------------------------- |
| `GET`  | /                   | See Home page                 |
| `GET`  | /signup             | See the Signup form           |
| `POST` | /signup             | Submit the Signup form        |
| `GET`  | /loggedin           | See Login form                |
| `POST` | /login              | Submit the Login form         |
| `GET`  | /logout             | Submit Logout                 |
| `GET`  | /movies/:id         | favourite movie              |
| `GET`  | /upcoming           | See upcoming                  |
| `GET`  | /profile/:id        | See the User profile          |
| `GET`  | /profile/edit/:id   | See edit User profile form    |
| `POST` | /profile/edit/:id   | Submit edit profile form      |


## Folder distribution

- --Components
    |
    |
    |-------Layout
    |          |
    |          |----foter--Footer.js
    |          |----navBar--NavBar.js
    |
    |-------Pages
    |          |-----home--Home.js
    |          |
    |          |-----comment
    |          |        |----Coment.js
    |          |        |----ComentCard.js
    |          |        |----ComentEditForm.js
    |          |        |----CommentForm.js
    |          |
    |          |-----login--Login.js
    |          |
    |          |-----movie
    |          |        |----MovieCard.js
    |          |        |----MovieDetails.js
    |          |        
    |          |-----profile--Profile.js
    |          |
    |          |-----search--Search.js
    |          |
    |          |-----signup--Signup.js
    |          |
    |          |-----trending
    |          |        |-----TrendingCard.js
    |          |        |-----TrendingCelebrities.js
    |          |
    |          |-----upComingMovies--UpComingMovies.js          
    |
    |-------shared
    |          |-----spiner
    |                   |----Spiner.css
    |                   |----Spiner.js
    |
    |-------App.js
    |-------App.css
    

## Models

- USER
    `- username: {type:string, unique: true, required: true }`
    `- password: {type:string, required: true}`
    `- email   : {type:string, required: true}`
    `- coment  : []`

- COMMENT
    `- id_movie : string`
    `- user_id  : {type: Schema.Types.ObjectId, rel: 'User'}`
    `- userName: String`
    `- comment: String`



## Built With

- ReactJS
- HTML5
- SCSS
- JavaScript - ES6
- Node.js
- APIs: TheMovieDB y OMDB API.

## Authors

- David Díaz

