import { describe, expect, it } from 'vitest';
import type { TTagProps } from '../../Tag';
import useTag from '../../composables/useTag/useTag';
import { ETagPropsDefault } from '../../types/Tag.enums';
import { TagSelectorTestData } from '../test-data/Tag.selector.test-data';

const defaultMock = new TagSelectorTestData();

describe('useBadge.ts', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const result = useTag(defaultMock.mockProps);

      expect(result).toHaveProperty('componentClasses');
    });
  });

  describe('componentClasses computed', () => {
    it('Should generate base class correctly', () => {
      const { componentClasses } = useTag(defaultMock.mockProps);

      expect(componentClasses.value).toContain(ETagPropsDefault.CSS_CLASS);
    });

    it('Should include modifier class when provided.', () => {
      const { componentClasses } = useTag({
        modifier: defaultMock.primaryModifier,
        ...defaultMock.mockProps,
      });

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should include size class modifier when provided.', () => {
      const { componentClasses } = useTag(defaultMock.mockProps);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
      );
    });

    it('Should include rounded class modifier when provided.', () => {
      const props = { ...defaultMock.mockProps, rounded: true };
      const { componentClasses } = useTag(props);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.roundedModifier),
      );
    });

    it('Should handle undefined props gracefully.', () => {
      const props = { cssClass: defaultMock.cssClassProp } as TTagProps;
      const { componentClasses } = useTag(props);

      expect(componentClasses.value).toContain(defaultMock.cssClassProp);
    });
  });
});
