import CMS from 'netlify-cms-app';
import WidegamutPathWidget from './widegamut-path-widget';

CMS.registerWidget('widegamut-path-widget', WidegamutPathWidget);
CMS.registerPreviewStyle('./style.css');
