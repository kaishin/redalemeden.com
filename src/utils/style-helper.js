import StyleConfig from './glob-css'
import 'typeface-rubik'

export function StyleVar(varName, defaultValue) {
  return StyleConfig.customProperties[varName] || StyleConfig.customMedia[varName] || StyleConfig.customSelectors[varName] || defaultValue
}
