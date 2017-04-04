/**
 *
 * @module fun-assert
 */
;(function () {
  'use strict'

  /* imports */
  var curry = require('./curry')
  var funPredicate = require('fun-predicate')
  var stringify = require('stringify-anything')

  var METHODS = [
    'truthy',
    'equal',
    'equalDeep',
    'type',
    'match',
    'throwsWith',
    'yes',
    'no'
  ]

  /* exports */
  module.exports = METHODS.reduce(function (exports, method) {
    exports[method] = exports(funPredicate[method])

    return exports
  }, curry(funAssert))

  module.exports.fail = module.exports.no
  module.exports.pass = module.exports.yes
  module.exports.nothing = module.exports.yes
  module.exports.fromPredicate = fromPredicate
  module.exports.falsey = function falsey () {
    return function falsey (subject) {
      return !subject
    }
  }

  /**
   *
   * @function module:fun-assert.funAssert
   *
   * @param {Function} predicate - reference -> subject -> Boolean
   * @param {*} reference - for test
   * @param {*} subject - to test
   *
   * @return {Function} reference -> id (throws if predicate fails)
   */
  function funAssert (predicate, reference, subject) {
    if (!predicate(reference)(subject)) {
      throw error(predicate, reference, subject)
    }

    return subject
  }

  function fromPredicate (p) {
    return function (s) {
      if (p(s)) {
        return s
      }

      throw error(p, '', s)
    }
  }

  function error (predicate, reference, subject) {
    return Error(stringify(subject) + ' should ' + predicate(reference).name)
  }
})()

