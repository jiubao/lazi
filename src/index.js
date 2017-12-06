import scroll from './scroll'
import intersect from './intersect'

// todo:
//  1. unbind elements when components unmounted
//  2. throttle
//  3. requestAnimationFrame
//  4. IntersectionObserver
//  5. _
export default (options = {}) => {
  if (!options.strategy) options.strategy = 0
  var strategy = options.strategy

  if (strategy === 0 && window.IntersectionObserver) {
    return intersect(options)
  }

  if (strategy === 0) options.strategy = 1

  return scroll(options)
}
