<template>
  <Accordion>
    <AccordionItem>
      <template #header> Item 1 </template>

      <template #activator="{ toggle }">
        <Button @click.stop="toggle">Toggle it</Button>
      </template>

      <p>Default slot</p>
    </AccordionItem>
  </Accordion>
</template>

<script setup lang="ts">
// Components
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
