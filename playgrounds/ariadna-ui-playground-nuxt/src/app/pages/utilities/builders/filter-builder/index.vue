<template>
  <Previewer :component="DemoSelect" :component-source="DemoSelectSource">
    <template #header> Метод Select </template>

    <template #description>
      Метод отвечающий за выбор поля для фильтрации или создание цепочки вложенных полей.
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

  <Previewer :component="DemoOr" :component-source="DemoOrSource">
    <template #header> Метод Or </template>

    <template #description> Метод отвечающий за создание логической операции ИЛИ. </template>

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

  <Previewer :component="DemoAnd" :component-source="DemoAndSource">
    <template #header> Метод And </template>

    <template #description> Функция, отвечающая за создание логической операции И. </template>

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

  <Previewer :component="DemoConfigureFields" :component-source="DemoConfigureFieldsSource">
    <template #header> Метод ConfigureFields </template>

    <template #description>
      Быстрая настройка полей и логических операций с ними. Аналог методов select, or, and.
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

  <Previewer
    :component="DemoExampleOneDimensionalSingle"
    :component-source="DemoExampleOneDimensionalSingleSource"
  >
    <template #header> Фильтрация одномерного массива по одному полю </template>

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

  <Previewer
    :component="DemoExampleOneDimensionalMultiple"
    :component-source="DemoExampleOneDimensionalMultipleSource"
  >
    <template #header> Фильтрация одномерного массива по одному полю </template>
    <template #description>
      Пример когда типы данных полей могут быть разными. Обработка условий таких сценариев
      фильтрации лежит на пользователе. Вы можете помочь себе не ошибиться с типами, если корректно
      укажите типизацию для метода filter.
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

  <Previewer
    :component="DemoExampleOneDimensionalNested"
    :component-source="DemoExampleOneDimensionalNestedSource"
  >
    <template #header> Фильтрация одномерного массива по вложенным полям </template>
    <template #description> Можно углубить выборку фильтрации по вложенным полям. </template>

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

  <Previewer
    :component="DemoExampleMultiDimensionalNested"
    :component-source="DemoExampleMultiDimensionalNestedSource"
  >
    <template #header> Фильтрация многомерного массива по вложенным полям </template>
    <template #description> Можно углубить выборку фильтрации по вложенному массиву. </template>

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
import DemoSelect from './demos/demo.select.vue';
import DemoSelectSource from './demos/demo.select.vue?raw';
import DemoOr from './demos/demo.or.vue';
import DemoOrSource from './demos/demo.or.vue?raw';
import DemoAnd from './demos/demo.and.vue';
import DemoAndSource from './demos/demo.and.vue?raw';
import DemoConfigureFields from './demos/demo.configure-fields.vue';
import DemoConfigureFieldsSource from './demos/demo.configure-fields.vue?raw';
import DemoExampleOneDimensionalSingle from './demos/demo.example.one-dimensional-single.vue';
import DemoExampleOneDimensionalSingleSource from './demos/demo.example.one-dimensional-single.vue?raw';
import DemoExampleOneDimensionalMultiple from './demos/demo.example.one-dimensional-multiple.vue';
import DemoExampleOneDimensionalMultipleSource from './demos/demo.example.one-dimensional-multiple.vue?raw';
import DemoExampleOneDimensionalNested from './demos/demo.example.one-dimensional-nested.vue';
import DemoExampleOneDimensionalNestedSource from './demos/demo.example.one-dimensional-nested.vue?raw';
import DemoExampleMultiDimensionalNested from './demos/demo.example.multi-dimensional-nested.vue';
import DemoExampleMultiDimensionalNestedSource from './demos/demo.example.multi-dimensional-nested.vue?raw';

definePageMeta({
  title: 'FilterBuilder',
  layout: 'default',
});

useHead({
  title: 'FilterBuilder',
});
</script>
