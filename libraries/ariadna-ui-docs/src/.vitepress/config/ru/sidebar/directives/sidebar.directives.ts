import { DefaultTheme } from 'vitepress/theme';
import sidebarDirectivesAttributes from './attributes/sidebar.directives.attributes';
import sidebarDirectivesElements from './elements/sidebar.directives.elements';
import sidebarDirectivesSensors from './sensors/sidebar.directives.sensors';

const sidebarDirectives: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/directives/': [
    sidebarDirectivesAttributes,
    sidebarDirectivesElements,
    sidebarDirectivesSensors,
  ],
};

export default sidebarDirectives;
