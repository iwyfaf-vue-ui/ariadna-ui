import PropertyBuilder from '../utils/property-builder';
import type { TDefaultSettings } from '../../types/builder-default-settings/default-settings.type';
import type { TCustomSettings } from '../../types/builder-custom-settings/custom-settings.type';
import { PatternBreakpoints } from '../patterns/pattern.breakpoints';
import PatternMixin from '../patterns/pattern.mixin';
import PatternMixinNested from '../patterns/pattern.mixin-nested';
import PatternGrid from '../patterns/pattern.grid';
import { PatternIncludeNested } from '../patterns/pattern.include';
import PatternStyles from '../patterns/pattern.styles';
import PatternSelector from '../patterns/pattern.selector';
import PatternIf from '../patterns/pattern.if';
import { PatternHelperTextStyle } from '../patterns/helpers/pattern.helper.textStyle';
import PatternCommon from '../patterns/pattern.common';
import MediaPatternResolver from '../patterns/resolvers/media.pattern.resolver';
import MixinPatternResolver from '../patterns/resolvers/mixin.pattern.resolver';
import IncludePatternResolver from '../patterns/resolvers/include.pattern.resolver';
import SelectorPatternResolver from '../patterns/resolvers/selector.pattern.resolver';
import IfPatternResolver from '../patterns/resolvers/if.pattern.resolver';

/**
 * @description The `BuilderConstructor` class is responsible for constructing and generating
 * various CSS properties, mixins, and utilities based on provided custom and default settings.
 * It extends the `PropertyBuilder` class and provides methods to build breakpoints,
 * grid settings, themes, utilities, and more.
 */
export class BuilderConstructor extends PropertyBuilder {
  /**
   * @description Constructs a new instance of the `BuilderConstructor` class.
   *
   * @param customSettings - The custom settings provided by the user.
   * @param defaultSettings - The default settings used as a fallback.
   */
  constructor(
    private readonly customSettings: TCustomSettings,
    private readonly defaultSettings: TDefaultSettings,
  ) {
    super();

    this.customSettings = customSettings;
    this.defaultSettings = defaultSettings;
  }

  /**
   * @description Merges the default settings with the custom settings to create the theme settings.
   *
   * @public
   * @returns An object containing the merged theme settings.
   */
  public themeSettings(): TDefaultSettings & TCustomSettings {
    return { ...this.defaultSettings, ...this.customSettings };
  }

  /**
   * @description Builds an array of breakpoint names from the theme settings.
   *
   * @public
   * @returns An array of breakpoint names.
   */
  public buildBreakPoints(): string[] {
    const sizes: string[] = [];

    Object.entries(this.themeSettings().breakPoints).forEach(([sizeName]) => {
      sizes.push(sizeName);
    });

    return sizes;
  }

  /**
   * @description This method generates a string with SCSS directives that will be used
   * as imports in SCSS files.
   *
   * @public
   * @returns {string} A string containing SCSS directives, with each directive
   * on a new line.
   */
  public buildDirectivesScss(): string {
    const directives = ['@use "sass:string";'];

    let output = '';

    directives.forEach((dir) => {
      output += `${dir}\n`;
    });

    return output;
  }

  /**
   * @description Generates SCSS code for breakpoints based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for breakpoints.
   */
  public buildBreakPointsScss(): string {
    let output = '';

    Object.entries(this.themeSettings().breakPoints).forEach(([sizeName, property]) => {
      if (!property) {
        return output;
      }

      output += PatternBreakpoints(sizeName, property.width);
    });

    return output;
  }

  /**
   * @description Generates SCSS mixins for media queries based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS mixins for media queries.
   */
  public buildBreakPointsMediaMixins(): string {
    let result = '';

    Object.entries(this.themeSettings().breakPoints).forEach(([sizeName]) => {
      const media = new MediaPatternResolver(`{{var}}break-${sizeName}`);

      const style = '{{block-content-extract}}{{;}}\n';
      const mix = new MixinPatternResolver(
        PatternMixin(),
        sizeName,
        '{{block-content-var}}',
        media.wrap(style),
      );

      result += mix.render();
    });

    return result;
  }

  /**
   * @description Generates SCSS code for grid settings based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for grid settings.
   */
  public buildGridSettings(): string {
    let result = '';
    let tmp = '';
    const includes: { [key: string]: string } = {};
    const gridSettings = this.themeSettings().gridSettings;

    for (const setting in gridSettings) {
      if (!gridSettings.hasOwnProperty(setting)) continue;

      const settingGroup = gridSettings[setting as keyof typeof gridSettings];

      for (const property in settingGroup) {
        if (!settingGroup.hasOwnProperty(property)) continue;

        // generate object for includes
        if (this.buildBreakPoints().includes(property)) {
          // debug property values must be a string
          includes[property] += `--${setting}: ${
            settingGroup[property as keyof typeof settingGroup]
          };\n`;

          // debug property values must be a string
          includes[property] += this.duplicatePropertyWithCustomName(
            `--debug-${setting}:`,
            `'${settingGroup[property as keyof typeof settingGroup]}';\n`,
          );

          // generate debug-breakpoint CSS variable
          if (!includes[property].includes(property)) {
            includes[property] += `--debug-breakpoint: '${property}';\n`;
          }
        }

        // generate grid whitelisted properties
        if (PatternGrid().includes(property)) {
          tmp += `--${property}: ${settingGroup[property as keyof typeof settingGroup]};\n`;

          // debug property values must be a string
          tmp += this.duplicatePropertyWithCustomName(
            `--debug-${property}:`,
            `'${settingGroup[property as keyof typeof settingGroup]}';\n`,
          );
        }
      }
    }

    // Set debug-breakpoint CSS var to null
    tmp += `--debug-breakpoint: 'null';\n`;

    Object.entries(includes).forEach(([breakpoint, content]) => {
      content = content.replace('undefined', '');

      const inc = new IncludePatternResolver(PatternIncludeNested(), breakpoint, content);
      tmp += inc.render();
    });

    const mix = new MixinPatternResolver(PatternMixin(), `grid-settings`, '', tmp);
    result += mix.render();

    return result;
  }

  /**
   * @description Generates SCSS code for the grid container based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for the grid container.
   */
  public buildGridContainer(): string {
    let result = '';
    const container = this.themeSettings().gridContainer.container;

    for (const property in container) {
      if (!container.hasOwnProperty(property)) continue;

      if (PatternStyles().includes(property)) {
        result += `${property}: ${container[property as keyof typeof container]};\n`;
      } else {
        result += `${container[property as keyof typeof container]};\n`;
      }
    }

    const mix = new MixinPatternResolver(PatternMixin(), 'grid-container', '', result);
    result = mix.render();

    return result;
  }

  /**
   * @description Generates SCSS code for the fluid grid container based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for the fluid grid container.
   */
  public buildGridContainerFluid(): string {
    let result = '';
    const containerFluid = this.themeSettings().gridContainer.fluid;

    for (const property in containerFluid) {
      if (!containerFluid.hasOwnProperty(property)) continue;

      if (PatternStyles().includes(property)) {
        result += `${property}: ${containerFluid[property as keyof typeof containerFluid]};\n`;
      } else {
        result += `${containerFluid[property as keyof typeof containerFluid]};\n`;
      }
    }

    const mix = new MixinPatternResolver(PatternMixin(), 'grid-container-fluid', '', result);
    result = mix.render();

    return result;
  }

  /**
   * @description Generates SCSS code for debugging the grid based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for debugging the grid.
   */
  public buildGridDebug(): string {
    let result = '';
    let columns = '$columns, ';
    const gridDebug = this.themeSettings().gridDebug;
    const breakpoints = this.buildBreakPoints();
    let idx = breakpoints.length;

    for (const property in gridDebug) {
      if (!gridDebug.hasOwnProperty(property)) continue;

      result += `${property}: ${gridDebug[property as keyof typeof gridDebug]}`;

      if (property === 'before') {
        result = result.replace('before: ', '');
      }

      if (property === 'after') {
        result = result.replace('after: ', '');
      }
      result += '\n';
    }

    for (const point in breakpoints) {
      idx--;
      const include = new IncludePatternResolver(
        PatternIncludeNested(),
        breakpoints[point as keyof typeof breakpoints],
        `--columns: #{$columns-${breakpoints[point as keyof typeof breakpoints]}};`,
      );
      result += include.render();

      columns +=
        idx === 0
          ? `$columns-${breakpoints[point as keyof typeof breakpoints]}:null `
          : `$columns-${breakpoints[point as keyof typeof breakpoints]}:null, `;
    }

    const sel = new SelectorPatternResolver(PatternSelector(), 'grid-debug', result);
    result = sel.render();

    const mix = new MixinPatternResolver(PatternMixin(), 'debug', columns, result);
    result = mix.render();

    return result;
  }

  /**
   * @description Generates SCSS code for the default grid based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for the default grid.
   */
  public buildGridDefault(): string {
    let result = '';
    let columns = '$columns, ';
    const gridDefault = this.themeSettings().gridDefault;
    const breakpoints = this.buildBreakPoints();
    let idx = breakpoints.length;

    for (const property in gridDefault) {
      if (!gridDefault.hasOwnProperty(property)) continue;

      result += `${property}: ${gridDefault[property as keyof typeof gridDefault]};\n`;
    }

    for (const point in breakpoints) {
      idx--;
      const include = new IncludePatternResolver(
        PatternIncludeNested(),
        breakpoints[point as keyof typeof breakpoints],
        `grid-template-columns: repeat($columns-${
          breakpoints[point as keyof typeof breakpoints]
        }, 1fr);`,
      );
      const ifMixin = new IfPatternResolver(
        PatternIf(),
        `$columns-${breakpoints[point as keyof typeof breakpoints]}`,
        include.render(),
      );
      result += ifMixin.render();

      columns +=
        idx === 0
          ? `$columns-${breakpoints[point as keyof typeof breakpoints]}:null `
          : `$columns-${breakpoints[point as keyof typeof breakpoints]}:null, `;
    }

    const generateDefaultGrid = new MixinPatternResolver(PatternMixin(), 'grid', columns, result);
    result = generateDefaultGrid.render();

    return result;
  }

  /**
   * @description Generates SCSS code for themes based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for themes.
   */
  public buildTheme(): string {
    let result = '';
    let properties = '';
    const theme = this.themeSettings().themes;

    for (const themeName in theme) {
      if (!theme.hasOwnProperty(themeName)) continue;
      const themeProperties = this.flattenObj(theme[themeName]);

      for (let property in themeProperties) {
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

      const mix = new MixinPatternResolver(
        PatternMixinNested(),
        `theme-${themeName}`,
        '',
        properties,
      );
      result += mix.render();

      properties = '';
    }

    return result;
  }

  /**
   * @description Generates SCSS code for utilities based on the theme settings.
   *
   * @pib
   *
   * @returns A string containing the generated SCSS code for utilities.
   */
  public buildUtilities(): string {
    const utilities = this.themeSettings().utilities;

    let result = '';
    let temp = '';
    let mixinName = '';
    let includes: { [key: string]: string } = {};
    let idx = 0;

    for (const groupName in utilities) {
      if (!utilities.hasOwnProperty(groupName)) continue;

      const group = utilities[groupName as keyof typeof utilities];

      for (const subGroupName in group) {
        if (!group.hasOwnProperty(subGroupName)) continue;

        mixinName = groupName === subGroupName ? groupName : `${groupName}-${subGroupName}`;

        const subGroup = group[subGroupName as keyof typeof group];
        const mixinProperties = this.flattenObj(subGroup, '-', true);

        idx = Object.entries(mixinProperties).length;

        if (mixinProperties) {
          for (const property in mixinProperties) {
            const nameParts = property.split('-');
            const namePartsLastWord = nameParts.pop();
            const propertyName = nameParts.join('-');
            const propertyValue = mixinProperties[property as keyof typeof mixinProperties];

            idx--;

            if (namePartsLastWord && this.buildBreakPoints().includes(namePartsLastWord)) {
              includes[namePartsLastWord] += `--${mixinName}-${propertyName}: ${propertyValue};\n`;
              includes[namePartsLastWord] = includes[namePartsLastWord].replace('undefined', '');
            }

            if (!propertyName || propertyName === namePartsLastWord) {
              temp += `--${mixinName}-${propertyName}: ${propertyValue};\n`;
            }

            if (idx === 0) {
              for (let property of this.buildBreakPoints()) {
                if (includes.hasOwnProperty(property)) {
                  const inc = new IncludePatternResolver(
                    PatternIncludeNested(),
                    property,
                    includes[property as keyof typeof includes],
                  );
                  temp += inc.render();
                }
              }
            }
          }

          const mix = new MixinPatternResolver(PatternMixinNested(), mixinName, '', temp);

          result += mix.render();

          temp = '';
          includes = {};
        }
      }
    }

    return result;
  }

  /**
   * @description Generates SCSS code for the text style helper based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for the text style helper.
   */
  public buildHelperTextStyle(): string {
    let result = '';

    if (!this.customSettings?.helpers?.textStyle) {
      return result;
    }

    const mix = new MixinPatternResolver(
      PatternMixin(),
      'text-style-helper',
      '$name',
      PatternHelperTextStyle(),
    );

    result += mix.render();

    return result;
  }

  /**
   * @description Generates SCSS code for the column offset helper based on the theme settings.
   *
   * @public
   * @returns A string containing the generated SCSS code for the column offset helper.
   */
  public buildHelperColumnOffset(): string {
    let result = '';

    if (!this.customSettings?.helpers?.columnOffset) {
      return result;
    }

    let offset = '$offset, ';
    const breakpoints = this.buildBreakPoints();
    let idx = breakpoints.length;

    result = 'grid-column: string.unquote($offset);';

    for (let breakpoint in breakpoints) {
      idx--;
      const include = new IncludePatternResolver(
        PatternIncludeNested(),
        breakpoints[breakpoint as keyof typeof breakpoints],
        `grid-column: string.unquote($offset-${
          breakpoints[breakpoint as keyof typeof breakpoints]
        });`,
      );

      const ifMixin = new IfPatternResolver(
        PatternIf(),
        `$offset-${breakpoints[breakpoint as keyof typeof breakpoints]}`,
        include.render(),
      );
      result += ifMixin.render();

      offset +=
        idx === 0
          ? `$offset-${breakpoints[breakpoint as keyof typeof breakpoints]}:null `
          : `$offset-${breakpoints[breakpoint as keyof typeof breakpoints]}:null, `;
    }

    const generateColumnOffset = new MixinPatternResolver(
      PatternMixin(),
      'column-offset',
      offset,
      result,
    );
    result = generateColumnOffset.render();

    return result;
  }

  /**
   * @description Replaces placeholders in the generated theme with actual values.
   *
   * @public
   * @param theme - The theme string containing placeholders.
   * @returns The theme string with placeholders replaced by actual values.
   */
  public replacer(theme: string): string {
    let output = theme;

    Object.entries(PatternCommon()).forEach(([key]) => {
      const tmp = output.split(key);
      // @ts-ignore
      output = tmp.join(PatternCommon()[key]);
    });

    return output;
  }

  /**
   * @description Removes empty lines from the generated theme.
   *
   * @public
   * @param theme - The theme string potentially containing empty lines.
   * @returns The theme string with empty lines removed.
   */
  public removeEmptyLines(theme: string): string {
    theme = theme.replace(/^\s*[\r\n]/gm, '');

    return theme;
  }
}
