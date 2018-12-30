require('./config/config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const colors = require('colors')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/index'))

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err
    console.log('Base de datos online >>', process.env.NODE_ENV.green);
})

app.listen(process.env.PORT, () => {
    console.clear()
    console.log('Escuchando el puerto >>', process.env.PORT.green)
})