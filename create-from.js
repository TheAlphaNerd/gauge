'use strict'

module.exports = function (proto, obj) {
  var newObj = Object.create(proto)
  Object.keys(obj).forEach(function (key) {
    newObj[key] = obj[key]
  })
  return newObj
}
