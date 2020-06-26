/**
 * Higher order function is a function that returns another function.
 * Inputs can be arguments or any other function
 * Higher order functions are used to accomplish currying and partial application.
 * In React we have commonly seen this as HOC
 * **/

const add = (num1, num2) => num1 + num2

/**
 * Curring and Higher order function
 **/
const curriedAdd = num1 => num2 => num1 + num2

/**
 * Higher order function with partial application
 **/
const add2NumbersWithPresetConstant = num1 => {
  const withPreset = num1 + 10

  return (num2) => num2 + withPreset
}

/**
 * RUN This
 **/

const r1 = add(4, 10)
// r1

const add4 = curriedAdd(4)
const r2 = add4(10)
// r2

const funkyAdd = add2NumbersWithPresetConstant(4)
const r3 = funkyAdd(10)
// r3
