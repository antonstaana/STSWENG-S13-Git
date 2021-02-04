//dependencies import
const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const moment = require('moment');

const { envPort, sessionKey } = require('./config');

//Import helpers
const helpers = require("./helpers")
//routes
const public_route = require('./routes/public_routes');
const user_route = require('./routes/user_routes');
const customer_route = require('./routes/customer_routes');
const restaurant_route = require('./routes/restaurant_routes');

const app = express();
const port = envPort || 8000;

app.listen(port,() => {
    console.log("App listening at port " + port);
});

app.engine('hbs', hbs({
    extname:'hbs',
    defaultView:'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
    helpers
}));

app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
    //secret: 'kookie',
    secret: sessionKey,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: true,
      //maxAge = ms - s - m - h - d
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 1 * 1 }
  }));

  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
  });

//set static files
app.use(express.static('public'));

app.use('/', public_route);
app.use('/',user_route);
app.use('/restaurant', restaurant_route);
app.use('/customer', customer_route);

//app.use('/customer', customer_route);

mongoose.set('useFindAndModify', false);
