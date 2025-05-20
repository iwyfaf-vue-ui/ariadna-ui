import { DefaultTheme } from 'vitepress/theme';

const sidebarDirectivesSensors: DefaultTheme.SidebarItem = {
  text: 'Sensors',
  collapsed: true,
  link: '/directives/sensors/',
  items: [
    {
      text: 'OnClickOutside',
      link: '/directives/sensors/on-click-outside/',
    },
  ],
};

export default sidebarDirectivesSensors;
