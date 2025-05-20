import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsMisc: DefaultTheme.SidebarItem = {
  text: 'Misc',
  collapsed: true,
  link: '/components/misc/',
  items: [
    {
      text: 'Previewer',
      link: '/components/misc/previewer/',
    },
  ],
};

export default sidebarComponentsMisc;
