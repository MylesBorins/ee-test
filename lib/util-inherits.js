'use strict';
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Widget(opts) {
  // safety incase people forget to use new
  if (!(this instanceof Widget)) { return new Widget(opts); }
}

util.inherits(Widget, EventEmitter);

module.exports = Widget;
