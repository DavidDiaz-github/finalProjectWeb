const mongoose = require('mongoose')

const connectionString = `mongodb://localhost/${process.env.DB_LOCAL}`
const connectionStringRemote = `mongodb+srv://david:${process.env.PASSWORD}@cluster0.ilgzo.mongodb.net/proyecto_final`

mongoose
    .connect(connectionStringRemote, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err))

module.exports = mongoose