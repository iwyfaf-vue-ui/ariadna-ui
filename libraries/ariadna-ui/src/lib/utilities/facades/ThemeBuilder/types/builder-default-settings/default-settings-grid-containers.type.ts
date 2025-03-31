export type TDefaultSettingsGridContainers = {
  /**
   * @description Grid containers default settings.
   *
   * @example
   * ```typescript
   * gridContainer: {
   *   container: {
   *     include: '@include grid-container-fluid()',
   *
   *     'max-width': 'var(--container)',
   *     margin: '0 auto',
   *
   *     extend: '@extend %grid-debug !optional',
   *   },
   *   fluid: {
   *     position: 'relative',
   *     width: '100%',
   *     'max-width': '100%',
   *     'padding-left': 'var(--fields)',
   *     'padding-right': 'var(--fields)',
   *
   *     extend: '@extend %grid-debug !optional',
   *   },
   * },
   * ```
   *
   * @default
   * ```
   * gridContainer: {
   *   container: {
   *     include: '@include grid-container-fluid()',
   *
   *     'max-width': 'var(--container)',
   *     margin: '0 auto',
   *
   *     extend: '@extend %grid-debug !optional',
   *   },
   *   fluid: {
   *     position: 'relative',
   *     width: '100%',
   *     'max-width': '100%',
   *     'padding-left': 'var(--fields)',
   *     'padding-right': 'var(--fields)',
   *
   *     extend: '@extend %grid-debug !optional',
   *   },
   * },
   * ```
   */
  gridContainer: {
    /**
     * @description Grid container options.
     *
     * @example
     * ```typescript
     * gridContainer: {
     *   container: {
     *     include: '@include grid-container-fluid()',
     *
     *     'max-width': 'var(--container)',
     *     margin: '0 auto',
     *
     *     extend: '@extend %grid-debug !optional',
     *   },
     * },
     * ```
     */
    container: {};

    /**
     * @description Grid container options.
     *
     * @example
     * ```typescript
     * gridContainer: {
     *   fluid: {
     *     position: 'relative',
     *     width: '100%',
     *     'max-width': '100%',
     *     'padding-left': 'var(--fields)',
     *     'padding-right': 'var(--fields)',
     *
     *     extend: '@extend %grid-debug !optional',
     *   },
     * },
     * ```
     */
    fluid: {};
  };
};
