const express = require('express');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express(); 
const port = process.env.PORT || 3000; 

// passing middleware
// parse aplication/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));


//parse aplication/json
app.use(bodyParser.json());

//Static files
app.use(express.static('public'));

//TEMPLATE engine
 app.engine('hbs', engine( {extname: '.hbs' }));
 app.set('view engine', 'hbs');





const routes = require('./server/routes/user');

app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));