import { describe, expect, it } from 'vitest';
import type { TBadgeProps } from '../Badge';
import useBadge from '../composables/useBadge/useBadge';
import { EBadgePropsDefault } from '../types/Badge.enums';

const mockProps: TBadgeProps = {
  size: 'medium',
  rounded: false,
  floating: false,
  cssClass: EBadgePropsDefault.CSS_CLASS,
  modifier: 'primary',
};

describe('useBadge.ts: Basic functionality.', () => {
  it('Should return expected structure.', () => {
    const result = useBadge(mockProps);

    expect(result).toHaveProperty('componentClasses');
  });
});

describe('useBadge.ts: componentClasses computed.', () => {
  it('Should generate base class correctly', () => {
    const { componentClasses } = useBadge(mockProps);

    expect(componentClasses.value).toContain(EBadgePropsDefault.CSS_CLASS);
  });

  it('Should include modifier class when provided.', () => {
    const { componentClasses } = useBadge(mockProps);

    expect(componentClasses.value).toContain(`${EBadgePropsDefault.CSS_CLASS}--primary`);
  });

  it('Should include size class modifier when provided.', () => {
    const { componentClasses } = useBadge(mockProps);

    expect(componentClasses.value).toContain(`${EBadgePropsDefault.CSS_CLASS}--medium`);
  });

  it('Should include rounded class modifier when provided.', () => {
    const props = { ...mockProps, rounded: true };
    const { componentClasses } = useBadge(props);

    expect(componentClasses.value).toContain(`${EBadgePropsDefault.CSS_CLASS}--rounded`);
  });

  it('Should include floating class modifier when provided.', () => {
    const props = { ...mockProps, floating: true };
    const { componentClasses } = useBadge(props);

    expect(componentClasses.value).toContain(`${EBadgePropsDefault.CSS_CLASS}--floating`);
  });

  it('Should handle undefined props gracefully.', () => {
    const props = { cssClass: 'btn' } as TBadgeProps;
    const { componentClasses } = useBadge(props);

    expect(componentClasses.value).toContain('btn');
  });
});
