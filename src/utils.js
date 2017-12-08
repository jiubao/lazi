import {attrs} from './constants'

export function requestFrame (fn) {
  var ticking = false

  return function () {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        fn()
        ticking = false
      })
      ticking = true
    }
  }
}

export function throttle (action, delay) {
  var ticking = null
  var lastRun = 0
  return function () {
    if (ticking) return
    var during = Date.now() - lastRun
    var context = this
    var args = arguments
    var runCallback = function () {
      lastRun = Date.now()
      action.apply(context, args)
      ticking = false
    }
    if (during >= delay) {
      runCallback()
    } else {
      ticking = setTimeout(runCallback, delay)
    }
  }
}

export function supportPassive () {
  var passive = false

  function noop () {}

  const options = Object.defineProperty({}, 'passive', {
    get () { passive = true }
  })

  // https://github.com/rafrex/detect-passive-events
  window.addEventListener('testPassive', noop, options)
  window.removeEventListener('testPassive', noop, options)
  return passive
}

export function loadElm (elm, src) {
  elm.setAttribute(attrs.loading, '')

  var img = new Image()
  img.onload = function () {
    elm.setAttribute(attrs.done, '')
    elm.removeAttribute(attrs.loading)
  }
  img.onerror = function () {
    elm.setAttribute(attrs.error, '')
    elm.removeAttribute(attrs.loading)
  }

  img.src = elm.src = elm.getAttribute(src)
  elm.removeAttribute(src)
}

export function loadImg () {
  var img = new Image()
  img.onload = function () {
    if (mode) oimg.src = src
    isFunction(fn) && fn()
  }
  img.src = src
}

export function baseOptions (options = {}) {
  var opts = {
    src: attrs.src,
    threshold: 1
  }
  opts.src = options.src ? options.src : opts.src
  opts.threshold = options.threshold ? options.threshold : opts.threshold
  return opts
}

export function isString (value) {
  return typeof value === 'string'
}

export function isElement(node) {
  return !!(node && node.nodeName)
}
