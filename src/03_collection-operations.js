const _ = require('lodash/fp')

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
 * _.map is the safer variant of map function present on array object.
 * Lodash map does NOT use index in the mapping function
 *
 * Eg:
 * const arr = null
 * arr.map() --> This causes the code to throw
 *
 * Common Usages:
 * 1. map(mappingFunction, collection)
 * 2. map('nameOfFieldToReturn', collection)
 *    This just turns into map(_.at('nameOfFieldToReturn'), collection)
 * */
const ids = _.map('id', data)
// ids
const safe = _.map('id', null)
// safe

const oddEvenId = ({ id, name }) => ({ id, name, isEven: (id % 2) === 0 })
const transformed = _.map(oddEvenId, data)
// transformed

/**
 * _.filter is the safer variant of filter function present on array object
 * Eg:
 * const arr = null
 * arr.filter() --> This causes the code to throw
 *
 * Common Usages:
 * 1. filter(filterFunction, collection)
 * 2. filter(jsonFilterExpression, collection)
 *    This just turns into map(_.matches(jsonFilterExpression), collection)
 * */

const f1 = _.filter({ id: 1 }, data)
// f1

const isEven = ({ id }) => (id % 2) === 0
const f2 = _.filter(isEven, data)
// f2

/**
 * _.reduce is the safer variant of filter function present on array object
 * Lodash reduce function does NOT use an index parameter
 *
 * Eg:
 * const arr = null
 * arr.reduce() --> This causes the code to throw
 *
 * Common Usages:
 * 1. reduce(reducerFunction, collection)
 * */
const reducer = (accum, current) => {
  const even = isEven(current)
  return [...accum, { ...current, even }]
}
const r1 = _.reduce(reducer, [], data)
// r1

const safeR1 = _.reduce(reducer, [], null)
// safeR1


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

const o1 = _.over([add10, multiply10])(5)
// o1

/**
 * _.overEvery is utility function to call a list of predicate function with same parameter.
 * The result true if all predicates passed, else it returns false
 * */
const isNameRahul = val => val === 'Rahul'
const isLength10 = val => val.length === 10

const oe = _.overEvery([isNameRahul, isLength10])('Rahul')
// oe


/**
 * _.overSome is utility function to call a list of predicate function with same parameter.
 * The result true if any or all predicates passed, else it returns false
 * */
const os = _.overSome([isNameRahul, isLength10])('Rahul')
// os
