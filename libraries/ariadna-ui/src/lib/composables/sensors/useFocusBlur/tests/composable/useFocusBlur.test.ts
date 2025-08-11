import { describe, it, expect } from 'vitest';
import useFocusBlur from '../../useFocusBlur';

describe('useFocusBlur', () => {
  describe('Initialization', () => {
    it('Should return an object with isFocused, onFocus, and onBlur.', () => {
      const { isFocused, onFocus, onBlur } = useFocusBlur();

      expect(isFocused).toBeDefined();
      expect(onFocus).toBeDefined();
      expect(onBlur).toBeDefined();
    });

    it('Should initialize isFocused as false.', () => {
      const { isFocused } = useFocusBlur();

      expect(isFocused.value).toBe(false);
    });

    it('Should have isFocused as a Ref<boolean>.', () => {
      const { isFocused } = useFocusBlur();

      expect(typeof isFocused.value).toBe('boolean');
      // TypeScript type check (compile-time), runtime check for .value property
      expect('value' in isFocused).toBe(true);
    });

    it('Should have onFocus and onBlur as functions.', () => {
      const { onFocus, onBlur } = useFocusBlur();

      expect(typeof onFocus).toBe('function');
      expect(typeof onBlur).toBe('function');
    });
  });

  describe('Focus/Blur Logic', () => {
    it('Should set isFocused to true when onFocus is called.', async () => {
      const { isFocused, onFocus } = useFocusBlur();

      onFocus();

      expect(isFocused.value).toBe(true);
    });

    it('Should set isFocused to false when onBlur is called after onFocus.', async () => {
      const { isFocused, onFocus, onBlur } = useFocusBlur();

      onFocus();
      onBlur();

      expect(isFocused.value).toBe(false);
    });

    it('Should remain false if onBlur is called when already false.', async () => {
      const { isFocused, onBlur } = useFocusBlur();

      onBlur();

      expect(isFocused.value).toBe(false);
    });

    it('Should remain true if onFocus is called when already true.', async () => {
      const { isFocused, onFocus } = useFocusBlur();

      onFocus();
      onFocus();

      expect(isFocused.value).toBe(true);
    });

    it('Should toggle isFocused correctly on multiple onFocus/onBlur calls.', async () => {
      const { isFocused, onFocus, onBlur } = useFocusBlur();

      onFocus();
      expect(isFocused.value).toBe(true);

      onBlur();
      expect(isFocused.value).toBe(false);

      onFocus();
      expect(isFocused.value).toBe(true);
    });
  });

  describe('Multiple Instances', () => {
    it('Should maintain independent state for multiple composable instances.', async () => {
      const wrapper1 = useFocusBlur();
      const wrapper2 = useFocusBlur();

      // Initially both false
      expect(wrapper1.isFocused.value).toBe(false);
      expect(wrapper2.isFocused.value).toBe(false);

      // Focus first
      wrapper1.onFocus();
      expect(wrapper1.isFocused.value).toBe(true);
      expect(wrapper2.isFocused.value).toBe(false);

      // Focus second
      wrapper2.onFocus();
      expect(wrapper1.isFocused.value).toBe(true);
      expect(wrapper2.isFocused.value).toBe(true);

      // Blur first
      wrapper1.onBlur();
      expect(wrapper1.isFocused.value).toBe(false);
      expect(wrapper2.isFocused.value).toBe(true);

      // Blur second
      wrapper2.onBlur();
      expect(wrapper1.isFocused.value).toBe(false);
      expect(wrapper2.isFocused.value).toBe(false);
    });
  });
});
