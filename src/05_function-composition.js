const _ = require('lodash/fp')

// flow or compose -- data pipelines --
const op1 = ({ startVelocity, endVelocity, time }) => ({ diff: endVelocity - startVelocity, time })
const op2 = ({ diff, time }) => diff/time

const averageAcceleration = _.compose([
    op2,
    op1
])

const r1 = averageAcceleration({ startVelocity: 100, endVelocity: 20, time: 10})
r1

// Debugging pipelines
const averageAcceleration2 = _.compose([
    op2,
    _.tap(console.log),
    op1
])
const r2 = averageAcceleration2({ startVelocity: 100, endVelocity: 20, time: 10})
// r2
