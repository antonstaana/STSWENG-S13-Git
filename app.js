//dependencies import
const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 8000;

app.set('view engine', 'hbs');

app.engine('hbs', hbs({
    extname:'hbs',
    defaultView:'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),

}));

app.listen(port,() => {
    console.log("App listening at port " + port);
});

app.get('/', (req,res) =>{
    res.render('landing',{
    });
});

//set static files
app.use(express.static('public'));