# lazi
Lazy loading images.

## Features
* passive
* IntersectionObserver

## Install
```sh
$ npm install --save lazi
```

```javascript
// using ES6 modules
import lazi from 'lazi'
```

```javascript
// using CommonJS modules
var lazi = require('lazi')
```

The [UMD](https://github.com/umdjs/umd) build is available on [unpkg](https://unpkg.com):
```html
<script src="https://unpkg.com/lazi/dist/lazi.umd.js"></script>
```

## Usage
```js
import lazi from 'lazi'
lazi()
```

## API
```js
var instance = lazi({threshold: 1, strategy: 2})
instance.add().load()
instance.add('data-src', 3).load()
```

### `strategies`
* IntersectionObserver: 0
* throttle: 1
* requestAnimationFrame: 2

### `events`
* loading
* done
* error
* pre

### `options({src, threshold, strategy, timeout})`
Reset default configs:
* `src` reset default src prop (default: `data-lazi-src`)
* `threshold` reset default threshold (default: `1`)
* `strategy` reset default strategy (default order: 0 -> 1)
* `timeout` reset throttle timeout (default: `150`)

### `add(srcprop, threshold)`
Add new dom elements into lazy queue:
* `srcprop` Lazy src property (eg. `<img data-src="xx.png" />`)
* `threshold` How far to preload for current elements.

### `load()`
Normally, after adding new elements, a new reload need be triggered.
While if we are in intersection mode, no need to reload.

### `on(event, selector, handler)`
```js
var fn = () => {}
instance.on('done', fn)
instance.on('done', 'data-a1', fn)
```

### `off(event, selector, handler)`
```js
instance.off('done')
instance.off('done', fn)
instance.off('done', 'data-a1')
instance.off('done', 'data-a1', fn)
```

### `emit(event, ...args)`
```js
instance.emit('done')
instance.emit('done.data-a1')
```

### `pipe(event, handler)`
```js
instance.pipe('pre.data-a1', fn)
instance.pipe('pre.data-a1')
```

## Todos
* support background-image
* config loadElm
* ...
