<template>
  <Card :symbols="{ all: 1502, visible: 200 }">
    <template #content="{ isCollapsed, toggleCollapsed }">
      <div>
        <Button @click="toggleCollapsed">
          {{ isCollapsed ? 'Развернуть' : 'Свернуть' }}
        </Button>
      </div>

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
  </Card>
</template>

<script setup lang="ts">
// Components
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
</script>
