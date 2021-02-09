const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('pino-http');

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;
