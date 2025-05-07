import { DefaultTheme } from 'vitepress/theme';
import sidebarDirectivesAttributes from './attributes/sidebar.directives.attributes';

const sidebarDirectives: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/directives/': [sidebarDirectivesAttributes],
};

export default sidebarDirectives;
