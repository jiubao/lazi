import buble from 'rollup-plugin-buble'

const info = require('./package.json')
const config = {}

export default {
  input: 'src/index.js',
  output: [{
    file: info.browser,
    format: 'umd',
    name: 'lazi'
  }, {
    file: info.main,
    format: 'cjs'
  }, {
    file: info.module,
    format: 'es'
  }],
  plugins: [
    buble()
  ]
};
