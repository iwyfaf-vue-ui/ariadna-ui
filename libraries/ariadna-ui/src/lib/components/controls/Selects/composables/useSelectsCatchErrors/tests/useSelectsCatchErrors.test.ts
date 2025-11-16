import { defineComponent, h } from 'vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import useSelectsCatchErrors from '../../useSelectsCatchErrors/useSelectsCatchErrors';
import { ESelectSingleNumberConfig } from '../../../SelectSingle/types/SelectSingle.enums';
import { ELibraryConfig } from '@/types/internal';

function mountWithComposable(props: Record<string, any>) {
  return mount(
    defineComponent({
      setup() {
        useSelectsCatchErrors(props, ESelectSingleNumberConfig.NAME, props.group ?? false);
        return {};
      },
      render() {
        return h('div');
      },
    }),
  );
}

describe('useSelectsCatchErrors', () => {
  describe('Non-group mode', () => {
    it('Should not throw when all options have the required label field.', () => {
      const props = {
        options: [
          { label: 'A', value: 1 },
          { label: 'B', value: 2 },
        ],
        optionLabel: 'label',
      };

      expect(() => mountWithComposable(props)).not.toThrow();
    });

    it('Should throw if at least one option is missing the required label field.', () => {
      const props = {
        options: [{ label: 'A', value: 1 }, { value: 2 }],
        optionLabel: 'label',
      };

      expect(() => mountWithComposable(props)).toThrow(
        `${ELibraryConfig.NAME}(${ESelectSingleNumberConfig.NAME}): Option index: 1; - label missed`,
      );
    });

    it('Should throw for the correct index when multiple options are missing the label.', () => {
      const props = {
        options: [{ value: 1 }, { value: 2 }],
        optionLabel: 'label',
      };

      expect(() => mountWithComposable(props)).toThrow(
        `${ELibraryConfig.NAME}(${ESelectSingleNumberConfig.NAME}): Option index: 0; - label missed`,
      );
    });

    it('Should not throw if options is an empty array.', () => {
      const props = {
        options: [],
        optionLabel: 'label',
      };

      expect(() => mountWithComposable(props)).not.toThrow();
    });
  });

  describe('Group mode', () => {
    it('Should not throw when all groups and children have required fields.', () => {
      const props = {
        options: [
          {
            groupName: 'Group 1',
            children: [
              { label: 'A', value: 1 },
              { label: 'B', value: 2 },
            ],
          },
          {
            groupName: 'Group 2',
            children: [{ label: 'C', value: 3 }],
          },
        ],
        optionLabel: 'label',
        optionGroupLabel: 'groupName',
        optionGroupChildren: 'children',
        group: true,
      };

      expect(() => mountWithComposable(props)).not.toThrow();
    });

    it('Should throw if a group is missing the group label field.', () => {
      const props = {
        options: [
          {
            children: [{ label: 'A', value: 1 }],
          },
        ],
        optionLabel: 'label',
        optionGroupLabel: 'groupName',
        optionGroupChildren: 'children',
        group: true,
      };

      expect(() => mountWithComposable(props)).toThrow(
        `${ELibraryConfig.NAME}(${ESelectSingleNumberConfig.NAME}): Option index: 0 - groupName missed`,
      );
    });

    it('Should throw if a group is missing the group children field.', () => {
      const props = {
        options: [
          {
            groupName: 'Group 1',
          },
        ],
        optionLabel: 'label',
        optionGroupLabel: 'groupName',
        optionGroupChildren: 'children',
        group: true,
      };

      expect(() => mountWithComposable(props)).toThrow(
        `${ELibraryConfig.NAME}(${ESelectSingleNumberConfig.NAME}): Option index: 0 - children missed`,
      );
    });

    it('Should throw if a child is missing the label field.', () => {
      const props = {
        options: [
          {
            groupName: 'Group 1',
            children: [{ value: 1 }, { label: 'B', value: 2 }],
          },
        ],
        optionLabel: 'label',
        optionGroupLabel: 'groupName',
        optionGroupChildren: 'children',
        group: true,
      };

      expect(() => mountWithComposable(props)).toThrow(
        `${ELibraryConfig.NAME}(${ESelectSingleNumberConfig.NAME}): Option index: 0; Children index: 0 - label missed`,
      );
    });

    it('Should throw for the correct child index when multiple children are missing the label.', () => {
      const props = {
        options: [
          {
            groupName: 'Group 1',
            children: [{ value: 1 }, { value: 2 }],
          },
        ],
        optionLabel: 'label',
        optionGroupLabel: 'groupName',
        optionGroupChildren: 'children',
        group: true,
      };

      expect(() => mountWithComposable(props)).toThrow(
        `${ELibraryConfig.NAME}(${ESelectSingleNumberConfig.NAME}): Option index: 0; Children index: 0 - label missed`,
      );
    });

    it('Should not throw if options is an empty array in group mode.', () => {
      const props = {
        options: [],
        optionLabel: 'label',
        optionGroupLabel: 'groupName',
        optionGroupChildren: 'children',
        group: true,
      };

      expect(() => mountWithComposable(props)).not.toThrow();
    });
  });
});
