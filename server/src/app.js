import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath, URL } from 'url';

import { siteOrigin } from "#env";
import indexRouter from '#routes/index';
import usersRouter from '#routes/users';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectPath = path.resolve(__dirname);
const app = express();

// global values
app.locals.siteOrigin = siteOrigin;

// view engine setup
app.set('views', path.join(projectPath, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(projectPath, "..", 'public')));

// canonical url middleware
app.use((req, res, next) => {
  res.locals.canonicalURL = new URL(req.path, req.app.locals.siteOrigin)
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' 
    ? err 
    : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
