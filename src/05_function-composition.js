const R = require('ramda')

/**
 * R.compose  Given a list of functions it returns a function
 * that is composite of all given functions
 *  const result = multiply(5 * add(6, 10))
 *  const result2 = R.compose(
 *      multiply(6),
 *      add
 *  )(5, 10)
 * */
const op1 = ({ startVelocity, endVelocity, time }) => ({ diff: endVelocity - startVelocity, time })
const op2 = ({ diff, time }) => diff / time

const averageAcceleration = R.compose(
  op2,
  op1
)

const r1 = averageAcceleration({ startVelocity: 10, endVelocity: 200, time: 10 })
// r1

/**
 * If you have followed along, and now you write smaller functions. You can throw console logs in those small fns
 * Use the _.tap function to troubleshoot your function pipelines.
 * R.tap accepts a function called interceptor and returns a function that
 *  1. call the interceptor with the given input
 *  2. return the *INPUT* as is to the next function in pipeline
 * */
const averageAcceleration2 = R.compose(
  op2,
  R.tap(console.log),
  op1
)
const r2 = averageAcceleration2({ startVelocity: 100, endVelocity: 20, time: 10 })
// r2

/**
 * R.pipe applies a series of function one after the other in such a way that
 * output of first is the input of second and so on
 * 
 */

const piped = R.pipe(
    Math.pow,
    R.negate,
    R.inc
)(10,2)

piped
