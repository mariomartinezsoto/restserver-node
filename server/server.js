require('./config/config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/usuario'))

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err
    console.log('Base de datos online');
})

app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto', process.env.PORT)
})