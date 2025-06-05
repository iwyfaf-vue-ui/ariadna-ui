<template>
  <Accordion>
    <AccordionItem aria-label="Item 1">
      <template #header> Item 1 </template>
      <p>Item 1 content</p>
    </AccordionItem>

    <AccordionItem>
      <template #header> Item 2 </template>
      <p>Item 2 content</p>
    </AccordionItem>

    <AccordionItem>
      <template #header> Item 3 </template>
      <p>Item 3 content</p>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
// Components
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
</script>
