const _ = require('lodash/fp')

const data = [
    {
        "id": 0,
        "name": "Copeland Puckett",
        nested: {
            "foo": 'bar'
        }
    },
    {
        "id": 1,
        "name": "Gibbs Dalton"
    },
    {
        "id": 2,
        "name": "Whitley Mathis"
    },
    {
        "id": 10,
        "name": "Rahul Ballal",
        "nested": {
            "foo": "baz"
        }
    }
]

// matches -- the flat IF

const firstItem = _.head(data)
const isMatch1 = _.matches({ id: 10 })(firstItem)
// isMatch
const isMatch2 = _.matches({ id: 0, nested: { foo: 'bar'}})(firstItem)
//isMatch2

// cond -- the switch on steroids

const switchOnSteroid = _.cond([
    [_.matches({ id: 10 }), _.constant('firstItem id is 10')],
    [_.matches({ id: 0, nested: { foo: 'bar'}}), _.get('nested.foo')]
])

const sos1 = switchOnSteroid(firstItem)
// sos1

// No condition matched
const sos2 = switchOnSteroid({})
// sos2


// conformsTo
const itemLast = _.last(data)

const conformExpression = {
    id: (it) => it === 10,
    name: (it) => it === 'Rahul Ballal',
    nested: (it) => _.has('foo', it)
}

const conf1 = _.conformsTo(conformExpression)(itemLast)
// conf1