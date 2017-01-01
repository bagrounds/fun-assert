;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('../src/')
  var funTransform = require('fun-transform')
  var funPredicate = require('fun-predicate')

  /* exports */
  module.exports = [
    {
      input: ' ',
      sync: true,
      transformer: funTransform.toMethod('truthy'),
      result: funAssert.equal(' ')
    },
    {
      input: '',
      sync: true,
      transformer: funTransform.toMethod('truthy'),
      error: funAssert.truthy
    },
    {
      input: ' ',
      sync: true,
      transformer: funTransform.toMethod('falsey'),
      error: funAssert.truthy
    },
    {
      input: '',
      sync: true,
      transformer: funTransform.toMethod('falsey'),
      result: funAssert.equal('')
    },
    {
      input: ' ',
      sync: true,
      transformer: funTransform.toMethod('equal'),
      result: funAssert.type('Function')
    },
    {
      input: 5,
      sync: true,
      transformer: equal5,
      result: funAssert.equal(5)
    },
    {
      input: 4,
      sync: true,
      transformer: equal5,
      error: funAssert.truthy
    },
    {
      input: /\d/,
      sync: true,
      transformer: funTransform.toMethod('match'),
      result: funAssert.type('Function')
    },
    {
      input: 'a digit: 5!',
      sync: true,
      transformer: matchDigit,
      result: funAssert.equal('a digit: 5!')
    },
    {
      input: 'no digit!',
      sync: true,
      transformer: matchDigit,
      error: funAssert.truthy
    },
    {
      input: funPredicate.or(
        funPredicate.type('Number'),
        funPredicate.type('String')
      ),
      sync: true,
      result: funAssert.type('Function')
    },
    {
      input: 5,
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      sync: true,
      result: funAssert.equal(5)
    },
    {
      input: 'a string',
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      sync: true,
      result: funAssert.equal('a string')
    },
    {
      input: [],
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      sync: true,
      error: funAssert.truthy
    },
    {
      input: {},
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      sync: true,
      error: funAssert.truthy
    },
    {
      input: null,
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      sync: true,
      error: funAssert.truthy
    }
  ].map(funTest)

  function equal5 (funAssert) {
    return funAssert.equal(5)
  }

  function matchDigit (funAssert) {
    return funAssert.match(/\d/)
  }
})()

