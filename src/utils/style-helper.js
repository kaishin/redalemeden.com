import StyleConfig from './glob-css';
import 'typeface-inter';

export function StyleVar(varName, defaultValue) {
  return (
    StyleConfig.customProperties[varName] ||
    StyleConfig.customMedia[varName] ||
    StyleConfig.customSelectors[varName] ||
    defaultValue
  );
}
