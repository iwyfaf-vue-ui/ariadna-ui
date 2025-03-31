/**
 * @description A class responsible for resolving and rendering markdown patterns by replacing
 * placeholders with their corresponding markdown or HTML equivalents.
 */
export default class PatternMarkdownCommonResolver {
  /**
   * @description The pattern string containing placeholders to be replaced.
   *
   * @private
   */
  private readonly pattern: string;

  /**
   * @description A dictionary of placeholders and their corresponding replacements.
   *
   * @private
   */
  private readonly replaces: any;

  /**
   * @description Constructs a new instance of `PatternMarkdownCommonResolver`.
   *
   * @param {string} pattern - The pattern string containing placeholders to be replaced.
   * @param {string} content - The content to replace the `{{content}}` placeholder.
   */
  constructor(pattern: string, content: string) {
    this.pattern = pattern.toString();

    this.replaces = {
      '{{content}}': content,
      '{{h1}}': '#',
      '{{h2}}': '##',
      '{{h3}}': '###',
      '{{h4}}': '####',
      '{{h5}}': '#####',
      '{{singleCode}}': '`',
      '{{/singleCode}}': '`',
      '{{code}}': '```',
      '{{/code}}': '```',
      '{{singleCodeTable}}': '<code>',
      '{{/singleCodeTable}}': '</code>',
      '{{tableWrapper}}': '<table class="table" style="width: 100%">',
      '{{/tableWrapper}}': '</table>',
      '{{tr}}': '<tr>',
      '{{/tr}}': '</tr>',
      '{{td}}': '<td>',
      '{{/td}}': '</td>',
    };
  }

  /**
   * @description Renders the markdown pattern by replacing all placeholders with their
   * corresponding values.
   *
   * @returns {string} The rendered markdown string with all placeholders replaced.
   */
  render(): string {
    let out = this.pattern;

    Object.entries(this.replaces).forEach(([key]) => {
      out = out.replace(key, this.replaces[key]);
    });

    return out;
  }
}
