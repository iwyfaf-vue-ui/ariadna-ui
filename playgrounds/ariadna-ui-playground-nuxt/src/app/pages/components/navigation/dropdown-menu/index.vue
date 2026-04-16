<template>
  <Previewer :component="DemoPropsData" :component-source="DemoPropsDataSource">
    <template #header> Prop data </template>

    <template #description> Массив пунктов меню. </template>

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
    <template #header> Prop expandMode </template>

    <template #description> Режим раскрытия подменю второго и последующих уровней. </template>

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
    <template #header> Prop closeOnClickOutside </template>

    <template #description> Закрывать меню при клике вне его области. </template>

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

  <Previewer :component="DemoPropsCloseOnEsc" :component-source="DemoPropsCloseOnEscSource">
    <template #header> Prop closeOnEscape </template>

    <template #description> Закрывать меню при нажатии клавиши Escape. </template>

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

  <Previewer :component="DemoPropsDisabled" :component-source="DemoPropsDisabledSource">
    <template #header> Prop disabled </template>

    <template #description> Блокирует открытие меню. </template>

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

    <template #description>
      Переопределяет базовый CSS-класс корневого элемента и всех потомков.
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
    <template #header> Slot activator </template>

    <template #description>
      Элемент-триггер, открывающий меню. Получает текущее состояние и управляющие функции.
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

  <Previewer :component="DemoSlotsItem" :component-source="DemoSlotsItemSource">
    <template #header> Slot item </template>

    <template #description>
      Кастомный рендер пункта меню. Если слот задан — стандартный рендер пункта не используется.
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

  <Previewer :component="DemoEmitsShow" :component-source="DemoEmitsShowSource">
    <template #header> Emit show </template>

    <template #description> Эмитируется при открытии меню. </template>

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

  <Previewer :component="DemoEmitsHide" :component-source="DemoEmitsHideSource">
    <template #header> Emit hide </template>

    <template #description> Эмитируется при закрытии меню. </template>

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

  <Previewer :component="DemoEmitsItemClick" :component-source="DemoEmitsItemClickSource">
    <template #header> Emit item-click </template>

    <template #description>
      Эмитируется при клике на пункт меню (в т.ч. вложенный). Не эмитируется для
      пунктов-разделителей и отключённых пунктов.
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

  <Previewer :component="DemoExposeOpen" :component-source="DemoExposeOpenSource">
    <template #header> Expose open </template>

    <template #description> Программно открывает меню. </template>

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

  <Previewer :component="DemoExposeClose" :component-source="DemoExposeCloseSource">
    <template #header> Expose close </template>

    <template #description> Программно закрывает меню. </template>

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

    <template #description> Программно переключает состояние меню. </template>

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
import DemoPropsCloseOnClickOutside from './demos/demo.props.close-on-click-outside.vue';
import DemoPropsCloseOnClickOutsideSource from './demos/demo.props.close-on-click-outside.vue?raw';
import DemoPropsCloseOnEsc from './demos/demo.props.close-on-esc.vue';
import DemoPropsCloseOnEscSource from './demos/demo.props.close-on-esc.vue?raw';
import DemoPropsDisabled from './demos/demo.props.disabled.vue';
import DemoPropsDisabledSource from './demos/demo.props.disabled.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoSlotsActivator from './demos/demo.slots.activator.vue';
import DemoSlotsActivatorSource from './demos/demo.slots.activator.vue?raw';
import DemoSlotsItem from './demos/demo.slots.item.vue';
import DemoSlotsItemSource from './demos/demo.slots.item.vue?raw';
import DemoEmitsShow from './demos/demo.emits.show.vue';
import DemoEmitsShowSource from './demos/demo.emits.show.vue?raw';
import DemoEmitsHide from './demos/demo.emits.hide.vue';
import DemoEmitsHideSource from './demos/demo.emits.hide.vue?raw';
import DemoEmitsItemClick from './demos/demo.emits.item-click.vue';
import DemoEmitsItemClickSource from './demos/demo.emits.item-click.vue?raw';
import DemoExposeOpen from './demos/demo.expose.open.vue';
import DemoExposeOpenSource from './demos/demo.expose.open.vue?raw';
import DemoExposeClose from './demos/demo.expose.close.vue';
import DemoExposeCloseSource from './demos/demo.expose.close.vue?raw';
import DemoExposeToggle from './demos/demo.expose.toggle.vue';
import DemoExposeToggleSource from './demos/demo.expose.toggle.vue?raw';

definePageMeta({
  title: 'DropdownMenu',
  layout: 'default',
});

useHead({
  title: 'DropdownMenu',
});
</script>
