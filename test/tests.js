;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var fn = require('fun-function')
  var funTest = require('fun-test')

  module.exports = [
    {
      inputs: [predicate.type('Number'), 1],
      predicate: predicate.equal(1)
    },
    {
      inputs: [],
      predicate: predicate.throwsWith([predicate.type('Number'), '1']),
      contra: fn.k
    },
    {
      inputs: [],
      predicate: predicate.throwsWith(['not a predicate function', '1']),
      contra: fn.k
    }
  ].map(funTest.sync)
})()

