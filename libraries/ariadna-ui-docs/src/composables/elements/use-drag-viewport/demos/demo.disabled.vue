<template>
  <div ref="draggableContainer" :style="{ ...style, zIndex: 50 }">
    <Card>
      <template #contentHeader>
        <div ref="draggableTarget" style="cursor: move; user-select: none">👋 Drag here!</div>
      </template>

      <template #content>
        <div>
          Is dragging?
          <Badge :modifier="isDragging ? 'success' : 'danger'">
            {{ isDragging ? 'Yes' : 'No' }}
          </Badge>
        </div>

        <div>
          Is draggable?
          <Badge :modifier="disabled ? 'danger' : 'success'">
            {{ disabled ? 'No' : 'Yes' }}
          </Badge>
        </div>

        I am at x={{ x }}, y={{ y }}
      </template>

      <template #contentFooter>
        <Button type="button" @click="disabled = !disabled">
          {{ disabled ? 'Enable' : 'Disable' }} drag'n'drop
        </Button>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, useTemplateRef } from 'vue';

// Components
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Composables
import useDragViewport from '@iwyfaf-vue-ui/ariadna-ui/useDragViewport';

const draggableContainerRef = useTemplateRef('draggableContainer');
const draggableTargetRef = useTemplateRef('draggableTarget');

const disabled = ref(true);

const { x, y, style, isDragging } = useDragViewport(draggableContainerRef, draggableTargetRef, {
  disabled: disabled,
});
</script>
