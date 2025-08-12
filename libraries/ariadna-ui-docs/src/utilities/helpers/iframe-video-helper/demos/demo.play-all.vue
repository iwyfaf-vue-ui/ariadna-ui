<template>
  <div>
    <div v-for="(item, idx) in iframesData" :key="item.label" style="margin-bottom: 24px">
      <div>
        <strong>{{ item.label }}</strong>
      </div>

      <iframe
        :ref="(el) => setIframeRef(idx, el as Element)"
        :src="item.src"
        width="350"
        height="200"
        frameborder="0"
        allowfullscreen
      ></iframe>

      <div style="display: flex; flex-direction: column; margin-top: 8px">
        <Button @click="register(idx)" :disabled="registered[idx]">
          {{ registered[idx] ? '✓ Зарегистрировано' : 'Зарегестрировать' }}
        </Button>
      </div>
    </div>

    <Button v-if="registered.length" @click="playIframes" modifier="success"> Play all </Button>
  </div>
</template>

<script setup lang="ts">
// Vue
import { ref } from 'vue';

// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Helpers
import IframeVideoHelper from '@iwyfaf-vue-ui/ariadna-ui/IframeVideoHelper';

const iframesData = [
  {
    label: 'YouTube',
    src: IframeVideoHelper.getIframeUrl('https://www.youtube.com/watch?v=fe4EK4HSPkI'),
  },
  {
    label: 'Rutube',
    src: IframeVideoHelper.getIframeUrl(
      'https://rutube.ru/video/3372d062546231e6928f02c2f82bdf7a/',
    ),
  },
];

const iframeRefs = ref<(HTMLIFrameElement | null)[]>([null, null]);
const registered = ref([false, false]);
const helper = new IframeVideoHelper();

function setIframeRef(idx: number, el: Element | null) {
  iframeRefs.value[idx] = el as HTMLIFrameElement | null;
}

function playIframes() {
  helper.playAll();
}

function register(idx: number) {
  const iframe = iframeRefs.value[idx];

  if (iframe && !registered.value[idx]) {
    helper.registerIframe(iframe);
    registered.value[idx] = true;
  }
}
</script>
