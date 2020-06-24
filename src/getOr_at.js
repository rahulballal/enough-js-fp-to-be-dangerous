const _ = require('lodash/fp')

// Example object
const data = {
    "_id": "5ef2c70f2d47af5af87625bd",
    "index": 5,
    "guid": "52488dd8-235b-49ea-b50d-82719246035b",
    "isActive": true,
    "balance": "$3,613.14",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "blue",
    "name": {
        "first": "Pickett",
        "last": "Kent"
    },
}

// using _.getOr to access data safely. Use this when unsure about presence of a field

const firstName = _.getOr('', 'name.first', data)
// firstName

const err1 = data.name.second
// err1

const expectedErr = _.getOr(undefined, 'name.second', data)
// expectedErr

const getOrEmptyString = _.getOr('')
const expectedErr2 = getOrEmptyString('name.second', data)
// expectedErr2

// using _.at to access, use it when you are sure of its presence via a schema being enforced
const [isActive, eyeColor, age] = _.at(['isActive', 'eyeColor', 'age'], data)
// isActive
// eyeColor
// age