import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsControlsInputText from './input-text/sidebar.components.controls.input-text';

const sidebarComponentsControls: DefaultTheme.SidebarItem = {
  text: 'Controls',
  collapsed: true,
  link: '/components/controls/',
  items: [sidebarComponentsControlsInputText],
};

export default sidebarComponentsControls;
