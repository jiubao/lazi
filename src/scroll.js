import Lazier from './lazier'
import {throttle, requestFrame, supportPassive, loadElm, baseOptions} from './utils'

var events = 'scroll'
var items = []
// var events = ['scroll', 'resize']

export default (options = {}) => {
  var opts = baseOptions()
  opts.timeout = options.timeout ? options.timeout : 150
  opts.strategy = options.strategy ? options.strategy : 1

  var count = 1
  var passive = supportPassive()

  add()
  load()
  bind()

  return {
    add //, get () { return items }
  }

  function add (item, threshold) {
    item = item || opts.src
    Array.prototype.slice.call(document.querySelectorAll(`[${item}]`)).forEach(i => {
      items.push(new Lazier(i, item, threshold || opts.threshold))
    })
    return load()
    // return this
  }

  function load () {
    console.log('---', count++, '---', items.length)

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i]
      if (inViewport(item)) {
        // setSrc
        loadElm(item.$el, item.$src)
        items.splice(i--, 1)
        len--
      }
    }
    return this
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
