const express = require('express');
const mysql=require('mysql');

const app=express();


 const port=process.env.PORT || 3000;

 const bookRouter=express.Router();
 const authRouter=express.Router();
 const newRouter=express.Router();

 const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port:3306,
    database: "newdb",
    password: "egxduvwz"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to DB!");
  });

  newRouter.get('/a',function(req,res) {
   res.sendFile(__dirname +'/main.html');
 });

 authRouter.get('/authors',(req,res)=>{
    const query = "select * from author";
    con.query(query, function (err, result) {
        res.send(JSON.stringify(result));
    });
 });

 bookRouter.get('/books',(req,res)=>{
    const query = "select * from book";
    con.query(query, function (err, result) {
        console.log(result.idBook);
        res.send(result);
    });
 });

 authRouter.get('/authors/:id', function (req, res) {
    const id = req.params.id;
    const query ='SELECT * FROM author WHERE idAuthor=?';
    con.query(query, id,function (err, result) {
        res.send(JSON.stringify(result));
    });
 });

 bookRouter.get('/books/:id', function (req, res) {
    const id = req.params.id;
    const query = 'select * from book where idBook=?';
    con.query(query, id,function (err, result) {
        res.send(JSON.stringify(result));
        result=result[0];
        console.log(result.nameBook);
    });
 });

 bookRouter.post('/books', function (req, res) {
    let idBook = req.body.idBook;
    let nameBook = req.body.nameBook;
    let priceBook = req.body.priceBook;
    let idAuthor = req.body.idAuthor;

    let query="insert into book(idBook, nameBook,priceBook,idAuthor) values ('"+idBook+"',  '"+nameBook+"','"+priceBook+"','"+idAuthor+"')";
    con.query(query,function (err, result) {
        if (err) throw err;
        res.send(result);
    });
 });


 authRouter.post('/authors', function (req, res) {
    let idAuthor = req.body.idAuthor;
    let nameAuthor = req.body.nameAuthor;
    let ageAuthor = req.body.ageAuthor;

    let query="insert into author(idAuthor, nameAuthor,ageAuthor) values ('"+idAuthor+"',  '"+nameAuthor+"','"+ageAuthor+"')";
    con.query(query,function (err, result) {
        if (err) throw err;
        res.send(result);
    });
 });

 app.use('/api',bookRouter);
 app.use('/api',authRouter);
 app.use('/api',newRouter);

 app.listen(port,()=>{
    console.log("Server up on PORT:"+port);
 });