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

  <Previewer :component="DemoPropsName" :component-source="DemoPropsNameSource">
    <template #header> Prop Name </template>

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

  <Previewer :component="DemoPropsAutocomplete" :component-source="DemoPropsAutocompleteSource">
    <template #header> Prop Autocomplete </template>

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
    <template #header> Prop Disabled </template>

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

  <Previewer :component="DemoPropsReadonly" :component-source="DemoPropsReadonlySource">
    <template #header> Prop Readonly </template>

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

  <Previewer :component="DemoPropsControls" :component-source="DemoPropsControlsSource">
    <template #header> Prop Controls </template>

    <template #description>
      Отображать элементы для управления операциями увеличения и уменьшения значения.
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

  <Previewer :component="DemoPropsMin" :component-source="DemoPropsMinSource">
    <template #header> Prop Min </template>

    <template #description> Prop min определяет минимальное значения компонента. </template>

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

  <Previewer :component="DemoPropsMax" :component-source="DemoPropsMaxSource">
    <template #header> Prop Max </template>

    <template #description> Prop max определяет максимальное значения компонента. </template>

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

  <Previewer :component="DemoPropsStep" :component-source="DemoPropsStepSource">
    <template #header> Prop Step </template>

    <template #description>
      Шаговый коэффициент для увеличения/уменьшения значения. Работает только вместе с prop
      controls.
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

  <Previewer :component="DemoPropsEmpty" :component-source="DemoPropsEmptySource">
    <template #header> Prop Empty </template>

    <template #description>
      Значение компонента по умолчанию, если значение отсутствует (например, если удалить значение
      через backspace).
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

  <Previewer :component="DemoPropsPrefix" :component-source="DemoPropsPrefixSource">
    <template #header> Prop Prefix </template>

    <template #description> Текст, который будет показан до значения. </template>

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

  <Previewer :component="DemoPropsSuffix" :component-source="DemoPropsSuffixSource">
    <template #header> Prop Suffix </template>

    <template #description> Текст, который будет показан после значения. </template>

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

  <Previewer :component="DemoPropsLocale" :component-source="DemoPropsLocaleSource">
    <template #header> Prop Locale </template>

    <template #description>
      Язык, который будет использоваться при форматировании значения.
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

  <Previewer :component="DemoPropsMasked" :component-source="DemoPropsMaskedSource">
    <template #header> Prop Masked </template>

    <template #description>
      Модель будет замаскирована (может содержать разделительные символы).
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

  <Previewer :component="DemoSlotsPlaceholder" :component-source="DemoSlotsPlaceholderSource">
    <template #header> Slot Placeholder </template>

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

  <Previewer :component="DemoSlotsAddonBefore" :component-source="DemoSlotsAddonBeforeSource">
    <template #header> Slot AddonBefore </template>

    <template #description> Содержимое, отображаемое перед полем ввода. </template>

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

  <Previewer :component="DemoSlotsAddonAfter" :component-source="DemoSlotsAddonAfterSource">
    <template #header> Slot AddonAfter </template>

    <template #description> Содержимое, отображаемое после поля ввода. </template>

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
    :component="DemoSlotsDecrementControl"
    :component-source="DemoSlotsDecrementControlSource"
  >
    <template #header> Slot DecrementControl </template>

    <template #description>
      Используется для кастомизации контрола управления уменьшением значения.
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
    :component="DemoSlotsIncrementControl"
    :component-source="DemoSlotsIncrementControlSource"
  >
    <template #header> Slot IncrementControl </template>

    <template #description>
      Используется для кастомизации контрола управления увеличением значения.
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

  <Previewer :component="DemoSlotsErrors" :component-source="DemoSlotsErrorsSource">
    <template #header> Slot Errors </template>

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

    <template #description> Событие срабатывает при обновлении значения модели. </template>

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

  <Previewer :component="DemoEmitsChange" :component-source="DemoEmitsChangeSource">
    <template #header> Emit change </template>

    <template #description> Событие срабатывает когда значение компонента меняется. </template>

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

  <Previewer :component="DemoEmitsStep" :component-source="DemoEmitsStepSource">
    <template #header> Emit step </template>

    <template #description>
      Событие срабатывает при изменении значения компонента с помощью пошаговых элементов
      управления.
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
import DemoPropsVModel from './demos/demo.props.v-model.vue';
import DemoPropsVModelSource from './demos/demo.props.v-model.vue?raw';
import DemoPropsLabel from './demos/demo.props.label.vue';
import DemoPropsLabelSource from './demos/demo.props.label.vue?raw';
import DemoPropsId from './demos/demo.props.id.vue';
import DemoPropsIdSource from './demos/demo.props.id.vue?raw';
import DemoPropsPlaceholder from './demos/demo.props.placeholder.vue';
import DemoPropsPlaceholderSource from './demos/demo.props.placeholder.vue?raw';
import DemoPropsName from './demos/demo.props.name.vue';
import DemoPropsNameSource from './demos/demo.props.name.vue?raw';
import DemoPropsAutocomplete from './demos/demo.props.autocomplete.vue';
import DemoPropsAutocompleteSource from './demos/demo.props.autocomplete.vue?raw';
import DemoPropsDisabled from './demos/demo.props.disabled.vue';
import DemoPropsDisabledSource from './demos/demo.props.disabled.vue?raw';
import DemoPropsReadonly from './demos/demo.props.readonly.vue';
import DemoPropsReadonlySource from './demos/demo.props.readonly.vue?raw';
import DemoPropsControls from './demos/demo.props.controls.vue';
import DemoPropsControlsSource from './demos/demo.props.controls.vue?raw';
import DemoPropsSize from './demos/demo.props.size.vue';
import DemoPropsSizeSource from './demos/demo.props.size.vue?raw';
import DemoPropsMin from './demos/demo.props.min.vue';
import DemoPropsMinSource from './demos/demo.props.min.vue?raw';
import DemoPropsMax from './demos/demo.props.max.vue';
import DemoPropsMaxSource from './demos/demo.props.max.vue?raw';
import DemoPropsStep from './demos/demo.props.step.vue';
import DemoPropsStepSource from './demos/demo.props.step.vue?raw';
import DemoPropsEmpty from './demos/demo.props.empty.vue';
import DemoPropsEmptySource from './demos/demo.props.empty.vue?raw';
import DemoPropsPrefix from './demos/demo.props.prefix.vue';
import DemoPropsPrefixSource from './demos/demo.props.prefix.vue?raw';
import DemoPropsSuffix from './demos/demo.props.suffix.vue';
import DemoPropsSuffixSource from './demos/demo.props.suffix.vue?raw';
import DemoPropsLocale from './demos/demo.props.locale.vue';
import DemoPropsLocaleSource from './demos/demo.props.locale.vue?raw';
import DemoPropsMasked from './demos/demo.props.masked.vue';
import DemoPropsMaskedSource from './demos/demo.props.masked.vue?raw';
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
import DemoSlotsPlaceholder from './demos/demo.slots.placeholder.vue';
import DemoSlotsPlaceholderSource from './demos/demo.slots.placeholder.vue?raw';
import DemoSlotsAddonBefore from './demos/demo.slots.addon-before.vue';
import DemoSlotsAddonBeforeSource from './demos/demo.slots.addon-before.vue?raw';
import DemoSlotsAddonAfter from './demos/demo.slots.addon-after.vue';
import DemoSlotsAddonAfterSource from './demos/demo.slots.addon-after.vue?raw';
import DemoSlotsDecrementControl from './demos/demo.slots.decrement-control.vue';
import DemoSlotsDecrementControlSource from './demos/demo.slots.decrement-control.vue?raw';
import DemoSlotsIncrementControl from './demos/demo.slots.increment-control.vue';
import DemoSlotsIncrementControlSource from './demos/demo.slots.increment-control.vue?raw';
import DemoSlotsErrors from './demos/demo.slots.errors.vue';
import DemoSlotsErrorsSource from './demos/demo.slots.errors.vue?raw';
import DemoEmitsUpdateModelValue from './demos/demo.emits.update-model-value.vue';
import DemoEmitsUpdateModelValueSource from './demos/demo.emits.update-model-value.vue?raw';
import DemoEmitsFocus from './demos/demo.emits.focus.vue';
import DemoEmitsFocusSource from './demos/demo.emits.focus.vue?raw';
import DemoEmitsBlur from './demos/demo.emits.blur.vue';
import DemoEmitsBlurSource from './demos/demo.emits.blur.vue?raw';
import DemoEmitsChange from './demos/demo.emits.change.vue';
import DemoEmitsChangeSource from './demos/demo.emits.change.vue?raw';
import DemoEmitsStep from './demos/demo.emits.step.vue';
import DemoEmitsStepSource from './demos/demo.emits.step.vue?raw';

definePageMeta({
  title: 'InputNumber',
  layout: 'default',
});

useHead({
  title: 'InputNumber',
});
</script>
