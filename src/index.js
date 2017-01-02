;(function () {
  'use strict'

  /* imports */
  var funPredicate = require('fun-predicate')
  var stringify = require('stringify-anything')

  module.exports = funAssert
  module.exports.truthy = funAssert(funPredicate.truthy)
  module.exports.falsey = funAssert(funPredicate.falsey)
  module.exports.equal = equal
  module.exports.type = type
  module.exports.match = match

  function equal (reference) {
    return funAssert(funPredicate.equal(reference))
  }

  function type (reference) {
    return funAssert(funPredicate.type(reference))
  }

  function match (reference) {
    return funAssert(funPredicate.match(reference))
  }

  function funAssert (predicate) {
    function result (subject) {
      if (!predicate(subject)) {
        var message = stringify(subject) + ' should ' + stringify(predicate)
        throw new Error(message)
      }

      return subject
    }

    result.toString = function toString () {
      return stringify(predicate)
    }

    return result
  }
})()

