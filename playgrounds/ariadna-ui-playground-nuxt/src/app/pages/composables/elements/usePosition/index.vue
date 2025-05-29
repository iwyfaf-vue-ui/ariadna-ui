<template>
  <Previewer :component="DemoDefault" :component-source="DemoDefaultSource">
    <template #header> Обычное применение </template>
    <template #description>
      Использование без переопределения опций. Composable usePosition отрабтает при монтировании
      элемента. Используйте осторожно, может негативно повлиять CLS.
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

  <Previewer :component="DemoClick" :component-source="DemoClickSource">
    <template #header> Позиционирование по клику </template>
    <template #description> Использование usePosition по клику на активатор. </template>

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

  <Previewer :component="DemoThreshold" :component-source="DemoThresholdSource">
    <template #header> Позиционирование с невидимыми отступами </template>

    <template #description>
      Позволяет уменьшать/увеличивать ширину/высоту окна для вычислений.
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
    <template #header> Отключение позиционирования </template>

    <template #description>
      Свойство disabled принимает функцию, которая должна вернуть boolean значение.
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

  <Previewer :component="DemoPositionOrderTop" :component-source="DemoPositionOrderTopSource">
    <template #header> Позиционирование только сверху </template>

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

  <Previewer :component="DemoPositionOrderBottom" :component-source="DemoPositionOrderBottomSource">
    <template #header> Позиционирование только снизу </template>

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

  <Previewer :component="DemoIndents" :component-source="DemoIndentsSource">
    <template #header> Позиционирование с отступами </template>

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
import DemoClick from './demos/demo.click.vue';
import DemoClickSource from './demos/demo.click.vue?raw';
import DemoThreshold from './demos/demo.threshold.vue';
import DemoThresholdSource from './demos/demo.threshold.vue?raw';
import DemoDisabled from './demos/demo.disabled.vue';
import DemoDisabledSource from './demos/demo.disabled.vue?raw';
import DemoPositionOrderTop from './demos/demo.position-order-top.vue';
import DemoPositionOrderTopSource from './demos/demo.position-order-top.vue?raw';
import DemoPositionOrderBottom from './demos/demo.position-order-bottom.vue';
import DemoPositionOrderBottomSource from './demos/demo.position-order-bottom.vue?raw';
import DemoIndents from './demos/demo.indents.vue';
import DemoIndentsSource from './demos/demo.indents.vue?raw';

definePageMeta({
  title: 'usePosition',
  layout: 'default',
});

useHead({
  title: 'usePosition',
});
</script>

<style lang="scss">
.target {
  &__container {
    position: relative;
  }

  &__dropdown {
    position: absolute;
    z-index: 50;
    min-width: 500px;
    padding: 12px;
    background: #000;
    border: 1px solid #ccc;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  }
}
</style>
