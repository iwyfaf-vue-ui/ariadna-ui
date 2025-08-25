<template>
  <div>
    <Button @click="open">Open Viewer</Button>

    <component v-if="viewerLoaded" :is="viewerAsync" loop @open="onOpen" @close="onClose">
      <template #closeIcon>
        <Button aria-label="Закрыть">
          <i class="icon-line-close"></i>
        </Button>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, defineAsyncComponent } from 'vue';

// Composables
import useViewer from '@iwyfaf-vue-ui/ariadna-ui/useViewer';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Data
import { imageGallery } from './data';

const viewerAsync = defineAsyncComponent(() => import('@iwyfaf-vue-ui/ariadna-ui/Viewer'));

function useViewerComponent() {
  const viewerApi = useViewer();

  const viewerLoaded = ref(false);

  function open() {
    viewerLoaded.value = true;

    viewerApi.open();
    viewerApi.setGallery(imageGallery);
  }

  function onOpen() {
    document.body.style.overflow = 'hidden';
  }

  function onClose() {
    document.body.style.overflow = '';
    viewerLoaded.value = false;
  }

  return { viewerLoaded, open, onOpen, onClose };
}

const { viewerLoaded, open, onOpen, onClose } = useViewerComponent();
</script>
