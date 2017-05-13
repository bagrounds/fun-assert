/**
 *
 * @module fun-assert
 */
;(function () {
  'use strict'

  /* imports */
  var curry = require('fun-curry')
  var stringify = require('stringify-anything')

  /* exports */
  module.exports = curry(assert)

  /**
   *
   * @function module:fun-assert.assert
   *
   * @param {Function} predicate - subject -> Boolean
   * @param {*} subject - to test
   *
   * @return {Function} subject | throw if !predicate(subject)
   */
  function assert (predicate, subject) {
    assertIsFunction(predicate)

    if (predicate(subject)) {
      return subject
    }

    throw Error('!' + stringify(predicate) + '(' + stringify(subject) + ')')
  }

  function assertIsFunction (subject) {
    if (typeof subject === 'function') {
      return subject
    }

    throw Error(stringify(subject) + ' should be a function')
  }
})()

