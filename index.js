var express = require('express');
var app = express();

app.get('/',(req,res)=>{
    res.send("Hello from clean-moto-server;!!");
})

app.listen(process.env.PORT || 5000);