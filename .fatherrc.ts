export default {
  entry: 'src/index.ts',
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'amiya'
  },
  extractCSS: true,
  lessInBabelMode: true
}
