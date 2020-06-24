// currying
function currying(a) {
  return function (b) {
    return a + b
  }
}
console.log(currying(1)(2))

function currying2(a) {
  var sum = a

  var _inner = function (b) {
    sum += b
    return arguments.callee
  }

  _inner.toString = function () {
    return sum
  }

  return _inner
}

console.log(currying2(2)(3)(4)(5))
