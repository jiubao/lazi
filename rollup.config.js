import buble from 'rollup-plugin-buble'

const info = require('./package.json')
const config = {}

export default {
  input: 'src/scroll.js',
  output: [{
    file: info.main,
    format: 'umd',
    name: 'lazi'
  }, {
    file: info.module,
    format: 'es'
  }],
  plugins: [
    buble()
  ]
};
