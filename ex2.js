var express = require('express');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var port = process.env.PORT || 3000;


var app = express();

var url = `https://www.indeed.co.in/viewjob?jk=5dbc66cb5b37f14a&q=php&l=Gurgaon,+Haryana&tk=1bk0bpvlh2gelbs8&from=ja&alid=56b34ce6e4b06ef8a53a61ab&utm_source=jobseeker_emails&utm_medium=email&utm_campaign=job_alerts&rgtk=1bk0bpvlh2gelbs8`;

request(url,(err,resp,body)=>{
   var $ = cheerio.load(body);
    var companyName = $("div[data-tn-component='jobHeader'] .company");
    var companyNameText = companyName.text();

    var jobTitle = $("div[data-tn-component='jobHeader'] .jobtitle font");
    var jobTitleText = jobTitle.text();

    var location =  $("div[data-tn-component='jobHeader'] .location");
    var locationText = location.text();

    var summary =  $("#job_summary");
    var summaryText = summary.html();


    var job = {
      jobTitle:jobTitleText,
        companyName:companyNameText,
        location:locationText,
        summary:summaryText

    };

    console.log(job);


});

app.listen(port,()=>console.log(`Server listening on port: ${port}`));