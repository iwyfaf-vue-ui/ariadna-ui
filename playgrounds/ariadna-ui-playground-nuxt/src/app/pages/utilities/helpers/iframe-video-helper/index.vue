<template>
  <Previewer :component="DemoIsSupported" :component-source="DemoIsSupportedSource">
    <template #header> isSupported </template>
    <template #description>
      Метод isSupported позволяет проверить, поддерживается ли переданный URL.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoGetFrameUrl" :component-source="DemoGetFrameUrlSource">
    <template #header> getIframeUrl </template>
    <template #description>
      Метод getIframeUrl преобразует ссылку на видео в URL, подходящий для вставки в iframe.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoRegisterIframe" :component-source="DemoRegisterIframeSource">
    <template #header> registerIframe </template>
    <template #description> Метод registerIframe сохраняет iframe и определяет его хост. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPlay" :component-source="DemoPlaySource">
    <template #header> play </template>
    <template #description> Метод play запускает воспроизведение указанного iframe. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoStop" :component-source="DemoStopSource">
    <template #header> stop </template>
    <template #description> Метод stop останавливает воспроизведение указанного iframe. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoPlayAll" :component-source="DemoPlayAllSource">
    <template #header> playAll </template>
    <template #description>
      Метод playAll запускает воспроизведение всех зарегистрированных iframe.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoStopAll" :component-source="DemoStopAllSource">
    <template #header> stopAll </template>
    <template #description>
      Метод stopAll останавливает воспроизведение всех зарегистрированных iframe.
    </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>

  <Previewer :component="DemoClear" :component-source="DemoClearSource">
    <template #header> clear </template>
    <template #description> Метод clear удаляет все зарегистрированные iframe. </template>

    <template #showCodeToggle="{ toggle, isShown }">
      <Button @click="toggle">
        {{ isShown ? 'Скрыть' : 'Показать' }}
      </Button>
    </template>

    <template #copy="{ handler, isCopied }">
      <Button @click="handler" :disabled="isCopied">
        {{ isCopied ? 'Скопировано!' : 'Копировать' }}
      </Button>
    </template>

    <template #source="{ source }">
      <pre v-code-highlight><code>{{ source }}</code></pre>
    </template>
  </Previewer>
</template>

<script setup lang="ts">
// Components
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoIsSupported from './demos/demo.is-supported.vue';
import DemoIsSupportedSource from './demos/demo.is-supported.vue?raw';
import DemoGetFrameUrl from './demos/demo.get-frame-url.vue';
import DemoGetFrameUrlSource from './demos/demo.get-frame-url.vue?raw';
import DemoRegisterIframe from './demos/demo.register-iframe.vue';
import DemoRegisterIframeSource from './demos/demo.register-iframe.vue?raw';
import DemoPlay from './demos/demo.play.vue';
import DemoPlaySource from './demos/demo.play.vue?raw';
import DemoStop from './demos/demo.stop.vue';
import DemoStopSource from './demos/demo.stop.vue?raw';
import DemoPlayAll from './demos/demo.play-all.vue';
import DemoPlayAllSource from './demos/demo.play-all.vue?raw';
import DemoStopAll from './demos/demo.stop-all.vue';
import DemoStopAllSource from './demos/demo.stop-all.vue?raw';
import DemoClear from './demos/demo.clear.vue';
import DemoClearSource from './demos/demo.clear.vue?raw';

definePageMeta({
  title: 'IframeVideoHelper',
  layout: 'default',
});

useHead({
  title: 'IframeVideoHelper',
});
</script>
