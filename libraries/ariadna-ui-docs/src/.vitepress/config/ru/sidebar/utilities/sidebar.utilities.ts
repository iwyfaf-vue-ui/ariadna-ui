import { DefaultTheme } from 'vitepress/theme';
import sidebarUtilitiesBuilders from './builders/sidebar.utilities.builders';
import sidebarUtilitiesFacades from './facades/sidebar.utilities.facades';
import sidebarUtilitiesFunctionsDecorators from './functions-decorators/sidebar.utilities.functions-decorators';
import sidebarUtilitiesHelpers from './helpers/sidebar.utilities.helpers';

const sidebarUtilities: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/utilities/': [
    sidebarUtilitiesBuilders,
    sidebarUtilitiesFacades,
    sidebarUtilitiesFunctionsDecorators,
    sidebarUtilitiesHelpers,
  ],
};

export default sidebarUtilities;
