const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const parser = bodyParser.urlencoded({extended:false})
const port = 3000
const app = express()
const sql = mysql.createConnection({
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
app.get("/editar/:id?",function(req, res){
    sql.query("select * from user where id =?",[req.params.id],function(erro,resultados,campos){

        res.render('update',{id:req.params.id,nome:resultados[0].nome,senha:resultados[0].senha})
    })
    res.render('update',{id:req.params.id})
})
app.post("/msgUpdate",parser ,function(req, res){

    sql.query("update user set nome =?, senha =?, where id=?",[req.params.id])
    res.send('atualizado com sucesso!')

})

app.get("/select/:id?",function(req, res){

    if(!req.params.id){
        sql.query("select * from user",function(erro,resultados,campos){
            res.render('select',{dados:resultados})
        })
    }else{
        sql.query("select * from user where id =?",[req.params.id],function(erro,resultados,campos){
            res.render('select',{dados:resultados})
        })
    }
})

app.get("/inserir",function(req, res){
    res.render('inserir')
})
app.post("/msgInserir", parser, function(req, res){

    sql.query("insert into user values(?,?,?)",[req.body.id,req.body.nome,req.body.senha])
    res.render('msgInserir',{nome:req.body.nome})
})

app.get("/deletar/:id",function(req, res){

    sql.query("delete from user where id=?",[req.params.id])
    res.render('deletar')

})

//criando o serviço do servidor nodejs atraves do express
app.listen(port,function(req,res) {
    console.log('Servidor rodando na porta' + port)
})

