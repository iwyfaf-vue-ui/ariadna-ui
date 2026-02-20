import { describe, it, expect, vi } from 'vitest';
import type { TButtonEmits, TButtonProps, TButtonSlots } from '../../Button';
import useButton from '../../composables/useButton/useButton';
import { EButtonPropsDefault } from '../../types/Button.enums';
import { ButtonSelectorTestData } from '../test-data/Button.selector.test-data';

const defaultMock = new ButtonSelectorTestData();

function createMockEmits() {
  const clickMock = vi.fn();

  const emits: TButtonEmits = ((event: 'click', payload: MouseEvent | FocusEvent) => {
    switch (event) {
      case 'click':
        clickMock(payload as MouseEvent);
        break;
    }
  }) as TButtonEmits;

  return {
    emits,
    mocks: {
      click: clickMock,
    },
  };
}

function createMockSlots(options?: {
  withDefault?: boolean;
  withIcon?: boolean;
  withLoading?: boolean;
}): TButtonSlots {
  return {
    default: options?.withDefault ? () => [] : undefined,
    icon: options?.withIcon ? () => [] : undefined,
    loading: options?.withLoading ? () => [] : undefined,
  };
}

describe('useButton', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const result = useButton(defaultMock.mockProps, emits, slots);

      expect(result).toHaveProperty('isDisabled');
      expect(result).toHaveProperty('componentClasses');
      expect(result).toHaveProperty('clickHandler');
      expect(typeof result.clickHandler).toBe('function');
    });
  });

  describe('isDisabled computed', () => {
    it('Should be true when disabled prop is true.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, disabled: true };
      const { isDisabled } = useButton(props, emits, slots);

      expect(isDisabled.value).toBe(true);
    });

    it('Should be true when loading prop is true.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, loading: true };
      const { isDisabled } = useButton(props, emits, slots);

      expect(isDisabled.value).toBe(true);
    });

    it('Should be false when neither disabled nor loading is true.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const { isDisabled } = useButton(defaultMock.mockProps, emits, slots);

      expect(isDisabled.value).toBe(false);
    });
  });

  describe('componentClasses computed', () => {
    it('Should generate base class correctly', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const { componentClasses } = useButton(defaultMock.mockProps, emits, slots);

      expect(componentClasses.value).toContain(EButtonPropsDefault.CSS_CLASS);
    });

    it('Should include modifier class when provided.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const { componentClasses } = useButton(defaultMock.mockProps, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.primaryModifier),
      );
    });

    it('Should include size class modifier when provided.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const { componentClasses } = useButton(defaultMock.mockProps, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.sizeMediumModifier),
      );
    });

    it('Should include icon position class modifier when provided.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const { componentClasses } = useButton(defaultMock.mockProps, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.iconPositionLeftModifier),
      );
    });

    it('Should include rounded class modifier when provided.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, rounded: true };
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.roundedModifier),
      );
    });

    it('Should include textual class modifier when provided.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, textual: true };
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.textualModifier),
      );
    });

    it('Should include outlined class modifier when provided.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, outlined: true };
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.outlinedModifier),
      );
    });

    it('Should include selected class when selected is true.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, selected: true };
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.selectedModifier),
      );
    });

    it('Should include disabled class when disabled is true.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, disabled: true };
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.disabledModifier),
      );
    });

    it('Should include loading class when loading.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { ...defaultMock.mockProps, loading: true };
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.loadingModifier),
      );
    });

    it('Should handle undefined props gracefully.', () => {
      const { emits } = createMockEmits();
      const slots = createMockSlots();
      const props = { cssClass: 'btn' } as TButtonProps;
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain('btn');
    });

    it('Should NOT include icon-only class when both icon and default slots are provided.', () => {
      const { emits } = createMockEmits();
      const props = { ...defaultMock.mockProps };
      const slots = createMockSlots({ withIcon: true, withDefault: true });
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).not.toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.iconOnlyModifier),
      );
    });

    it('Should include icon-only class when only icon slot is provided.', () => {
      const { emits } = createMockEmits();
      const props = { ...defaultMock.mockProps };
      const slots = createMockSlots({ withIcon: true, withDefault: false });
      const { componentClasses } = useButton(props, emits, slots);

      expect(componentClasses.value).toContain(
        defaultMock.getSelectorWithoutDot(defaultMock.iconOnlyModifier),
      );
    });
  });

  describe('clickHandler function', () => {
    it('Should emit click event when not disabled.', () => {
      const { emits, mocks } = createMockEmits();
      const slots = createMockSlots();
      const clickEvent = new MouseEvent('click');
      const { clickHandler } = useButton(defaultMock.mockProps, emits, slots);

      clickHandler(clickEvent);

      expect(mocks.click).toHaveBeenCalledTimes(1);
      expect(mocks.click).toHaveBeenCalledWith(clickEvent);
    });

    it('Should not emit click event when button is disabled.', () => {
      const { emits, mocks } = createMockEmits();
      const slots = createMockSlots();
      const clickEvent = new MouseEvent('click');
      const disabledProps = { ...defaultMock.mockProps, disabled: true };

      const { clickHandler } = useButton(disabledProps, emits, slots);
      clickHandler(clickEvent);

      expect(mocks.click).not.toHaveBeenCalled();
    });

    it('Should not emit click event when button is loading.', () => {
      const { emits, mocks } = createMockEmits();
      const slots = createMockSlots();
      const clickEvent = new MouseEvent('click');
      const loadingProps = { ...defaultMock.mockProps, loading: true };

      const { clickHandler } = useButton(loadingProps, emits, slots);
      clickHandler(clickEvent);

      expect(mocks.click).not.toHaveBeenCalled();
    });
  });
});
