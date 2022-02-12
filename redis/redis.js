//Importando arquivo de configuração
require('dotenv').config()

//Setando configuração para a conexão com o banco redis
const redis = require('redis')
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
})

//Fazendo conexão com o banco de redis
client.connect().then(()=> console.log('Conectado ao Redis')).catch(error=>console.log(error))


//Criando função para adicionar dados ao banco redis
async function addToRedis(req, res){
    const {email, text} = req.body
    try{
        if(email != ''){
            const time = 7200
            client.SETEX(email, time, text).then(response=>{
                res.status(200).send(response)
                console.log(response)
            }).catch(error=> console.log(error))
        }else{
            res.status(400).send('O email não pode ser vazio')
        }
    }catch(error){
        console.log(error)
    }
}

//Exportado a função em módulo
module.exports = {
    addToRedis
}
