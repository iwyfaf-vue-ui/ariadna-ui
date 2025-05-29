<template>
  <Previewer :component="DemoDefault" :component-source="DemoDefaultSource">
    <template #header> Обычное применение </template>

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

  <Previewer :component="DemoState" :component-source="DemoStateSource">
    <template #header> Состояние видимости </template>

    <template #description>
      Статус видимости целевого элемента. Необходим для корректного удаления событий, когда целевой
      элемент скрыт.
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

  <Previewer :component="DemoDisabled" :component-source="DemoDisabledSource">
    <template #header> Состояние Disabled </template>

    <template #description> Отключает или включает drag'n'drop. </template>

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

  <Previewer :component="DemoInitialPosition" :component-source="DemoInitialPositionSource">
    <template #header> Начальное положение </template>

    <template #description> Начальное положение перетаскиваемого элемента. </template>

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

  <Previewer :component="DemoCallbacks" :component-source="DemoCallbacksSource">
    <template #header> Callback-функции </template>

    <template #description> Пример подписки на начала и конец drag событий. </template>

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
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoDefault from './demos/demo.default.vue';
import DemoDefaultSource from './demos/demo.default.vue?raw';
import DemoState from './demos/demo.state.vue';
import DemoStateSource from './demos/demo.state.vue?raw';
import DemoDisabled from './demos/demo.disabled.vue';
import DemoDisabledSource from './demos/demo.disabled.vue?raw';
import DemoInitialPosition from './demos/demo.initial-position.vue';
import DemoInitialPositionSource from './demos/demo.initial-position.vue?raw';
import DemoCallbacks from './demos/demo.callbacks.vue';
import DemoCallbacksSource from './demos/demo.callbacks.vue?raw';

definePageMeta({
  title: 'useDragViewport',
  layout: 'default',
});

useHead({
  title: 'useDragViewport',
});
</script>
