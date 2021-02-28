const R = require('ramda')

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
 * R.path and R.pathOr is used for accessing particular field in an object in safe way with provided defaults.
 * Use this function when you are unsure if the field exists or not
 * This function is auto-curried in the FP variant of Lodash
 *
 * R.pathOr(defaultValue, pathToObject, objectToReachInto)
 * */

const firstName =  R.path(['name', 'first'], data)
// firstName

const err1 = data.name.second
// err1

const expectedErr =  R.pathOr(undefined, 'name.second', data)
// expectedErr

const getOrEmptyString = R.pathOr('')
const expectedErr2 = getOrEmptyString('name.second', data)
// expectedErr2


/**
 * R.pickAll or R.paths is used to access values of one or more fields in an object
 * Use this when you are sure that a value would exist since there is no way to give it a safe default
 * */
const { isActive, eyeColor, age }= R.pickAll(['isActive', 'eyeColor', 'age'], data)

const [ isActive2, eyeColor2, age2 ] = R.paths([['isActive'], ['eyeColor'], ['age']], data)
// isActive2
// eyeColor2
// age2
