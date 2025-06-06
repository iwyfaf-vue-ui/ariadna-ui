<template>
  <Previewer :component="DemoPropsEvents" :component-source="DemoPropsEventsSource">
    <template #header> Prop Events </template>

    <template #description>
      Массив событий. Допускаются любые поля, но есть одно обязательное - position. Свойство
      position может быть лишь одним из 2ух значений - left или right - указывает с какой стороны
      будет отображаться конкретное событие. Также должно быть поле, которое будет использоваться в
      качестве ключа (указывается через props keyProperty). Если нужны доп. поля - нужно сделать
      новый тип, который будет расширять базовый TTimelineEvent.
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

  <Previewer :component="DemoPropsKeyProperty" :component-source="DemoPropsKeyPropertySource">
    <template #header> Prop KeyProperty </template>

    <template #description>
      Название свойства, которое будет использоваться для ключа при итерации. То есть используется в
      :key при v-for. Если указать не существующий ключ - будет ошибка.
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

  <Previewer :component="DemoPropsCssClass" :component-source="DemoPropsCssClassSource">
    <template #header> Prop CssClass </template>

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

  <Previewer :component="DemoPropsModifier" :component-source="DemoPropsModifierSource">
    <template #header> Prop Modifier </template>

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

  <Previewer :component="DemoSlotsEvent" :component-source="DemoSlotsEventSource">
    <template #header> Slot Event </template>

    <template #description> Слот для отображения контента каждого из событий. </template>

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

  <Previewer :component="DemoSlotsSeparator" :component-source="DemoSlotsSeparatorSource">
    <template #header> Slot Separator </template>

    <template #description> Слот для отображения разделителя каждого из событий. </template>

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

  <Previewer :component="DemoSlotsOpposite" :component-source="DemoSlotsOppositeSource">
    <template #header> Slot Opposite </template>

    <template #description>
      Слот для отображения контента события на противоположной стороне.
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
// Components
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';

// Demos
import DemoPropsEvents from './demos/demo.props.events.vue';
import DemoPropsEventsSource from './demos/demo.props.events.vue?raw';
import DemoPropsKeyProperty from './demos/demo.props.key-property.vue';
import DemoPropsKeyPropertySource from './demos/demo.props.key-property.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoPropsModifier from './demos/demo.props.modifier.vue';
import DemoPropsModifierSource from './demos/demo.props.modifier.vue?raw';
import DemoSlotsEvent from './demos/demo.slots.event.vue';
import DemoSlotsEventSource from './demos/demo.slots.event.vue?raw';
import DemoSlotsSeparator from './demos/demo.slots.separator.vue';
import DemoSlotsSeparatorSource from './demos/demo.slots.separator.vue?raw';
import DemoSlotsOpposite from './demos/demo.slots.opposite.vue';
import DemoSlotsOppositeSource from './demos/demo.slots.opposite.vue?raw';

definePageMeta({
  title: 'Timeline',
  layout: 'default',
});

useHead({
  title: 'Timeline',
});
</script>
