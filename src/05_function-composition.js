const _ = require('lodash/fp')

/**
 * _.compose is lodash equivalent of the UNIX pipe operator. Given a list of functions it returns a function
 * that is composite of all given functions
 *  const result = multiply(5 * add(6, 10))
 *  const result2 = _.compose([
 *      multiply(6)
 *      add
 *  ])(5, 10)
 * */
const op1 = ({ startVelocity, endVelocity, time }) => ({ diff: endVelocity - startVelocity, time })
const op2 = ({ diff, time }) => diff / time

const averageAcceleration = _.compose([
  op2,
  op1
])

const r1 = averageAcceleration({ startVelocity: 100, endVelocity: 20, time: 10 })
// r1

/**
 * If you have followed along, and now you write smaller functions. You can throw console logs in those small fns
 * Use the _.tap function to troubleshoot your function pipelines.
 * _.tap accepts a function called interceptor and returns a function that
 *  1. call the interceptor with the given input
 *  2. return the *INPUT* as is to the next function in pipeline
 * */
const averageAcceleration2 = _.compose([
  op2,
  _.tap(console.log),
  op1
])
const r2 = averageAcceleration2({ startVelocity: 100, endVelocity: 20, time: 10 })
// r2
