const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const postcssNormalize = require('postcss-normalize');
const postcssExtend = require('postcss-extend');
const postcssColorMod = require('postcss-color-mod-function');

const from = './src/css/helpers/_glob.css';
const to = './src/utils/glob-css.js';

module.exports = () => ({
  plugins: [
    postcssNormalize(),
    postcssImport(),
    postcssPresetEnv({
      stage: 0,
      importFrom: [ from ],
      exportTo: [ to ],
      insertAfter: {
        'nesting-rules': postcssExtend
      }
    }),
    postcssColorMod()
  ]
});
