const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const request = require('request');
const cheerio = require('cheerio');
const {mongoose}  = require('./db/mongoose');
const La = require('./models/la');

const port = process.env.PORT || 3000;

var app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())


hbs.registerPartials(__dirname+"/views/partials");

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Home page',
        css:'homepage.css',
        js:['homepage.js']
    })
});

app.post('/',(req,res)=>{
   // var obj = {};

   // console.log('body: ' + JSON.stringify(req.body));
   // res.send(req.body.url);
    const urltext = req.body.urltext;
    const hrefs = [];
    const titles = [];
    const images = [];
    const alts = [];
    const sDesc = [];


    request(req.body.url,(err,resp,body)=>{
    var $ = cheerio.load(body);
        if(urltext === "la"){

            var urlhref = $("div.w80 > h4.headline > a");
            var image = $("div.contentbox .rightcnt img");
            var sdescription = $("div.w80  > p:nth-of-type(2)");
            $(urlhref).each(function(i, link){
                hrefs.push($(link).attr('href'));
                titles.push($(link).text());

            });

            $(image).each(function(i, img){
                images.push($(img).attr('src'));
                alts.push($(img).attr('alt'));

            });

            $(sdescription).each(function(i, desc){
                sDesc.push($(desc).text());



            });




            for(var i=0;i<hrefs.length;i++){

                var post = new La({
                    href: hrefs[i],
                    title: titles[i],
                    image: images[i],
                    alt:alts[i],
                    desc:sDesc[i]
                });

                post.save(function(err) {
                    if (err) throw err;


                });

            }
            resp = {};
            resp["success"]=1;
            resp["message"]="Successfully inserted";
            res.status(200).send(JSON.stringify(resp));
        }else{

        }



});


});



app.get('/api/get',(req,res)=>{

const urltext = req.query.urltext;
if(urltext.toLowerCase() === "la"){


    var respObj = {};
    respObj.success = 1;
    respObj.message = "Successfully done";

    La.find({}, function(err, posts) {
        if (err) throw err;

        respObj.data = posts;

        res.status(200).send(JSON.stringify(respObj));
    });


}

//res.status(200).send(JSON.stringify(urltext));




});



app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        name:"Rajesh",
        pageTitle:'About'
    })
});

app.get('/contact',(req,res)=>{
    res.render('contact.hbs',{
        name:"Prem",
        pageTitle:'Contact',
        css: 'contact.css',
        js:['contact.js']
    })
});


app.listen(port,()=>{
    console.log(`Server is up on to port ${port}`);
});
