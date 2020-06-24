const _ = require('lodash/fp')

const data = [
    {
        "id": 0,
        "name": "Copeland Puckett"
    },
    {
        "id": 1,
        "name": "Gibbs Dalton"
    },
    {
        "id": 2,
        "name": "Whitley Mathis"
    }
]

// Map
const ids = _.map('id', data)
// ids
const safe = _.map('id', null)
// safe

const oddEvenId = ({id, name}) =>({ id, name, isEven:(id % 2) === 0})
const transformed = _.map(oddEvenId, data)
// transformed

// Filter

const f1 = _.filter({ id: 1 }, data)
// f1

const isEven = ({ id }) => (id % 2) === 0
const f2 = _.filter(isEven, data)
// f2

// Reduce
const reducer = (accum, current) => {
    const even = isEven(current)
    return [...accum, { ...current, even }]
}
const r1 = _.reduce(reducer, [], data)
// r1

const safeR1 = _.reduce(reducer, [], null)
// safeR1

// Over: apply each function in list to same input
const add10 = val => val + 10
const multiply10 = val => val * 10

const o1 = _.over([add10, multiply10])(5)
// o1


// OverEvery vs overSome
const isNameRahul = val => 'Rahul' === val
const isLength10 = val => val.length === 10

const oe = _.overEvery([isNameRahul, isLength10])('Rahul')
// oe

const os = _.overSome([isNameRahul, isLength10])('Rahul')
// os