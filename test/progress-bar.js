'use strict'
var test = require('tap').test
var progressBar = require('../progress-bar')

test('progressBar', function (t) {
  var theme = {
    complete: '#',
    remaining: '-'
  }
  var result = progressBar(theme, 10, 0)
  t.is(result, '----------', '0% bar')
  var result = progressBar(theme, 10, 0.5)
  t.is(result, '#####-----', '50% bar')
  var result = progressBar(theme, 10, 1)
  t.is(result, '##########', '100% bar')
  var result = progressBar(theme, 10, -100)
  t.is(result, '----------', '0% underflow bar')
  var result = progressBar(theme, 10, 100)
  t.is(result, '##########', '100% overflow bar')
  var result = progressBar(theme, 0, 0.5)
  t.is(result, '', '0 width bar')

  var multicharTheme = {
    complete: '123',
    remaining: 'abc'
  }
  var result = progressBar(multicharTheme, 10, 0)
  t.is(result, 'abcabcabca', '0% bar')
  var result = progressBar(multicharTheme, 10, 0.5)
  t.is(result, '12312abcab', '50% bar')
  var result = progressBar(multicharTheme, 10, 1)
  t.is(result, '1231231231', '100% bar')
  var result = progressBar(multicharTheme, 10, -100)
  t.is(result, 'abcabcabca', '0% underflow bar')
  var result = progressBar(multicharTheme, 10, 100)
  t.is(result, '1231231231', '100% overflow bar')
  var result = progressBar(multicharTheme, 0, 0.5)
  t.is(result, '', '0 width bar')

  t.done()
})
