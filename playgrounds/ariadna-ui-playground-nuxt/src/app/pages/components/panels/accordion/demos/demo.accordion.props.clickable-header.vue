<template>
  <Accordion :clickable-header="false">
    <AccordionItem>
      <template #header> Item 1 </template>

      <template #activator="{ toggle }">
        <Button @click="toggle">Toggle it</Button>
      </template>

      <p>Item 1 content</p>
    </AccordionItem>

    <AccordionItem>
      <template #header> Item 2 </template>

      <template #activator="{ toggle }">
        <Button @click="toggle">Toggle it</Button>
      </template>

      <p>Item 2 content</p>
    </AccordionItem>

    <AccordionItem>
      <template #header> Item 3 </template>

      <template #activator="{ toggle }">
        <Button @click="toggle">Toggle it</Button>
      </template>

      <p>Item 3 content</p>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
// Components
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
