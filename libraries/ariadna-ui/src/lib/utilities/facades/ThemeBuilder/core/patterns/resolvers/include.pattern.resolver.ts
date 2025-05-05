/**
 * @description
 * A class that resolves patterns by replacing placeholders with provided values.
 *
 * The class takes a pattern string and an object containing replacement values. It then replaces
 * placeholders in the pattern (e.g., `{{name}}`, `{{content}}`) with the corresponding values from
 * the replacement object.
 */
export default class IncludePatternResolver {
  /**
   * The pattern string containing placeholders to be replaced.
   *
   * @private
   */
  private readonly pattern: string;

  /**
   * An object containing the replacement values for the placeholders.
   *
   * @private
   */
  private readonly replaces: any;

  /**
   * Constructs an instance of `IncludePatternResolver`.
   *
   * @param pattern - The pattern string containing placeholders (e.g., `{{name}}`, `{{content}}`).
   * @param name - The value to replace the `{{name}}` placeholder in the pattern.
   * @param content - (Optional) The value to replace the `{{content}}` placeholder in the pattern.
   */
  constructor(pattern: string, name: any, content?: string) {
    this.pattern = pattern.toString();

    this.replaces = {
      name,
      content,
    };
  }

  /**
   * Renders the pattern by replacing placeholders with their corresponding values.
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
