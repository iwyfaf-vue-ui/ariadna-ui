<template>
  <Card>
    <template #picture>
      <img :src="CardImage" alt="Изображение" />
    </template>
  </Card>
</template>

<script setup lang="ts">
// Components
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';

// Static
import CardImage from './two_people_conversation_bubble.svg';
</script>
