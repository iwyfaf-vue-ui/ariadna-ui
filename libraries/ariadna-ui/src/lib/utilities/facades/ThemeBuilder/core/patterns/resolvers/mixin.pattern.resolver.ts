/**
 * A class that resolves and renders mixin patterns by replacing placeholders with provided values.
 *
 * @class MixinPatternResolver
 * @example
 * const resolver = new MixinPatternResolver(
 *   "Hello, {{name}}! Your params are {{params}} and content is {{content}}.",
 *   "John",
 *   "param1, param2",
 *   "Some content"
 * );
 * console.log(resolver.render()); // Output: "Hello, John! Your params are param1, param2 and content is Some content."
 */
export default class MixinPatternResolver {
  /**
   * The pattern string containing placeholders to be replaced.
   *
   * @private
   * @type {string}
   */
  private readonly pattern: string;

  /**
   * An object containing the replacement values for the placeholders in the pattern.
   *
   * @private
   * @type {Object}
   * @property {string} name - The value to replace the `{{name}}` placeholder.
   * @property {string | null} params - The value to replace the `{{params}}` placeholder.
   * @property {string} content - The value to replace the `{{content}}` placeholder.
   */
  private readonly replaces: any;

  /**
   * Creates an instance of MixinPatternResolver.
   *
   * @constructor
   * @param {string} pattern - The pattern string containing placeholders.
   * @param {string} name - The value to replace the `{{name}}` placeholder.
   * @param {string | null} params - The value to replace the `{{params}}` placeholder.
   * @param {string} content - The value to replace the `{{content}}` placeholder.
   */
  constructor(pattern: string, name: string, params: string | null, content: string) {
    this.pattern = pattern.toString();

    this.replaces = {
      name,
      params,
      content,
    };
  }

  /**
   * Renders the mixin pattern by replacing placeholders with their corresponding values.
   *
   * @returns {string} The rendered string with placeholders replaced.
   * @example
   * const resolver = new MixinPatternResolver(
   *   "Hello, {{name}}! Your params are {{params}} and content is {{content}}.",
   *   "John",
   *   "param1, param2",
   *   "Some content"
   * );
   * console.log(resolver.render()); // Output: "Hello, John! Your params are param1, param2 and content is Some content."
   */
  render() {
    let out = this.pattern;

    Object.entries(this.replaces).forEach(([key]) => {
      out = out.replace(`{{${key}}}`, this.replaces[key]);
    });

    return out;
  }
}
