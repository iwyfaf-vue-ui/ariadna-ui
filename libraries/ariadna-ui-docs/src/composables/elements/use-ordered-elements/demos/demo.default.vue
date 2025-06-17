<template>
  <div class="elements-wrapper">
    <Button @click="addElement">Добавить элемент</Button>
    <Button @click="clearElements">Очистить</Button>

    <div class="elements-container">
      <div v-for="(el, index) in elements" :key="index" class="element-box">Элемент {{ el }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import useOrderedElements from '@iwyfaf-vue-ui/ariadna-ui/useOrderedElements';

interface MockElement extends HTMLElement {
  customId: number;
}

const { elements, fillElements, clearElements } = useOrderedElements<MockElement>();

const counter = ref(0);

const addElement = () => {
  const newId = counter.value++;
  const mockElement = { customId: newId } as MockElement;

  fillElements(mockElement, elements.value.length);
};
</script>

<style scoped>
.elements-wrapper {
  width: 100%;
}

.elements-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 12px;
  font-size: 12px;
  width: 100%;
}

.element-box {
  width: 120px;
  height: 120px;
  margin: 1rem;
  background-color: #051725;
  border: 1px solid #007acc;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-weight: bold;
  border-radius: 4px;
}
</style>
