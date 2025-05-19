import { DefaultTheme } from 'vitepress/theme';
import sidebarUtilitiesFacades from './facades/sidebar.utilities.facades';
import sidebarUtilitiesFunctionsDecorators from './functions-decorators/sidebar.utilities.functions-decorators';
import sidebarUtilitiesHelpers from './helpers/sidebar.utilities.helpers';

const sidebarUtilities: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/utilities/': [
    sidebarUtilitiesFacades,
    sidebarUtilitiesFunctionsDecorators,
    sidebarUtilitiesHelpers,
  ],
};

export default sidebarUtilities;
