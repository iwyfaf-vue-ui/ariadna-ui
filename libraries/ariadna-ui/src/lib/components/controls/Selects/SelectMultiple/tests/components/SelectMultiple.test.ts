import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import SelectMultiple from '../../SelectMultiple.vue';
import { SelectMultipleSelectorTestData } from '../test-data/SelectMultiple.selector.test-data';
import type { TSelectMultipleProps } from '../../SelectMultiple';

const defaultMock = new SelectMultipleSelectorTestData();

describe('SelectMultiple', () => {
  describe('Basic render', () => {
    it('Should render root element with correct class.', () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      expect(wrapper.classes()).toContain(defaultMock.className);
    });

    it('Should render label if provided.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
        },
      });

      expect(wrapper.find(defaultMock.labelEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.labelEl).text()).toBe(defaultMock.labelProp);
    });

    it('Should render placeholder if no value selected and placeholder provided.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          placeholder: defaultMock.placeholderProp,
        },
      });

      expect(wrapper.find(defaultMock.placeholderEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.placeholderEl).text()).toBe(defaultMock.placeholderProp);
    });

    it('Should render options list.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          placeholder: defaultMock.placeholderProp,
        },
      });

      // Открываем дропдаун
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      expect(wrapper.find(defaultMock.optionsEl).exists()).toBe(true);
      expect(wrapper.findAll(defaultMock.optionEl).length).toBe(
        defaultMock.mockProps.options.length,
      );
    });
  });

  describe('Props', () => {
    it('modelValue: Should update input value when prop.modelValue changes.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[1]],
        },
      });

      await wrapper.setProps({ modelValue: [defaultMock.mockProps.options[2]] });
      expect(wrapper.props('modelValue')).toStrictEqual([defaultMock.mockProps.options[2]]);
    });

    it('filterValue: Should filter options by filterValue prop.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[1]],
          filterValue: 'Option 2',
          filter: { filterLabel: [[{ field: 'label' }]] },
        },
      });

      // Открываем дропдаун, чтобы увидеть список
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      const options = wrapper.findAll(defaultMock.optionEl);

      expect(options.length).toBe(1);
      expect(options[0].text()).toBe('Option 2');
    });

    it('filterValue: Should show emptyFilter slot if filterValue does not match any option.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[1]],
          filterValue: 'NotExist',
          filter: { filterLabel: [[{ field: 'label' }]] },
        },
      });

      // Открываем дропдаун, чтобы увидеть список
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();

      expect(wrapper.find(defaultMock.emptyFilterEl).exists()).toBe(true);
    });

    it('filterValue: Should update filtered options when filterValue changes.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[1]],
          filterValue: 'Option 1',
          filter: { filterLabel: [[{ field: 'label' }]] },
        },
      });

      // Открываем дропдаун, чтобы увидеть список
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      expect(wrapper.findAll(defaultMock.optionEl).length).toBe(1);

      await wrapper.setProps({ filterValue: 'Option' });
      await nextTick();
      expect(wrapper.findAll(defaultMock.optionEl).length).toBe(3);
    });

    it('options: Should render all options passed via options prop.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      // Открываем дропдаун, чтобы увидеть список
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      const options = wrapper.findAll(defaultMock.optionEl);

      expect(options.length).toBe(defaultMock.mockProps.options.length);
      expect(options[0].text()).toBe(
        defaultMock.mockProps.options[0][defaultMock.mockProps.optionLabel!],
      );
    });

    it('options: Should show empty slot if options array is empty.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          options: [],
        },
      });

      // Открываем дропдаун, чтобы увидеть список
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      expect(wrapper.find(defaultMock.emptyOptionsEl).exists()).toBe(true);
    });

    it('optionLabel: Should display custom label property for options.', async () => {
      // Используем кастомный label-ключ
      const options = [
        { name: 'First', value: 1 },
        { name: 'Second', value: 2 },
      ];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [options[1]],
          options: options,
          optionLabel: 'name',
        },
      });

      await nextTick();
      expect(wrapper.find(defaultMock.selectedLabelEl).text()).toBe('Second');

      // Открываем дропдаун
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      const optionNodes = wrapper.findAll(defaultMock.optionEl);
      expect(optionNodes.length).toBe(2);
      expect(optionNodes[0].text()).toBe('First');
      expect(optionNodes[1].text()).toBe('Second');
    });

    it('optionValue: Should use custom optionValue property for selection and display.', async () => {
      const options = [
        { label: 'Alpha', id: 'a' },
        { label: 'Beta', id: 'b' },
      ];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: ['b'],
          options: options,
          optionLabel: 'label',
          optionValue: 'id',
        },
      });

      await nextTick();
      expect(wrapper.find(defaultMock.selectedLabelEl).text()).toBe('Beta');

      // Открываем дропдаун
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      const optionNodes = wrapper.findAll(defaultMock.optionEl);
      expect(optionNodes.length).toBe(2);
      expect(optionNodes[0].text()).toBe('Alpha');
      expect(optionNodes[1].text()).toBe('Beta');
    });

    it('optionValue: Should select option by optionValue when clicking option.', async () => {
      const options = [
        { label: 'Alpha', id: 'a' },
        { label: 'Beta', id: 'b' },
      ];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [],
          options: options,
          optionLabel: 'label',
          optionValue: 'id',
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();

      const optionNodes = wrapper.findAll(defaultMock.optionEl);
      await optionNodes[1].trigger('click');
      await nextTick();

      // Должен быть выбран id второго элемента
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toStrictEqual([options[1].id]);
    });

    it('label: Should render label if label prop is provided.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          label: defaultMock.labelProp,
        },
      });

      const label = wrapper.find(defaultMock.getSelectorWithDot(defaultMock.labelEl));

      expect(label.exists()).toBe(true);
      expect(label.text()).toBe(defaultMock.labelProp);
    });

    it('id: Should set input id from id prop if provided.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          id: defaultMock.idProp,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe(defaultMock.idProp);
    });

    it('id: Should set input id from composable if id prop is not provided.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('id'),
      ).toBe('v-0');
    });

    it('placeholder: Should display placeholder if modelValue is null.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          placeholder: defaultMock.placeholderProp,
        },
      });

      expect(wrapper.find(defaultMock.placeholderEl).text()).toBe(defaultMock.placeholderProp);
    });

    it('tiles: Should render selected options as tiles when tiles prop is true.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
          tiles: true,
        },
      });
      const tiles = wrapper.findAll(defaultMock.tileEl);

      expect(tiles.length).toBe(2);
      expect(tiles[0].text()).toContain(defaultMock.mockProps.options[0].label);
      expect(tiles[1].text()).toContain(defaultMock.mockProps.options[1].label);
    });

    it('tiles: Should not render tiles if modelValue is empty.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [],
          tiles: true,
        },
      });

      expect(wrapper.findAll(defaultMock.tileEl).length).toBe(0);
    });

    it('tiles: Should remove tile when clicking remove button.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
          tiles: true,
        },
      });

      const tile = wrapper.findAll(defaultMock.tileEl)[0];
      await tile.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.findAll(defaultMock.tileEl).length).toBe(1);
    });

    it('maxSelectedLabels: Should display only maxSelectedLabels labels when more options are selected.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
          maxSelectedLabels: 2,
        },
      });
      const labelEl = wrapper.find(defaultMock.selectedLabelEl);

      expect(labelEl.text()).toContain(defaultMock.mockProps.options[0].label);
      expect(labelEl.text()).toContain(defaultMock.mockProps.options[1].label);
    });

    it('maxSelectedLabels: Should display default text, if values more then maxSelectedLabels.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [
            defaultMock.mockProps.options[0],
            defaultMock.mockProps.options[1],
            defaultMock.mockProps.options[2],
          ],
          maxSelectedLabels: 2,
        },
      });
      const labelEl = wrapper.find(defaultMock.selectedLabelEl);

      expect(labelEl.text()).toEqual('3 items selected');
    });

    it('selectedItemsLabel: selectedItemsLabelShould display default selectedItemsLabel text when multiple options are selected.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [
            defaultMock.mockProps.options[0],
            defaultMock.mockProps.options[1],
            defaultMock.mockProps.options[2],
          ],
          maxSelectedLabels: 2,
        },
      });
      const labelEl = wrapper.find(defaultMock.selectedLabelEl);

      expect(labelEl.exists()).toBe(true);
      expect(labelEl.text()).toBe('3 items selected');
    });

    it('selectedItemsLabel: selectedItemsLabelShould display custom selectedItemsLabel text when multiple options are selected.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [
            defaultMock.mockProps.options[0],
            defaultMock.mockProps.options[1],
            defaultMock.mockProps.options[2],
          ],
          maxSelectedLabels: 2,
          selectedItemsLabel: `Элементов выбрано: {0}`,
        },
      });
      const labelEl = wrapper.find(defaultMock.selectedLabelEl);

      expect(labelEl.exists()).toBe(true);
      expect(labelEl.text()).toBe('Элементов выбрано: 3');
    });

    it('multiselectCheckbox: Should render multiselect checkbox when multiselectCheckbox is true.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          multiselectCheckbox: true,
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();

      const checkbox = wrapper.find(defaultMock.filterCheckboxEl);
      expect(checkbox.exists()).toBe(true);
    });

    it('disabled: Should set input disabled from prop.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          disabled: true,
        },
      });

      expect(
        wrapper.find(defaultMock.getSelectorWithDot(defaultMock.inputEl)).attributes('disabled'),
      ).toBeDefined();
    });

    it('loading: Should render loading icon in header and loading indicator in options list when loading=true.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          loading: true,
        },
      });

      // Проверяем индикатор загрузки в header
      expect(wrapper.find(defaultMock.loadingEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.loadingIconEl).exists()).toBe(true);

      // Открываем дропдаун через клик по header
      await wrapper.find(defaultMock.headerEl).trigger('click');

      // Проверяем индикатор загрузки в списке опций
      expect(wrapper.find(defaultMock.listLoadingEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.listLoadingIconEl).exists()).toBe(true);
      expect(wrapper.find(defaultMock.listLoadingIconEl).text().toLowerCase()).toContain('loading');
    });

    it('loading: Should not render loading indicators when loading=false.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          loading: false,
        },
      });

      expect(wrapper.find(defaultMock.loadingEl).exists()).toBe(false);

      await wrapper.find(defaultMock.headerEl).trigger('click');
      expect(wrapper.find(defaultMock.listLoadingEl).exists()).toBe(false);
    });

    it('size: Should apply small size modifier class when size="small".', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          size: defaultMock.sizeProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
    });

    it('size: Should apply medium size modifier class when size="medium".', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          size: (defaultMock.sizeProp = 'medium'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
    });

    it('size: Should apply large size modifier class when size="large".', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          size: (defaultMock.sizeProp = 'large'),
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
    });

    it('filter: Should render filter input and filter options by text.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: { filterLabel: [[{ field: 'label' }]] },
        },
      });

      // Открываем дропдаун
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();

      // Проверяем наличие поля фильтрации
      expect(wrapper.find(defaultMock.filterInputEl + ' input').exists()).toBe(true);

      // Вводим текст для фильтрации
      const filterInput = wrapper.find(defaultMock.filterInputEl + ' input');
      await filterInput.setValue('Option 2');
      await nextTick();

      // Должна остаться только одна опция
      const options = wrapper.findAll(defaultMock.optionEl);
      expect(options.length).toBe(1);
      expect(options[0].text()).toBe('Option 2');
    });

    it('filter: Should show emptyFilter slot if filter yields no results.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: { filterLabel: [[{ field: 'label' }]] },
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();

      const filterInput = wrapper.find(defaultMock.filterInputEl + ' input');
      await filterInput.setValue('NotExist');
      await nextTick();

      expect(wrapper.find(defaultMock.emptyFilterEl).exists()).toBe(true);
    });

    it('virtualScroller: Should render options using VirtualScroller when virtualScroller prop is provided.', async () => {
      // Создаём длинный список опций для проверки виртуализации
      const manyOptions = Array.from({ length: 50 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: i + 1,
      }));

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          options: manyOptions,
          virtualScroller: { itemHeight: 30, height: 120 },
        },
      });

      // Открываем дропдаун
      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();

      // Проверяем, что VirtualScroller отрендерился
      expect(wrapper.find(defaultMock.virtualScrollerEl).exists()).toBe(true);

      // Проверяем, что видны только часть опций (виртуализация)
      const visibleOptions = wrapper.findAll(defaultMock.optionEl);
      expect(visibleOptions.length).toBeLessThan(manyOptions.length);
      // Проверяем, что хотя бы первая опция есть
      expect(visibleOptions[0].text()).toContain('Option');
    });

    it('valid: Should add valid class on root if valid prop is true.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          valid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.validModifier);
    });

    it('invalid: Should add invalid class on root if invalid prop is true.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.invalidModifier);
    });

    it('errors: Should render errors if prop invalid and prop errors provided.', () => {
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
      });

      expect(wrapper.findAll(`${defaultMock.errorsEl}-1, ${defaultMock.errorsEl}-2`).length).toBe(
        2,
      );
      expect(wrapper.text()).toContain('Error 1');
      expect(wrapper.text()).toContain('Error 2');
    });

    it('cssClass: Should apply custom root class and generate BEM child classes.', async () => {
      const _defaultMock = new SelectMultipleSelectorTestData(defaultMock.cssClassProp);
      const errors = ['Error 1', 'Error 2'];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.modelValueProp,
          label: defaultMock.labelProp,
          size: defaultMock.sizeProp,
          loading: true,
          valid: true,
          invalid: true,
          errors,
          cssClass: defaultMock.cssClassProp,
        },
      });

      await wrapper.find(_defaultMock.headerEl).trigger('click');

      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.groupEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.labelEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headerEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.headerGroupEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.textEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.inputEl)).exists()).toBe(
        true,
      );
      expect(
        wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.selectedLabelEl)).exists(),
      ).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.loadingEl)).exists()).toBe(
        true,
      );
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.bodyEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.listEl)).exists()).toBe(true);
      expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.optionsEl)).exists()).toBe(
        true,
      );
    });

    it('modifier: Should apply modifier class.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modifier: defaultMock.modifierProp,
        },
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
    });

    it('ariaLabel: Should set aria-label attribute on header element from ariaLabel prop.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          ariaLabel: defaultMock.ariaLabelProp,
        },
      });

      const header = wrapper.find(defaultMock.headerEl);
      expect(header.attributes('aria-label')).toBe(defaultMock.ariaLabelProp);
    });

    it('ariaLabel: Should use default aria-label if ariaLabel prop is not provided.', () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      const header = wrapper.find(defaultMock.headerEl);
      expect(header.attributes('aria-label')).toBe(defaultMock.mockProps.ariaLabel);
    });
  });

  describe('Slots', () => {
    it('label: Should render default label slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
        },
      });

      console.log(wrapper.html());
      expect(wrapper.find(defaultMock.textSelectedEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.textSelectedEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleLabelSlotDefault()).trim(),
      );
    });

    it('label: Should render custom label slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
        },
        slots: {
          label: (await SelectMultipleSelectorTestData.getSelectMultipleLabelSlotCustom()).trim(),
        },
      });

      console.log(wrapper.html());
      expect(wrapper.find(defaultMock.textSelectedEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.textSelectedEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleLabelSlotCustom()).trim(),
      );
    });

    it('options: Should render default options slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          options: defaultMock.optionsExample(),
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');

      expect(wrapper.find(defaultMock.optionsEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.optionsEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleOptionsSlotDefault()).trim(),
      );
    });

    it('options: Should render custom options slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          options: defaultMock.optionsExample(),
        },
        slots: {
          options: '<template #options="{option}">{{ option.value }}</template>',
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');

      expect(wrapper.find(defaultMock.optionsEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.optionsEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleOptionsSlotCustom()).trim(),
      );
    });

    it('empty: Should render default empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          options: [],
        },
      });

      expect(wrapper.find(defaultMock.emptyOptionsEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.emptyOptionsEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleEmptySlotDefault()).trim(),
      );
    });

    it('empty: Should render custom empty slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          options: [],
        },
        slots: {
          empty: await SelectMultipleSelectorTestData.getSelectMultipleEmptySlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.emptyOptionsEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.emptyOptionsEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleEmptySlotCustom()).trim(),
      );
    });

    it('tiles: Should render default tiles slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
          tiles: true,
        },
      });

      expect(wrapper.find(defaultMock.tileEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.tileEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleTilesSlotDefault()).trim(),
      );
    });

    it('tiles: Should render custom tiles slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: [defaultMock.mockProps.options[0], defaultMock.mockProps.options[1]],
          tiles: true,
        },
        slots: {
          tiles: await SelectMultipleSelectorTestData.getSelectMultipleTilesSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.textSelectedEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.textSelectedEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleTilesSlotCustom()).trim(),
      );
    });

    it('multiselectCheckbox: Should render default multiselectCheckbox slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          multiselectCheckbox: true,
        },
      });

      expect(wrapper.find(defaultMock.filterCheckboxEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.filterCheckboxEl).element.innerHTML).toBe(
        (
          await SelectMultipleSelectorTestData.getSelectMultipleMultiselectCheckboxSlotDefault()
        ).trim(),
      );
    });

    it('multiselectCheckbox: Should render custom multiselectCheckbox slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          multiselectCheckbox: true,
        },
        slots: {
          multiselectCheckbox:
            await SelectMultipleSelectorTestData.getSelectMultipleMultiselectCheckboxSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.filterCheckboxEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.filterCheckboxEl).element.innerHTML).toBe(
        (
          await SelectMultipleSelectorTestData.getSelectMultipleMultiselectCheckboxSlotCustom()
        ).trim(),
      );
    });

    it('filterInput: Should render filterInput empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: defaultMock.filterProp,
        },
      });

      expect(wrapper.find(defaultMock.filterEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.filterEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleFilterInputSlotDefault()).trim(),
      );
    });

    it('filterInput: Should render custom filterInput slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: defaultMock.filterProp,
        },
        slots: {
          filterInput: '<input type="text" aria-label="Custom Filter Input">',
        },
      });

      expect(wrapper.find(defaultMock.filterEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.filterEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleFilterInputSlotCustom()).trim(),
      );
    });

    it('emptyFilter: Should render emptyFilter empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: defaultMock.filterProp,
        },
      });

      expect(wrapper.find(defaultMock.emptyFilterEl).exists()).toBeFalsy();

      await wrapper.setProps({ filterValue: defaultMock.filterValueProp });

      expect(wrapper.find(defaultMock.emptyFilterEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.emptyFilterEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleEmptyFilterSlotDefault()).trim(),
      );
    });

    it('emptyFilter: Should render custom emptyFilter slot if provided.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: defaultMock.filterProp,
        },
        slots: {
          emptyFilter: (
            await SelectMultipleSelectorTestData.getSelectMultipleEmptyFilterSlotCustom()
          ).trim(),
        },
      });

      expect(wrapper.find(defaultMock.emptyFilterEl).exists()).toBeFalsy();

      await wrapper.setProps({ filterValue: defaultMock.filterValueProp });

      expect(wrapper.find(defaultMock.emptyFilterEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.emptyFilterEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleEmptyFilterSlotCustom()).trim(),
      );
    });

    it('filterIcon: Should render filterIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      expect(wrapper.find(defaultMock.filterEl).exists()).toBeFalsy();

      await wrapper.setProps({ filter: defaultMock.filterProp });

      expect(wrapper.find(defaultMock.filterEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.filterEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleFilterIconSlotDefault()).trim(),
      );
    });

    it('filterIcon: Should render custom filterIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
        slots: {
          filterIcon: 'Custom filter icon',
        },
      });

      expect(wrapper.find(defaultMock.filterEl).exists()).toBeFalsy();

      await wrapper.setProps({ filter: defaultMock.filterProp });

      expect(wrapper.find(defaultMock.filterEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.filterEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleFilterIconSlotCustom()).trim(),
      );
    });

    it('toggleIcon: Should render toggleIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      expect(wrapper.find(defaultMock.toggleIconEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleToggleIconSlotDefault()).trim(),
      );

      await wrapper.setProps({ modelValue: [defaultMock.optionsExample()[0]] });

      expect(wrapper.find(defaultMock.toggleIconEl).exists()).toBeFalsy();
    });

    it('toggleIcon: Should render custom toggleIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
        slots: {
          toggleIcon: (
            await SelectMultipleSelectorTestData.getSelectMultipleToggleIconSlotCustom()
          ).trim(),
        },
      });

      expect(wrapper.find(defaultMock.toggleIconEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleToggleIconSlotCustom()).trim(),
      );

      await wrapper.setProps({ modelValue: [defaultMock.optionsExample()[0]] });

      expect(wrapper.find(defaultMock.toggleIconEl).exists()).toBeFalsy();
    });

    it('cleanIcon: Should not render cleanIcon empty slot when not filled modelValue.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      expect(wrapper.find(defaultMock.cleanIconEl).exists()).toBeFalsy();
    });

    it('cleanIcon: Should not render cleanIcon empty slot when filled modelValue.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.optionsExample(),
        },
      });

      expect(wrapper.find(defaultMock.cleanIconEl).exists()).toBeFalsy();
    });

    it('cleanIcon: Should render cleanIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          modelValue: defaultMock.optionsExample(),
        },
        slots: {
          cleanIcon: (
            await SelectMultipleSelectorTestData.getSelectMultipleCleanIconSlotCustom()
          ).trim(),
        },
      });

      expect(wrapper.find(defaultMock.cleanIconEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.cleanIconEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleCleanIconSlotCustom()).trim(),
      );
    });

    it('loadingIcon: Should render loadingIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      expect(wrapper.find(defaultMock.loadingIconEl).exists()).toBeFalsy();
      expect(wrapper.find(defaultMock.loadingEl).exists()).toBeFalsy();

      await wrapper.setProps({ loading: true });

      expect(wrapper.find(defaultMock.loadingEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.loadingEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleLoadingIconSlotDefault()).trim(),
      );
    });

    it('loadingIcon: Should render custom loadingIcon empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          loading: true,
        },
        slots: {
          loadingIcon: (
            await SelectMultipleSelectorTestData.getSelectMultipleLoadingIconSlotCustom()
          ).trim(),
        },
      });

      expect(wrapper.find(defaultMock.loadingEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.loadingEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleLoadingIconSlotCustom()).trim(),
      );
    });

    it('loading: Should render loading empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
        },
      });

      expect(wrapper.find(defaultMock.listLoadingEl).exists()).toBeFalsy();

      await wrapper.setProps({ loading: true });

      expect(wrapper.find(defaultMock.listLoadingEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.listLoadingEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleLoadingSlotDefault()).trim(),
      );
    });

    it('loading: Should render custom loading empty slot.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          loading: true,
        },
        slots: {
          loading: (
            await SelectMultipleSelectorTestData.getSelectMultipleLoadingSlotCustom()
          ).trim(),
        },
      });

      expect(wrapper.find(defaultMock.listLoadingEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.listLoadingEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleLoadingSlotCustom()).trim(),
      );
    });

    it('errors: Should render errors slot if provided.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
      });

      await wrapper.setProps({ invalid: true, errors: defaultMock.errorsExample() });

      expect(wrapper.find(defaultMock.errorsEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleErrorsSlotDefault()).trim(),
      );
    });

    it('errors: Should render custom errors empty slot.', async () => {
      const errors = ['Custom Error 1', 'Custom Error 2'];

      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          invalid: true,
          errors,
        },
        slots: {
          errors: await SelectMultipleSelectorTestData.getSelectMultipleErrorsSlotCustom(),
        },
      });

      expect(wrapper.find(defaultMock.errorsEl).exists()).toBeTruthy();
      expect(wrapper.find(defaultMock.errorsEl).element.innerHTML).toBe(
        (await SelectMultipleSelectorTestData.getSelectMultipleErrorsSlotCustom()).trim(),
      );
    });
  });

  describe('Slots', () => {
    it('update:model-value: Should emit update:modelValue on input.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          'onUpdate:modelValue': (e: TSelectMultipleProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');
      await wrapper.find(defaultMock.optionEl).trigger('click');

      expect(wrapper.props('modelValue')).toStrictEqual([defaultMock.optionsExample()[0]]);
      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    });

    it('update:filter-value: Should emit update:model-value-filter on filter input.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          filter: defaultMock.filterProp,
          'onUpdate:filterValue': (e: TSelectMultipleProps['filterValue']) =>
            wrapper.setProps({ filterValue: e }),
        },
      });

      const filterContainer = wrapper.find(defaultMock.filterInputEl);
      const filterInput = filterContainer.find('input');
      await filterInput.setValue(defaultMock.filterValueProp);

      expect(wrapper.props('filterValue')).toBe(defaultMock.filterValueProp);
      expect(wrapper.emitted()).toHaveProperty('update:filterValue');
    });

    it('focus: Should emit focus event on input focus.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      await wrapper.find(defaultMock.headerEl).trigger('focus');

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.focusedModifier);
      expect(wrapper.emitted()).toHaveProperty('focus');
    });

    it('blur: Should emit blur event on input blur.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      await wrapper.find(defaultMock.headerEl).trigger('focus');
      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.focusedModifier);
      expect(wrapper.emitted()).toHaveProperty('focus');

      await wrapper.find(defaultMock.headerEl).trigger('blur');
      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.focusedModifier);
      expect(wrapper.emitted()).toHaveProperty('blur');
    });
  });

  describe('Accessibility: Aria & Roles', () => {
    it('aria: Should set correct aria attributes on header.', () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      const header = wrapper.find(defaultMock.headerEl);
      expect(header.attributes('role')).toBe('button');
      expect(header.attributes('aria-label')).toBe(defaultMock.mockProps.ariaLabel);
      expect(header.attributes('aria-expanded')).toBe('false');
      expect(header.attributes('aria-controls')).toBeDefined();
      expect(header.attributes('aria-disabled')).toBe('false');
      expect(header.attributes('aria-pressed')).toBe('false');
      expect(header.attributes('role')).toBe('button');
    });

    it('Should update aria-expanded and aria-pressed when opened.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      const header = wrapper.find(defaultMock.headerEl);
      await header.trigger('click');
      await nextTick();
      expect(header.attributes('aria-expanded')).toBe('true');
      expect(header.attributes('aria-pressed')).toBe('true');
    });

    it('Should set role="option" and aria-selected for options.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');
      await nextTick();
      const option = wrapper.find(defaultMock.optionEl);
      expect(option.attributes('role')).toBe('option');
      expect(['true', 'false']).toContain(option.attributes('aria-selected'));
    });
  });

  describe('Accessibility: Keyboard Support', () => {
    it('Checking the opening of a droplist by key Space.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Space',
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.openedModifier);
      expect(wrapper.find(defaultMock.headerEl).attributes('aria-expanded')).toBe('true');
      expect(wrapper.find(defaultMock.toggleIconEl).classes()).toContain(
        defaultMock.toggleIconOpenedModifier,
      );
      expect(wrapper.find(defaultMock.bodyEl).classes()).toContain(defaultMock.bodyOpenedModifier);
    });

    it('Checking the opening of a droplist by key Enter.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Enter',
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.openedModifier);
      expect(wrapper.find(defaultMock.headerEl).attributes('aria-expanded')).toBe('true');
      expect(wrapper.find(defaultMock.toggleIconEl).classes()).toContain(
        defaultMock.toggleIconOpenedModifier,
      );
      expect(wrapper.find(defaultMock.bodyEl).classes()).toContain(defaultMock.bodyOpenedModifier);
    });

    it('Checking the closing of a droplist by key Esc.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: defaultMock.mockProps,
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Enter',
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Escape',
      });

      expect(wrapper.find(defaultMock.rootEl).classes()).not.toContain(defaultMock.openedModifier);
      expect(wrapper.find(defaultMock.headerEl).attributes('aria-expanded')).toBe('false');
      expect(wrapper.find(defaultMock.toggleIconEl).classes()).not.toContain(
        defaultMock.toggleIconOpenedModifier,
      );
      expect(wrapper.find(defaultMock.bodyEl).classes()).not.toContain(
        defaultMock.bodyOpenedModifier,
      );
    });

    it('Checking the selection of an option with the ArrowDown and ArrowUp.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          'onUpdate:modelValue': (e: TSelectMultipleProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Space',
      });
      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'ArrowDown',
      });

      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'ArrowDown',
      });

      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).not.toContain(
        defaultMock.optionFocusedModifier,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[1].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'ArrowUp',
      });
      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'ArrowUp',
      });

      expect(wrapper.findAll(defaultMock.optionEl)[2].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );
    });

    it('Checking the selection and removal of an option by key Space.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          'onUpdate:modelValue': (e: TSelectMultipleProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Space',
      });
      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'ArrowDown',
      });
      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Space',
      });

      expect(wrapper.find(defaultMock.selectedLabelEl).element.textContent).toBe(
        defaultMock.optionsExample()[0].label,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionSelectedModifier,
      );
      expect(
        wrapper.findAll(defaultMock.optionEl)[0].attributes().hasOwnProperty('aria-selected'),
      ).toBeTruthy();
      expect(wrapper.findAll(defaultMock.optionEl)[0].attributes('aria-selected')).toBe('true');
      expect(wrapper.findAll(defaultMock.optionEl)[1].attributes('aria-selected')).toBe('false');

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Space',
      });

      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).not.toContain(
        defaultMock.optionSelectedModifier,
      );

      const options = wrapper.findAll(defaultMock.optionEl);
      options.forEach((option) => {
        expect(option.attributes('aria-selected')).toBe('false');
      });
    });

    it('Checking the selection and removal of an option by key Enter.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          ...defaultMock.mockProps,
          'onUpdate:modelValue': (e: TSelectMultipleProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Enter',
      });
      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'ArrowDown',
      });
      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Enter',
      });

      expect(wrapper.find(defaultMock.selectedLabelEl).element.textContent).toBe(
        defaultMock.optionsExample()[0].label,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionSelectedModifier,
      );
      expect(
        wrapper.findAll(defaultMock.optionEl)[0].attributes().hasOwnProperty('aria-selected'),
      ).toBeTruthy();
      expect(wrapper.findAll(defaultMock.optionEl)[0].attributes('aria-selected')).toBe('true');
      expect(wrapper.findAll(defaultMock.optionEl)[1].attributes('aria-selected')).toBe('false');

      await wrapper.find(defaultMock.headerEl).trigger('keydown', {
        key: 'Enter',
      });

      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).toContain(
        defaultMock.optionFocusedModifier,
      );
      expect(wrapper.findAll(defaultMock.optionEl)[0].classes()).not.toContain(
        defaultMock.optionSelectedModifier,
      );

      const options = wrapper.findAll(defaultMock.optionEl);
      options.forEach((option) => {
        expect(option.attributes('aria-selected')).toBe('false');
      });
    });
  });

  describe('Actions with options list', () => {
    it('Checking the options opening.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          modelValue: [],
          options: defaultMock.optionsExample(),
          'onUpdate:modelValue': (e: TSelectMultipleProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.find(defaultMock.headerEl).trigger('click');

      expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.openedModifier);
      expect(wrapper.find(defaultMock.headerEl).attributes('aria-expanded')).toBe('true');
      expect(wrapper.find(defaultMock.toggleIconEl).classes()).toContain(
        defaultMock.toggleIconOpenedModifier,
      );
      expect(wrapper.find(defaultMock.bodyEl).classes()).toContain(defaultMock.bodyOpenedModifier);
    });

    it('Checking the option selection.', async () => {
      const wrapper = mount(SelectMultiple, {
        props: {
          modelValue: [],
          options: defaultMock.optionsExample(),
          'onUpdate:modelValue': (e: TSelectMultipleProps['modelValue']) =>
            wrapper.setProps({ modelValue: e }),
        },
      });

      await wrapper.setProps({ filterValue: defaultMock.filterValueProp });

      await wrapper.find(defaultMock.headerEl).trigger('click');
      await wrapper.find(defaultMock.optionEl).trigger('click');

      expect(wrapper.find(defaultMock.selectedLabelEl).element.textContent).toBe(
        defaultMock.optionsExample()[0].label,
      );
      expect(wrapper.find(defaultMock.optionEl).classes()).toContain(
        defaultMock.optionSelectedModifier,
      );
      expect(wrapper.find(defaultMock.optionEl).attributes('aria-selected')).toBe('true');
      expect(wrapper.find(defaultMock.toggleIconEl).exists()).toBeFalsy();
    });
  });
});
