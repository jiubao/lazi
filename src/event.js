import {isString, isFunction} from './utils'

export default function eventify (obj) {
  const events = Object.create(null)
  const pipes = Object.create(null)

  function pipe (name, handler) {
    if (!name) return
    if (isFunction(handler)) {
      pipes[name] = handler
      return this
    }

    var args = Array.prototype.slice.apply(arguments).slice(1)
    if (!pipes[name]) return args[0] || ''
    return pipes[name].apply(null, args)
  }

  function on (name, selector, handler) {
    events[name] = events[name] || []
    if (isFunction(selector)) {
      events[name].push(selector)
    } else if (isString(selector) && isFunction(handler)) {
      events[name][selector] = events[name][selector] || []
      events[name][selector].push(handler)
    }
    return this
  }

  function off (name, selector, handler) {
    var tevt = events[name] // type events
    var sevt = tevt[selector] // selector events
    if (!selector) tevt.splice(0)
    else if (isFunction(selector) && tevt.indexOf(selector) >= 0) tevt.splice(tevt.indexOf(selector), 1)
    else if (isString(selector)) handler ? (sevt.indexOf(handler) >= 0 && sevt.splice(sevt.indexOf(handler), 1)) : sevt.splice(0)
    return this
  }

  function emit (name) {
    var selector = ''
    if (name.indexOf('.') >= 0) {
      var names = name.split('.')
      name = names[0]
      selector = names[1]
    }

    var cache = []
    var callbacks = events[name]

    if (selector) {
      cache = callbacks && callbacks[selector] || cache
    } else {
      callbacks && Object.keys(callbacks).forEach(key => {
        cache = cache.concat(callbacks[key])
      })
    }

    cache.forEach(fn => {
      fn.apply(this, Array.prototype.slice.apply(arguments).slice(1))
    })

    return this
  }

  obj.on = on
  obj.off = off
  obj.$all = () => events
  obj.emit = emit
  obj.pipe = pipe

  return obj
}
