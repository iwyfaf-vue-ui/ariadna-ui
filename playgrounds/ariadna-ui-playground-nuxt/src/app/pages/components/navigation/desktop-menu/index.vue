<template>
  <Previewer :component="DemoPropsData" :component-source="DemoPropsDataSource">
    <template #header> Prop Data </template>

    <template #description> Данные для рендера компонента. </template>

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

  <Previewer :component="DemoPropsExpandMode" :component-source="DemoPropsExpandModeSource">
    <template #header> Prop ExpandMode </template>

    <template #description>
      Режим раскрытия контекстуальных меню, по наведению или клику.
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

  <Previewer :component="DemoPropsVisibleItems" :component-source="DemoPropsVisibleItemsSource">
    <template #header> Prop VisibleItems </template>

    <template #description>
      Количество видимых элементов у третьего уровня меню. Если значение больше 0, все лишние
      элементы скрываются и разворачиваются при нажатии на кнопку-переключатель.
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

  <Previewer :component="DemoPropsOverlay" :component-source="DemoPropsOverlaySource">
    <template #header> Prop Overlay </template>

    <template #description> Включает или выключет overlay элемент для меню. </template>

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

  <Previewer :component="DemoPropsInvalid" :component-source="DemoPropsInvalidSource">
    <template #header> Prop Invalid </template>

    <template #description> Включает режим невалидного состояния компонента. </template>

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

  <Previewer :component="DemoSlotsRubricator" :component-source="DemoSlotsRubricatorSource">
    <template #header> Slot Rubricator </template>

    <template #description> Используется для кастомизации рубрикатора. </template>

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

  <Previewer :component="DemoSlotsMenu" :component-source="DemoSlotsMenuSource">
    <template #header> Slot Menu </template>

    <template #description> Используется для кастомизации контекстуалього меню. </template>

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

  <Previewer :component="DemoSlotsLoading" :component-source="DemoSlotsLoadingSource">
    <template #header> Slot Loading </template>

    <template #description>
      Используется для отображения состояния загрузки данных для меню.
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

  <Previewer :component="DemoSlotsError" :component-source="DemoSlotsErrorSource">
    <template #header> Slot Error </template>

    <template #description>
      Используется для отображения состояния ошибки загрузки данных для меню.
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
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';

// Demos
import DemoPropsData from './demos/demo.props.data.vue';
import DemoPropsDataSource from './demos/demo.props.data.vue?raw';
import DemoPropsExpandMode from './demos/demo.props.expand-mode.vue';
import DemoPropsExpandModeSource from './demos/demo.props.expand-mode.vue?raw';
import DemoPropsVisibleItems from './demos/demo.props.visible-items.vue';
import DemoPropsVisibleItemsSource from './demos/demo.props.visible-items.vue?raw';
import DemoPropsOverlay from './demos/demo.props.overlay.vue';
import DemoPropsOverlaySource from './demos/demo.props.overlay.vue?raw';
import DemoPropsInvalid from './demos/demo.props.invalid.vue';
import DemoPropsInvalidSource from './demos/demo.props.invalid.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoSlotsRubricator from './demos/demo.slots.rubricator.vue';
import DemoSlotsRubricatorSource from './demos/demo.slots.rubricator.vue?raw';
import DemoSlotsMenu from './demos/demo.slots.menu.vue';
import DemoSlotsMenuSource from './demos/demo.slots.menu.vue?raw';
import DemoSlotsLoading from './demos/demo.slots.loading.vue';
import DemoSlotsLoadingSource from './demos/demo.slots.loading.vue?raw';
import DemoSlotsError from './demos/demo.slots.error.vue';
import DemoSlotsErrorSource from './demos/demo.slots.error.vue?raw';

definePageMeta({
  title: 'DesktopMenu',
  layout: 'default',
});

useHead({
  title: 'DesktopMenu',
});
</script>
