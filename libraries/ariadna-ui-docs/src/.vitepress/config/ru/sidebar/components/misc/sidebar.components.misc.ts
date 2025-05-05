import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsMiscPreviewer from './previewer/sidebar.components.misc.previewer';

const sidebarComponentsMisc: DefaultTheme.SidebarItem = {
  text: 'Misc',
  collapsed: true,
  link: '/components/misc/',
  items: [sidebarComponentsMiscPreviewer],
};

export default sidebarComponentsMisc;
