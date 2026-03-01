<template>
  <Previewer :component="DemoPropsHeader" :component-source="DemoPropsHeaderSource">
    <template #header> Prop header </template>
    <template #description> Текст заголовка панели. </template>

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

  <Previewer :component="DemoPropsToggleable" :component-source="DemoPropsToggleableSource">
    <template #header> Prop toggleable </template>
    <template #description>
      Определяет, можно ли сворачивать и разворачивать содержимое панели.
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

  <Previewer :component="DemoPropsCollapsed" :component-source="DemoPropsCollapsedSource">
    <template #header> Prop collapsed </template>
    <template #description> Определяет начальное состояние содержимого панели. </template>

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
    <template #header> Prop cssClass </template>
    <template #description> Переопределяет структуру CSS классов. </template>

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
    <template #header> Prop modifier </template>
    <template #description> Модификатор базового CSS-класса. </template>

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

  <Previewer :component="DemoSlotsDefault" :component-source="DemoSlotsDefaultSource">
    <template #header> Slot default </template>
    <template #description> Используется для кастомизации содержимого панели. </template>

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

  <Previewer :component="DemoSlotsHeader" :component-source="DemoSlotsHeaderSource">
    <template #header> Slot header </template>
    <template #description> Используется для кастомизации заголовка панели. </template>

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

  <Previewer :component="DemoSlotsIcons" :component-source="DemoSlotsIconsSource">
    <template #header> Slot icons </template>
    <template #description> Используется для добавления иконок в заголовке панели. </template>

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

  <Previewer :component="DemoSlotsToggleButton" :component-source="DemoSlotsToggleButtonSource">
    <template #header> Slot toggleButton </template>
    <template #description>
      Используется для кастомизации кнопки сворачивания или разворачивания.
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

  <Previewer :component="DemoSlotsToggleIcon" :component-source="DemoSlotsToggleIconSource">
    <template #header> Slot toggleIcon </template>
    <template #description>
      Используется для кастомизации содержимого кнопки сворачивания или разворачивания.
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

  <Previewer :component="DemoSlotsFooter" :component-source="DemoSlotsFooterSource">
    <template #header> Slot footer </template>
    <template #description> Используется для кастомизации подвала панели. </template>

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

  <Previewer :component="DemoEmitsToggle" :component-source="DemoEmitsToggleSource">
    <template #header> Emit toggle </template>
    <template #description>
      Событие срабатывает при сворачивании или разворачивании содержимого панели.
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

  <Previewer :component="DemoExposeToggle" :component-source="DemoExposeToggleSource">
    <template #header> Expose toggle </template>
    <template #description>
      Метод для сворачивания или разворачивания содержимого панели.
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
import DemoPropsHeader from './demos/demo.props.header.vue';
import DemoPropsHeaderSource from './demos/demo.props.header.vue?raw';
import DemoPropsToggleable from './demos/demo.props.toggleable.vue';
import DemoPropsToggleableSource from './demos/demo.props.toggleable.vue?raw';
import DemoPropsCollapsed from './demos/demo.props.collapsed.vue';
import DemoPropsCollapsedSource from './demos/demo.props.collapsed.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoPropsModifier from './demos/demo.props.modifier.vue';
import DemoPropsModifierSource from './demos/demo.props.modifier.vue?raw';
import DemoSlotsDefault from './demos/demo.slots.default.vue';
import DemoSlotsDefaultSource from './demos/demo.slots.default.vue?raw';
import DemoSlotsHeader from './demos/demo.slots.header.vue';
import DemoSlotsHeaderSource from './demos/demo.slots.header.vue?raw';
import DemoSlotsIcons from './demos/demo.slots.icons.vue';
import DemoSlotsIconsSource from './demos/demo.slots.icons.vue?raw';
import DemoSlotsToggleButton from './demos/demo.slots.toggle-button.vue';
import DemoSlotsToggleButtonSource from './demos/demo.slots.toggle-button.vue?raw';
import DemoSlotsToggleIcon from './demos/demo.slots.toggle-icon.vue';
import DemoSlotsToggleIconSource from './demos/demo.slots.toggle-icon.vue?raw';
import DemoSlotsFooter from './demos/demo.slots.footer.vue';
import DemoSlotsFooterSource from './demos/demo.slots.footer.vue?raw';
import DemoEmitsToggle from './demos/demo.emits.toggle.vue';
import DemoEmitsToggleSource from './demos/demo.emits.toggle.vue?raw';
import DemoExposeToggle from './demos/demo.expose.toggle.vue';
import DemoExposeToggleSource from './demos/demo.expose.toggle.vue?raw';

definePageMeta({
  title: 'Panel',
  layout: 'default',
});

useHead({
  title: 'Panel',
});
</script>
