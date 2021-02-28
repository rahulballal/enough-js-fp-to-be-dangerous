const R = require('ramda')

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
 * R.whereEq is the if conditional on steroids. It is a more declarative and composable way to assert shape of an object with contents
 * The result true if the JSON structure matches the object
 * */
const firstItem = R.head(data)
// firstItem
const isMatch1 = R.propEq('id', 0, firstItem)
// isMatch1
const isMatch2 = R.whereEq({ id: 0, nested: { foo: 'bar' } })(firstItem)
//isMatch2

/**
 * R.cond is the switch statement on steroids. It is a more declarative/ composable way to perform code branching without
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
 * const bothRuleSetsApplied = _.map(fn => fn(data), [ruleSet1, ruleSet2])
 *
 * */

const switchOnSteroid = R.cond([
  [R.whereEq({ id: 10 }), R.identity('firstItem id is 10')],
  [R.whereEq({ id: 0, nested: { foo: 'bar' } }), R.path(['nested','foo'])]
])

const sos1 = switchOnSteroid(firstItem)
// sos1

// No condition matched
const sos2 = switchOnSteroid({})
// sos2

/**
 * R.where Use this to check if an object's individual fields abide by the rules
 * you defined.
 * Yes, this function is also curried and composable
 * */
const itemLast = R.last(data)
// itemLast
const conformExpression = {
  id: R.equals(10),
  name: R.equals('Rahul Ballal'),
  nested: R.has('foo')
}

const conf1 = R.where(conformExpression)(itemLast)
// conf1
