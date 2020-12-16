var express=require('express');
const app=express();
var mysql=require('mysql');

var bodyparser=require('body-parser');
const { builtinModules } = require('module');
const { nextTick } = require('process');

var connect=mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"",
    database: 'dialabar'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/register/',(req,res,next)=>{

    var data=req.body;
    var name= data.name;
    var email=data.email;
    var password=data.password;
    

    connect.query("select * from login_info where email=?",[email], function(err,result,fields){
        connect.on('error',(err)=>{
            console.log("[MySQL Error",err);
        });
        
        if(result && result.length){
            res.json("Username already Exists");
            res.json(result[0]);
        }
        else
        {
            var insert="insert into login_info(name,email,password) values (?,?,?)";
            values=[name,email,password];
            connect.query(insert,values,(err,results,fields)=>{
    connect.on('error',(err)=>{
        console.log("[MySQL Error",err);
    });

    console.log(" Registered");
});

   }  

});
});


app.get('/register/',(req,res,next)=>{
    connect.query("select * from login_info", function(err,result,fields){
        connect.on('error',(err)=>{
            console.log("[MySQL Error",err);
        });
        
        if(result && result.length){
            //res.json("Username already Exists");
            console.log(result);
            res.json(result);
        }
});
});

app.post('/login/',(req,res,next)=>{

    var data=req.body;
    var name= data.name;
    var email=data.email;
    var password=data.password;
    

    connect.query("select * from login_info where email=?",[email], function(err,result,fields){
        connect.on('error',(err)=>{
            console.log("[MySQL Error",err);
        });
        
        connect.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            console.log(result);
     
            if(password==result[0].password){
             res.json("user logged in");
             res.end;
     
            }
            else{
                res.json("wrong password");
                res.end;
            }
        }
         else{
             res.json("User not found");
             res.end;
        } 

});
});

app.post('/product/',(req,res,next)=>{

    var data=req.body;
    var pname= data.pro_name;
    var pdesc=data.pro_description;
    var pprice= data.pro_price;

    connect.query("SELECT * FROM product WHERE pro_name=?",[pname],function(err,result,fields){

        connect.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("Product exist");
        }
        else{
            var inser_pro ="INSERT INTO product (pro_name,pro_description,pro_price) values (?,?,?)";
            var values=[pname,pdesc,pprice];
            console.log(result);
            console.log("executing:" + inser_pro + "" + values);
    
            connect.query(inser_pro,values,(err,results,fields)=>{
                connect.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("product added !");
                console.log("successful.");
            });
        }


    });

});

var server=app.listen(8000,()=>{   
    console.log("Server running at http://localhost:8000");
});