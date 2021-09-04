import debug from 'debug'

const top = debug('root')
top('hi1')
top('hi2')
const middle = debug('root:middle')
middle('test1')
top('hi2')
top('hi2')
top('hi2')

middle({ a: 'test2' })
top('hi2')
