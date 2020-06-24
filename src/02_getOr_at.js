const _ = require('lodash/fp')

// Example object
const data = {
  _id: '5ef2c70f2d47af5af87625bd',
  index: 5,
  guid: '52488dd8-235b-49ea-b50d-82719246035b',
  isActive: true,
  balance: '$3,613.14',
  picture: 'http://placehold.it/32x32',
  age: 22,
  eyeColor: 'blue',
  name: {
    first: 'Pickett',
    last: 'Kent'
  }
}

/**
 * _.getOr is used for accessing particular field in an object in safe way with provided defaults.
 * Use this function when you are unsure if the field exists or not
 * This function is auto-curried in the FP variant of Lodash
 *
 * getOr(defaultValue, pathToObject, objectToReachInto)
 * */

const firstName = _.getOr('', 'name.first', data)
// firstName

const err1 = data.name.second
// err1

const expectedErr = _.getOr(undefined, 'name.second', data)
// expectedErr

const getOrEmptyString = _.getOr('')
const expectedErr2 = getOrEmptyString('name.second', data)
// expectedErr2


/**
 * _.at is used to access values of one or more fields in an object
 * Use this when you are sure that a value would exist since there is no way to give it a safe default
 * */
const [isActive, eyeColor, age] = _.at(['isActive', 'eyeColor', 'age'], data)
// isActive
// eyeColor
// age
