import buble from 'rollup-plugin-buble'

const info = require('./package.json')
const config = {}

export default {
  input: 'src/lazi.js',
  // output: {
  //   file: info.main,
  //   format: 'cjs'
  // },
  targets: [{
    dest: info.main,
    format: 'umd',
    moduleName: 'lazi'
  }, {
    dest: info.module,
    format: 'es'
  }],
  plugins: [
    buble()
  ]
};
