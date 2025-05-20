<template>
  <div
    v-on-click-outside="outsideClickHandler"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      width: boxSize + 'px',
      height: boxSize + 'px',
      padding: '1rem',
      borderRadius: '5px',
      backgroundColor: boxColor,
      transition: 'all 0.5s ease',
    }"
  >
    Кликни вне меня
  </div>

  <div
    v-on-click-outside="outsideClickHandler2"
    :style="{
      display: 'flex',
      justifyContent: 'center',
      width: boxSize2 + 'px',
      height: boxSize2 + 'px',
      padding: '1rem',
      borderRadius: '5px',
      backgroundColor: boxColor2,
      transition: 'all 0.5s ease',
    }"
  >
    Кликни вне меня
  </div>
</template>

<script setup lang="ts">
// Directives
import vOnClickOutside from '@iwyfaf-vue-ui/ariadna-ui/OnClickOutside';

const boxSize = ref(100);
const boxColor = ref('#0d7f56');

const boxSize2 = ref(100);
const boxColor2 = ref('#0d7f56');

const outsideClickHandler = (): void => {
  boxSize.value = Math.floor(Math.random() * (250 - 100 + 1) + 100);
  boxColor.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const outsideClickHandler2 = (): void => {
  boxSize2.value = Math.floor(Math.random() * (250 - 100 + 1) + 100);
  boxColor2.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
</script>
