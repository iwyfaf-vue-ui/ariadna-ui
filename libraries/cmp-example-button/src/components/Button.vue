<template>
  <button class="btn-cmp" :class="colorClasses">tests</button>
</template>

<script setup lang="ts">
import { computed, ComputedRef } from 'vue';

/**
 * @description Props types
 */
type Types = string;

/**
 * @description Props interface
 */
export interface ButtonInterface {
  color: Types;
}

const { color = 'blue' } = defineProps<ButtonInterface>();

const colorClasses: ComputedRef<object> = computed((): object => {
  return {
    'btn-cmp--color-blue': color === 'blue',
    'btn-cmp--color-red': color === 'red',
    'btn-cmp--color-black': color === 'black',
  };
});
</script>

<style lang="scss">
$this: '.btn-cmp';
#{$this} {
  color: white;
}

#{$this}--color-blue {
  color: white;
  background: cornflowerblue;
}

#{$this}--color-red {
  color: white;
  background: darkred;
}

#{$this}--color-black {
  color: white;
  background: black;
}
</style>
