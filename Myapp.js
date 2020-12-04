var express = require("express");
const app =express();
app.get("/",function(req,res){
    res.write("<h1>index</h1>");
});

app.get("/p1",function(req,res){
    res.write("<h1>page p1</h1>");
})

var server= app.listen(3000,function(){
    var port=server.address().port;
    console.log("server is running at http://localhost:%s",port);
});