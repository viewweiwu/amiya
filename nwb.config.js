module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    cjs: true,
    umd: {
      global: 'y',
      externals: {
        react: 'React',
        'react-dom': "ReactDOM",
        antd: 'antd',
        moment: 'moment'
      }
    }
  },
  webpack: {
    config: (config) => {
      if (config.mode === 'development') {
        config.entry = './demo/src/index';
      } else {
        config.entry = './src/index';
      }
      console.log(config.output)
      return config;
    },
    extra: {
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
