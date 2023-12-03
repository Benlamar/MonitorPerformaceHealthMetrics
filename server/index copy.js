
require('dotenv').config();
const express = require('express')
const cors = require('cors')
const router = require('./routers/routers')
const mongoose = require('mongoose');
const db = require('./models/connection')

const app = express();
app.use(cors())

db.moongoose.connect(db.url)
    .then(() => {
        console.log("Connection successful")
    })
    .catch(err => {
        console.log("Error DB connection")
    })

app.use('/', router)

// server 
app.listen(8080, () => { console.log("Server running") })