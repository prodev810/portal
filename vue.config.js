const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolveSrc(_path) {
  return path.join(__dirname, _path)
}

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'src': resolveSrc('src')
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: resolveSrc(`/environments/keycloak/${process.env.NODE_ENV}/keycloak.json`),
        to: resolveSrc('dist/static/keycloak.json'),
        force: true
      }], {
        debug: 'warning'
      })
    ]
  }
};
