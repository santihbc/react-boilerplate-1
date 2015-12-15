'use strict';

import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const rootDir = path.resolve(__dirname, '..');

export default {
  entry: [
    path.resolve(rootDir, 'app', 'index.js')
  ],
  output: {
    path: path.resolve(rootDir, 'build'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.css', '.less']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/styles.css', { allChunks: true })
  ]
};
