;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var VError = require('verror')
  var apiSpecChecker = require('../src/spec-api')

  /* exports */
  module.exports = [
    test1(),
    test2(),
    test3(),
    test4(),
    test5(),
    test6(),
    test7(),
    test8(),
    test9()
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

    function transformer (funAssert) {
      return function () {
        return apiSpecChecker(funAssert)
      }
    }
  }

  function test2 () {
    var testInput = 'test input'

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.type('String')
    }
  }

  function test3 () {
    var testInput = 42

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.equal(testInput)
    }
  }

  function test4 () {
    var testInput = 'something 3242 to match'

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.match(/^\S+ \d+.*$/)
    }
  }

  function test5 () {
    var testInput = null

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.falsey
    }
  }

  function test6 () {
    var testInput = 1

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.truthy
    }
  }

  function test7 () {
    var testInput = 'string'

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.or([funAssert.falsey, funAssert.type('String')])
    }
  }

  function test8 () {
    var testInput = 99

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.and([funAssert.truthy, funAssert.type('Number')])
    }
  }

  function test9 () {
    var testInput = 99

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        if (error) {
          throw new VError(error, 'Should not throw error')
        }

        if (result !== testInput) {
          throw new Error('Should return input')
        }
      },
      transformer: transformer,
      sync: true
    })

    test.description = 'Assertions should return original values'

    return test

    function transformer (funAssert) {
      return funAssert.not(funAssert.falsey)
    }
  }
})()

