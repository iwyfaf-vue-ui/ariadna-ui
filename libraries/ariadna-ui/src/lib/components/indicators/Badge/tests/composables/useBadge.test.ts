import { describe, expect, it } from 'vitest';
import type { TBadgeProps } from '../../Badge';
import useBadge from '../../composables/useBadge/useBadge';
import { EBadgePropsDefault } from '../../types/Badge.enums';
import { BadgeSelectorTestData } from '../test-data/Badge.selector.test-data';

const defaultMock = new BadgeSelectorTestData();

describe('useBadge.ts', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const result = useBadge(defaultMock.mockProps);

      expect(result).toHaveProperty('componentClasses');
    });
  });

  describe('componentClasses computed', () => {
    it('Should generate base class correctly', () => {
      const { componentClasses } = useBadge(defaultMock.mockProps);

      expect(componentClasses.value).toContain(EBadgePropsDefault.CSS_CLASS);
    });

    it('Should include modifier class when provided.', () => {
      const { componentClasses } = useBadge(defaultMock.mockProps);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should include size class modifier when provided.', () => {
      const { componentClasses } = useBadge(defaultMock.mockProps);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
      );
    });

    it('Should include rounded class modifier when provided.', () => {
      const props = { ...defaultMock.mockProps, rounded: true };
      const { componentClasses } = useBadge(props);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.roundedModifier),
      );
    });

    it('Should include floating class modifier when provided.', () => {
      const props = { ...defaultMock.mockProps, floating: true };
      const { componentClasses } = useBadge(props);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.floatingModifier),
      );
    });

    it('Should handle undefined props gracefully.', () => {
      const props = { cssClass: 'badge' } as TBadgeProps;
      const { componentClasses } = useBadge(props);

      expect(componentClasses.value).toContain('badge');
    });
  });
});
