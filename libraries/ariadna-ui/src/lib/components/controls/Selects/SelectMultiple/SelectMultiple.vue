<template>
  <div ref="selectMultiple" :class="componentClasses">
    <div :class="`${props.cssClass}__group`">
      <div
        v-if="props.label"
        :class="`${props.cssClass}__label`"
        @click.stop="toggleDropdownHandler"
      >
        {{ props.label }}
      </div>

      <div
        v-on-click-outside="closeDropdownHandler"
        :class="`${props.cssClass}__header`"
        :tabindex="props.disabled ? -1 : 0"
        role="button"
        :aria-label="props.ariaLabel"
        :aria-expanded="opened"
        :aria-controls="uniqueID"
        :aria-disabled="props.disabled"
        :aria-pressed="opened"
        v-on="listeners"
        @click="toggleDropdownHandler"
        @keydown.prevent.space="onKeySpaceOrEnterHandler"
        @keydown.prevent.enter="onKeySpaceOrEnterHandler"
        @keydown.prevent.esc="closeDropdownHandler"
        @keydown.prevent.up="onKeyDownOrUpHandler"
        @keydown.prevent.down="onKeyDownOrUpHandler"
      >
        <div :class="`${props.cssClass}__header-group`">
          <div :class="`${props.cssClass}__text`">
            <input
              v-model="selectedOptions"
              :id="uniqueID"
              :class="`${props.cssClass}__input`"
              type="text"
              readonly
              hidden
              :disabled="props.disabled"
            />

            <span :class="`${props.cssClass}__text-selected`">
              <slot
                name="label"
                :selectedOptions="selectedOptions ?? []"
                :label="generatedLabel"
                :remove="removeLabel"
              >
                <span
                  v-if="selectedOptions.length === 0 && props.placeholder"
                  :class="`${props.cssClass}__placeholder`"
                >
                  {{ props.placeholder }}
                </span>

                <span v-else-if="!props.tiles" :class="`${props.cssClass}__selected-label`">
                  {{ generatedLabel }}
                </span>

                <template v-else>
                  <slot
                    v-if="showGeneratedLabel"
                    name="tiles"
                    :selectedOptions="selectedOptions"
                    :removeTile="removeLabel"
                    :optionLabel="props.optionLabel"
                  >
                    <span
                      :class="`${props.cssClass}__tile`"
                      v-for="(option, index) in selectedOptions"
                      :key="`${option[props.optionLabel]}-${index}`"
                      @click.stop="removeLabel(option)"
                    >
                      {{ option[props.optionLabel] }}
                    </span>
                  </slot>

                  <template v-else>
                    {{ generatedLabel }}
                  </template>
                </template>
              </slot>
            </span>
          </div>
        </div>

        <Transition mode="out-in" :name="`${props.cssClass}__animation`">
          <div v-if="props.loading" :class="`${props.cssClass}__loading`">
            <slot name="loadingIcon">
              <div :class="`${props.cssClass}__loading-icon`"></div>
            </slot>
          </div>

          <div
            v-else-if="hideCleanButton"
            :class="{
              [`${props.cssClass}__toggle-icon`]: true,
              [`${props.cssClass}__toggle-icon--opened`]: opened,
            }"
            aria-hidden="true"
          >
            <slot v-if="!!slots.toggleIcon" name="toggleIcon"></slot>
          </div>

          <template v-else>
            <div
              v-if="!!slots.cleanIcon"
              :class="`${props.cssClass}__clean-icon`"
              aria-hidden="true"
              @click="cleanSelectedData"
            >
              <slot name="cleanIcon"></slot>
            </div>
          </template>
        </Transition>
      </div>

      <div
        :class="{
          [`${props.cssClass}__body`]: true,
          [`${props.cssClass}__body--opened`]: opened,
        }"
        :style="`top: ${top}px; left: ${left}px`"
        @click.stop
        @touchstart.stop
        @touchend.stop
      >
        <div
          v-if="!props.loading && (props.multiselectCheckbox || props.filter || slots.filterInput)"
          ref="filterElement"
          :class="`${props.cssClass}__filter`"
        >
          <div v-if="props.multiselectCheckbox" :class="`${props.cssClass}__filter-checkbox`">
            <slot
              name="multiselectCheckbox"
              :select="onChangeMultiselectCheckbox"
              :checked="multiselectCheckboxChecked"
            >
              <Checkbox
                :model-value="multiselectCheckboxChecked"
                :modifier="props.modifier"
                :aria-label="multiselectCheckboxChecked ? 'Unselect all' : 'Select all'"
                @change="onChangeMultiselectCheckbox"
              />
            </slot>
          </div>

          <div v-if="props.filter || slots.filterInput" :class="`${props.cssClass}__filter-input`">
            <slot name="filterInput" :onFilter="onFilter">
              <label :for="`${uniqueID}_filter`"></label>
              <input
                v-model="filterModel"
                :id="`${uniqueID}_filter`"
                type="text"
                aria-label="Filtering elements"
              />
            </slot>
          </div>

          <div v-if="!!slots.filterIcon" :class="`${props.cssClass}__filter-icon`">
            <slot name="filterIcon"> Filter icon </slot>
          </div>
        </div>

        <div ref="optionsList" :class="`${props.cssClass}__list`">
          <div
            v-if="!props.loading && props.options.length === 0"
            :class="`${props.cssClass}__empty-options`"
          >
            <slot name="empty">There is no options</slot>
          </div>

          <div
            v-if="!props.loading && props.filter && filterOptions.length === 0"
            :class="`${props.cssClass}__empty-filter`"
          >
            <slot name="emptyFilter">No filtering results found</slot>
          </div>

          <div v-if="props.loading" :class="`${props.cssClass}__list-loading`">
            <slot name="loading">
              <div :class="`${props.cssClass}__list-loading-icon`">Loading...</div>
            </slot>
          </div>

          <div v-if="opened && props.options" :class="`${props.cssClass}__options`" role="listbox">
            <VirtualScroller
              v-if="props.virtualScroller"
              ref="virtualScroller"
              v-bind="props.virtualScroller"
              :item-height="props.virtualScroller.itemHeight"
              :items="filterOptions"
              :css-class="`${props.cssClass}-virtual-scroller`"
            >
              <template #default="{ item }">
                <div
                  :ref="(element) => fillElements(element as HTMLDivElement, item.index)"
                  :class="{
                    [`${props.cssClass}__option`]: true,
                    [`${props.cssClass}__option--selected`]: isSelected(item.data),
                    [`${props.cssClass}__option--focused`]: focusedOptionIndex === item.index,
                  }"
                  :aria-selected="isSelected(item.data)"
                  @click="onClickItem(item.data)"
                  role="option"
                >
                  <div :class="`${props.cssClass}__option-checkbox`">
                    <slot name="options" :option="item.data" :checked="isSelected(item.data)">
                      <Checkbox
                        :model-value="isSelected(item.data)"
                        :aria-label="item.data[props.optionLabel as keyof typeof item.data]"
                      />

                      {{ item.data[props.optionLabel] }}
                    </slot>
                  </div>
                </div>
              </template>
            </VirtualScroller>

            <template v-if="!props.virtualScroller">
              <template
                v-for="(option, index) in filterOptions"
                :key="`${option[props.optionLabel]}-${index}`"
              >
                <div
                  :ref="(element) => fillElements(element as HTMLDivElement, index)"
                  :class="{
                    [`${props.cssClass}__option`]: true,
                    [`${props.cssClass}__option--selected`]: isSelected(option),
                    [`${props.cssClass}__option--focused`]: focusedOptionIndex === index,
                  }"
                  :aria-selected="isSelected(option)"
                  role="option"
                  @click="onClickItem(option)"
                >
                  <div :class="`${props.cssClass}__option-checkbox`">
                    <slot name="options" :option="option" :checked="isSelected(option)">
                      <Checkbox
                        :model-value="isSelected(option)"
                        :modifier="props.modifier"
                        :aria-label="option[props.optionLabel as keyof typeof option]"
                      />

                      {{ option[props.optionLabel as keyof typeof option] }}
                    </slot>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>

    <Transition
      :name="`${cssClass}__errors-expand`"
      @enter="onExpandEnter"
      @after-enter="onExpandAfterEnter"
      @before-leave="onExpandBeforeLeave"
    >
      <div v-if="props.invalid && props.errors.length" :class="`${props.cssClass}__errors`">
        <slot name="errors" :errors="props.errors">
          <div
            v-for="(error, i) in props.errors"
            :key="`error-${i + 1}`"
            :class="`${props.cssClass}__errors-${i + 1}`"
          >
            {{ error }}
          </div>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// Vue
import { computed, ref, useTemplateRef } from 'vue';

// Types
import type {
  TSelectMultipleProps,
  TSelectMultipleSlots,
  TSelectMultipleEmits,
} from './SelectMultiple';
import {
  ESelectMultipleNumberConfig,
  ESelectMultiplePropsDefault,
} from './types/SelectMultiple.enums';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

// Composables
import usePosition, {
  usePositionDefaultOptions,
} from '@/lib/composables/elements/usePosition/usePosition';
import { EUsePosition } from '@/lib/composables/elements/usePosition/types/usePosition.enums';
import useOrderedElements from '@/lib/composables/elements/useOrderedElements/useOrderedElements';
import useSelectMultiple from './composables/useSelectMultiple/useSelectMultiple';
import useSelectMultipleCheckbox from './composables/useSelectMultipleCheckbox/useSelectMultipleCheckbox';
import useSelectMultipleActions from './composables/useSelectMultipleActions/useSelectMultipleActions';
import useSelectsFilteredOptions from '../composables/useSelectsFilteredOptions/useSelectsFilteredOptions';
import useSelectsControls from '../composables/useSelectsControls/useSelectsControls';
import useSelectsCatchErrors from '../composables/useSelectsCatchErrors/useSelectsCatchErrors';

// Directives
import vOnClickOutside from '@/lib/directives/sensors/OnClickOutside/OnClickOutside';

// Components
import VirtualScroller from '@/lib/components/data/VirtualScroller/VirtualScroller.vue';
import Checkbox from '@/lib/components/controls/Checkbox/Checkbox.vue';

const props = withDefaults(defineProps<TSelectMultipleProps>(), {
  modelValue: () => [],
  optionLabel: ESelectMultiplePropsDefault.OPTION_LABEL,
  optionValue: null,
  size: ESelectMultiplePropsDefault.SIZE,
  errors: () => [],
  cssClass: ESelectMultiplePropsDefault.CSS_CLASS,
  ariaLabel: ESelectMultiplePropsDefault.ARIA_LABEL,
});
const slots = defineSlots<TSelectMultipleSlots>();
const emits = defineEmits<TSelectMultipleEmits>();
const vModel = defineModel<NonNullable<TSelectMultipleProps['modelValue']>>('modelValue', {
  default: [],
});
const filterModel = defineModel<NonNullable<TSelectMultipleProps['filterValue']>>('filterValue', {
  default: '',
});

const selectMultipleRef = useTemplateRef('selectMultiple');
const optionsListRef = useTemplateRef('optionsList');
const filterElementRef = useTemplateRef('filterElement');
const virtualScrollerRef = useTemplateRef<TVirtualScrollerExposes>('virtualScroller');

const focusedOptionIndex = ref();

const { calculate, top, left } = usePosition(selectMultipleRef, optionsListRef, {
  ...usePositionDefaultOptions,
  positionOrder: [EUsePosition.BOTTOM, EUsePosition.TOP],
  indents: {
    ...usePositionDefaultOptions.indents,
    [EUsePosition.TOP]: ({ isRightPlace, positionLeft, positionRight }) => [
      isRightPlace() ? positionRight() : positionLeft(),
      5,
    ],
    [EUsePosition.BOTTOM]: ({ isRightPlace, positionLeft, positionRight }) => [
      isRightPlace() ? positionRight() : positionLeft(),
      5,
    ],
  },
});

const { elements: optionsInList, fillElements } = useOrderedElements();

const { filterOptions, onFilter } = useSelectsFilteredOptions<TSelectMultipleProps['options']>(
  () => (focusedOptionIndex.value = undefined),
  filterModel,
  computed(() => props.options),
  props.filter?.filterLabel || [],
);

const {
  opened,
  uniqueID,
  listeners,
  componentClasses,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useSelectMultiple(props, emits);

const { multiselectCheckboxChecked, onChangeMultiselectCheckbox } = useSelectMultipleCheckbox(
  vModel,
  props,
);

const {
  selectedOptions,
  generatedLabel,
  showGeneratedLabel,
  hideCleanButton,
  removeLabel,
  selectOptionHandler,
  cleanSelectedData,
  toggleDropdownHandler,
  closeDropdownHandler,
  onClickItem,
  isSelected,
} = useSelectMultipleActions(props, vModel, calculate, opened);

const { onKeyDownOrUpHandler, onKeySpaceOrEnterHandler } = useSelectsControls(
  props,
  opened,
  selectOptionHandler,
  optionsListRef,
  optionsInList,
  filterElementRef,
  virtualScrollerRef,
  focusedOptionIndex,
  filterOptions,
);

useSelectsCatchErrors(props, ESelectMultipleNumberConfig.NAME);
</script>
