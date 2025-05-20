import { DefaultTheme } from 'vitepress/theme';
import sidebarDirectivesSensorsOnClickOutside from './on-click-outside/sidebar.directives.sensors.on-click-outside';

const sidebarDirectivesSensors: DefaultTheme.SidebarItem = {
  text: 'Sensors',
  collapsed: true,
  link: '/directives/sensors/',
  items: [sidebarDirectivesSensorsOnClickOutside],
};

export default sidebarDirectivesSensors;
