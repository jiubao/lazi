// todo:
//  1. unbind elements when components unmounted
//  2. throttle
//  3. requestAnimationFrame
//  4. IntersectionObserver
//  5. _

// function item (elm, options) {
//   this.elm = elm
//   this.threshold = options.threshold
// }

import {throttle, requestFrame, supportPassive} from './utils'

var elms = []
var events = 'scroll'
// var events = ['scroll', 'resize']

export default (options = {}) => {
  var defaultOptions = {
    src: 'data-lazi-src',
    threshold: 1,
    strategy: 0 // 0: IntersectionObserver 1: throttle 2: requestAnimationFrame
  }
  // var opts = {...defaultOptions, ...options}
  var opts = defaultOptions

  var count = 1
  var passive = supportPassive()
  var observer = false

  if (opts.strategy === 0 && window.IntersectionObserver) {
    var config = {
      // root: document.getElementById('articleWrap'),
      root: null,
      rootMargin: '700px 0px 700px 0px',
      threshold: 0
    }
    observer = new IntersectionObserver(load2, config)
  } else if (opts.strategy === 0) {
    opts.strategy = 1
  }

  // console.log(requestFrame)

  build()
  load()
  bind()

  return {
    build, load
  }

  function build () {
    elms = Array.prototype.slice.call(document.querySelectorAll(`[${opts.src}]`))
    if (opts.strategy === 0) {
      elms.forEach(elm => {
        observer.observe(elm)
      })
    }
    return this
  }

  function load () {
    if (opts.strategy === 0) return // load2.apply(this, arguments)
    else load1()
  }

  function load1 () {
    console.log('---', count++, '---', elms.length)

    for (var i = 0, len = elms.length; i < len; i++) {
      var elm = elms[i]
      if (inViewport(elm)) {
        // setSrc
        loadElm(elm)
        elms.splice(i--, 1)
        len--
      }
    }
    return this
  }

  function bind () {
    if (opts.strategy === 0) return
    // window.addEventListener('scroll', load, true)
    var options = passive ? {capture: true, passive: true} : true
    var fn = throttle
    if (opts.strategy === 1) fn = throttle
    else if (opts.strategy === 2) fn = requestFrame
    events.split(',').forEach(evt => window.addEventListener(evt, fn(load1, 150), options))
  }

  function load2 (entries, observer) {
    // debugger
    console.log('---', count++, '---', entries.length)
    var root = entries && entries.length ? entries[0].rootBounds : {}
    entries.forEach(entry => {
      // if (entry.intersectionRatio > 0) {
      var rect = entry.boundingClientRect
      if (entry.isIntersecting || (rect.top < root.bottom && rect.bottom > root.top && rect.left < root.right && rect.right > root.left)) {
        loadElm(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }

  function loadElm (elm) {
    elm.src = elm.getAttribute(opts.src)
    elm.removeAttribute(opts.src)
  }

  function inViewport (elm) {
    var rect = elm.getBoundingClientRect()
    return (rect.top < window.innerHeight * opts.threshold && rect.bottom > 0) &&
      (rect.left < window.innerWidth * opts.threshold && rect.right > 0)
  }

  // function add (elm) {
  //   elms.push(elm)
  // }
}
