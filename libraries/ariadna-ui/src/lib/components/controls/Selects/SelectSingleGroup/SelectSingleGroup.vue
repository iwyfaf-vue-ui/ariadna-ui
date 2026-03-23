<template>
  <div ref="selectSingleGroup" :class="componentClasses">
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
            <template
              v-for="(option, groupIndex) in filterOptions"
              :key="`${option[props.optionGroupLabel]}-${groupIndex}`"
            >
              <div
                :class="`${props.cssClass}__options-group`"
                role="group"
                :ref="(element) => fillGroupsInList(element as HTMLDivElement, groupIndex)"
              >
                <div :class="`${props.cssClass}__options-group-label`">
                  <slot name="optionsGroup" :option="option">
                    {{ option[props.optionGroupLabel] }}
                  </slot>
                </div>

                <div
                  v-for="(item, itemIndex) in option[props.optionGroupChildren]"
                  :key="`${item[props.optionLabel]}-${itemIndex}`"
                  :class="{
                    [`${props.cssClass}__option`]: true,
                    [`${props.cssClass}__option--selected`]: isSelected(item),
                    [`${props.cssClass}__option--focused`]:
                      focusedGroupIndex === groupIndex && focusedGroupOptionIndex === itemIndex,
                  }"
                  :aria-selected="isSelected(item)"
                  role="option"
                  @click="onClickItem(item)"
                >
                  <slot name="options" :option="option">
                    {{ item[props.optionLabel] }}
                  </slot>
                </div>
              </div>
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
  TSelectSingleGroupEmits,
  TSelectSingleGroupProps,
  TSelectSingleGroupSlots,
} from './SelectSingleGroup';
import {
  ESelectSingleGroupConfig,
  ESelectSingleGroupPropsDefault,
} from './types/SelectSingleGroup.enums';

// Composables
import useSelectSingleGroup from './composables/useSelectSingleGroup/useSelectSingleGroup';
import useSelectSingleGroupActions from './composables/useSelectSingleGroupActions/useSelectSingleGroupActions';
import useSelectSingleGroupScroll from './composables/useSelectSingleGroupScroll/useSelectSingleGroupScroll';
import usePosition, {
  usePositionDefaultOptions,
} from '@/lib/composables/elements/usePosition/usePosition';
import { EUsePosition } from '@/lib/composables/elements/usePosition/types/usePosition.enums';
import useOrderedElements from '@/lib/composables/elements/useOrderedElements/useOrderedElements';
import useSelectsFilteredOptions from '../composables/useSelectsFilteredOptions/useSelectsFilteredOptions';
import useSelectsGroupControls from '../composables/useSelectsGroupControls/useSelectsGroupControls';
import useSelectsCatchErrors from '../composables/useSelectsCatchErrors/useSelectsCatchErrors';

// Directives
import vOnClickOutside from '@/lib/directives/sensors/OnClickOutside/OnClickOutside';

const props = withDefaults(defineProps<TSelectSingleGroupProps>(), {
  modelValue: null,
  optionLabel: ESelectSingleGroupPropsDefault.OPTION_LABEL,
  optionValue: null,
  optionGroupLabel: ESelectSingleGroupPropsDefault.OPTION_GROUP_LABEL,
  optionGroupChildren: ESelectSingleGroupPropsDefault.OPTION_GROUP_CHILDREN,
  size: ESelectSingleGroupPropsDefault.SIZE,
  errors: () => [],
  cssClass: ESelectSingleGroupPropsDefault.CSS_CLASS,
  ariaLabel: ESelectSingleGroupPropsDefault.ARIA_LABEL,
});
const slots = defineSlots<TSelectSingleGroupSlots>();
const emits = defineEmits<TSelectSingleGroupEmits>();
const vModel = defineModel<TSelectSingleGroupProps['modelValue']>();
const filterModel = defineModel<NonNullable<TSelectSingleGroupProps['filterValue']>>(
  'filterValue',
  {
    default: '',
  },
);

const selectSingleGroupRef = useTemplateRef('selectSingleGroup');
const optionsListRef = useTemplateRef('optionsList');
const filterElementRef = useTemplateRef('filterElement');

const optionsInGroup = ref();
const focusedGroupIndex = ref();
const focusedGroupOptionIndex = ref();

const { calculate, top, left } = usePosition(selectSingleGroupRef, optionsListRef, {
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

const { elements: groupsInList, fillElements: fillGroupsInList } = useOrderedElements();

const { filterOptions, onFilter } = useSelectsFilteredOptions(
  () => {
    focusedGroupIndex.value = undefined;
    focusedGroupOptionIndex.value = undefined;
  },
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
} = useSelectSingleGroup(props, emits);

const {
  selectedLabel,
  isSelected,
  selectGroupOptionHandler,
  toggleDropdownHandler,
  closeDropdownHandler,
  cleanSelectedData,
  onClickItem,
} = useSelectSingleGroupActions(props, vModel, calculate, opened);

const { onKeyDownOrUpHandler, onKeySpaceOrEnterHandler } = useSelectsGroupControls(
  props,
  opened,
  selectGroupOptionHandler,
  optionsListRef,
  filterElementRef,
  filterOptions,
  groupsInList,
  optionsInGroup,
  focusedGroupIndex,
  focusedGroupOptionIndex,
);

useSelectSingleGroupScroll(
  props,
  vModel,
  opened,
  filterOptions,
  isSelected,
  groupsInList,
  optionsListRef,
  filterElementRef,
);

useSelectsCatchErrors(props, ESelectSingleGroupConfig.NAME, true);
</script>
