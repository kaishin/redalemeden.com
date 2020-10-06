import CMS from 'netlify-cms-app';
import PathWidget from './path-widget';

CMS.registerWidget('widegamut-path-widget', WidegamutPathWidget);
CMS.registerPreviewStyle('./style.css');
