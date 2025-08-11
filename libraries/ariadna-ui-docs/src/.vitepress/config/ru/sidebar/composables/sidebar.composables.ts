import { DefaultTheme } from 'vitepress/theme';
import sidebarComposablesElements from './elements/sidebar.composables.elements';
import sidebarComposablesReactivity from './reactivity/sidebar.composables.reactivity';
import sidebarComposablesSensors from './sensors/sidebar.composables.sensors';

const sidebarComposables: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/composables/': [
    sidebarComposablesElements,
    sidebarComposablesReactivity,
    sidebarComposablesSensors,
  ],
};

export default sidebarComposables;
