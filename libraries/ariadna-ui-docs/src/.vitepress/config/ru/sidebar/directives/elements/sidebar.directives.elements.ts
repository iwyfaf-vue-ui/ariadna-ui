import { DefaultTheme } from 'vitepress/theme';

const sidebarDirectivesElements: DefaultTheme.SidebarItem = {
  text: 'Elements',
  collapsed: true,
  link: '/directives/elements/',
  items: [
    {
      text: 'PhoneMask',
      link: '/directives/elements/phone-mask/',
    },
    {
      text: 'TextareaAutoHeight',
      link: '/directives/elements/textarea-auto-height/',
    },
  ],
};

export default sidebarDirectivesElements;
