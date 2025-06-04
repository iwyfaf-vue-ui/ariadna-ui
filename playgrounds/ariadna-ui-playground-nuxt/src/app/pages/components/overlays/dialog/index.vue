<template>
  <Previewer :component="DemoPropsVModelVisible" :component-source="DemoPropsVModelVisibleSource">
    <template #header> Prop Visible </template>

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

  <Previewer :component="DemoPropsMaximized" :component-source="DemoPropsMaximizedSource">
    <template #header> Prop Maximized </template>

    <template #description> Делает размер диалогового окна во весь экран. </template>

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

  <Previewer :component="DemoPropsDraggable" :component-source="DemoPropsDraggableSource">
    <template #header> Prop Draggable </template>

    <template #description>
      Дает возможность перетаскивать диалоговое окно. Перетаскивание осуществляется путем захвата
      элементов, которые расположены в слоте header.
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
    :component="DemoPropsContentScrollable"
    :component-source="DemoPropsContentScrollableSource"
  >
    <template #header> Prop ContentScrollable </template>

    <template #description> Делает скроллируемым только содержимое слота content. </template>

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

  <Previewer :component="DemoPropsPersistent" :component-source="DemoPropsPersistentSource">
    <template #header> Prop Persistent </template>

    <template #description>
      Запрещает закрывать диалоговое окно по клику на overlay или по клавише Esc.
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
    :component="DemoPropsNoOverlayDismiss"
    :component-source="DemoPropsNoOverlayDismissSource"
  >
    <template #header> Prop NoOverlayDismiss </template>

    <template #description>
      Пользователь не может закрыть диалоговое окно, щелкнув на overlay. Нет необходимости
      устанавливать его, если уже установлен prop persistent или если prop overlay выключен.
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

  <Previewer :component="DemoPropsNoEscDismiss" :component-source="DemoPropsNoEscDismissSource">
    <template #header> Prop NoEscDismiss </template>

    <template #description>
      Пользователь не может закрыть диалоговое окно по клавише Esc. Нет необходимости устанавливать
      его, если уже установлен prop persistent.
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

  <Previewer :component="DemoPropsShake" :component-source="DemoPropsShakeSource">
    <template #header> Prop Shake </template>

    <template #description>
      Добавляет эффект тряски диалогового окна для привлечения внимания, при попытке закрыть его
      запрещенным способом.
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

    <template #description> Скрывать или показывать overlay диалогового окна. </template>

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

  <Previewer :component="DemoPropsAppendTo" :component-source="DemoPropsAppendToSource">
    <template #header> Prop AppendTo </template>

    <template #description>
      Существующий query selector или HTMLElement, указывающий, куда монтируется диалоговое окно.
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

  <Previewer :component="DemoSlotsHeader" :component-source="DemoSlotsHeaderSource">
    <template #header> Slot Header </template>

    <template #description>
      Используется для вывода заголовка компонента. При использовании prop draggable - добавляет
      заголовку эффект захвата и функционал перетаскивания диалогового окна.
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

  <Previewer :component="DemoSlotsContent" :component-source="DemoSlotsContentSource">
    <template #header> Slot Content </template>

    <template #description> Используется для вывода основного содержимого компонента. </template>

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
    <template #header> Slot Footer </template>

    <template #description> Используется для вывода содержимого подвала компонента. </template>

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
import DemoPropsVModelVisible from './demos/demo.props.v-model-visible.vue';
import DemoPropsVModelVisibleSource from './demos/demo.props.v-model-visible.vue?raw';
import DemoPropsMaximized from './demos/demo.props.maximized.vue';
import DemoPropsMaximizedSource from './demos/demo.props.maximized.vue?raw';
import DemoPropsDraggable from './demos/demo.props.draggable.vue';
import DemoPropsDraggableSource from './demos/demo.props.draggable.vue?raw';
import DemoPropsContentScrollable from './demos/demo.props.content-scrollable.vue';
import DemoPropsContentScrollableSource from './demos/demo.props.content-scrollable.vue?raw';
import DemoPropsPersistent from './demos/demo.props.persistent.vue';
import DemoPropsPersistentSource from './demos/demo.props.persistent.vue?raw';
import DemoPropsNoOverlayDismiss from './demos/demo.props.no-overlay-dismiss.vue';
import DemoPropsNoOverlayDismissSource from './demos/demo.props.no-overlay-dismiss.vue?raw';
import DemoPropsNoEscDismiss from './demos/demo.props.no-esc-dismiss.vue';
import DemoPropsNoEscDismissSource from './demos/demo.props.no-esc-dismiss.vue?raw';
import DemoPropsShake from './demos/demo.props.shake.vue';
import DemoPropsShakeSource from './demos/demo.props.shake.vue?raw';
import DemoPropsOverlay from './demos/demo.props.overlay.vue';
import DemoPropsOverlaySource from './demos/demo.props.overlay.vue?raw';
import DemoPropsAppendTo from './demos/demo.props.append-to.vue';
import DemoPropsAppendToSource from './demos/demo.props.append-to.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoPropsModifier from './demos/demo.props.modifier.vue';
import DemoPropsModifierSource from './demos/demo.props.modifier.vue?raw';
import DemoSlotsHeader from './demos/demo.slots.header.vue';
import DemoSlotsHeaderSource from './demos/demo.slots.header.vue?raw';
import DemoSlotsContent from './demos/demo.slots.content.vue';
import DemoSlotsContentSource from './demos/demo.slots.content.vue?raw';
import DemoSlotsFooter from './demos/demo.slots.footer.vue';
import DemoSlotsFooterSource from './demos/demo.slots.footer.vue?raw';

definePageMeta({
  title: 'Dialog',
  layout: 'default',
});

useHead({
  title: 'Dialog',
});
</script>
