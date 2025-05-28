<template>
  <Card css-class="ar-card-custom">
    <template #picture>
      <img :src="CardImage" alt="Изображение" />
    </template>

    <template #content>
      Отправьте сообщение, чтобы дать старт проекту, обсудить задачи или идеи. Вы также можете
      отправлять почтовые сообщения по адресу

      <a href="mailto:mail@example.com">mail@example.com</a>
    </template>
  </Card>

  <Card tag="a" href="/">
    <template #picture>
      <img :src="CardImage" alt="Изображение" />
    </template>

    <template #content>
      Отправьте сообщение, чтобы дать старт проекту, обсудить задачи или идеи. Вы также можете
      отправлять почтовые сообщения по адресу
    </template>
  </Card>
</template>

<script setup lang="ts">
// Components
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';

// Static
import CardImage from './two_people_conversation_bubble.svg';
</script>
