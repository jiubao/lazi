import buble from 'rollup-plugin-buble'
import serve from 'rollup-plugin-serve'

const info = require('./package.json')
const config = {}

export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/lazi.cjs.js',
    format: 'cjs'
  }, {
    file: info.main,
    format: 'umd',
    name: 'lazi'
  }, {
    file: info.module,
    format: 'es'
  }],
  plugins: [
    buble(),
    serve()
  ]
};
