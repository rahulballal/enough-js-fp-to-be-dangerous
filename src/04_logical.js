const _ = require('lodash/fp')

const data = [
  {
    id: 0,
    name: 'Copeland Puckett',
    nested: {
      foo: 'bar'
    }
  },
  {
    id: 1,
    name: 'Gibbs Dalton'
  },
  {
    id: 2,
    name: 'Whitley Mathis'
  },
  {
    id: 10,
    name: 'Rahul Ballal',
    nested: {
      foo: 'baz'
    }
  }
]

/**
 * _.matches is the if conditional on steroids. It is a more declarative and composable way to assert shape of an object with contents
 * The result true if the JSON structure matches the object
 * */
const firstItem = _.head(data)
const isMatch1 = _.matches({ id: 10 })(firstItem)
// isMatch
const isMatch2 = _.matches({ id: 0, nested: { foo: 'bar' } })(firstItem)
// isMatch2

/**
 * _.cond is the switch statement on steroids. It is a more declarative/ composable way to perform code branching without
 * having a deeply nested code structure
 *
 * const result = _.cond([
 *    [predicateFn1, onPredicate1Pass], // if predicateFn1(data) === true then onPredicate1Pass(data) is called
 *    [predicateFn2, onPredicate2Pass]
 * ])(data)
 *
 * // Composability
 * const ruleSet1 = _.cond([
 *   [check1, do1],
 *   [check2, do2]
 * ])
 *
 * const ruleSet2 = _.cond([
 *   [check3, do3]
 *   [check4, do4]
 * ])
 *
 * const bothRuleSetsApplied = _.over([ruleSet1, ruleSet2])(data)
 *
 * */

const switchOnSteroid = _.cond([
  [_.matches({ id: 10 }), _.constant('firstItem id is 10')],
  [_.matches({ id: 0, nested: { foo: 'bar' } }), _.get('nested.foo')]
])

const sos1 = switchOnSteroid(firstItem)
// sos1

// No condition matched
const sos2 = switchOnSteroid({})
// sos2

/**
 * _.conformsTo is the _.matches on steroids. Use this to check if an object's individual fields abide by the rules
 * you defined.
 * Yes, this function is also curried and composable
 * */
const itemLast = _.last(data)

const conformExpression = {
  id: (it) => it === 10,
  name: (it) => it === 'Rahul Ballal',
  nested: (it) => _.has('foo', it)
}

const conf1 = _.conformsTo(conformExpression)(itemLast)
// conf1
