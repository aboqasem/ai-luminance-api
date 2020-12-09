const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const { router: indexRouter } = require('./routes/index');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('common'));

app.use('/', indexRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = { app };
