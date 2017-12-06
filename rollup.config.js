import buble from 'rollup-plugin-buble'

const info = require('./package.json')
const config = {}

export default {
  input: 'src/lazi.js',
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
