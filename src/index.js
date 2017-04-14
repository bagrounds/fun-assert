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
  module.exports.fromPredicate = curry(fromPredicate)
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
    return fromPredicate(predicate(reference), subject)
  }

  function fromPredicate (p, s) {
    if (p(s)) {
      return s
    }

    throw Error(stringify(s) + ' should ' + p.name)
  }
})()

