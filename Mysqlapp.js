var express = require("express");
const app =express();
var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    password:"",
    database:"dialabar"
});

connection.connect(function(err){
if(err) throw err;
console.log("connected !");

var name="divya";
var email="divya@gmail.com";
var password="divya123";
var inserCmd="INSERT INTO login_info (name,email,password) values (?,?,?)";
var values=[name,email,password];

    connection.query(inserCmd,values,function(){
        if(err) throw err;
        console.log("1 entry recorded");
    });
});



var server= app.listen(3000,function(){
    var port=server.address().port;
    console.log("server is running at http://localhost:%s",port);
});

