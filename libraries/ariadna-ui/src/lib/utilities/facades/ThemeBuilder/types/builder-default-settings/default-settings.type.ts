import type { TDefaultSettingsBreakpoints } from './default-settings-breakpoints.type';
import type { TDefaultSettingsGrid } from './default-settings-grid.type';
import type { TDefaultSettingsGridContainers } from './default-settings-grid-containers.type';

/**
 * Default settings.
 */
export type TDefaultSettings = TDefaultSettingsBreakpoints &
  TDefaultSettingsGrid &
  TDefaultSettingsGridContainers & {
    /**
     * Grid debug settings.
     */
    gridDebug: {};

    /**
     * Default grid CSS properties.
     */
    gridDefault: {};
  };
