import Lazier from './lazier'
import {throttle, requestFrame, supportPassive, loadElm, baseOptions, initElm, isFunction} from './utils'
import {srcs} from './constants'

var events = 'scroll'
// var events = ['scroll', 'resize']

export default (options = {}) => {
  var items = []
  var opts = baseOptions(options)
  opts.timeout = options.timeout ? options.timeout : 150
  opts.strategy = options.strategy ? options.strategy : 1

  var count = 1
  var passive = supportPassive()

  add(opts.src, opts.threshold)
  load()
  bind()

  var result = {
    add //, get () { return items }
  }

  return result

  function add (item, threshold) {
    if (item) addOne(item, threshold)
    else {
      Object.keys(srcs).forEach(src => {
        addOne(src, srcs[src].threshold)
      })
    }
    load()
    return this
  }

  function addOne (item, threshold) {
    srcs[item] = { threshold }
    Array.prototype.slice.call(document.querySelectorAll(`[${item}]`)).forEach(elm => {
      initElm(elm)
      items.push(new Lazier(elm, item, threshold || opts.threshold))
    })
  }

  function load () {
    console.log('---', count++, '---', items.length)

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i]
      if (inViewport(item)) {
        // setSrc
        loadElm(item.$el, item.$src, result)
        items.splice(i--, 1)
        len--
      }
    }
  }

  function bind () {
    var options = passive ? {capture: true, passive: true} : true
    var fn = throttle
    if (opts.strategy === 1) fn = throttle
    else if (opts.strategy === 2) fn = requestFrame
    events.split(',').forEach(evt => window.addEventListener(evt, fn(load, opts.timeout), options))
  }

  function inViewport (item) {
    var rect = item.$el.getBoundingClientRect()
    return (rect.top < window.innerHeight * item.$threshold && rect.bottom > 0) &&
      (rect.left < window.innerWidth * item.$threshold && rect.right > 0)
  }
}
