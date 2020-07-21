/*
* 惰性函数，不使用不执行，使用的时候，第一次做初始化动作
* 1. 覆盖原来的函数
* 2. 执行函数并返回结果
* */

let addEvent = function (elm, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elm, type, handler) {
      elm.addEventListener(type, handler, false)
    }
  } else if (window.attachEvent) {
    addEvent = function (elm, type, handler) {
      elm.attachEvent('on' + type, handler)
    }
  }
  addEvent(elm, type, handler)
}
