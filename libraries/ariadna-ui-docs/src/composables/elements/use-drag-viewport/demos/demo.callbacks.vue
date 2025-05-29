<template>
  <div ref="draggableContainer" :style="{ ...style, zIndex: 50 }">
    <Card :modifier="isDragEnd ? undefined : 'primary'">
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
        I am at x={{ x }}, y={{ y }}
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Vue
import { useTemplateRef, ref } from 'vue';

// Components
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';

// Composables
import useDragViewport from '@iwyfaf-vue-ui/ariadna-ui/useDragViewport';

const draggableContainerRef = useTemplateRef('draggableContainer');
const draggableTargetRef = useTemplateRef('draggableTarget');

const isDragEnd = ref(true);

const { x, y, style, isDragging } = useDragViewport(draggableContainerRef, draggableTargetRef, {
  onDragStart: () => (isDragEnd.value = false),
  onDragEnd: () => (isDragEnd.value = true),
});
</script>
