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
    {
      text: 'useGesturePinchExpand',
      link: '/composables/sensors/use-gesture-pinch-expand/',
    },
  ],
};

export default sidebarComposablesSensors;
