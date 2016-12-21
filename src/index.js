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
    match: match,
    or: or,
    and: and,
    not: not
  }

  function equal (reference) {
    function asserter (subject) {
      var ok = reference === subject

      if (typeCheck('Object|Array', reference)) {
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

  function match (reference) {
    function asserter (subject) {
      var ok = reference.test(subject)

      if (!ok) {
        throw error(subject)
      }
    }

    function error (subject) {
      var verb = 'match'

      return makeError(subject, verb, reference.source)
    }

    asserter.error = error

    return asserter
  }

  function type (reference) {
    function asserter (subject) {
      var ok = typeCheck(reference, subject)

      if (!ok) {
        throw error(subject)
      }
    }

    function error (subject) {
      var verb = 'have type'

      return makeError(subject, verb, reference)
    }

    asserter.error = error

    return asserter
  }

  function and (asserters) {
    function asserter (subject) {
      asserters.forEach(function (asserter) {
        try {
          asserter(subject)
        } catch (e) {
          throw error(subject)
        }
      })
    }

    function error (subject) {
      var errors = asserters.map(function (asserter) {
        return asserter.error(subject)
      })

      var combinedError = errors.reduce(function (combined, error) {
        combined.message += ' AND ' + error.message

        return combined
      })

      combinedError.message = '(' + combinedError.message + ')'
      return combinedError
    }

    asserter.error = error

    return asserter
  }

  function or (asserters) {
    function asserter (subject) {
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
          combined.message += ' OR ' + error.message

          return combined
        })

        throw combinedError
      }
    }

    function error (subject) {
      var errors = asserters.map(function (asserter) {
        return asserter.error(subject)
      })

      var combinedError = errors.reduce(function (combined, error) {
        combined.message += ' OR ' + error.message

        return combined
      })

      combinedError.message = '(' + combinedError.message + ')'
      return combinedError
    }

    asserter.error = error

    return asserter
  }

  function not (originalAsserter) {
    function asserter (subject) {
      try {
        originalAsserter(subject)
      } catch (error) {
        return
      }

      throw error(subject)
    }

    function error (subject) {
      var original = originalAsserter.error(subject)

      original.message = original.message.replace(/should/g,'should not')

      original.message = '(' + original.message + ')'
      return original
    }

    return asserter
  }

  function makeError (subject, verb, reference) {
      var s = stringifySafe(subject)
      var r = stringifySafe(reference)
      var message = s + ' should ' + verb + ' ' + r

      return new Error(message)
  }
})()

