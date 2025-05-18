import { DefaultTheme } from 'vitepress/theme';
import sidebarDirectivesElementsPhoneMask from './phone-mask/sidebar.directives.elements.phone-mask';

const sidebarDirectivesElements: DefaultTheme.SidebarItem = {
  text: 'Elements',
  collapsed: true,
  link: '/directives/elements/',
  items: [sidebarDirectivesElementsPhoneMask],
};

export default sidebarDirectivesElements;
