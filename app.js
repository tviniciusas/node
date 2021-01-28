const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const parser = bodyParser.urlencoded({extended:false})
const port = 3000
const app = express()
const SQL = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'damit',
    database:'node'
})

//template engine
app.engine("handlebars",handlebars({defaultLayout: 'main'}))
app.set('view engine','handlebars')
app.use('/css',express.static('css'))
app.use('/js',express.static('js'))
app.use('/img',express.static('img'))

//rotas e templates

app.get("/", function(req, res){
    res.render('index')
})

app.get("/inserir",function(req, res){
    res.render('inserir')
})
app.post("/msgInserir", parser, function(req, res){

    SQL.query('insert into user values(?,?,?)',[req.body.id,req.body.nome,req.body.senha])
    res.render('msgInserir')

})

//criando o serviço do servidor nodejs atraves do express
app.listen(port,function(req,res) {
    console.log('Servidor rodando na porta' + port)
})

