<template>
  <div>
    <Button @click="open">Open Viewer</Button>

    <component
      v-if="viewerLoaded"
      :is="viewerAsync"
      css-class="ar-viewer-custom"
      @open="onOpen"
      @close="onClose"
    >
      <template #closeIcon>
        <Button aria-label="Закрыть">
          <i class="icon-line-close"></i>
        </Button>
      </template>

      <template #prevIcon>
        <Button aria-label="Закрыть">
          <i class="icon-line-left"></i>
        </Button>
      </template>

      <template #nextIcon>
        <Button aria-label="Закрыть">
          <i class="icon-line-right"></i>
        </Button>
      </template>

      <template #zoomInfo="{ zoom }"> Увеличение {{ zoom }}% </template>

      <template #galleryImageItem="{ imageItem }">
        <img :src="imageItem.src" width="40px" height="40px" alt="Image" />
      </template>

      <template #sliderItem="{ mediaItem }">
        <img v-if="mediaItem.type === 'IMAGE'" :src="mediaItem.src" :alt="mediaItem.alt" />
      </template>

      <template #calculating>
        <Spinner css-class="ar-spinner-atom" />
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

// Types
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

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
