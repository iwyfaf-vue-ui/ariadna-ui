<template>
  <Accordion ref="accordion">
    <AccordionItem>
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

  <Button @click="accordionRef?.updateBy(1, true)">Open 2 item</Button>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef } from 'vue';

// Components
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

const accordionRef = useTemplateRef<InstanceType<typeof Accordion>>('accordion');
</script>
