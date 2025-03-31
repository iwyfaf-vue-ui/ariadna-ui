import { beforeEach, describe, expect, it } from 'vitest';
import type { TBuilderOptions } from '../types/builder-options/builder-options.type.ts';
import ThemeBuilder from '../ThemeBuilder.ts';

describe('ThemeBuilder.ts: Basic initialize', () => {
  let options: TBuilderOptions;
  let themeBuilder: ThemeBuilder;

  beforeEach(() => {
    options = {
      projectName: 'test-project',
      destination: './dist',
      themeName: 'test-theme',
    };

    themeBuilder = new ThemeBuilder(options);
  });

  it('Basic initialize: Should initialize with default settings.', () => {
    expect(themeBuilder).toBeInstanceOf(ThemeBuilder);
  });
});
