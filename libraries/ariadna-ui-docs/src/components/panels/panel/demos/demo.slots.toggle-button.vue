<template>
  <Panel header="Custom toggle button" toggleable>
    <template #toggleButton="{ toggleCollapsed, isCollapsed }">
      <Button :modifier="'secondary'" @click="toggleCollapsed">
        {{ isCollapsed ? 'Collapsed it' : 'UnCollapse' }}
      </Button>
    </template>

    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto autem, distinctio dolorem
    ea esse et fuga harum illo ipsa libero, maxime minus nemo omnis optio perferendis perspiciatis
    quidem soluta tenetur.
  </Panel>
</template>

<script setup lang="ts">
// Components
import Panel from '@iwyfaf-vue-ui/ariadna-ui/Panel';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
