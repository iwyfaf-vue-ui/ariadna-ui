<template>
  <Card :symbols="{ all: 1502, visible: 200 }">
    <template #picture>
      <img :src="CardImage" alt="Изображение" />
    </template>

    <template #contentHeader>
      <h2>Свяжите свои слова с работой</h2>
    </template>

    <template #content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dolores ducimus earum eos
      illum laborum magnam nobis odio placeat possimus. Adipisci debitis ipsam magni, nemo officiis
      perferendis recusandae sequi sit? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Doloremque dolores ducimus earum eos illum laborum magnam nobis odio placeat possimus.
      Adipisci debitis ipsam magni, nemo officiis perferendis recusandae sequi sit? Lorem ipsum
      dolor sit amet, consectetur adipisicing elit. Doloremque dolores ducimus earum eos illum
      laborum magnam nobis odio placeat possimus. Adipisci debitis ipsam magni, nemo officiis
      perferendis recusandae sequi sit? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Doloremque dolores ducimus earum eos illum laborum magnam nobis odio placeat possimus.
      Adipisci debitis ipsam magni, nemo officiis perferendis recusandae sequi sit? Lorem ipsum
      dolor sit amet, consectetur adipisicing elit. Doloremque dolores ducimus earum eos illum
      laborum magnam nobis odio placeat possimus. Adipisci debitis ipsam magni, nemo officiis
      perferendis recusandae sequi sit? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Doloremque dolores ducimus earum eos illum laborum magnam nobis odio placeat possimus.
      Adipisci debitis ipsam magni, nemo officiis perferendis recusandae sequi sit?
    </template>

    <template #contentFooter="{ isCollapsed, toggleCollapsed }">
      <Button @click="toggleCollapsed">
        {{ isCollapsed ? 'Развернуть' : 'Свернуть' }}
      </Button>
    </template>

    <template #footer> (c) Copyrights </template>
  </Card>
</template>

<script setup lang="ts">
// Components
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Static
import CardImage from './two_people_conversation_bubble.svg';
</script>
