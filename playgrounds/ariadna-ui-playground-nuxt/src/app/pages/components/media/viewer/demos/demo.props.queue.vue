<template>
  <div>
    <Button @click="open">Open Viewer</Button>

    <component
      v-if="viewerLoaded"
      :is="viewerAsync"
      v-model:iframeVideoHelper="iframeVideoHelper"
      :queue="['IMAGE', 'VIDEO']"
      @open="onOpen"
      @close="onClose"
      @slideChange="onSlideChange"
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

      <template #galleryVideoItem="{ videoItem }">
        <img :src="videoItem.img" width="40px" height="40px" alt="Image" />
      </template>

      <template #sliderItem="{ mediaItem, registerIframe }">
        <img v-if="mediaItem.type === 'IMAGE'" :src="mediaItem.src" :alt="mediaItem.alt" />

        <iframe
          v-if="mediaItem.type === 'IFRAME'"
          :ref="registerIframe as VNodeRef"
          :src="mediaItem.src"
          frameborder="0"
          allowfullscreen
        ></iframe>

        <Video
          v-if="mediaItem.type === 'VIDEO'"
          :ref="(instance) => fillPlayerList(instance as Element as unknown as TVideoExposes)"
          :src="mediaItem.src"
        >
          Ваш браузер не поддерживает видео-плеер.

          <template #playIcon>
            <i class="icon-fill-play"></i>
          </template>

          <template #stopIcon>
            <i class="icon-fill-pause"></i>
          </template>

          <template #volumeIcon="{ volume }">
            <i v-if="volume === 0" class="icon-fill-volume-off"></i>
            <i v-else class="icon-fill-volume-on"></i>
          </template>

          <template #fullscreenIcon>
            <i class="icon-fill-fullscreen-in"></i>
          </template>

          <template #unFullscreenIcon>
            <i class="icon-fill-fullscreen-out"></i>
          </template>

          <template #loadingIcon>
            <Spinner css-class="ar-spinner-atom" />
          </template>
        </Video>
      </template>

      <template #calculating>
        <Spinner css-class="ar-spinner-atom" />
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
// Vue
import type { VNodeRef } from 'vue';
import { ref, defineAsyncComponent } from 'vue';

// Composables
import useViewer from '@iwyfaf-vue-ui/ariadna-ui/useViewer';
import useOrderedElements from '@iwyfaf-vue-ui/ariadna-ui/useOrderedElements';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Video from '@iwyfaf-vue-ui/ariadna-ui/Video';
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';

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

const { fillPlayerList, stopPlayers } = useVideoComponent();

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
