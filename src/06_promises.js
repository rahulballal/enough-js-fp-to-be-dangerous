const R = require('ramda')
const fetch = require('node-fetch')
const URL = 'https://jsonplaceholder.typicode.com/todos/1'

const apiSequence = R.pipe(
    R.identity,
    fetch,
    R.andThen(response => response.json()),
    R.andThen(R.values)
)

const result = await apiSequence(URL)
// result

const failedApiSquence = R.pipe(
    (it) => Promise.reject(),
    R.andThen(response => response.json()),
    R.otherwise(() => 'That failed as expected'),
)

try {
    const result2 = await failedApiSquence(`${URL}/things`)
    // result2
}catch(err) {
    console.log('doesnt get here')
}