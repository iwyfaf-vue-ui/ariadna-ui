<template>
  <Previewer :component="DemoPropsVModel" :component-source="DemoPropsVModelSource">
    <template #header> Prop vModel </template>

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

  <Previewer :component="DemoPropsLabel" :component-source="DemoPropsLabelSource">
    <template #header> Prop Label </template>

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

  <Previewer :component="DemoPropsId" :component-source="DemoPropsIdSource">
    <template #header> Prop Id </template>

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

  <Previewer :component="DemoPropsPlaceholder" :component-source="DemoPropsPlaceholderSource">
    <template #header> Prop Placeholder </template>

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

  <Previewer :component="DemoPropsWritable" :component-source="DemoPropsWritableSource">
    <template #header> Prop Writable </template>
    <template #description> Управляет состоянием ручного ввода данных в компонент. </template>

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

  <Previewer :component="DemoPropsClearable" :component-source="DemoPropsClearableSource">
    <template #header> Prop Clearable </template>
    <template #description>
      Управляет отображением элемента, который очищает значение компонента.
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

  <Previewer :component="DemoPropsSize" :component-source="DemoPropsSizeSource">
    <template #header> Prop Size </template>
    <template #description> Предопределенные варианты размеров компонента. </template>

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

  <Previewer :component="DemoPropsValid" :component-source="DemoPropsValidSource">
    <template #header> Prop Valid </template>

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

  <Previewer :component="DemoPropsErrors" :component-source="DemoPropsErrorsSource">
    <template #header> Prop Errors </template>

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

  <Previewer :component="DemoSlotsChips" :component-source="DemoSlotsChipsSource">
    <template #header> Slot Chip </template>
    <template #description> Слот для отображения значения каждого чипса. </template>

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

  <Previewer :component="DemoSlotsRemove" :component-source="DemoSlotsRemoveSource">
    <template #header> Slot Remove </template>
    <template #description> Слот для отображения кнопки удаления каждого чипса. </template>

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

  <Previewer :component="DemoSlotsClear" :component-source="DemoSlotsClearSource">
    <template #header> Slot Clear </template>
    <template #description> Слот для отображения кнопки очистки значения компонента. </template>

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

  <Previewer :component="DemoSlotsInput" :component-source="DemoSlotsInputSource">
    <template #header> Slot Input </template>
    <template #description> </template>

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

  <Previewer :component="DemoSlotsErrors" :component-source="DemoSlotsErrorsSource">
    <template #header> Slot Errors </template>
    <template #description>
      Используется для вывода сообщений об ошибках. В props errors передаются ошибки, которые затем
      выводятся в слоте.
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
    :component="DemoEmitsUpdateModelValue"
    :component-source="DemoEmitsUpdateModelValueSource"
  >
    <template #header> Emit update:model-value </template>
    <template #description> Событие срабатывает при обновлении значения modelValue. </template>

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

  <Previewer :component="DemoEmitsAdd" :component-source="DemoEmitsAddSource">
    <template #header> Emit add </template>
    <template #description> Событие срабатывает при добавлении одного значения. </template>

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

  <Previewer :component="DemoEmitsRemove" :component-source="DemoEmitsRemoveSource">
    <template #header> Emit remove </template>
    <template #description> Событие срабатывает при удаление одного значения. </template>

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

  <Previewer :component="DemoEmitsClear" :component-source="DemoEmitsClearSource">
    <template #header> Emit clear </template>
    <template #description> Событие срабатывает при очистке всех значений. </template>

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

  <Previewer :component="DemoEmitsFocus" :component-source="DemoEmitsFocusSource">
    <template #header> Emit focus </template>

    <template #description> Событие срабатывает когда компонент получает фокусировку. </template>

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

  <Previewer :component="DemoEmitsBlur" :component-source="DemoEmitsBlurSource">
    <template #header> Emit blur </template>

    <template #description> Событие срабатывает когда компонент теряет фокусировку. </template>

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
import DemoPropsLabel from './demos/demo.props.label.vue';
import DemoPropsLabelSource from './demos/demo.props.label.vue?raw';
import DemoPropsId from './demos/demo.props.id.vue';
import DemoPropsIdSource from './demos/demo.props.id.vue?raw';
import DemoPropsPlaceholder from './demos/demo.props.placeholder.vue';
import DemoPropsPlaceholderSource from './demos/demo.props.placeholder.vue?raw';
import DemoPropsWritable from './demos/demo.props.writable.vue';
import DemoPropsWritableSource from './demos/demo.props.writable.vue?raw';
import DemoPropsClearable from './demos/demo.props.clearable.vue';
import DemoPropsClearableSource from './demos/demo.props.clearable.vue?raw';
import DemoPropsSize from './demos/demo.props.size.vue';
import DemoPropsSizeSource from './demos/demo.props.size.vue?raw';
import DemoPropsValid from './demos/demo.props.valid.vue';
import DemoPropsValidSource from './demos/demo.props.valid.vue?raw';
import DemoPropsInvalid from './demos/demo.props.invalid.vue';
import DemoPropsInvalidSource from './demos/demo.props.invalid.vue?raw';
import DemoPropsErrors from './demos/demo.props.errors.vue';
import DemoPropsErrorsSource from './demos/demo.props.errors.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoPropsModifier from './demos/demo.props.modifier.vue';
import DemoPropsModifierSource from './demos/demo.props.modifier.vue?raw';
import DemoSlotsChips from './demos/demo.slots.chip.vue';
import DemoSlotsChipsSource from './demos/demo.slots.chip.vue?raw';
import DemoSlotsRemove from './demos/demo.slots.remove.vue';
import DemoSlotsRemoveSource from './demos/demo.slots.remove.vue?raw';
import DemoSlotsClear from './demos/demo.slots.clear.vue';
import DemoSlotsClearSource from './demos/demo.slots.clear.vue?raw';
import DemoSlotsInput from './demos/demo.slots.input.vue';
import DemoSlotsInputSource from './demos/demo.slots.input.vue?raw';
import DemoSlotsErrors from './demos/demo.slots.errors.vue';
import DemoSlotsErrorsSource from './demos/demo.slots.errors.vue?raw';
import DemoEmitsUpdateModelValue from './demos/demo.emits.update-model-value.vue';
import DemoEmitsUpdateModelValueSource from './demos/demo.emits.update-model-value.vue?raw';
import DemoEmitsAdd from './demos/demo.emits.add.vue';
import DemoEmitsAddSource from './demos/demo.emits.add.vue?raw';
import DemoEmitsRemove from './demos/demo.emits.remove.vue';
import DemoEmitsRemoveSource from './demos/demo.emits.remove.vue?raw';
import DemoEmitsClear from './demos/demo.emits.clear.vue';
import DemoEmitsClearSource from './demos/demo.emits.clear.vue?raw';
import DemoEmitsFocus from './demos/demo.emits.focus.vue';
import DemoEmitsFocusSource from './demos/demo.emits.focus.vue?raw';
import DemoEmitsBlur from './demos/demo.emits.blur.vue';
import DemoEmitsBlurSource from './demos/demo.emits.blur.vue?raw';

definePageMeta({
  title: 'Chips',
  layout: 'default',
});

useHead({
  title: 'Chips',
});
</script>
