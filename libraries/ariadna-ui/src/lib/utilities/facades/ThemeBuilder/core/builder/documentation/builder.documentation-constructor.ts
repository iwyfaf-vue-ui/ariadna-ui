import { BuilderConstructor } from '../builder-constructor';
import type { TBuilderOptions } from '../../../types/builder-options/builder-options.type';
import type { TCustomSettings } from '../../../types/builder-custom-settings/custom-settings.type';
import type { TDefaultSettings } from '../../../types/builder-default-settings/default-settings.type';
import PatternMarkdownCommonResolver from '../../patterns/markdown/resolvers/pattern.markdown.common.resolver';
import { PatternMarkdownHeader } from '../../patterns/markdown/pattern.markdown.h';
import { PatternMarkdownP } from '../../patterns/markdown/pattern.markdown.p';
import { PatternMarkdownCode } from '../../patterns/markdown/pattern.markdown.code';
import { PatternMarkdownCodeTag } from '../../patterns/markdown/pattern.markdown.codeTag';
import { PatternMarkdownTableCell } from '../../patterns/markdown/pattern.markdown.tableCell';
import { PatternMarkdownTableRow } from '../../patterns/markdown/pattern.markdown.tableRow';
import { PatternMarkdownTableWrapper } from '../../patterns/markdown/pattern.markdown.tableWrapper';
import capitalizeHelper from '../../../../../../../shared/helpers/string/capitalize.helper';

/**
 * @description The `BuilderDocumentationConstructor` class is responsible for generating
 * documentation for a UI-Kit project. It extends the `BuilderConstructor` class and provides
 * methods to build various sections of the documentation, such as headers, breakpoints, grids,
 * themes, and utilities. The documentation is generated in Markdown format.
 *
 * @example
 * const builder = new BuilderDocumentationConstructor(customSettings, defaultSettings, options);
 * const h1Section = builder.documentationBuildH1();
 * const breakpointsSection = builder.documentationBuildBreakpoints();
 */
export default class BuilderDocumentationConstructor extends BuilderConstructor {
  private readonly options: TBuilderOptions;

  /**
   * @description Constructs a new instance of BuilderDocumentationConstructor.
   *
   * @param customSettings - Custom settings for the builder.
   * @param defaultSettings - Default settings for the builder.
   * @param options - Additional options for the builder.
   */
  constructor(
    customSettings: TCustomSettings,
    defaultSettings: TDefaultSettings,
    options: TBuilderOptions,
  ) {
    super(customSettings, defaultSettings);

    this.options = options;
  }

  /**
   * @description Builds the H1 section of the documentation.
   *
   * @returns A string containing the H1 section in Markdown format.
   */
  documentationBuildH1() {
    let result = '';
    let tmp: any;

    const h1 = new PatternMarkdownCommonResolver(
      PatternMarkdownHeader(1),
      this.options.projectName,
    );
    result += h1.render();

    tmp = `Документация UI-Kit для проекта ${this.options.projectName}.`;
    tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
    result += tmp.render();
    result += '\n';

    return result;
  }

  /**
   * @description Builds the breakpoints section of the documentation.
   *
   * @returns A string containing the breakpoints section in Markdown format.
   */
  documentationBuildBreakpoints() {
    let result = '';
    let tmp: any;
    let processingTable = '';

    tmp = 'Breakpoints';
    const h2 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(2), tmp);
    result += h2.render();

    tmp = `В проекте доступно ${this.buildBreakPoints().length} миксинов для медиа-запросов:`;
    tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
    result += tmp.render();
    result += '\n';

    tmp = new PatternMarkdownCommonResolver(
      PatternMarkdownCode(),
      JSON.stringify(this.themeSettings().breakPoints, null, 2),
    );
    result += tmp.render();
    result += '\n';

    tmp = 'Применение медиа-запросов:';
    tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
    result += tmp.render();
    result += '\n';

    const breakpoints = this.themeSettings().breakPoints;

    for (const point in breakpoints) {
      tmp = '';
      let td1: any = '';
      td1 = `@include ${point};`;
      td1 = new PatternMarkdownCommonResolver(PatternMarkdownCodeTag(), td1);
      td1 = td1.render();
      td1 = new PatternMarkdownCommonResolver(PatternMarkdownTableCell(), td1);
      tmp += td1.render();
      tmp += '\n';

      let td2: any = '';
      td2 = `@media (min-width: ${breakpoints[point as keyof typeof breakpoints]?.width}) { ... }`;
      td2 = new PatternMarkdownCommonResolver(PatternMarkdownCodeTag(), td2);
      td2 = td2.render();
      td2 = new PatternMarkdownCommonResolver(PatternMarkdownTableCell(), td2);
      tmp += td2.render();

      const table = new PatternMarkdownCommonResolver(PatternMarkdownTableRow(), tmp);
      processingTable += table.render();
      processingTable += '\n';
    }

    const table = new PatternMarkdownCommonResolver(PatternMarkdownTableWrapper(), processingTable);
    result += table.render();
    result += '\n';

    return result;
  }

  /**
   * @description Builds the grid section of the documentation.
   *
   * @returns A string containing the grid section in Markdown format.
   */
  documentationBuildGrid() {
    let result = '';
    let tmp: any;

    const h1 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(2), 'Grid');
    result += h1.render();
    result += '\n';

    tmp = '@include grid(parameters);';
    tmp = new PatternMarkdownCommonResolver(PatternMarkdownCode(), tmp);
    result += tmp.render();
    result += '\n';
    tmp = '';

    tmp = 'Parameters:';
    tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
    result += tmp.render();
    tmp = '';

    const breakpoints = this.buildBreakPoints();
    for (const point in breakpoints) {
      const value = breakpoints[point as keyof typeof breakpoints];
      tmp += `* \`$columns-${value}\` - количество колонок на медиа-запросе \`${value}\`.`;
      tmp += '\n';
    }

    tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
    result += tmp.render();

    return result;
  }

  /**
   * @description Builds the themes section of the documentation.
   *
   * @returns A string containing the themes section in Markdown format.
   */
  documentationBuildThemes() {
    let result = '';
    let tmp: any;
    const themes = this.themeSettings().themes;

    if (themes) {
      tmp = 'Themes';
      const h2 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(2), tmp);
      result += h2.render();

      tmp = `Всего тем в проекте: ${Object.keys(themes).length}.`;
      tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
      result += tmp.render();
      result += '\n';

      for (const themeName in themes) {
        const themeProperties = this.flattenObj(themes[themeName]);
        tmp = capitalizeHelper(themeName);

        const h2 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(3), tmp);
        result += h2.render();
        result += '\n';

        tmp = `CSS переменные темы \`theme-${themeName}\`:`;
        tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
        result += tmp.render();
        result += '\n';

        let properties = '';

        for (const property in themeProperties) {
          if (!themeProperties.hasOwnProperty(property)) continue;

          let modifiedProperty = property;
          if (property.includes('-default') && property.endsWith('-default')) {
            modifiedProperty = property.replace('-default', '');
          }

          properties += `--${modifiedProperty}: ${
            themeProperties[property as keyof typeof themeProperties]
          };`;
          properties += '\n';
        }

        tmp = new PatternMarkdownCommonResolver(PatternMarkdownCode(), properties);
        result += tmp.render();
        result += '\n\n';
        tmp = '';
      }
    }

    return result;
  }

  /**
   * @description Builds the utilities section of the documentation.
   *
   * @returns A string containing the utilities section in Markdown format.
   */
  documentationBuildUtilities() {
    let result = '';
    let tmp: any;
    let mixinName = '';
    const utilities = this.themeSettings().utilities;

    tmp = 'Utilities';
    const h2 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(2), tmp);
    result += h2.render();

    tmp = 'Набор утилитарных CSS переменных.';
    tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
    result += tmp.render();
    result += '\n';

    for (const groupName in utilities) {
      if (!utilities.hasOwnProperty(groupName)) continue;

      tmp = capitalizeHelper(groupName);
      const h2 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(3), tmp);
      result += h2.render();

      tmp = `Объект \`${groupName}\` содержит следующие миксины:`;
      tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
      result += tmp.render();
      result += '\n';
      tmp = '';

      const group = utilities[groupName as keyof typeof utilities];
      for (const subGroupName in group) {
        if (!group.hasOwnProperty(subGroupName)) continue;
        const subGroup = group[subGroupName as keyof typeof group];
        const mixinProperties = this.flattenObj(subGroup, '-', true);
        mixinName = groupName === subGroupName ? groupName : `${groupName}-${subGroupName}`;

        tmp =
          groupName === subGroupName
            ? capitalizeHelper(groupName)
            : `${capitalizeHelper(groupName)} ${capitalizeHelper(subGroupName)}`;
        const h2 = new PatternMarkdownCommonResolver(PatternMarkdownHeader(4), tmp);
        result += h2.render();
        result += '\n';

        tmp = `@include ${mixinName};`;
        tmp = new PatternMarkdownCommonResolver(PatternMarkdownCode(), tmp);
        result += tmp.render();
        result += '\n';

        tmp = `CSS переменные миксина \`${mixinName}\`:`;
        tmp = new PatternMarkdownCommonResolver(PatternMarkdownP(), tmp);
        result += tmp.render();
        result += '\n';

        tmp = '';

        if (mixinProperties) {
          for (const property in mixinProperties) {
            const nameParts = property.split('-');
            const namePartsLastWord = nameParts.pop();
            const propertyName = nameParts.join('-');
            const propertyValue = mixinProperties[property as keyof typeof mixinProperties];

            if (namePartsLastWord && this.buildBreakPoints().includes(namePartsLastWord)) {
              const breakpoints = `  ${namePartsLastWord}: ${propertyValue};\n`;
              tmp += breakpoints.replace('undefined', '');
            }

            if (!propertyName || propertyName === namePartsLastWord) {
              tmp += `--${mixinName}-${propertyName}: ${propertyValue};\n`;
            }
          }
        }

        tmp = new PatternMarkdownCommonResolver(PatternMarkdownCode(), tmp);
        result += tmp.render();
        result += '\n';
      }
    }

    return result;
  }
}
