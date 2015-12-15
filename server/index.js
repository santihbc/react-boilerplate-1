'use strict';

import express from 'express';
import path from 'path';
import React from 'react';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import routes from '../app/routes';
import config from '../webpack/development.config.js';

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? 8080 : process.env.PORT;
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'build')));

if (isDevelopment) {
  const compiler = webpack(config);

  app.use(webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: './',
    stats: {
      colors: true,
      timings: true
    }
  }));

  app.use(webpackHotMiddleware(compiler));
}

app.use((req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      res.status(200).render('index.ejs', {
        markup: renderToString(<RoutingContext {...renderProps} />)
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.listen(port, () => console.log('Listening on port ' + port + '...'));
