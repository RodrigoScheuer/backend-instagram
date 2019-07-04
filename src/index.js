const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app); // permite request http
const io = require('socket.io')(server); // permite request web socket

mongoose.connect('mongodb+srv://admin:admin@cluster0-t3kvq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

// todos os .use abaixo vão ter acesso ao io dessa maneira
app.use((req, res, next) => {
    req.io = io;
    next();
});

// deixa a aplicação acessivel para ser consumida (ex.: frontend)
app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
