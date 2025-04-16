import { describe, expect, it } from 'vitest';
import type { TSpinnerProps } from '../Spinner';
import { ESpinnerPropsDefault } from '../types/Spinner.enums';
import useSpinner from '../composables/useSpinner/useSpinner';

const mockProps: TSpinnerProps = {
  size: 'medium',
  cssClass: ESpinnerPropsDefault.CSS_CLASS,
  modifier: 'primary',
};

describe('useSpinner.ts: Basic functionality.', () => {
  it('Should return expected structure.', () => {
    const result = useSpinner(mockProps);

    expect(result).toHaveProperty('componentClasses');
  });
});

describe('useSpinner.ts: componentClasses computed.', () => {
  it('Should generate base class correctly', () => {
    const { componentClasses } = useSpinner(mockProps);

    expect(componentClasses.value).toContain(ESpinnerPropsDefault.CSS_CLASS);
  });

  it('Should include modifier class when provided.', () => {
    const { componentClasses } = useSpinner(mockProps);

    expect(componentClasses.value).toContain(`${ESpinnerPropsDefault.CSS_CLASS}--primary`);
  });

  it('Should include size class modifier when provided.', () => {
    const { componentClasses } = useSpinner(mockProps);

    expect(componentClasses.value).toContain(`${ESpinnerPropsDefault.CSS_CLASS}--medium`);
  });

  it('Should handle undefined props gracefully.', () => {
    const props = { cssClass: 'spinner' } as TSpinnerProps;
    const { componentClasses } = useSpinner(props);

    expect(componentClasses.value).toContain('spinner');
  });
});
