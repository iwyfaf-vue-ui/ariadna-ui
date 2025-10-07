<template>
  <div ref="inputPassword" :class="componentClasses">
    <div :class="`${props.cssClass}__group`">
      <label v-if="props.label" :for="uniqueID" :class="`${props.cssClass}__label`">
        {{ props.label }}
      </label>

      <input
        v-model="vModel"
        :type="inputType"
        :id="uniqueID"
        :placeholder="defaultPlaceholder"
        :autocomplete="props.autocomplete ? 'on' : 'off'"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :name="props.name"
        :class="`${props.cssClass}__input`"
        v-on="listeners"
      />

      <div
        v-if="props.showPasswordToggle"
        :class="`${props.cssClass}__toggle-button`"
        @click="togglePassword"
      >
        <slot name="toggleButton" :visible="showPassword">
          {{ showPassword ? 'Hide' : 'Show' }}
        </slot>
      </div>
    </div>

    <div v-if="props.rules.length > 0" ref="meterPanel" :class="meterPanelClasses">
      <slot name="meter" :percentage="passwordDifficultyPercentage" :cssClass="props.cssClass">
        <div :class="`${props.cssClass}__progress-bar`">
          <div
            :class="`${props.cssClass}__progress-bar-item`"
            :style="`width: ${passwordDifficultyPercentage}%`"
          />
        </div>

        <slot name="meterLabel" :percentage="passwordDifficultyPercentage">
          <p v-if="passwordDifficultyPercentage < 50">Not safe</p>
          <p v-else>Safe</p>
        </slot>
      </slot>

      <div v-if="conditionsNotComplete.length" :class="`${props.cssClass}__condition-messages`">
        <slot
          name="conditionsNotMet"
          :percentage="passwordDifficultyPercentage"
          :conditionsNotComplete="conditionsNotComplete"
        >
          <p
            :class="`${props.cssClass}__condition-messages-item`"
            v-for="condition in conditionsNotComplete"
            :key="condition.message"
          >
            - {{ condition.message }}
          </p>
        </slot>
      </div>
    </div>

    <div v-if="!!slots.placeholder" :class="`${props.cssClass}__placeholder`">
      <slot name="placeholder" />
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
import { useTemplateRef, watch } from 'vue';

// Types
import type {
  TInputPasswordProps,
  TInputPasswordSlots,
  TInputPasswordEmits,
} from './InputPassword';
import { EInputPasswordPropsDefault } from './types/InputPassword.enums';

// Composables
import useInputPasswordMeterPanel from './composables/useInputPasswordMeterPanel/useInputPasswordMeterPanel';
import useInputPassword from './composables/useInputPassword/useInputPassword';
import useInputPasswordRules from './composables/useInputPasswordRules/useInputPasswordRules';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TInputPasswordProps>(), {
  modelValue: null,
  size: EInputPasswordPropsDefault.SIZE,
  rules: () => [],
  errors: () => [],
  cssClass: EInputPasswordPropsDefault.CSS_CLASS,
});
const slots = defineSlots<TInputPasswordSlots>();
const emits = defineEmits<TInputPasswordEmits>();
const vModel = defineModel<TInputPasswordProps['modelValue']>();

const inputPasswordRef = useTemplateRef('inputPassword');
const meterPanelRef = useTemplateRef('meterPanel');

const { openMeterPanel, closeMeterPanel, meterPanelClasses } = useInputPasswordMeterPanel(
  props,
  inputPasswordRef,
  meterPanelRef,
);

const {
  showPassword,
  uniqueID,
  defaultPlaceholder,
  inputType,
  listeners,
  componentClasses,
  togglePassword,
  onExpandEnter,
  onExpandAfterEnter,
  onExpandBeforeLeave,
} = useInputPassword(props, slots, emits, openMeterPanel, closeMeterPanel);

const { conditionsNotComplete, passwordDifficultyPercentage } = useInputPasswordRules(props);

watch(vModel, () => {
  closeMeterPanel();
  openMeterPanel();
});
</script>
