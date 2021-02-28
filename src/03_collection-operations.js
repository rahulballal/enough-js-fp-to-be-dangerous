const R = require('ramda')

const data = [
  {
    id: 0,
    name: 'Copeland Puckett'
  },
  {
    id: 1,
    name: 'Gibbs Dalton'
  },
  {
    id: 2,
    name: 'Whitley Mathis'
  }
]
/**
 * R.map is the safer variant of map function present on array object.
 * Ramda map does NOT use index in the mapping function
 *
 * Eg:
 * const arr = null
 * arr.map() --> This causes the code to throw and R will as well, unlike lodash
 *
 * Common Usages:
 * 1. map(mappingFunction, collection)
 * 2. map(R.prop(fieldname), collection)
 * */
const item = R.prop('id', data[0])
// item
const ids =  R.map(R.prop('id'), data)
// ids
const safe = R.map(R.prop('id'), [])
// safe

const oddEvenId = ({ id, name }) => ({ id, name, isEven: (id % 2) === 0 })
const transformed = R.map(oddEvenId, data)
// transformed

/**
 * R.filter is the safer variant of filter function present on array object
 * Eg:
 * const arr = null
 * arr.filter() --> This causes the code to throw and R will do the same
 *
 * Common Usages:
 * 1. filter(filterFunction, collection)
 * 2. filter(jsonFilterExpression, collection)
 *    This just turns into map(_.matches(jsonFilterExpression), collection)
 * */

const f1 = R.filter(R.propEq('id', 1), data)
// f1

const isEven = ({ id }) => (id % 2) === 0
const f2 = R.filter(isEven, data)
// f2

/**
 * R.reduce is the safer variant of filter function present on array object
 * Lodash reduce function does NOT use an index parameter
 *
 * Eg:
 * const arr = null
 * arr.reduce() --> This causes the code to throw and R will throw as well
 *
 * Common Usages:
 * 1. reduce(reducerFunction, collection)
 * */
const reducer = (accum, current) => {
  const even = isEven(current)
  return [...accum, { ...current, even }]
}
const r1 = R.reduce(reducer, [], data)
// r1

const safeR1 = R.reduce(reducer, [], [])
// safeR1

// NOT PRESENT IN RAMBDA: Because arity cannot be determined at runtime
// all functions need to be of same arity
/**
 * _.over is utility function to call a list of functions with same parameter.
 * The result is an array of results in same order as the function list
 *
 * Common Usage:
 *   You want to run a set of functions on the same data and then do further processing.
 * */
// Over: apply each function in list to same input
const add10 = val => val + 10
const multiply10 = val => val * 10
// Simple replacement
const o1 = R.map(fn => fn(5),[add10, multiply10])
// o1

/**
 * R.allPass is utility function to call a list of predicate function with same parameter.
 * The result true if all predicates passed, else it returns false
 * */
const isNameRahul = val => val === 'Rahul'
const isLength10 = val => val.length === 10

const oe = R.allPass([isNameRahul, isLength10])('Rahul')
// oe


/**
 * R.anyPass is utility function to call a list of predicate function with same parameter.
 * The result true if any or all predicates passed, else it returns false
 * */
const os = R.anyPass([isNameRahul, isLength10])('Rahul')
// os
