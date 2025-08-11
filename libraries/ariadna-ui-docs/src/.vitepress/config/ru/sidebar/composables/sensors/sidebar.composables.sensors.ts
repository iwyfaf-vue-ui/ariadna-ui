import { DefaultTheme } from 'vitepress/theme';

const sidebarComposablesSensors: DefaultTheme.SidebarItem = {
  text: 'Sensors',
  collapsed: true,
  link: '/composables/sensors/',
  items: [
    {
      text: 'useFocusBlur',
      link: '/composables/sensors/use-focus-blur/',
    },
  ],
};

export default sidebarComposablesSensors;
