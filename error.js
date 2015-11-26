'use strict'
var util = require('util')

exports.User = function (msg) {
  var err = new Error(msg)
  err.code = 'EGAUGE'
  return err
}

exports.MissingTemplateValue = function (item, values) {
  var err = new err.User(util.format('Missing template value "%s"', item.type))
  err.template = item
  err.values = values
  return err
}

exports.Internal = function (msg) {
  var err = new Error(msg)
  err.code = 'EGAUGEINTERNAL'
  return err
}
