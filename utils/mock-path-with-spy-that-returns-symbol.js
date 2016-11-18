const mock = require('mock-require')
const { spy: spyOn } = require('simple-spy')
const path = require('path')
const R = require('ramda')

const mockPathWithSpyThatReturnsSymbol = (originalDirname, originalRelativePath, arity = 0) => {
  const symbol = Symbol(originalRelativePath)
  const stub = () => symbol
  Object.defineProperty(stub, 'length', { value: arity })
  const spy = spyOn(stub)
  const absolutePath = path.resolve(originalDirname, originalRelativePath)
  const relativePath = path.relative(__dirname, absolutePath)
  mock(relativePath, spy) // impure
  return { symbol, spy }
}

module.exports = R.curry(mockPathWithSpyThatReturnsSymbol)
