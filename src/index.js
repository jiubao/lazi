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

  if (strategy === 0 && window.IntersectionObserver) {
    return eventify(intersect(options))
  }

  if (strategy === 0) options.strategy = 1

  if (strategy === 2 && !window.requestAnimationFrame) options.strategy = 1

  return eventify(scroll(options))
}
