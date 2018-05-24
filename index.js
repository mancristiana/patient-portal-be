require('./config/config'); //instantiate configuration variables
//require('./globalFunctions'); //instantiate global functions

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Utils
const errorHandler = require('./utils/errorHandler');
const notFoundHandler = require('./utils/notFoundHandler');

// App modules
const routes = require('./routes');

const app = express();

// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO safe cors config
app.use(cors());

app.use('/', routes);

// Use Handlers
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(CONFIG.PORT);
