import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
import themes from './src/app/theme/asana/theme/theme.js';
import fonts from './src/app/theme/asana/utilities/fonts.js';
import indents from './src/app/theme/asana/utilities/indents.js';
import radius from './src/app/theme/asana/utilities/radius.js';
import transition from './src/app/theme/asana/utilities/transition.js';

new ThemeBuilder(
  {
    projectName: 'Ariadna UI Playground',
    destination: './src/app/assets/scss/themes/asana/',
    themeName: 'asana',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    themes: themes,
    utilities: {
      font: fonts,
      indent: indents,
      radius,
      transition,
    },
    helpers: {
      textStyle: true,
      columnOffset: true,
    },
  },
).buildAll();
