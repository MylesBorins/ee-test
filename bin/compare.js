#!/usr/bin/env node
'use strict';
var path = require('path');

var fs = require('vinyl-fs');
var map = require('map-stream');

var browserify = require('browserify');
var uglify = require('uglify-js');

var filesize = require('filesize');
var chalk = require('chalk');

var green = chalk.green;
var yellow = chalk.yellow;

function build(file, cb) {
  var b = browserify();
  b.add(file.path);
  b.bundle(function (err, src) {
    var minified = uglify.minify(src.toString(), {fromString: true});
    console.log([green('filename:'), path.basename(file.path)].join(' '));
    console.log([yellow('Bundled size:'), filesize(src.length)].join(' '));
    console.log([yellow('Minified size:'), filesize(minified.code.length) + '\n'].join(' '));
    cb(null, src);
  });
}

fs.src(['./lib/**/*.js'])
  .pipe(map(build));