module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'y',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    extra: {
      entry: {
        demo: ['./demo/src/index.tsx']
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
      module: {
        rules: [
          { test: /\.tsx$/, loader: 'ts-loader' },
          { test: /\.ts$/, loader: 'ts-loader' }
        ],
      }
    }
  }
}
