;(function () {
  'use strict'

  /* imports */
  var typeCheck = require('type-check').typeCheck
  var stringifySafe = require('json-stringify-safe')
  var deepEqual = require('deep-equal')

  /* exports */
  module.exports = {
    truthy: truthy(),
    falsey: falsey(),
    type: type,
    equal: equal,
    match: match,
    or: or,
    and: and,
    not: not
  }

  function truthy () {
    function asserter (subject) {
      if (!subject) {
        throw error(subject)
      }

      return subject
    }

    function error (subject) {
      var verb = 'be'

      return makeError(subject, verb, 'truthy')
    }

    asserter.error = error

    return asserter
  }

  function falsey () {
    function asserter (subject) {
      if (subject) {
        throw error(subject)
      }

      return subject
    }

    function error (subject) {
      var verb = 'be'

      return makeError(subject, verb, 'falsey')
    }

    asserter.error = error

    return asserter
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

      return subject
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

      return subject
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

      return subject
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

      return subject
    }

    function error (subject) {
      var errors = asserters.map(function (asserter) {
        var error = asserter.error(subject)

        error.message = '(' + error.message + ')'

        return error
      })

      var combinedError = errors.reduce(function (combined, error) {
        combined.message += ' AND ' + error.message

        return combined
      })

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
        throw error(subject)
      }

      return subject
    }

    function error (subject) {
      var errors = asserters.map(function (asserter) {
        var error = asserter.error(subject)

        error.message = '(' + error.message + ')'

        return error
      })

      var combinedError = errors.reduce(function (combined, error) {
        combined.message += ' OR ' + error.message

        return combined
      })

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
        return subject
      }

      throw error(subject)
    }

    function error (subject) {
      var original = originalAsserter.error(subject)

      original.message = 'NOT(' + original.message + ')'
      return original
    }

    asserter.error = error

    return asserter
  }

  function makeError (subject, verb, reference) {
    var s = stringifySafe(subject)
    var r = stringifySafe(reference)
    var message = s + ' should ' + verb + ' ' + r

    return new Error(message)
  }
})()

