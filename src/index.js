/**
 *
 * @module fun-assert
 */
;(function () {
  'use strict'

  /* imports */
  var funPredicate = require('fun-predicate')
  var stringify = require('stringify-anything')
  var curry = require('fun-curry')

  var METHODS = [
    'truthy',
    'falsey',
    'equal',
    'equalDeep',
    'type',
    'match',
    'throws',
    'yes',
    'no'
  ]

  /* exports */
  module.exports = METHODS.reduce(function (exports, method) {
    exports[method] = funAssert(funPredicate[method])

    return exports
  }, funAssert)

  module.exports.fail = nameFunction('fail', module.exports.no)
  module.exports.pass = nameFunction('pass', module.exports.yes)
  module.exports.nothing = nameFunction('nothing', module.exports.yes)

  /**
   *
   * @function module:fun-assert.funAssert
   *
   * @param {Function} predicate - reference -> subject -> Boolean
   *
   * @return {Function} reference -> id (throws if predicate fails)
   */
  function funAssert (predicate) {
    return curry(nameFunction)(stringify(predicate))(
      function (reference) {
        return curry(nameFunction)(assertString(predicate, reference))(
          function (subject) {
            if (!predicate(reference)(subject)) {
              throw Error(assertString(predicate, reference, subject))
            }

            return subject
          })
      })
  }

  function nameFunction (string, f) {
    f.toString = function toString () {
      return string
    }

    return f
  }

  function assertString (predicate, reference, subject) {
    return (subject === undefined ? '' : stringify(subject) + ' ') +
      'should ' + stringify(predicate) +
      (reference === undefined ? '' : ' ' + stringify(reference))
  }
})()

