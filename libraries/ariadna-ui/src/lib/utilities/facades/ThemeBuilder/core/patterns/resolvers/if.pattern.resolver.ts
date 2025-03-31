/**
 * @description A class that resolves patterns by replacing placeholders with provided values.
 *
 * The class takes a pattern string and a set of replacements (name and content). It then replaces
 * placeholders in the pattern (e.g., `{{name}}`, `{{content}}`) with the corresponding values.
 */
export default class IfPatternResolver {
  /**
   * @description The pattern string containing placeholders to be replaced.
   * @private
   */
  private readonly pattern: string;

  /**
   * @description An object containing the replacement values for the placeholders in the pattern.
   * @private
   */
  private readonly replaces: any;

  /**
   * @description Constructs an instance of `IfPatternResolver`.
   *
   * @param pattern - The pattern string containing placeholders (e.g., `{{name}}`, `{{content}}`).
   * @param name - The value to replace the `{{name}}` placeholder in the pattern.
   * @param content - The value to replace the `{{content}}` placeholder in the pattern.
   */
  constructor(pattern: string, name: string, content: string) {
    this.pattern = pattern.toString();

    this.replaces = {
      name,
      content,
    };
  }

  /**
   * @description Renders the pattern by replacing placeholders with their corresponding values.
   *
   * @returns The resolved string with all placeholders replaced by their values.
   */
  render(): string {
    let out = this.pattern;

    Object.entries(this.replaces).forEach(([key]) => {
      out = out.replace(`{{${key}}}`, this.replaces[key]);
    });

    return out;
  }
}
