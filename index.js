require('./utils/globals'); // instantiate global functions
require('./config/config'); // instantiate configuration variables

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// Utils
const handlers = require('./utils/handlers');

// App modules
const routes = require('./routes');
const models = require('./models');

const app = express();

// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO safe cors config
app.use(cors());

app.use('/', routes);

// Use Handlers
app.use(handlers.notFound);
app.use(handlers.error);

app.listen(CONFIG.PORT);
