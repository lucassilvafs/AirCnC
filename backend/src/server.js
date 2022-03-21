const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://lucassilva:prototipo98@cluster0.ohqsm.mongodb.net/meuBanco?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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

app.listen(3333);
