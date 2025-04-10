import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsButtonsButton from './button/sidebar.components.buttons.button';

const sidebarComponentsButtons: DefaultTheme.SidebarItem = {
  text: 'Buttons',
  collapsed: true,
  link: '/components/buttons/',
  items: [sidebarComponentsButtonsButton],
};

export default sidebarComponentsButtons;
