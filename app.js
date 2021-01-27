const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const port = 3000
const app = express()

//template engine
app.engine("handlebars",handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')

//rotas e templates

app.get("/", function(req, res){

    res.render('index')
})

//criando o serviço do servidor nodejs atraves do express
app.listen(port,function(req,res) {
    console.log('Servidor rodando na porta' + port)
})

