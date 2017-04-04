/**
 *
 * @module fun-curry
 */
;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')

  /* exports */
  module.exports = curry

  /**
   *
   * @function module:fun-curry.curry
   *
   * @param {Function} f - to curry
   * @param {Number} [arity] - number of arguments f should accept
   * @param {Array} [args] - initial arguments to apply
   *
   * @return {Function} a_1 -> a_2 -> ... -> a_arity -> f(a_1, ..., a_arity)
   */
  function curry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    return setProp('name', partialName(f, args),
      setProp('length', arity, function curried () {
        var newArgs = args.concat(Array.prototype.slice.call(arguments))

        return newArgs.length === arity
          ? f.apply(null, newArgs)
          : setProp(
            'length',
            arity - newArgs.length,
            curry(f, arity, newArgs)
          )
      })
    )
  }

  function partialName (f, args) {
    return stringify(f) + '(' + stringify(args) + ')'
  }

  function setProp (key, value, target) {
    return Object.defineProperty(target, key, { value: value })
  }
})()

