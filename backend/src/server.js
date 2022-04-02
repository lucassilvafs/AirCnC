const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://lucassilva:prototipo98@cluster0.ohqsm.mongodb.net/meuBanco?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;

    //console.log('Usuario conectado', socket.id);
    //console.log(socket.handshake.query);
    //socket.emit('hello', 'hellou');
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers; 

    return next();
})

// GET, POST, PUT, DELETE
// BUSCAR, CRIAR, ALTERAR, DELETAR

//req.query = Acessar query params (para filtrar) - GET
//req.params = Acessar route params (para edição e delete) - PUT E DELETE
//req.body = Acessar corpo da requisição (para criação e edição) POST , PUT

app.use(cors());
app.use(express.json()); 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

//app.get('/', function(req, res){
    //res.sendFile(__dirname+'/bin/index.html'); // change the path to your index.html
//});

//app.post('/users', (req, res) => {
    //return res.json(req.body);
    //return res.json({ message: "ouvindo" });
//});

server.listen(3333);
