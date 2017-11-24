var webpack = require('webpack');
var path = require('path');

var CLIENT_BUILD_DIR = path.resolve(__dirname, 'output');
var CLIENT_APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: CLIENT_APP_DIR + '/drone.js',
  output: {
    path: CLIENT_BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
  }
};

module.exports = config;

