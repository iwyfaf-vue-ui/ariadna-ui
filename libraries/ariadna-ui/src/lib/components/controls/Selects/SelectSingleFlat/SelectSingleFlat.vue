<template>
  <div ref="selectSingleFlat" :class="componentClasses">
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
              v-model="vModel"
              :id="uniqueID"
              :class="`${props.cssClass}__input`"
              type="text"
              readonly
              hidden
              :disabled="props.disabled"
            />

            <span
              v-if="selectedLabel.length === 0 && props.placeholder"
              :class="`${props.cssClass}__placeholder`"
            >
              {{ props.placeholder }}
            </span>

            <span v-else :class="`${props.cssClass}__selected-text`">
              {{ selectedLabel }}
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
            v-else-if="!props.modelValue"
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
          v-if="!props.loading && (props.filter || slots.filterInput)"
          ref="filterElement"
          :class="`${props.cssClass}__filter`"
        >
          <div :class="`${props.cssClass}__filter-input`">
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
                  <slot name="options" :option="item.data">
                    {{ item.data }}
                  </slot>
                </div>
              </template>
            </VirtualScroller>

            <template v-if="!props.virtualScroller">
              <template v-for="(option, index) in filterOptions" :key="`${option}-${index}`">
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
                  <slot name="options" :option="option">
                    {{ option }}
                  </slot>
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
import { ref, useTemplateRef } from 'vue';

// Types
import type {
  TSelectSingleFlatEmits,
  TSelectSingleFlatProps,
  TSelectSingleFlatSlots,
} from './SelectSingleFlat';
import { ESelectSingleFlatPropsDefault } from './types/SelectSingleFlat.enums';
import type { TVirtualScrollerExposes } from '@/lib/components/data/VirtualScroller/VirtualScroller';

// Composables
import useSelectSingleFlat from './composables/useSelectSingleFlat/useSelectSingleFlat';
import useSelectSingleFlatActions from './composables/useSelectSingleFlatActions/useSelectSingleFlatActions';
import usePosition, {
  usePositionDefaultOptions,
} from '@/lib/composables/elements/usePosition/usePosition';
import { EUsePosition } from '@/lib/composables/elements/usePosition/types/usePosition.enums';
import useOrderedElements from '@/lib/composables/elements/useOrderedElements/useOrderedElements';
import useSelectsFlatFilteredOptions from '../composables/useSelectsFlatFilteredOptions/useSelectsFlatFilteredOptions';
import useSelectsControls from '../composables/useSelectsControls/useSelectsControls';

// Directives
import vOnClickOutside from '@/lib/directives/sensors/OnClickOutside/OnClickOutside';

// Components
import VirtualScroller from '@/lib/components/data/VirtualScroller/VirtualScroller.vue';

const props = withDefaults(defineProps<TSelectSingleFlatProps>(), {
  modelValue: null,
  size: ESelectSingleFlatPropsDefault.SIZE,
  errors: () => [],
  cssClass: ESelectSingleFlatPropsDefault.CSS_CLASS,
  ariaLabel: ESelectSingleFlatPropsDefault.ARIA_LABEL,
});
const slots = defineSlots<TSelectSingleFlatSlots>();
const emits = defineEmits<TSelectSingleFlatEmits>();
const vModel = defineModel<TSelectSingleFlatProps['modelValue']>();
const filterModel = defineModel<NonNullable<TSelectSingleFlatProps['filterValue']>>('filterValue', {
  default: '',
});

const selectSingleFlatRef = useTemplateRef('selectSingleFlat');
const optionsListRef = useTemplateRef('optionsList');
const filterElementRef = useTemplateRef('filterElement');
const virtualScrollerRef = useTemplateRef<TVirtualScrollerExposes>('virtualScroller');

const focusedOptionIndex = ref();

const { calculate, top, left } = usePosition(selectSingleFlatRef, optionsListRef, {
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

const { filterOptions, onFilter } = useSelectsFlatFilteredOptions<
  TSelectSingleFlatProps['options']
>(() => (focusedOptionIndex.value = undefined), filterModel, props.options);

const {
  opened,
  uniqueID,
  listeners,
  componentClasses,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useSelectSingleFlat(props, emits);

const {
  selectedLabel,
  isSelected,
  selectOptionHandler,
  toggleDropdownHandler,
  closeDropdownHandler,
  cleanSelectedData,
  onClickItem,
} = useSelectSingleFlatActions(props, vModel, calculate, opened);

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
</script>
