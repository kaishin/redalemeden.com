import CMS from 'netlify-cms-app';
import PathWidget from './path-widget';

CMS.registerWidget('path-widget', PathWidget);
CMS.registerPreviewStyle('./style.css');
