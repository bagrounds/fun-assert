;(function () {
  'use strict'

  /* imports */
  var specifier = require('specifier')
  var funAssert = require('./')

  /* exports */
  module.exports = apiChecker

  var isFunction = funAssert.type('Function')

  var apiSpec = {
    truthy: [
      isFunction
    ],
    falsey: [
      isFunction
    ],
    type: [
      isFunction
    ],
    equal: [
      isFunction
    ],
    match: [
      isFunction
    ],
    or: [
      isFunction
    ],
    and: [
      isFunction
    ],
    not: [
      isFunction
    ]
  }

  var apiSpecChecker = specifier(apiSpec)

  function apiChecker (api) {
    return apiSpecChecker(api)
  }
})()

