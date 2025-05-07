import { DefaultTheme } from 'vitepress/theme';
import sidebarDirectivesElementsRenderAttributeOnce from './render-attribute-once/sidebar.directives.elements.render-attribute-once';

const sidebarDirectivesAttributes: DefaultTheme.SidebarItem = {
  text: 'Attributes',
  collapsed: true,
  link: '/directives/attributes/',
  items: [sidebarDirectivesElementsRenderAttributeOnce],
};

export default sidebarDirectivesAttributes;
