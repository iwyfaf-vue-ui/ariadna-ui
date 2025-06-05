<template>
  <Accordion>
    <AccordionItem>
      <template #header="{ opened }"> Item {{ opened ? 'opened' : 'closed' }} </template>

      <p>Default slot</p>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
// Components
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
</script>
