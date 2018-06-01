require('./src/utils/globals'); // instantiate global functions
require('./config/config'); // instantiate configuration variables

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');

// Utils
const handlers = require('./src/utils/handlers');

// App modules
const routes = require('./src/routes');
const models = require('./src/models');

const app = express();

// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// See: https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

// See: https://expressjs.com/en/resources/middleware/morgan.html
app.use(logger('common'));

app.use('/', routes);

// Use Handlers
app.use(handlers.notFound);
app.use(handlers.error);

app.listen(CONFIG.PORT);
