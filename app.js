var express=require("express");
var bodyParser=require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Trip');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/contact', function(req,res){
    var User = req.body.name;
    var Email = req.body.email;
    var Phone = req.body.phone;
    var Message =req.body.Message;
    var data = {
        "user": User,
        "email":Email,
        "Phone":Phone,
        "Message":Message,
    }
db.collection('Feedback').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");       
    });
     return res.redirect('success.html');
})
app.listen(5000);
console.log("server listening at port 5000");