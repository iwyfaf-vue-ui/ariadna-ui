import { DefaultTheme } from 'vitepress/theme';

const sidebarDirectivesAttributes: DefaultTheme.SidebarItem = {
  text: 'Attributes',
  collapsed: true,
  link: '/directives/attributes/',
  items: [
    {
      text: 'RenderAttributeOnce',
      link: '/directives/attributes/render-attribute-once/',
    },
  ],
};

export default sidebarDirectivesAttributes;
