import cors from 'cors';
import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { init as databaseInit } from './models';
require('dotenv').config();

const indexRouter = require('./routes/index');

const appInit = async () => {

  const eraseDatabaseOnSync = true;
  await databaseInit(eraseDatabaseOnSync);

  // view engine setup
  const app = express();
  app.use(cors());
  app.use(favicon(path.join(__dirname, 'favicon.ico')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/', indexRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
}

module.exports = appInit;
