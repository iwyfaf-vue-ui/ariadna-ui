<template>
  <Panel header="Collapsed emit" toggleable @toggle="onToggle">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam aspernatur commodi
    consectetur dicta, dignissimos dolor exercitationem hic laborum laudantium magnam molestias
    officia qui quis quod, repellat tempore vero voluptas.
  </Panel>
</template>

<script setup lang="ts">
// Components
import Panel from '@iwyfaf-vue-ui/ariadna-ui/Panel';
import type { TPanelToggleEvent } from '@iwyfaf-vue-ui/ariadna-ui/Panel';

function onToggle(payload: TPanelToggleEvent) {
  console.log(payload);
}
</script>
