const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssNormalize = require('postcss-normalize')

const from = "./src/css/variables/glob.css";
const to = "./src/utils/glob-css.js";

module.exports = () => ({
  plugins: [
    postcssNormalize(),
    postcssImport(),
    postcssPresetEnv({
      stage: 0,
      importFrom: [from], 
      exportTo: [to]
    })
  ],
})
