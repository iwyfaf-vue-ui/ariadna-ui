<template>
  <h2>Каждый слот реализуется отдельно</h2>

  <Tabs :tabs="tabs">
    <template #label-0="{ item, selected }: TTabsSlotsLabel<TTab>">
      <span style="color: red">{{ item.title.toUpperCase() }} is selected: {{ selected }}</span>
    </template>

    <template #label-1="{ item, selected }: TTabsSlotsLabel<TTab>">
      <span style="color: green">{{ item.title.toUpperCase() }} is selected: {{ selected }}</span>
    </template>
  </Tabs>

  <h2>Или итеративно</h2>

  <Tabs :tabs="tabs">
    <template
      v-for="(tab, idx) in tabs"
      :key="idx"
      #[`label-${idx}`]="{ item, selected }: TTabsSlotsLabel<TTab>"
    >
      <span :style="getTabStyle(idx)"
        >{{ item.title.toUpperCase() }} is selected: {{ selected }}</span
      >
    </template>
  </Tabs>
</template>

<script setup lang="ts">
// Components
import Tabs from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

// Types
import type { TTabsSlotsLabel } from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

type TTab = {
  title: string;
};

const tabs: Array<TTab> = [
  {
    title: 'Title I',
  },
  {
    title: 'Title II',
  },
  {
    title: 'Title III',
  },
  {
    title: 'Title IIII',
  },
];

const getTabStyle = (idx: number) => {
  const styles = [{ color: 'red' }, { color: 'green' }];
  return styles[idx] || {};
};
</script>
