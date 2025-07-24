<template>
  <Previewer :component="DemoPropsVModel" :component-source="DemoPropsVModelSource">
    <template #header> Prop vModel </template>

    <template #description>
      Значения для треков. Может принимать одиночное значение или диапазон. Используется совместо с
      пропсом tracks. Порядок важен. 1 элемент массива - это value 1 трека из массива tracks 2
      элемент массива - это value 2 трека из массива tracks И т.д. Если трек должен иметь 2 значения
      (слева и справа), то в modelValue указывается он таким образом: [[0, 0]]
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

  <Previewer :component="DemoPropsTracks" :component-source="DemoPropsTracksSource">
    <template #header> Prop Tracks </template>

    <template #description>
      Конфигурирует треки слайдера, где каждый трек имеет свои настройки.
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

  <Previewer :component="DemoPropsMin" :component-source="DemoPropsMinSource">
    <template #header> Prop Min </template>

    <template #description> Минимальное значение, которое можно установить для трека. </template>

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

    <template #description> Максимальное значение для трека. </template>

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
      Шаг изменения значения. По умолчанию шага нет и значение отдаётся со всеми цифрами после
      запятой.
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

  <Previewer :component="DemoPropsPoints" :component-source="DemoPropsPointsSource">
    <template #header> Prop Points </template>

    <template #description>
      Определяет конкретные точки на треке. Пропс Step будет игнорироваться при использовании
      points.
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

  <Previewer :component="DemoSlotsPoint" :component-source="DemoSlotsPointSource">
    <template #header> Slot Point </template>

    <template #description> Используется для кастомного отображения точек на треке. </template>

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

    <template #description> Используется для кастомного отображения ошибок компонента. </template>

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
import DemoPropsTracks from './demos/demo.props.tracks.vue';
import DemoPropsTracksSource from './demos/demo.props.tracks.vue?raw';
import DemoPropsLabel from './demos/demo.props.label.vue';
import DemoPropsLabelSource from './demos/demo.props.label.vue?raw';
import DemoPropsId from './demos/demo.props.id.vue';
import DemoPropsIdSource from './demos/demo.props.id.vue?raw';
import DemoPropsMin from './demos/demo.props.min.vue';
import DemoPropsMinSource from './demos/demo.props.min.vue?raw';
import DemoPropsMax from './demos/demo.props.max.vue';
import DemoPropsMaxSource from './demos/demo.props.max.vue?raw';
import DemoPropsStep from './demos/demo.props.step.vue';
import DemoPropsStepSource from './demos/demo.props.step.vue?raw';
import DemoPropsPoints from './demos/demo.props.points.vue';
import DemoPropsPointsSource from './demos/demo.props.points.vue?raw';
import DemoPropsDisabled from './demos/demo.props.disabled.vue';
import DemoPropsDisabledSource from './demos/demo.props.disabled.vue?raw';
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
import DemoSlotsPoint from './demos/demo.slots.point.vue';
import DemoSlotsPointSource from './demos/demo.slots.point.vue?raw';
import DemoSlotsErrors from './demos/demo.slots.errors.vue';
import DemoSlotsErrorsSource from './demos/demo.slots.errors.vue?raw';

definePageMeta({
  title: 'index.vue',
  layout: 'default',
});

useHead({
  title: 'index.vue',
});
</script>
