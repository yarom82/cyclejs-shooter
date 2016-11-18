const mock = require('mock-require')
const { spy: spyOn } = require('simple-spy')
const path = require('path')
const R = require('ramda')

const mockPathWithSpyThatReturnsSymbol = (originalDirname, originalRelativePath) => {
  const returnSymbol = Symbol(originalRelativePath)
  const stub = () => returnSymbol
  const absolutePath = path.resolve(originalDirname, originalRelativePath)
  const relativePath = path.relative(__dirname, absolutePath)
  const arity = require(relativePath).length
  Object.defineProperty(stub, 'length', { value: arity })
  const spy = spyOn(stub)
  mock(relativePath, spy) // impure
  return { returnSymbol, spy }
}

module.exports = R.curry(mockPathWithSpyThatReturnsSymbol)
