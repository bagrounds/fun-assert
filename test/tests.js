;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var VError = require('verror')
  var apiSpecChecker = require('../src/spec-api')
  var globalFunAssert = require('../src/')

  /* exports */
  module.exports = [
    testApiSpec()
  ]

  function testApiSpec () {
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

    function transformer (funAssert) {
      return function () {
        return apiSpecChecker(funAssert)
      }
    }
  }

  module.exports = module.exports.concat(
    [
      {
        method: 'falsey',
        testInput: '',
        shouldPass: true
      },
      {
        method: 'falsey',
        testInput: ' ',
        shouldPass: false
      },
      {
        method: 'truthy',
        testInput: ' ',
        shouldPass: true
      },
      {
        method: 'truthy',
        testInput: '',
        shouldPass: false
      }
    ].map(testAssertion)
  )

  function testAssertion (options) {
    var test = funTest({
      input: options.testInput,
      verifier: verifier,
      transformer: transformToMethod(options.method),
      sync: true
    })

    function verifier (error, result) {
      if (options.shouldPass) {
        verifyPositive(error, result)
      } else {
        verifyNegative(error, result)
      }
    }

    function verifyPositive (error, result) {
      if (error) {
        throw new VError(error, 'Should not throw error')
      }

      if (result !== options.testInput) {
        throw new Error(options.method + ' should return input')
      }
    }

    function verifyNegative (error, result) {
      if (!error) {
        throw new Error(options.method + ' should fail')
      }
    }

    test.description = options.method + ' should work'

    return test
  }

  module.exports = module.exports.concat(
    [
      {
        method: 'equal',
        testInput: 'equal',
        willPass: 'equal',
        willFail: 'not equal'
      },
      {
        method: 'equal',
        testInput: {
          equal: 'equal'
        },
        willPass: {
          equal: 'equal'
        },
        willFail: {
          equal: 'not equal'
        }
      },
      {
        method: 'match',
        testInput: /\d/,
        willPass: 'a number: 3!',
        willFail: 'no number'
      },
      {
        method: 'type',
        testInput: 'String',
        willPass: '3',
        willFail: 3
      },
      {
        method: 'and',
        testInput: [
          globalFunAssert.truthy,
          globalFunAssert.type('Number')
        ],
        willPass: 1,
        willFail: 0
      },
      {
        method: 'or',
        testInput: [
          globalFunAssert.type('String'),
          globalFunAssert.type('Number')
        ],
        willPass: 3,
        willFail: null
      },
      {
        method: 'not',
        testInput: globalFunAssert.truthy,
        willPass: '',
        willFail: ' '
      }
    ].map(testAssertionGenerator)
  )

  function testAssertionGenerator (options) {
    var test = funTest({
      input: options.testInput,
      verifier: verifier,
      transformer: transformToMethod(options.method),
      sync: true
    })

    function verifier (error, asserter) {
      if (error) {
        throw new VError(error, 'should not throw error')
      }

      verifyPositive(asserter)
      verifyNegative(asserter)
    }

    function verifyPositive (asserter) {
      var originalValue
      try {
        originalValue = asserter(options.willPass)
      } catch (e) {
        throw new VError(e, options.method + ' should not throw')
      }

      if (!originalValue === options.testInput) {
        throw new Error(options.method + ' should return original value')
      }
    }

    function verifyNegative (asserter) {
      var thrownError

      try {
        asserter(options.willFail)
      } catch (e) {
        thrownError = e
      }

      if (!thrownError) {
        throw new Error('Should throw error')
      }
    }

    test.description = options.method + ' should work'

    return test
  }

  function transformToMethod (method) {
    return function transformer (funAssert) {
      return funAssert[method]
    }
  }
})()

