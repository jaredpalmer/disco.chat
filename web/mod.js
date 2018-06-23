const fs = require('fs');
const path = require('path');

const paths = {
  webpackDev: path.resolve(
    `./node_modules/react-scripts/config/webpack.config.dev.js`
  ),
  webpackProd: path.resolve(
    `./node_modules/react-scripts/config/webpack.config.prod.js`
  ),
};

function patchFile(file, fn) {
  const config = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, fn(config), 'utf8');
}

function modifyWebpackAlias(webpackConfig) {
  if (!webpackConfig.includes('alias: {common')) {
    webpackConfig = webpackConfig.replace(
      `'react-native': 'react-native-web',`,
      `'react-native': 'react-native-web', 'react': 'preact-compat',  'react-dom': 'preact-compat', 'create-react-class': 'preact-compat/lib/create-react-class',`
    );
  }
  return webpackConfig;
}

patchFile(paths.webpackDev, modifyWebpackAlias);
patchFile(paths.webpackProd, modifyWebpackAlias);
