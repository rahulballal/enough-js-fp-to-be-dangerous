# Enough Functional JS to be dangerous

## 1. History Lesson

- Brendon Eich created JS
- He wanted to build a Scheme like language for the Netscape browser
- Scheme is a functional programming language
- Netscape wanted to attract more developers with a C/C++ style syntax over a Scheme/Lisp syntax
- JS was created in 10 days


## 2. Functional Programming Philosophies

### 2.1 Immutability
Once data is created, no other function or process can mutate it. A new copy is returned.

*NON FP STYLE*
```ecmascript 6
const fruits = ['apple', 'kiwi']

function addWatermelon(fruitList) {
  fruitList.push('watermelon')
}

function someOtherFn(twoFruitArray){}

// input was modified directly :(
addWatermelon(fruits)
someOtherFn(fruits) // this guy gets 3 fruits but maybe expected 2 ?
```
*FP Style*

```ecmascript 6
const fruits = ['apple', 'kiwi']

function addWatermelon(fruitList) {
  return [...fruitList, 'watermelon']
}

function someOtherFn(twoFruitArray){}

// input was modified directly :(
const withWaterMelon = addWatermelon(fruits)
someOtherFn(fruits) // this guy gets 2 fruits as it wants
```

### 2.2 Functions as first class citizens
Like variables, one should be able to create functions in any code path. Functions can be passed as parameters 
and returned from functions as results.

### 2.3 Pure functions
Functions should be written in such a way that, if same input is provided to a function, same output is returned by 
the function.

*Impure function example*

```ecmascript 6
// The result of this function is completely dependent on environment variables.
function encryptString(strToEncrypt) {
    const salt = String(process.env.ENCRYPTION_SALT)
    const iterations = parseInt(process.env.HASH_ITERATIONS)
    return symmetricHash(strToEncrypt, salt, iterations)
}
// There is no guarantee that this function will return same thing with same output
const encrypted = encryptString('JavaScript')
```

*Pure function example*

```ecmascript 6
// All non-deterministic side effects are isolated
function getSaltAndIterationCount() {
    return {
        salt: String(process.env.ENCRYPTION_SALT),
        iterations: pareInt(process.env.HASH_ITERATIONS)
    }
}
// pure function
function encryptString(str, salt, iterations) {
    return symmetricHash(str, salt, iterations)
}

const { salt, iterations } = getSaltAndIterationCount()
const encrypted = encryptString('JavaScript', salt, iterations)
```

__Note__
1. Its impossible to create a product that only has pure functions
2. FP wants you to isolate side-effects instead of littering in all over the app.
   Eg: Redux contains all side effects like http request in thunk or saga modules/middleware code
   
### 2.4 Strong Type System

- Most functional languages have a strong type system
- Javascript cannot do this without TypeScript/Flow/ReasonML
- We need to resort to schema definitions using Yup or Joi
- In JS land, type discipline is a must for a programmer

### 2.5 Focus on decomposing big problems into smaller problems

Simplistic Eg: Average acceleration is the change in velocity over time

*NON FP*
```ecmascript 6
// This function performs subtraction AND division
const calcAvgAcceleration = (v0, v1, time) => (v1-v0)/time
```
*FP Way*
```ecmascript 6
 const subtract = (val1 = 0, val2 = 0) => val2 - val1
 const divide = (divisor = 0, dividend = 0) => {
    if (dividend === 0) {
      return { error:  'Divide by 0 error' }
    }
    if (divisor) {
      return { result: 0 }
    }
    return { result: dividend/divisor }

}
const { result, error } = (v0,v1, time) => divide(time, subtract(v0, v1))
if (error) {
  throw new Error(error)
}
const averageAcceleration = result
```

### 2.6 Exceptions and Errors
- Exceptions are usually things a system needs to recover from or stop. Eg: Memory issue, DB unreachable
- Errors are simply the undesirable output of a function. A lot of modern programming languages have embraced this idea.

    - Rust has [Result](https://doc.rust-lang.org/std/result/) type
    - Swift has [Result](https://developer.apple.com/documentation/swift/result) type
    - Elixir forces all functions to return primitives or a typed tuple of `:ok` or `:err`

- Centralize elevation of Error to Exception in 1 place instead of everywhere.

### 2.7 Reduce the number of Falsy values in code, prefer providing sane defaults

## 3. Code

## 4. Final thoughts.

1. It is not possible to write Pure functional code in JS. We can surely write JS in a functional STYLE.
2. Functional programming is more of a thinking style than a programming style.
3. The constraints of FP, helps us write more declarative and safe code

## 5. Resources

- Videos: [FunFunFunction FP Series](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)
- Video: [Functional Programming in 40 minutes](https://www.youtube.com/watch?v=0if71HOyVjY)
- Video: [Plain Functional Programming by Martin Ordersky](https://www.youtube.com/watch?v=YXDm3WHZT5g)
- Repo: [Functional Programming Lite by Kyle Simpson](https://github.com/getify/Functional-Light-JS)
- Book: Mastring Functional Programming in JavaScript