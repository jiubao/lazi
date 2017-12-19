import scroll from './scroll'
import intersect from './intersect'
import eventify from './event'

// todo:
//  1. unbind elements when components unmounted
//  2. throttle
//  3. requestAnimationFrame
//  4. IntersectionObserver
//  5. add() when not specify srcprop, reload all srcprops
//  6. _
export default (options = {}) => {
  if (!options.strategy) options.strategy = 0
  var strategy = options.strategy
  var instance = null

  if (strategy === 0 && window.IntersectionObserver) {
    instance = eventify(intersect(options))
  } else {
    if (strategy === 0) options.strategy = 1
    if (strategy === 2 && !window.requestAnimationFrame) options.strategy = 1
    instance = eventify(scroll(options))
  }
  options.pipe && Object.keys(options.pipe).forEach(key => instance.pipe(key, options.pipe[key]))
  options.loading && instance.on('loading', options.loading)
  options.done && instance.on('done', options.done)
  options.error && instance.on('error', options.error)
  return instance.add()
}
