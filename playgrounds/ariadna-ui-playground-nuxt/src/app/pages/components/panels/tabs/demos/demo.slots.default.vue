<template>
  <h2>Каждый слот реализуется отдельно</h2>
  <Tabs :tabs="tabs">
    <template #default-0="{ item }: TTabsSlotsDefault<TTab>">
      <span style="color: red">{{ item.title.toUpperCase() }}</span>
    </template>

    <template #default-1="{ item }: TTabsSlotsDefault<TTab>">
      <span style="color: green">{{ item.title.toUpperCase() }}</span>
    </template>
  </Tabs>

  <h2>Или итеративно</h2>
  <Tabs :tabs="tabs">
    <template
      v-for="(tab, idx) in tabs"
      :key="idx"
      #[`default-${idx}`]="{ item }: TTabsSlotsDefault<TTab>"
    >
      <span :style="getTabStyle(idx)">{{ item.title.toUpperCase() }}</span>
    </template>
  </Tabs>
</template>

<script setup lang="ts">
// Components
import Tabs from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

// Types
import type { TTabsSlotsDefault } from '@iwyfaf-vue-ui/ariadna-ui/Tabs';

type TTab = {
  title: string;
  content: string;
};

const tabs: Array<TTab> = [
  {
    title: 'Title I',
    content:
      '                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo\n' +
      '                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Title II',
    content:
      '                      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim\n' +
      '                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.',
  },
  {
    title: 'Title III',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa\n' +
      '                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.',
  },
  {
    title: 'Title IIII',
    content:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa\n' +
      '                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.',
  },
];

const getTabStyle = (idx: number) => {
  const styles = [{ color: 'red' }, { color: 'green' }];
  return styles[idx] || {};
};
</script>
