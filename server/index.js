require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http')
const router = require('./routers/routers');
const mongoose = require('mongoose');
const db = require('./models/index');
const { handleConnection } = require('./socketHandler');

const app = express();
app.use(cors());
app.use('/', router);

httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

db.moongoose.connect(db.url)
    .then(() => {
        console.log("Connection successful");
    })
    .catch(err => {
        console.log("Error DB connection", err);
    })

io.on("connection", (socket) => {
    console.log("We are live and connected");
    console.log(socket.id);
    handleConnection(socket, io);
});

httpServer.listen(8080, () => {
    console.log(`Server listening on port ${8080}`);
});