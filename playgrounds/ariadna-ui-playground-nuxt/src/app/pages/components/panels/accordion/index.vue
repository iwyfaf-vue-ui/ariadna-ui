<template>
  <Previewer
    :component="DemoAccordionPropsSingleMode"
    :component-source="DemoAccordionPropsSingleModeSource"
  >
    <template #header> Accordion: Prop SingleMode </template>

    <template #description>
      Управляет поведением открывания аккордеонов. Если true - может быть открыт максимум 1
      аккордеон, в случае false - любое количество.
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
    :component="DemoAccordionPropsOpened"
    :component-source="DemoAccordionPropsOpenedSource"
  >
    <template #header> Accordion: Prop Opened </template>

    <template #description> Делает аккордеон открытым по умолчанию. </template>

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
    :component="DemoAccordionPropsClickableHeader"
    :component-source="DemoAccordionPropsClickableHeaderSource"
  >
    <template #header> Accordion: Prop ClickableHeader </template>

    <template #description>
      Делает кликабельной / некликабельной header зону для всех вложенных аккордеонов. Переключать
      состояние в таком случае можно с помощью слота activator.
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
    :component="DemoAccordionPropsDisabled"
    :component-source="DemoAccordionPropsDisabledSource"
  >
    <template #header> Accordion: Prop Disabled </template>

    <template #description>
      disabled состояние компонента. Дочерние элементы аккордиона наследуют это состояние.
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
    :component="DemoAccordionPropsCssClass"
    :component-source="DemoAccordionPropsCssClassSource"
  >
    <template #header> Accordion: Prop CssClass </template>

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
    :component="DemoAccordionPropsModifier"
    :component-source="DemoAccordionPropsModifierSource"
  >
    <template #header> Accordion: Prop Modifier </template>

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
    :component="DemoAccordionExposeOpenAll"
    :component-source="DemoAccordionExposeOpenAllSource"
  >
    <template #header> Accordion: Expose OpenAll </template>

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
    :component="DemoAccordionExposeCloseAll"
    :component-source="DemoAccordionExposeCloseAllSource"
  >
    <template #header> Accordion: Expose CloseAll </template>

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
    :component="DemoAccordionExposeUpdateBy"
    :component-source="DemoAccordionExposeUpdateBySource"
  >
    <template #header> Accordion: Expose UpdateBy </template>

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
    :component="DemoAccordionItemPropsOpened"
    :component-source="DemoAccordionItemPropsOpenedSource"
  >
    <template #header> AccordionItem: Prop Opened </template>

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
    :component="DemoAccordionItemPropsDisabled"
    :component-source="DemoAccordionItemPropsDisabledSource"
  >
    <template #header> AccordionItem: Prop Disabled </template>

    <template #description> disabled состояние компонента. </template>

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
    :component="DemoAccordionItemPropsAriaLabel"
    :component-source="DemoAccordionItemPropsAriaLabelSource"
  >
    <template #header> AccordionItem: Prop AriaLabel </template>

    <template #description> Устанавливает значение атрибуту aria-label. </template>

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
    :component="DemoAccordionItemSlotsDefault"
    :component-source="DemoAccordionItemSlotsDefaultSource"
  >
    <template #header> AccordionItem: Slot Default </template>

    <template #description>
      Слот для отображения основного содержимого элемента AccordionItem.
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
    :component="DemoAccordionItemSlotsHeader"
    :component-source="DemoAccordionItemSlotsHeaderSource"
  >
    <template #header> AccordionItem: Slot Header </template>

    <template #description>
      Слот для отображения содержимого заголовка элемента AccordionItem.
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
    :component="DemoAccordionItemSlotsActivator"
    :component-source="DemoAccordionItemSlotsActivatorSource"
  >
    <template #header> AccordionItem: Slot Activator </template>

    <template #description> Слот для отображения активатора элемента AccordionItem. </template>

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
    :component="DemoAccordionItemExposeToggle"
    :component-source="DemoAccordionItemExposeToggleSource"
  >
    <template #header> AccordionItem: Expose Toggle </template>

    <template #description> Переключает состояние opened. </template>

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
    :component="DemoAccordionItemExposeOpen"
    :component-source="DemoAccordionItemExposeOpenSource"
  >
    <template #header> AccordionItem: Expose Open </template>

    <template #description> Открывает аккордеон. </template>

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
    :component="DemoAccordionItemExposeClose"
    :component-source="DemoAccordionItemExposeCloseSource"
  >
    <template #header> AccordionItem: Expose Close </template>

    <template #description> Закрывает аккордеон. </template>

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
import DemoAccordionPropsSingleMode from './demos/demo.accordion.props.single-mode.vue';
import DemoAccordionPropsSingleModeSource from './demos/demo.accordion.props.single-mode.vue?raw';
import DemoAccordionPropsOpened from './demos/demo.accordion.props.opened.vue';
import DemoAccordionPropsOpenedSource from './demos/demo.accordion.props.opened.vue?raw';
import DemoAccordionPropsClickableHeader from './demos/demo.accordion.props.clickable-header.vue';
import DemoAccordionPropsClickableHeaderSource from './demos/demo.accordion.props.clickable-header.vue?raw';
import DemoAccordionPropsDisabled from './demos/demo.accordion.props.disabled.vue';
import DemoAccordionPropsDisabledSource from './demos/demo.accordion.props.disabled.vue?raw';
import DemoAccordionPropsCssClass from './demos/demo.accordion.props.css-class.vue';
import DemoAccordionPropsCssClassSource from './demos/demo.accordion.props.css-class.vue?raw';
import DemoAccordionPropsModifier from './demos/demo.accordion.props.modifier.vue';
import DemoAccordionPropsModifierSource from './demos/demo.accordion.props.modifier.vue?raw';
import DemoAccordionExposeOpenAll from './demos/demo.accordion.expose.open-all.vue';
import DemoAccordionExposeOpenAllSource from './demos/demo.accordion.expose.open-all.vue?raw';
import DemoAccordionExposeCloseAll from './demos/demo.accordion.expose.close-all.vue';
import DemoAccordionExposeCloseAllSource from './demos/demo.accordion.expose.close-all.vue?raw';
import DemoAccordionExposeUpdateBy from './demos/demo.accordion.expose.update-by.vue';
import DemoAccordionExposeUpdateBySource from './demos/demo.accordion.expose.update-by.vue?raw';
import DemoAccordionItemPropsOpened from './demos/demo.accordion-item.props.opened.vue';
import DemoAccordionItemPropsOpenedSource from './demos/demo.accordion-item.props.opened.vue?raw';
import DemoAccordionItemPropsDisabled from './demos/demo.accordion-item.props.disabled.vue';
import DemoAccordionItemPropsDisabledSource from './demos/demo.accordion-item.props.disabled.vue?raw';
import DemoAccordionItemPropsAriaLabel from './demos/demo.accordion-item.props.aria-label.vue';
import DemoAccordionItemPropsAriaLabelSource from './demos/demo.accordion-item.props.aria-label.vue?raw';
import DemoAccordionItemSlotsDefault from './demos/demo.accordion-item.slots.default.vue';
import DemoAccordionItemSlotsDefaultSource from './demos/demo.accordion-item.slots.default.vue?raw';
import DemoAccordionItemSlotsHeader from './demos/demo.accordion-item.slots.header.vue';
import DemoAccordionItemSlotsHeaderSource from './demos/demo.accordion-item.slots.header.vue?raw';
import DemoAccordionItemSlotsActivator from './demos/demo.accordion-item.slots.activator.vue';
import DemoAccordionItemSlotsActivatorSource from './demos/demo.accordion-item.slots.activator.vue?raw';
import DemoAccordionItemExposeToggle from './demos/demo.accordion-item.expose.toggle.vue';
import DemoAccordionItemExposeToggleSource from './demos/demo.accordion-item.expose.toggle.vue?raw';
import DemoAccordionItemExposeOpen from './demos/demo.accordion-item.expose.open.vue';
import DemoAccordionItemExposeOpenSource from './demos/demo.accordion-item.expose.open.vue?raw';
import DemoAccordionItemExposeClose from './demos/demo.accordion-item.expose.close.vue';
import DemoAccordionItemExposeCloseSource from './demos/demo.accordion-item.expose.close.vue?raw';

definePageMeta({
  title: 'Accordion',
  layout: 'default',
});

useHead({
  title: 'Accordion',
});
</script>
