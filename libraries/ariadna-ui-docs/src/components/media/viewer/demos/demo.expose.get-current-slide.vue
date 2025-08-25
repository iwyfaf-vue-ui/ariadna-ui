<template>
  <div>
    <Button @click="open">Open Viewer</Button>

    <component
      v-if="viewerLoaded"
      :is="viewerAsync"
      ref="viewer"
      :zoom-max="1000"
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

      <template #galleryVideoItem="{ videoItem }">
        <img :src="videoItem.img" width="40px" height="40px" alt="Image" />
      </template>

      <template #galleryVideoLabel="{ videoCount }">
        Видео <span>({{ videoCount }})</span>
      </template>

      <template #galleryImageItem="{ imageItem }">
        <img :src="imageItem.src" width="40px" height="40px" alt="Image" />
      </template>

      <template #galleryImageLabel="{ imageCount }">
        Фото <span>({{ imageCount }})</span>
      </template>

      <template #sliderItem="{ mediaItem, registerIframe }">
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
import { ref, defineAsyncComponent, useTemplateRef, watch } from 'vue';

// Composables
import useViewer from '@iwyfaf-vue-ui/ariadna-ui/useViewer';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

// Data
import { mixGallery } from './data';

const viewerAsync = defineAsyncComponent(() => import('@iwyfaf-vue-ui/ariadna-ui/Viewer'));

const viewerRef = useTemplateRef<InstanceType<typeof viewerAsync>>('viewer');

function useViewerComponent() {
  const viewerApi = useViewer();

  const viewerLoaded = ref(false);

  function open() {
    viewerLoaded.value = true;

    viewerApi.open();
    viewerApi.setGallery(mixGallery);
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

watch(
  () => viewerLoaded.value,
  (viewerState) => {
    if (viewerState) {
      setTimeout(() => {
        console.log(`Current slide is:`, viewerRef.value?.getCurrentSlide());
      }, 500);
    }
  },
);
</script>
