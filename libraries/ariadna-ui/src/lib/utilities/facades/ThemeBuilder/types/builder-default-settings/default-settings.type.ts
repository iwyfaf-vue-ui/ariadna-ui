import type { TDefaultSettingsBreakpoints } from './default-settings-breakpoints.type';
import type { TDefaultSettingsGrid } from './default-settings-grid.type';
import type { TDefaultSettingsGridContainers } from './default-settings-grid-containers.type';

/**
 * @description Default settings.
 *
 */
export type TDefaultSettings = TDefaultSettingsBreakpoints &
  TDefaultSettingsGrid &
  TDefaultSettingsGridContainers & {
    /**
     * @description Grid debug settings.
     */
    gridDebug: {};

    /**
     * @description Default grid CSS properties.
     */
    gridDefault: {};
  };
