import { DefaultTheme } from 'vitepress/theme';
import sidebarComponentsButtons from './buttons/sidebar.components.buttons';
import sidebarComponentsControls from './controls/sidebar.components.controls';
import sidebarComponentsData from './data/sidebar.components.data';
import sidebarComponentsIndicators from './indicators/sidebar.components.indicators';
import sidebarComponentsNavigation from './navigation/sidebar.components.navigation';
import sidebarComponentsPanels from './panels/sidebar.components.panels';
import sidebarComponentsOverlays from './overlays/sidebar.components.overlays';
import sidebarComponentsMedia from './media/sidebar.components.media';
import sidebarComponentsMisc from './misc/sidebar.components.misc';

const sidebarComponents: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/components/': [
    sidebarComponentsIndicators,
    sidebarComponentsButtons,
    sidebarComponentsControls,
    sidebarComponentsData,
    sidebarComponentsNavigation,
    sidebarComponentsPanels,
    sidebarComponentsOverlays,
    sidebarComponentsMedia,
    sidebarComponentsMisc,
  ],
};

export default sidebarComponents;
