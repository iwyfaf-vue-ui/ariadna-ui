import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsOverlays: DefaultTheme.SidebarItem = {
  text: 'Overlays',
  collapsed: true,
  link: '/components/overlays/',
  items: [
    {
      text: 'Dropbox',
      link: '/components/overlays/dropbox/',
    },
  ],
};

export default sidebarComponentsOverlays;
