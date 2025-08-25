<template>
  <div>
    <Button @click="open">Open Viewer</Button>

    <component
      v-if="viewerLoaded"
      :is="viewerAsync"
      v-model:iframeVideoHelper="iframeVideoHelper"
      @open="onOpen"
      @close="onClose"
      @slideChange="onSlideChange"
    >
      <template #galleryVideoLabel="{ videoCount }">
        Видео <span>({{ videoCount }})</span>
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref, defineAsyncComponent } from 'vue';

// Composables
import useViewer from '@iwyfaf-vue-ui/ariadna-ui/useViewer';
import useOrderedElements from '@iwyfaf-vue-ui/ariadna-ui/useOrderedElements';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Types
import type { TVideoExposes } from '@iwyfaf-vue-ui/ariadna-ui/Video';

// Utilities
import IframeVideoHelper from '@iwyfaf-vue-ui/ariadna-ui/IframeVideoHelper';

// Data
import { mixGallery } from './data';

const viewerAsync = defineAsyncComponent(() => import('@iwyfaf-vue-ui/ariadna-ui/Viewer'));

function useVideoComponent() {
  const { elements: playerList, fillElements } = useOrderedElements<TVideoExposes>();

  function fillPlayerList(element: TVideoExposes) {
    const playerIndex = playerList.value.findIndex((playerRef) => playerRef === element);
    fillElements(element, playerIndex === -1 ? playerList.value.length : playerIndex);
  }

  function stopPlayers() {
    playerList.value.forEach((playerRef: TVideoExposes) => {
      if (!playerRef) {
        return;
      }

      // playerRef.seek(0);
      playerRef.stop();
    });
  }

  return {
    fillPlayerList,
    stopPlayers,
  };
}

const { stopPlayers } = useVideoComponent();

function useViewerComponent(stopPlayers: () => void) {
  const viewerApi = useViewer();

  const iframeVideoHelper = ref(new IframeVideoHelper());
  const viewerLoaded = ref(false);

  function stopIframes() {
    iframeVideoHelper.value.stopAll();
  }

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
    stopPlayers();
    stopIframes();
    iframeVideoHelper.value.clear();
  }

  function onSlideChange() {
    stopPlayers();
    stopIframes();
  }

  return { iframeVideoHelper, viewerLoaded, open, onOpen, onClose, onSlideChange };
}

const { iframeVideoHelper, viewerLoaded, open, onOpen, onClose, onSlideChange } =
  useViewerComponent(stopPlayers);
</script>
