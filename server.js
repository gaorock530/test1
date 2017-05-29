const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');

const helper_list = require('./views/helper/list');
//Environment variables
const PORT = 80;
const HOSTNAME = 'localhost';
const PUBLIC = '/public';

const Colors = require('colors'); //colorize console.log
const ClientIp = require('./middleware/userinfo');
app.use(ClientIp); //check client and get info

//var urlencodedParser = bodyParser.urlencoded({ extended: false })
//set view engine
app.set('view engine', 'hbs');

hbs.registerHelper('list', helper_list);

//define puclic folder path
app.use(express.static(__dirname + PUBLIC));
//disable 'x-powered-by' header
app.set('x-powered-by', false);
//app.use(bodyParser.json());

//default 
app.get('/', (req, res) => {
    // res.send(JSON.stringify(req.body, null, 2));
    let nowTime = new Date();
    console.log(`${nowTime.getHours()}:${nowTime.getMinutes()}:${nowTime.getSeconds()}`.red, `Real IP : ${req.realIP}`.yellow, `- Request IP : ${req.clientIP}`.blue, `- User Agent : ${req.clientAgent}`.green);
    res.render('index', {ss: req.headers, tt: req.query, cc:{'Real IP' : req.realIP, 'Request IP' : req.clientIP, 'User Agent' : req.clientAgent }});
});


//setup server
http.createServer(app).listen(PORT, HOSTNAME, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`running on port: ${PORT}`);
});