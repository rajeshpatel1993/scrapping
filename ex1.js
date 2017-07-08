var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var port = process.env.PORT || 3000;


var app = express();

// Example 1
// var url = "https://google.com";
// request(url,(err,resp,body)=>{
//     if(err){
//         console.log(`Error : ${err}`);
//     }else{
//         console.log(`Data : ${body}`);
//     }
// });


//Exaple2
// var destination = fs.createWriteStream("./downloads/google.html");
// var url = "https://google.com";
// request(url).pipe(destination);

//Example3

var destination = fs.createWriteStream("./downloads/google2.html");
var url = "https://google.com";
request(url).pipe(destination)
    .on('finish',()=>{
        console.log('done');
    })
    .on('error',()=>{
        console.log(err);
    });

app.listen(port,()=>console.log(`Server listening on port: ${port}`));