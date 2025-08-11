import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsMedia: DefaultTheme.SidebarItem = {
  text: 'Media',
  collapsed: true,
  link: '/components/media/',
  items: [
    {
      text: 'Video',
      link: '/components/media/video/',
    },
  ],
};

export default sidebarComponentsMedia;
