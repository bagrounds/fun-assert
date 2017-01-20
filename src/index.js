;(function () {
  'use strict'

  /* imports */
  var funPredicate = require('fun-predicate')
  var stringify = require('stringify-anything')

  module.exports = assert
  module.exports.truthy = assert(funPredicate.truthy)
  module.exports.falsey = assert(funPredicate.falsey)
  module.exports.equal = equal
  module.exports.type = type
  module.exports.match = match
  module.exports.nothing = function nothing (subject) { return subject }

  function equal (reference) {
    return assert(funPredicate.equal(reference))
  }

  function type (reference) {
    return assert(funPredicate.type(reference))
  }

  function match (reference) {
    return assert(funPredicate.match(reference))
  }

  function assert (predicate) {
    function toString (subject) {
      var subjectString = subject ? stringify(subject) : ''
      return subjectString + ' should ' + stringify(predicate)
    }

    function assertion (subject) {
      if (!predicate(subject)) {
        var message = toString(subject)

        throw new Error(message)
      }

      return subject
    }

    assertion.toString = toString

    return assertion
  }
})()

