/**
 * @description
 * A class that resolves and renders a pattern string by replacing placeholders with
 * provided values.
 *
 * The class takes a pattern string and a set of replacement values (selector, content, and tabs).
 * It then replaces placeholders in the pattern (e.g., `{{selector}}`, `{{content}}`, `{{tabs}}`)
 * with the corresponding values.
 */
export default class SelectorPatternResolver {
  /**
   * The pattern string containing placeholders to be replaced.
   *
   * @private
   */
  private readonly pattern: string;

  /**
   * An object containing the replacement values for the placeholders in the pattern.
   *
   * @private
   */
  private readonly replaces: any;

  /**
   * Constructs a new `SelectorPatternResolver` instance.
   *
   * @param pattern - The pattern string containing placeholders (e.g., `{{selector}}`, `{{content}}`, etc.).
   * @param selector - The value to replace the `{{selector}}` placeholder in the pattern.
   * @param content - The value to replace the `{{content}}` placeholder in the pattern.
   * @param tabs - The number of spaces to use for tab-related placeholders (`{{tab1}}`, `{{tab2}}`, `{{tab3}}`). Defaults to 0.
   */
  constructor(pattern: string, selector: string, content: string, tabs = 0) {
    this.pattern = pattern.toString();

    this.replaces = {
      selector,
      content,
      tabs,
      tab1: '',
      tab2: '',
      tab3: '',
    };
  }

  /**
   * Renders the pattern by replacing placeholders with their corresponding values.
   *
   * This method iterates over the `replaces` object and replaces each placeholder in the pattern
   * (e.g., `{{selector}}`, `{{content}}`, `{{tabs}}`, `{{tab1}}`, etc.) with the corresponding value.
   *
   * @returns The rendered string with all placeholders replaced.
   */
  render() {
    let out = this.pattern;

    Object.entries(this.replaces).forEach(([key]) => {
      if (key === 'tabs') {
        this.replaces.tab1 += this.replaces.tab1 + new Array(this.replaces[key] + 1).join(' ');
        this.replaces.tab2 += this.replaces.tab2 + new Array(this.replaces[key] + 1).join(' ');
        this.replaces.tab3 += this.replaces.tab3 + new Array(this.replaces[key] + 1).join(' ');
      }
      out = out.replace(`{{${key}}}`, this.replaces[key]);
    });

    return out;
  }
}
