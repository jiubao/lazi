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
<script src="https://unpkg.com/lazi/dist/lazi.js"></script>
```

## Usage
```js
import lazi from 'lazi'
lazi()
```

## API
```js
var instance = lazi()
instance.add().load()
instance.add('data-src', 3).load()
```

### `add(srcprop, threshold)`
Add new dom elements into lazy queue:
* `srcprop` Lazy src property (eg. `<img data-src="xx.png" />`)
* `threshold` How far to preload for current elements.

### `load()`
Normally, after adding new elements, a new reload need be triggered.
While if we are in intersection mode, no need to reload.
