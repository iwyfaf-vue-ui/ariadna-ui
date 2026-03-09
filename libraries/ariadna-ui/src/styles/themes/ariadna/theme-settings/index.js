import options from './options/options.js';
import breakPoints from './break-points/break-points.js';
import gridSettings from './grid-settings/grid-settings.js';
import themes from './theme/theme.js';
import fonts from './utilities/fonts.js';
import indents from './utilities/indents.js';
import radius from './utilities/radius.js';
import transition from './utilities/transition.js';
import boxShadow from './utilities/box-shadow.js';

const ariadna = {
  options: options,
  settings: {
    breakPoints: breakPoints,
    gridSettings: gridSettings,
    themes: themes,
    utilities: {
      font: fonts,
      indent: indents,
      radius,
      transition,
      'box-shadow': boxShadow,
    },
    helpers: {
      textStyle: true,
      columnOffset: true,
    },
  },
};

export default ariadna;
