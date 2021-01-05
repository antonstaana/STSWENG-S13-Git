//dependencies import
const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

//routes
const public_route = require('./routes/public_routes');
const restaurant_route = require('./routes/restaurant_routes');

const app = express();
const port = 8000;

app.listen(port,() => {
    console.log("App listening at port " + port);
});

app.engine('hbs', hbs({
    extname:'hbs',
    defaultView:'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),

}));

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


/*
app.get('/', (req,res) =>{
    res.render('landing',{
    });
});*/

//set static files
app.use(express.static('public'));

app.use('/', public_route);

app.use('/restaurant', restaurant_route);

//app.use('/customer', customer_route);

