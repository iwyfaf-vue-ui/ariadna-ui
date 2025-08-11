import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import useVideo from '../../composables/useVideo/useVideo';
import type { TVideoProps } from '../../Video';
import { VideoSelectorTestData } from '../test-data/Video.selector.test-data';

// Mock всего модуля 'vue' с переопределением useId.
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue');
  return {
    ...actual,
    useId: () => 'mocked-id',
  };
});

const defaultMock = new VideoSelectorTestData();

function mountWithComposable(props: TVideoProps) {
  return mount(
    defineComponent({
      setup() {
        const result = useVideo(props);
        return { ...result };
      },

      render() {
        return h('div');
      },
    }),
  );
}

describe('useVideo', () => {
  describe('Basic functionality', () => {
    it('Should return expected structure.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      expect(vm).toHaveProperty('uniqueID');
      expect(vm).toHaveProperty('componentClasses');
    });
  });

  describe('uniqueID ComputedRef', () => {
    it('Should return a defined uniqueID as a string.', () => {
      const wrapper = mountWithComposable({ cssClass: 'test-class', src: 'video.mp4' });
      const vm = wrapper.vm;

      expect(vm.uniqueID).toBeDefined();
      expect(typeof wrapper.vm.uniqueID).toBe('string');
      expect(wrapper.vm.uniqueID.length).toBeGreaterThan(0);
    });
  });

  describe('componentClasses ComputedRef', () => {
    it('Should generate correct componentClasses for default props.', () => {
      const wrapper = mountWithComposable(defaultMock.mockProps);
      const vm = wrapper.vm;

      const classes = vm.componentClasses.split(' ');

      const expectedClasses = [
        defaultMock.getSelectorWithoutDot(defaultMock.rootEl),
        defaultMock.getSelectorWithoutDot(defaultMock.themeModifier),
      ];

      expect(classes).toEqual(expect.arrayContaining(expectedClasses));
      expect(classes.length).toBe(expectedClasses.length);
    });
  });
});
