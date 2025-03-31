import { DefaultTheme } from 'vitepress/theme';
import sidebarUtilitiesFacades from './facades/sidebar.utilities.facades';

const sidebarUtilities: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/utilities/': [sidebarUtilitiesFacades],
};

export default sidebarUtilities;
