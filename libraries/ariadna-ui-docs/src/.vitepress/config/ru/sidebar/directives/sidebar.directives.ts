import { DefaultTheme } from 'vitepress/theme';
import sidebarDirectivesAttributes from './attributes/sidebar.directives.attributes';
import sidebarDirectivesElements from './elements/sidebar.directives.elements';

const sidebarDirectives: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/directives/': [sidebarDirectivesAttributes, sidebarDirectivesElements],
};

export default sidebarDirectives;
