<template>
  <Previewer :component="DemoPropsVModel" :component-source="DemoPropsVModelSource">
    <template #header> Prop ModelValue </template>

    <template #description>
      Компонент Dropbox принимает обязательный Prop - v-model и нуждается в обязательном Slot -
      Activator. Это необходимо для корректного вычисления позиции Dropbox относительно
      кнопки-активатора.
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
    :component="DemoPropsDisableAutoPosition"
    :component-source="DemoPropsDisableAutoPositionSource"
  >
    <template #header> Prop DisableAutoPosition </template>

    <template #description>
      Компонент Dropbox оснащен логикой composable usePosition, которая добавляет необходимые
      CSS-классы для умного позиционирования контента. Но если вам этот функционал не нужен, вы
      можете отключить авто-позиционирование.
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
    :component="DemoPropsCloseOnClickOutside"
    :component-source="DemoPropsCloseOnClickOutsideSource"
  >
    <template #header> Prop CloseOnClickOutside </template>

    <template #description>
      По умолчанию компонент Dropbox не будет закрывать контент, если клик произошел за его
      пределами. Вы можете включить эту опцию с помощью этого Prop.
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

  <Previewer :component="DemoPropsCloseOnEscape" :component-source="DemoPropsCloseOnEscapeSource">
    <template #header> Prop CloseOnEsc </template>

    <template #description>
      По умолчанию компонент Dropbox будет закрывать контент, если пользователь нажал клавишу ESC.
      Вы можете выключить эту опцию с помощью этого Prop.
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

  <Previewer :component="DemoSlotsDefault" :component-source="DemoSlotsDefaultSource">
    <template #header> Slot Default </template>

    <template #description>
      Используется для отображения содержимого, которое будет показывать внутри Dropbox.
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

  <Previewer :component="DemoSlotsActivator" :component-source="DemoSlotsActivatorSource">
    <template #header> Slot Activator </template>

    <template #description>
      Необходим для корректного позиционирования Dropbox относительно кнопки-активатора.
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

  <Previewer :component="DemoSlotsHeader" :component-source="DemoSlotsHeaderSource">
    <template #header> Slot Header </template>

    <template #description> Используется для отображения заголовка Dropbox. </template>

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
import DemoPropsVModel from './demos/demo.props.v-model.vue';
import DemoPropsVModelSource from './demos/demo.props.v-model.vue?raw';
import DemoPropsDisableAutoPosition from './demos/demo.props.disable-auto-position.vue';
import DemoPropsDisableAutoPositionSource from './demos/demo.props.disable-auto-position.vue?raw';
import DemoPropsCloseOnClickOutside from './demos/demo.props.close-on-click-outside.vue';
import DemoPropsCloseOnClickOutsideSource from './demos/demo.props.close-on-click-outside.vue?raw';
import DemoPropsCloseOnEscape from './demos/demo.props.close-on-escape.vue';
import DemoPropsCloseOnEscapeSource from './demos/demo.props.close-on-escape.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoPropsModifier from './demos/demo.props.modifier.vue';
import DemoPropsModifierSource from './demos/demo.props.modifier.vue?raw';
import DemoSlotsDefault from './demos/demo.slots.default.vue';
import DemoSlotsDefaultSource from './demos/demo.slots.default.vue?raw';
import DemoSlotsActivator from './demos/demo.slots.activator.vue';
import DemoSlotsActivatorSource from './demos/demo.slots.activator.vue?raw';
import DemoSlotsHeader from './demos/demo.slots.header.vue';
import DemoSlotsHeaderSource from './demos/demo.slots.header.vue?raw';

definePageMeta({
  title: 'Dropbox',
  layout: 'default',
});

useHead({
  title: 'Dropbox',
});
</script>
