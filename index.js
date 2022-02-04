// importando a dependência do cors
const cors = require('cors')

// importando a dependência do express
const express = require('express');

const app = express()
const port = 3000;

//Permitindo que o server express possa utilizar o formato JSON
app.use(express.json())

//Setando configurações do cors
app.use(function(req, res, next){
    app.use(cors())
    res.header("Access-Control-Allow-Origin", "*");
    next()
});

//Importando arquivo onde estão as configurações do banco de dados
const database = require('./database/database')

//Criando caminhos para o CRUD de usuário
app.post('/createNewUser', database.createUser)
app.get('/getUser',database.getUsers)
app.post('/updateUser', database.updateUser)
app.post('/deleteUser',database.deleteUser)

//Importando arquivo onde estão as configurações do banco redis
const redisDB = require('./redis/redis')

//Criando caminho para adicionar as informações no banco redis
app.post('/addToRedis', redisDB.addToRedis)


//Fazendo o server ouvir na porta 3000
app.listen(port,()=>{
    console.log('Server online na porta: ' + port)
})

