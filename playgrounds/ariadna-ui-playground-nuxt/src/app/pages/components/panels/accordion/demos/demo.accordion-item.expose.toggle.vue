<template>
  <Accordion>
    <AccordionItem>
      <template #header> Item 1 </template>
      <p>Item 1 content</p>
    </AccordionItem>

    <AccordionItem ref="accordionItem">
      <template #header> Item 2 </template>
      <p>Item 2 content</p>
    </AccordionItem>

    <AccordionItem>
      <template #header> Item 3 </template>
      <p>Item 3 content</p>
    </AccordionItem>
  </Accordion>

  <Button @click="accordionItemRef?.toggle">Toggle Item 2</Button>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from 'vue';

// Components
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const accordionItemRef = useTemplateRef<InstanceType<typeof AccordionItem>>('accordionItem');
</script>
