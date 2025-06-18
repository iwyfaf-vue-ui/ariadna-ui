<template>
  <Previewer :component="DemoDefault" :component-source="DemoDefaultSource">
    <template #header> Обычное применение класса </template>

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

  <Previewer :component="DemoSetParam" :component-source="DemoSetParamSource">
    <template #header> Метод setParam </template>

    <template #description> Устанавливает значение параметра в виде строки. </template>

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

  <Previewer :component="DemoSetArrayParam" :component-source="DemoSetArrayParamSource">
    <template #header> Метод setArrayParam </template>

    <template #description> Устанавливает значение параметра в виде массива строк. </template>

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

  <Previewer :component="DemoDeleteParams" :component-source="DemoDeleteParamsSource">
    <template #header> Метод deleteParams </template>

    <template #description> Удаляет указанные query параметры. </template>

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

  <Previewer :component="DemoClearQuery" :component-source="DemoClearQuerySource">
    <template #header> Метод clearQuery </template>

    <template #description> Удаляет пустые параметры из query. </template>

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

  <Previewer :component="DemoRemoveQuery" :component-source="DemoRemoveQuerySource">
    <template #header> Метод removeQuery </template>

    <template #description> Удаляет все параметры из query. </template>

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

  <Previewer :component="DemoBuildQueryString" :component-source="DemoBuildQueryStringSource">
    <template #header> Метод buildQueryString </template>

    <template #description> Создает query строку из текущих параметров. </template>

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

  <Previewer :component="DemoBuildQueryObject" :component-source="DemoBuildQueryObjectSource">
    <template #header> Метод buildQueryObject </template>

    <template #description> Создает query объект из текущих параметров. </template>

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
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Demos
import DemoDefault from './demos/demo.default.vue';
import DemoDefaultSource from './demos/demo.default.vue?raw';
import DemoSetParam from './demos/demo.setParam.vue';
import DemoSetParamSource from './demos/demo.setParam.vue?raw';
import DemoSetArrayParam from './demos/demo.setArrayParam.vue';
import DemoSetArrayParamSource from './demos/demo.setArrayParam.vue?raw';
import DemoDeleteParams from './demos/demo.deleteParams.vue';
import DemoDeleteParamsSource from './demos/demo.deleteParams.vue?raw';
import DemoBuildQueryString from './demos/demo.buildQueryString.vue';
import DemoBuildQueryStringSource from './demos/demo.buildQueryString.vue?raw';
import DemoBuildQueryObject from './demos/demo.buildQueryObject.vue';
import DemoBuildQueryObjectSource from './demos/demo.buildQueryObject.vue?raw';
import DemoClearQuery from './demos/demo.clearQuery.vue';
import DemoClearQuerySource from './demos/demo.clearQuery.vue?raw';
import DemoRemoveQuery from './demos/demo.removeQuery.vue';
import DemoRemoveQuerySource from './demos/demo.removeQuery.vue?raw';

definePageMeta({
  title: 'QueryBuilder',
  layout: 'default',
});

useHead({
  title: 'QueryBuilder',
});
</script>
