'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const cors = require('cors');
const bodyParser = require('body-parser');

/**
 * Import app routes
 */
// const doctors = require('./routes/doctors.js');

// Use body-parsing middleware for JSON like experience with URL-encoded
// Extended syntax uses qs library (when true) and querystring library (when false)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO safe cors config
app.use(cors());

// Use middleware which serves files from given 'public' directory
app.use(express.static('./public'));

// For specified path use required modules
//app.use('/api/doctors/', doctors);

app.listen(process.env.PORT || 5000);
