import {loadElm, baseOptions, initElm, isFunction} from './utils'
import {srcs} from './constants'

export default (options = {}) => {
  var observers = {}
  var opts = baseOptions(options)

  var count = 1

  add(opts.src, opts.threshold)

  var result = {
    add
  }

  return result

  function add (srcprop, threshold) {
    if (srcprop) addOne(srcprop, threshold)
    else {
      Object.keys(srcs).forEach(src => {
        addOne(src, srcs[src].threshold)
      })
    }
    return this
  }

  function addOne (srcprop, threshold) {
    srcs[srcprop] = { threshold }
    // if (!srcprop) srcprop = opts.src
    // selector = selector || opts.src
    if (!observers[srcprop]) observers[srcprop] = observe(load(srcprop), threshold)
    // var observer = observers[srcprop] || observe(load(srcprop), threshold)
    var observer = observers[srcprop]
    var elms = Array.prototype.slice.call(document.querySelectorAll(`[${srcprop}]`))
    elms.forEach(elm => {
      initElm(elm)
      observer.observe(elm)
    })
    return this
  }

  function load (src) {
    return function (entries, observer) {
      console.log('---', count++, '---', entries.length)
      var root = entries && entries.length ? entries[0].rootBounds : {}
      entries.forEach(entry => {
        // if (entry.intersectionRatio > 0) {
        var rect = entry.boundingClientRect
        if (entry.isIntersecting || (rect.top < root.bottom && rect.bottom > root.top && rect.left < root.right && rect.right > root.left)) {
          loadElm(entry.target, src, result)
          observer.unobserve(entry.target)
        }
      })
    }
  }

  function observe (fn, threshold) {
    threshold = threshold || opts.threshold
    var height = window.innerHeight * (threshold - 1)
    var width = window.innerWidth * (threshold - 1)
    var config = {
      // root: document.getElementById('articleWrap'),
      root: null,
      rootMargin: `${height}px ${width}px ${height}px ${width}px`,
      threshold: 0
    }
    return new IntersectionObserver(fn, config)
  }

}
