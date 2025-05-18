<template>
  <Previewer :component="DemoNativeDefault" :component-source="DemoNativeDefaultSource">
    <template #header> Применение с нативным Input </template>

    <template #description> Маска без параметров. </template>

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

  <Previewer :component="DemoNativeClone" :component-source="DemoNativeCloneSource">
    <template #header> Применение с нативным Input </template>

    <template #description>
      Маска с клонированием input. С помощью неё можно улучшить UX маски.
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

  <Previewer :component="DemoNativeSeparator" :component-source="DemoNativeSeparatorSource">
    <template #header> Применение с нативным Input </template>

    <template #description>
      Маска с изменением символа-разделителя. Нужно использовать совместно с clone: true.
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

  <Previewer :component="DemoComponentDefault" :component-source="DemoComponentDefaultSource">
    <template #header> Применение с компонентом Input </template>

    <template #description> Маска без параметров. </template>

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

  <Previewer :component="DemoComponentClone" :component-source="DemoComponentCloneSource">
    <template #header> Применение с компонентом Input </template>

    <template #description>
      Маска с клонированием input. С помощью неё можно улучшить UX маски.
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

  <Previewer :component="DemoComponentSeparator" :component-source="DemoComponentSeparatorSource">
    <template #header> Применение с компонентом Input </template>

    <template #description>
      Маска с изменением символа-разделителя. Нужно использовать совместно с clone: true.
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
</template>

<script setup lang="ts">
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoNativeDefault from './demos/demo.native.default.vue';
import DemoNativeDefaultSource from './demos/demo.native.default?raw';
import DemoNativeClone from './demos/demo.native.clone.vue';
import DemoNativeCloneSource from './demos/demo.native.clone?raw';
import DemoNativeSeparator from './demos/demo.native.separator.vue';
import DemoNativeSeparatorSource from './demos/demo.native.separator?raw';
import DemoComponentDefault from './demos/demo.component.default.vue';
import DemoComponentDefaultSource from './demos/demo.component.default?raw';
import DemoComponentClone from './demos/demo.component.clone.vue';
import DemoComponentCloneSource from './demos/demo.component.clone?raw';
import DemoComponentSeparator from './demos/demo.component.separator.vue';
import DemoComponentSeparatorSource from './demos/demo.component.separator?raw';

definePageMeta({
  title: 'PhoneMask',
  layout: 'default',
});

useHead({
  title: 'PhoneMask',
});
</script>
