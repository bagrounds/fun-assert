;(function () {
  'use strict'

  /* imports */
  var funPredicate = require('fun-predicate')
  var stringify = require('stringify-anything')

  module.exports = assert

  var METHODS = [
    'truthy',
    'falsey',
    'equal',
    'type',
    'match',
    'fail',
    'pass'
  ]

  METHODS.forEach(function (method) {
    module.exports[method] = function (reference) {
      return assert(funPredicate[method](reference))
    }
  })

  module.exports.nothing = function nothing (subject) { return subject }

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

