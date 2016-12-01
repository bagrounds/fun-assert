;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck
  var stringifySafe = require('json-stringify-safe')
  var deepEqual = require('deep-equal')

  /* exports */
  module.exports = {
    type: type,
    equal: equal,
    or: or,
    and: and,
    not: not
  }

  function equal (reference) {
    function asserter (subject) {
      var ok = reference === subject

      if (typeCheck('Object', reference)) {
        ok = deepEqual(subject, reference, {strict: true})
      }

      if (!ok) {
        throw error(subject)
      }
    }

    function error (subject) {
      var verb = 'equal'

      return makeError(subject, verb, reference)
    }

    asserter.error = error

    return asserter
  }

  function type (t) {
    function asserter (subject) {
      var ok = typeCheck(t, subject)

      if (!ok) {
        throw error(subject)
      }
    }

    function error (subject) {
      var verb = 'equal'

      return makeError(subject, verb, reference)
    }

    asserter.error = error

    return asserter
  }

  function and (asserters) {
    return function (subject) {
      asserters.forEach(function (asserter) {
        asserter(subject)
      })
    }
  }

  function or (asserters) {
    return function (subject) {
      var errors = asserters.reduce(function (results, asserter) {
        try {
          asserter(subject)
        } catch (error) {
          results.push(error)
        }

        return results
      }, [])

      if (errors.length === asserters.length) {
        var combinedError = errors.reduce(function (combined, error) {
          combined.message += ' | ' + error.message

          return combined
        })

        throw combinedError
      }
    }
  }

  function not (asserter) {
    return function (subject) {
      try {
        asserter(subject)
      } catch (error) {
        return
      }

      var error = asserter.error(subject)
      error.message = error.message.replace('should','should not')

      throw error
    }
  }

  function makeError (subject, verb, reference) {
      var s = stringify(subject)
      var r = stringify(reference)
      var message = s + ' should ' + verb + ' ' + r

      return new Error(message)
  }

  function stringify (anything) {
    if (typeof anything === 'object') {
      return stringifySafe(anything)
    }

    return '' + anything
  }
})()

