import toggleBodyClass from '~/utils/dom/body/useBody';
import {
  EUseSidebar,
  type TUseSidebarReturn,
} from '~/composables/states/useSidebar/useSidebar.types';

export default function useSidebar(): TUseSidebarReturn {
  const cookie = useCookie<boolean>(EUseSidebar.USE_SIDEBAR_COOKIE);
  const sidebarCollapsed = useState<boolean>(
    EUseSidebar.USE_SIDEBAR_STATE,
    () => cookie.value || false,
  );

  function sidebarCollapsedHandler() {
    sidebarCollapsed.value = !sidebarCollapsed.value;
    updateSidebarState();
  }

  function updateSidebarState() {
    if (sidebarCollapsed.value) {
      toggleBodyClass('add', 'sidebar-off');
      toggleBodyClass('remove', 'sidebar-on');
    } else {
      toggleBodyClass('add', 'sidebar-on');
      toggleBodyClass('remove', 'sidebar-off');
    }

    cookie.value = sidebarCollapsed.value;
  }

  updateSidebarState();

  return {
    sidebarCollapsed,
    sidebarCollapsedHandler,
  };
}
