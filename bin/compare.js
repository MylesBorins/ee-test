#!/usr/bin/env node
'use strict';
var path = require('path');

var fs = require('vinyl-fs');
var browserify = require('browserify');
var map = require('map-stream');

var chalk = require('chalk');

var green = chalk.green;
var yellow = chalk.yellow;

function build(file, cb) {
  var b = browserify();
  b.add(file.path);
  b.bundle(function (err, src) {
    console.log([green('filename:'), path.basename(file.path)].join(' '));
    console.log([yellow('Bundled size:'), src.length / 1000 + 'K\n'].join(' '));
    cb(null, file);
  });
}

fs.src(['./lib/**/*.js'])
  .pipe(map(build));