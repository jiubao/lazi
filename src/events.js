import {isString, isFunction} from './utils'

export default function eventify (obj) {
  const events = Object.create(null)
  // window.es = events

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

  // function emit (name, ...args) {
  //   const cache = events[name] && events[name].slice()
  //
  //   cache && cache.forEach(fn => {
  //     fn.apply(this, args)
  //   })
  //
  //   return this
  // }

  obj.on = on
  obj.off = off
  obj.$all = () => events
  // obj.emit = emit

  return obj

}

// var f1 = () => {console.log('f1')}
// var f2 = () => {console.log('f2')}
// var f3 = () => {console.log('f3')}
// var f4 = () => {console.log('f4')}
// var f5 = () => {console.log('f5')}
//
// var o1 = {a: 1, b:2}
// eventify(o1)
//
// o1.on('pre', f1)
// o1.on('pre', f2)
// o1.on('pre', f3)
// o1.on('pre', f4)
//
// o1.on('pre', 'data-a1', f1)
// o1.on('pre', 'data-a1', f2)
// o1.on('pre', 'data-a1', f3)
