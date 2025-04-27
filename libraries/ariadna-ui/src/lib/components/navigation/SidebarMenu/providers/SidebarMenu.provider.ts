import type { InjectionKey, Ref } from 'vue';
import type { TSidebarMenuProps } from '../SidebarMenu';

export type TSidebarMenuProvider = {
  cssClass: TSidebarMenuProps['cssClass'];
  collapsed: Ref<TSidebarMenuProps['collapsed']>;
  rememberExpanded: TSidebarMenuProps['collapsed'];
};

export const SidebarMenuProviderKey: InjectionKey<TSidebarMenuProvider> =
  Symbol('SidebarMenuProvider');
