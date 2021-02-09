const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('pino-http');

const routes = require('./routes');
const { errorHandler } = require('./middlewares');

const app = express();

app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

app.use(errorHandler);

module.exports = app;
