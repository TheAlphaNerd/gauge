'use strict'
var validate = require('aproba')
var Gauge = require('./gauge.js')
var hasUnicode = require('has-unicode')
var hasColor = require('has-color')
var onExit = require('signal-exit')
var themes = require('./themes')

module.exports = EasyGauge

function EasyGauge (writeTo, options) {
  if (!options) options = {}
  validate('OO', [writeTo, options])

  var self = this

  self.status = {
    spun: 0
  }
  self.showing = false
  self.needsRedraw = false
  self.updateInterval = options.updateInterval || 50
  self._paused = false
  self.tty = options.tty ||
    (writeTo === process.stderr && process.stdout.isTTY && process.stdout) ||
    (writeTo.isTTY && writeTo)

  var theme = options.theme || themes(hasUnicode(), hasColor)
  var template = options.template || [
    {type: 'progressbar', length: 20},
    {type: 'activityIndicator', kerning: 1, length: 1},
    {type: 'section', kerning: 1},
    {type: 'subsection', kerning: 1}
  ]
  var GaugeClass = options.Gauge || Gauge
  var gauge = new GaugeClass(theme, template, ((self.tty && self.tty.columns) || 80) - 1)

  var hideCursor = options.hideCursor == null ? true : options.hideCursor
  var onScreen = false
  self._doRedraw = function () {
    if (self.disabled || self._paused) return
    if (!self.showing && onScreen) {
      onScreen = false
      var result = gauge.hide()
      if (hideCursor) {
        result += gauge.showCursor()
      }
      return writeTo.write(result)
    }
    if (self.showing && !onScreen) {
      onScreen = true
      self.needsRedraw = true
      if (hideCursor) {
        writeTo.write(gauge.hideCursor())
      }
    }
    if (!self.needsRedraw) return
    if (!writeTo.write(gauge.show(self.status))) {
      self._paused = true
      writeTo.on('drain', function () {
        self._paused = false
        self._doRedraw()
      })
    }
  }

  self._handleSizeChange = function () {
    gauge.setWidth(self.tty.columns - 1)
    self.needsRedraw = true
  }

  onExit(function () {
    self.hide()
    self._doRedraw()
  })

  if (options.enabled || options.enabled == null) {
    self.enable()
  } else {
    self.disable()
  }
}
EasyGauge.prototype = {}

EasyGauge.prototype.enable = function () {
  this.disabled = false
  if (this.tty) this._enableEvents()
  if (this.showing) this.show()
}

EasyGauge.prototype.disable = function () {
  if (this.showing) {
    this.hide()
    this._doRedraw()
    this.showing = true
  }
  this.disabled = true
  if (this.tty) this._disableEvents()
}

EasyGauge.prototype._enableEvents = function () {
  this.tty.on('resize', this._handleSizeChange)
  this.redrawTracker = setInterval(this._doRedraw, this.updateInterval)
}

EasyGauge.prototype._disableEvents = function () {
  this.tty.removeListener('resize', this._handleSizeChange)
  clearInterval(this.redrawTracker)
}

EasyGauge.prototype.hide = function () {
  if (this.disabled) return
  if (!this.showing) return
  this.showing = false
}

EasyGauge.prototype.show = function (section, completed) {
  if (this.disabled) return
  this.showing = true
  if (typeof section === 'string') {
    this.status.section = section
  } else if (typeof section === 'object') {
    var self = this
    Object.keys(section).forEach(function (key) {
      self.status[key] = section[key]
    })
  }
  if (completed != null) this.status.completed = completed
  this.needsRedraw = true
}

EasyGauge.prototype.pulse = function (subsection) {
  if (this.disabled) return
  if (!this.showing) return
  this.status.subsection = subsection
  this.status.spun ++
  this.needsRedraw = true
}
