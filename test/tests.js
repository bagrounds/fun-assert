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
      input: [' '],
      transformer: funTransform.toMethod('truthy'),
      result: funAssert.equal(' ')
    },
    {
      input: [''],
      transformer: funTransform.toMethod('truthy'),
      error: funAssert.truthy
    },
    {
      input: [' '],
      transformer: funTransform.toMethod('falsey'),
      error: funAssert.truthy
    },
    {
      input: [''],
      transformer: funTransform.toMethod('falsey'),
      result: funAssert.equal('')
    },
    {
      input: [' '],
      transformer: funTransform.toMethod('equal'),
      result: funAssert.type('Function')
    },
    {
      input: [5],
      transformer: equal5,
      result: funAssert.equal(5)
    },
    {
      input: [4],
      transformer: equal5,
      error: funAssert.truthy
    },
    {
      input: [/\d/],
      transformer: funTransform.toMethod('match'),
      result: funAssert.type('Function')
    },
    {
      input: ['a digit: 5!'],
      transformer: matchDigit,
      result: funAssert.equal('a digit: 5!')
    },
    {
      input: ['no digit!'],
      transformer: matchDigit,
      error: funAssert.truthy
    },
    {
      input: [funPredicate.or(
        funPredicate.type('Number'),
        funPredicate.type('String')
      )],
      result: funAssert.type('Function')
    },
    {
      input: [5],
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      result: funAssert.equal(5)
    },
    {
      input: ['a string'],
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      result: funAssert.equal('a string')
    },
    {
      input: [[]],
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      error: funAssert.truthy
    },
    {
      input: [{}],
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
      error: funAssert.truthy
    },
    {
      input: [null],
      transformer: funTransform.toResult(
        funPredicate.or(
          funPredicate.type('Number'),
          funPredicate.type('String')
        )
      ),
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

