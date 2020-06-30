// 学习 Function.prototype.call
// 举个栗子

function say () {
  console.log('hello world')
}

say.call()
Function.prototype.call(say)
Function.prototype.call.call(say)

// 伪代码
Function.prototype.call = function(thisArg, arg1, arg2) {
  /*** 注意：this指向调用call的那个对象或函数 ***/
  // 1. 调用内部的IsCallable(this)检查this是否可调用，返回false则抛TypeError
  if (![[IsCallable]](this)) throw new TypeError()

  // 2. 创建一个空列表
  // 3. 将arg1及后面的入参保存到argList中
  var argList = [].slice.call(arguments, 1)

  // 4. 调用内部的[[Call]]函数去（[[call]]内部就是去执行this）,第一个参数是要执行的函数，第二个参数是函数执行时的内部this指向，第三个参数是函数的参数
  return [[Call]](this, thisArg, argList)
}

// 所以say.call
say.call = function () {
  if (![[IsCallable]](this)) throw new TypeError()

  // 2. 创建一个空列表
  // 3. 将arg1及后面的入参保存到argList中
  var argList = [].slice.call(arguments, 1)

  // 4. 调用内部的[[Call]]函数,this指向say
  return [[Call]](this, thisArg, argList)
}

// Function.prototype.call(say)
Function.prototype.call = function(thisArg, arg1, arg2) {
  /*** 注意：this指向调用call的那个对象或函数 ***/
  // 1. 调用内部的IsCallable(this)检查this是否可调用，返回false则抛TypeError
  // /*** 所以这里this指向Function.prototype， Function.prototype是一个function Empty(){}函数  ***/
  if (![[IsCallable]](this)) throw new TypeError()

  // 2. 创建一个空列表
  // 3. 将arg1及后面的入参保存到argList中
  var argList = [].slice.call(arguments, 1)

  // this指向Function.prototype，Function.prototype是一个function Empty(){}函数,所以执行this时返回undefined
  return [[Call]](this, thisArg, argList)
}

// Function.prototype.call.call
// test作为thisArg传入
Function.prototype.call.call = function(say, arg1, arg2) {
  if ([[IsCallable]](Function.prototype.call)) throw new TypeError()

  var argList = [].slice.call(arguments, 1)
  return [[Call]](Function.prototype.call, say, argList)
}

// test作为函数的this值
// 注意：入参thisArg的值为Function.prototype.call.call的入参arg1
Function.prototype.call = function(thisArg, arg1, arg2) {
  if ([[IsCallable]](say)) throw new TypeError()

  var argList = [].slice.call(arguments, 1)
  return [[Call]](say, thisArg, argList)
}
