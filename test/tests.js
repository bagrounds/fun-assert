;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var VError = require('verror')
  var apiSpecChecker = require('../src/spec-api')

  /* exports */
  module.exports = [
    test1()
  ]

  function test1 () {
    var test = funTest({
      verifier: function verifier (error) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Should export full api'

    return test
  }

  function transformer (funAssert) {
    return function () {
      return apiSpecChecker(funAssert)
    }
  }
})()

