import ThemeBuilder from './dist/lib/utilities/facades/ThemeBuilder/ThemeBuilder.esm.js';
import ariadna from './src/styles/themes/ariadna/theme-settings/index.js';

const themeConfigs = [ariadna];

themeConfigs.forEach((theme) => {
  new ThemeBuilder(theme.options, theme.settings).buildAll();
});
