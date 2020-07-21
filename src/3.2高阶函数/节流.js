/*
* 当我们正常写onscroll时
* document.onscroll = function () {
  console.log(1, this)
} 函数作为document的方法执行，所以this指向document
* 同理当我们做节流时，也应该保持function () {
  console.log(1, this)
}的this指向document
*
* 执行throttle(function () {
  console.log(1, this)
})后
* 可以理解为document.onscroll = 返回的匿名函数
* 所以匿名函数中的this指向document
* 但是此时若我们这样直接执行fn()时，fn是作为一个单独函数执行，所以内部this指向window或者undefined（严格模式）
* 所以我们需要把this指回document
*
* 以上分析适用于其他的高阶函数修改this指向，例如div.onclick = fn
* */

function throttle(fn, interval = 500, immediate = true) {
  let timer

  return function () { //  返回的匿名函数
    const args = arguments
    const _me = this

    if (immediate) {
      fn.apply(_me, args)
      return immediate = false
    }

    if (timer) {
      return false
    }

    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      fn.apply(_me, args)
    }, interval)
  }
}

document.onscroll = throttle(function () {
  console.log(1, this)
})

