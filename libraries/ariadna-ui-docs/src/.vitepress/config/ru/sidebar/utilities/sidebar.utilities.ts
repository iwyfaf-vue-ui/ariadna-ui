import { DefaultTheme } from 'vitepress/theme';
import sidebarUtilitiesNumber from './number/sidebar.utilities.number';
import sidebarUtilitiesBuilders from './builders/sidebar.utilities.builders';
import sidebarUtilitiesFacades from './facades/sidebar.utilities.facades';
import sidebarUtilitiesFunctionsDecorators from './functions-decorators/sidebar.utilities.functions-decorators';
import sidebarUtilitiesHelpers from './helpers/sidebar.utilities.helpers';

const sidebarUtilities: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/utilities/': [
    sidebarUtilitiesNumber,
    sidebarUtilitiesBuilders,
    sidebarUtilitiesFacades,
    sidebarUtilitiesFunctionsDecorators,
    sidebarUtilitiesHelpers,
  ],
};

export default sidebarUtilities;
