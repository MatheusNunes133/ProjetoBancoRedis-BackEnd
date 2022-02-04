//Importando arquivo de configuração
require('dotenv').config()

//Setando configurações do banco de dados
const cliente = require('pg').Client
const client = new cliente({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST
})

//Conectando o banco de dados
client.connect().then(()=>console.log('Conectado ao Banco!')).catch(error=>console.log(error))

//Criando a função para criar novos usuários
async function createUser(req, res){
    const {name,email,profession} = req.body
    try{
        const searchQuery = `select count(email)
                                from dados
                                where email = '${email}'`
        client.query(searchQuery,(error, results)=>{
            if(error){
                res.status(400).send(error)
                console.log(error)
                return
            }
            if(results.rows[0].count == 1){
                //console.log(re)
                res.status(400).send('Este email já foi cadastrado')
                return
            }
            if(results.rows[0].count == 0){
                const query = `insert into dados(name,email,profession) values('${name}', '${email}', '${profession}' )`
                client.query(query,(error,results)=>{
                    if(error){
                        res.status(400).send(error)
                        console.log(error)
                        return
                    }
                    res.status(200).send('Inserido')
                })
            }
        })
       
    }catch(error){
        console.log(error)
    }
}


//Criando função para recurepar os usuários
async function getUsers(req, res){
    try {
        const query = `select * from dados`
        client.query(query,(error,results)=>{
            if(error){
                res.status(400).send(error)
                console.log(error)
                return
            }
            return res.json(results.rows)
        })
    } catch (error) {
        
    }
}


//Criando função para fazer a atualização dos usuários
async function updateUser(req, res){
    const {name,newEmail,oldEmail,profession} = req.body
    try {
        const searchQuery = `select count(email)
                                from dados
                                where email = '${oldEmail}'`
        client.query(searchQuery,(error, results)=>{
            if(error){
                res.status(400).send(error)
                console.log(error)
                return
            }
            if(results.rows[0].count == 0){
                //console.log(re)
                res.status(400).send('Não existe esse email para ser modificado')
                return
            }
            if(results.rows[0].count == 1){
                const query = `update dados set name = '${name}', email = '${newEmail}', profession = '${profession}'
                                where email ilike '${oldEmail}'`
                client.query(query,(error, results)=>{
                    if(error){
                        res.status(400).send(error)
                        console.log(error)
                        return
                    }
                    res.status(200).send(results.rows)
                })
            }
        })
    } catch (error) {
        console.log(error)
    }
}


//Criando função para deletar os usuários
async function deleteUser(req, res){
    const {email} = req.body
    try {
        const searchQuery = `select count(email)
                                from dados
                                where email = '${email}'`
        client.query(searchQuery,(error, results)=>{
            if(error){
                res.status(400).send(error)
                console.log(error)
                return
            }
            if(results.rows[0].count == 0){
                res.status(400).send('Não existe esse email para ser deletado')
                return
            }
            if(results.rows[0].count == 1){
                const query = `delete from dados
                                where email = '${email}'`
                client.query(query,(error, results)=>{
                    if(error){
                        res.status(400).send(error)
                        console.log(error)
                        return
                    }
                    res.status(200).send('Exclusão feita com sucesso!')
                })
            }
        })
        //const query = `delete from dados where email = '${email}'`

    } catch (error) {
        console.log(error)
    }
}


//Exportando as funções em módulo
module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser
}