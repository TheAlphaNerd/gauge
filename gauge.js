'use strict'
var consoleStrings = require('./console-strings.js')
var renderTemplate = require('./render-template.js')
var validate = require('aproba')

var Gauge = module.exports = function (theme, template, width) {
  if (!width) width = 80
  validate('OAN', [theme, template, width])
  this.showing = false
  this.theme = theme
  this.width = width
  this.template = template
}
Gauge.prototype = {}

Gauge.prototype.setTheme = function (theme) {
  validate('O', [theme])
  this.theme = theme
}

Gauge.prototype.setTemplate = function (template) {
  validate('A', [template])
  this.template = template
}

Gauge.prototype.setWidth = function (width) {
  validate('N', [width])
  this.width = width
}

Gauge.prototype.hide = function () {
  return '\r' + consoleStrings.eraseLine()
}

Gauge.prototype.hideCursor = consoleStrings.hideCursor

Gauge.prototype.showCursor = consoleStrings.showCursor

Gauge.prototype.show = function (status) {
  var values = Object.create(this.theme)
  Object.keys(status).forEach(function (key) { values[key] = status[key] })

  return renderTemplate(this.width, this.template, values) +
         consoleStrings.eraseLine() + '\r'
}
