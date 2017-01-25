#!/usr/bin/env node
;(function () {
  'use strict'

  /* imports */
  var funTestRunner = require('fun-test-runner')
  var tests = require('./tests')

  var subject = require('../src/')

  funTestRunner({
    subject: subject,
    tests: tests
  })
})()

