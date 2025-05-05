/**
 * @description
 * A class that resolves and wraps CSS styles based on media query conditions.
 * It allows for dynamic generation of media queries for responsive design.
 */
export default class MediaPatternResolver {
  /**
   * The breakpoint for the media query (e.g., '768px'). If `null`, no media query will be
   * applied.
   *
   * @private
   */
  private readonly breakPoint: string | null;

  /**
   * The condition for the media query (e.g., 'min-width' or 'max-width').
   *
   * @private
   * @default 'min-width'
   */
  private readonly condition: string;

  /**
   * The device type for the media query (e.g., 'screen', 'print').
   *
   * @private
   * @default 'screen'.
   */
  private readonly device: string;

  /**
   * Constructs a new instance of `MediaPatternResolver`.
   *
   * @param breakPoint - The breakpoint for the media query. Defaults to an empty string.
   * @param condition - The condition for the media query. Defaults to 'min-width'.
   * @param device - The device type for the media query. Defaults to 'screen'.
   */
  constructor(breakPoint = '', condition = 'min-width', device = 'screen') {
    this.breakPoint = breakPoint || null;
    this.condition = condition;
    this.device = device;
  }

  /**
   * Wraps the provided CSS styles with a media query based on the configured breakpoint, condition, and device. If no
   * breakpoint is provided, the styles are returned as-is.
   *
   * @param styles - The CSS styles to wrap with a media query.
   * @returns The wrapped CSS styles as a string.
   */
  wrap(styles: any) {
    let start = '';
    let end = '';

    if (this.breakPoint === null) {
      // Remove trailing newline if present
      if (styles.lastIndexOf('\n') === styles.length - 1) {
        styles = styles.substring(0, styles.length - 1);
      }
    } else {
      // Construct the media query
      start = `@media ${this.device} and (${this.condition}: ${this.breakPoint}){{brace}}\n`;
      end = '{{/brace}}';
    }

    // Split styles into lines and process them
    const tmp = styles.split('\n');

    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i].length > 0) {
        tmp[i] = tmp[i];
      }
    }

    // Combine the media query and styles
    start += tmp.join('\n');
    start += end;

    return start;
  }
}
