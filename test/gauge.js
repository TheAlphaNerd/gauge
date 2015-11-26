'use strict'
var test = require('tap').test
var stream = require('readable-stream')
var util = require('util')
var Gauge = require('../gauge.js')
var themes = require('../themes.js')

var gauge = new Gauge(themes.fallback.noUnicode.noColor, template, writableColumns)

test('showCursor', function (t) {
  t.ok(gauge.showCursor())
})
test('hideCursor', function (t) {
  t.ok(gauge.hideCursor())
})
test('hide', function (t) {
  t.ok(gauge.hide())
})

test('show', function (t) {
  t.show
})

test('setTheme', function (t) {
})
test('setTemplate', function (t) {
})
test('setWidth', function (t) {
})

/*


test("show & pulse", function (t) {
  t.plan(23)

  process.stdout.columns = 16
  cursor = []
  process.stderr.isTTY = false
  bar.template[0].length = 6
  bar.last = new Date(0)
  bar.show("NAME", 0)
  t.is(cursor.length, 0, "no tty, no progressbar")

  cursor = []
  process.stderr.isTTY = true
  bar.last = new Date(0)
  bar.show("NAME", 0.1)
  isOutput(t, "tty, name, completion",
    [ [ 'hide' ],
      [ 'horizontalAbsolute', 0 ],
      [ 'write', 'NAME   |#-----|\n' ],
      [ 'show' ] ])

  bar.show("S")
  cursor = []
  bar.last = new Date(0)
  bar.pulse()
  isOutput(t, "pulsed spinner",
    [ [ 'up', 1 ],
      [ 'hide' ],
      [ 'horizontalAbsolute', 0 ],
      [ 'write', 'S      \\ |----|\n' ],
      [ 'show' ] ])
  cursor = []
  bar.last = new Date(0)
  bar.pulse("P")
  isOutput(t, "pulsed spinner with subsection",
    [ [ 'up', 1 ],
      [ 'hide' ],
      [ 'horizontalAbsolute', 0 ],
      [ 'write', 'S -> P | |----|\n' ],
      [ 'show' ] ])
})

test("window resizing", function (t) {
  t.plan(16)
  process.stderr.isTTY = true
  process.stdout.columns = 32
  bar.show("NAME", 0.1)
  cursor = []
  bar.last = new Date(0)
  bar.pulse()
  isOutput(t, "32 columns",
    [ [ 'up', 1 ],
      [ 'hide' ],
      [ 'horizontalAbsolute', 0 ],
      [ 'write', 'NAME   / |##------------------|\n' ],
      [ 'show' ] ])

  process.stdout.columns = 16
  bar.show("NAME", 0.5)
  cursor = []
  bar.last = new Date(0)
  bar.pulse()
  isOutput(t, "16 columns",
    [ [ 'up', 1 ],
      [ 'hide' ],
      [ 'horizontalAbsolute', 0 ],
      [ 'write', 'NAME   - |##--|\n' ],
      [ 'show' ] ]);
});
*/