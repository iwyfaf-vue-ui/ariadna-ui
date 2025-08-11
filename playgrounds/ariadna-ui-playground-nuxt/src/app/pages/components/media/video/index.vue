<template>
  <Previewer :component="DemoPropsSrc" :component-source="DemoPropsSrcSource">
    <template #header> Prop Src </template>

    <template #description> Источник видео. </template>

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

  <Previewer :component="DemoPropsPreload" :component-source="DemoPropsPreloadSource">
    <template #header> Prop Preload </template>

    <template #description>
      Поведение загрузки видео плеером, посмотреть подробнее про каждое значение можно
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video#preload"
        >здесь</a
      >. В примере ниже стоит none, это значит, что пока плеер не начнёт проигрывать видео - он не
      будет его загружать.
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

  <Previewer :component="DemoPropsControls" :component-source="DemoPropsControlsSource">
    <template #header> Prop Controls </template>

    <template #description> Включает / выключает блок controls. </template>

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
    :component="DemoPropsShowControlsAlways"
    :component-source="DemoPropsShowControlsAlwaysSource"
  >
    <template #header> Prop ShowControlsAlways </template>

    <template #description>
      Если true, то при включённом props.controls - контролы будут всегда видны и
      props.timeToHideControlsMs не будет играть никакого значения.
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
    :component="DemoPropsTimeToHideControlsMs"
    :component-source="DemoPropsTimeToHideControlsMsSource"
  >
    <template #header> Prop TimeToHideControlsMs </template>

    <template #description>
      Указывает через какое время (в милисекундах) controls будут скрыты, если курсор пользователя
      находится внутри окна видео плеера. Для работы этого пропса props.controls должен быть true.
      Условия при которых controls могут быть скрыты: Видео проигрывается, а пользователь не двигает
      мышью по видео плееру. Также если видео проигрывается, а курсор пользователя не находится на
      блоке controls. В остальных случаях блок controls виден и на нём висит модификатор visible.
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
    :component="DemoPropsTimeToHideControlsOnOutsideMs"
    :component-source="DemoPropsTimeToHideControlsOnOutsideMsSource"
  >
    <template #header> Prop TimeToHideControlsOnOutsideMs </template>

    <template #description>
      Указывает через какое время (в милисекундах) controls будут скрыты в случае перемещения мыши
      за пределы плеера. Для работы этого пропса props.controls должен быть true.
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

  <Previewer :component="DemoPropsMuted" :component-source="DemoPropsMutedSource">
    <template #header> Prop Muted </template>

    <template #description> Отключает звук у видео, также убирает иконку громкости. </template>

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

  <Previewer :component="DemoPropsAutoplay" :component-source="DemoPropsAutoplaySource">
    <template #header> Prop Autoplay </template>

    <template #description>
      Включает автопроигрывание видео, работает только совместо с props.muted.
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

  <Previewer :component="DemoPropsLoop" :component-source="DemoPropsLoopSource">
    <template #header> Prop Loop </template>

    <template #description> Включает зацикливание видео. </template>

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

  <Previewer :component="DemoPropsVolume" :component-source="DemoPropsVolumeSource">
    <template #header> Prop Volume </template>

    <template #description> Значение громкости видео в диапазоне от 0 до 1. </template>

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
    :component="DemoPropsFastForwardSeconds"
    :component-source="DemoPropsFastForwardSecondsSource"
  >
    <template #header> Prop FastForward </template>

    <template #description>
      Количество секунд, на которое будет совершена быстрая перемотка вперёд (работает для стрелочек
      вверх и вправо на ПК).
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
    :component="DemoPropsFastRewindSeconds"
    :component-source="DemoPropsFastRewindSecondsSource"
  >
    <template #header> Prop FastRewindSeconds </template>

    <template #description>
      Количество секунд, на которое будет совершена быстрая перемотка назад (работает для стрелочек
      вверх и вправо на ПК).
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

  <Previewer :component="DemoPropsHeight" :component-source="DemoPropsHeightSource">
    <template #header> Prop Height </template>

    <template #description> Высота плеера. </template>

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

  <Previewer :component="DemoPropsWidth" :component-source="DemoPropsWidthSource">
    <template #header> Prop Width </template>

    <template #description> Ширина плеера. </template>

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

  <Previewer :component="DemoPropsPoster" :component-source="DemoPropsPosterSource">
    <template #header> Prop Poster </template>

    <template #description>
      Постер/превью для видео. Если не указывать - берётся случайный кадр из видео.
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

  <Previewer :component="DemoSlotsDefault" :component-source="DemoSlotsDefaultSource">
    <template #header> Slot Default </template>

    <template #description>
      Кастомный контент, отобразится в случае, если браузер пользователя не поддерживает video
      элемент.
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

  <Previewer :component="DemoSlotsPlayIcon" :component-source="DemoSlotsPlayIconSource">
    <template #header> Slot PlayIcon </template>

    <template #description> Иконка для кнопки плей. </template>

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

  <Previewer :component="DemoSlotsStopIcon" :component-source="DemoSlotsStopIconSource">
    <template #header> Slot StopIcon </template>

    <template #description> Иконка для кнопки паузы. </template>

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

  <Previewer :component="DemoSlotsVolumeIcon" :component-source="DemoSlotsVolumeIconSource">
    <template #header> Slot VolumeIcon </template>

    <template #description>
      Иконка громкости. Имеет параметр volume, который указывает текущую громкость.
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

  <Previewer :component="DemoSlotsFullscreenIcon" :component-source="DemoSlotsFullscreenIconSource">
    <template #header> Slot FullscreenIcon </template>

    <template #description> Иконка для кнопки полноэкранного режима. </template>

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
    :component="DemoSlotsUnFullscreenIcon"
    :component-source="DemoSlotsUnFullscreenIconSource"
  >
    <template #header> Slot UnFullscreenIcon </template>

    <template #description> Иконка для кнопки выхода из полноэкранного режима. </template>

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

  <Previewer :component="DemoSlotsLoadingIcon" :component-source="DemoSlotsLoadingIconSource">
    <template #header> Slot LoadingIcon </template>

    <template #description> Иконка загрузки видео. </template>

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

  <Previewer :component="DemoSlotsTime" :component-source="DemoSlotsTimeSource">
    <template #header> Slot Time </template>

    <template #description> Позволяет сделать кастомное отображение времени. </template>

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
import DemoPropsSrc from './demos/demo.props.src.vue';
import DemoPropsSrcSource from './demos/demo.props.src.vue?raw';
import DemoPropsPreload from './demos/demo.props.preload.vue';
import DemoPropsPreloadSource from './demos/demo.props.preload.vue?raw';
import DemoPropsControls from './demos/demo.props.controls.vue';
import DemoPropsControlsSource from './demos/demo.props.controls.vue?raw';
import DemoPropsShowControlsAlways from './demos/demo.props.show-controls-always.vue';
import DemoPropsShowControlsAlwaysSource from './demos/demo.props.show-controls-always.vue?raw';
import DemoPropsTimeToHideControlsMs from './demos/demo.props.time-to-hide-controls-ms.vue';
import DemoPropsTimeToHideControlsMsSource from './demos/demo.props.time-to-hide-controls-ms.vue?raw';
import DemoPropsTimeToHideControlsOnOutsideMs from './demos/demo.props.time-to-hide-controls-on-outside-ms.vue';
import DemoPropsTimeToHideControlsOnOutsideMsSource from './demos/demo.props.time-to-hide-controls-on-outside-ms.vue?raw';
import DemoPropsMuted from './demos/demo.props.muted.vue';
import DemoPropsMutedSource from './demos/demo.props.muted.vue?raw';
import DemoPropsAutoplay from './demos/demo.props.autoplay.vue';
import DemoPropsAutoplaySource from './demos/demo.props.autoplay.vue?raw';
import DemoPropsLoop from './demos/demo.props.loop.vue';
import DemoPropsLoopSource from './demos/demo.props.loop.vue?raw';
import DemoPropsVolume from './demos/demo.props.volume.vue';
import DemoPropsVolumeSource from './demos/demo.props.volume.vue?raw';
import DemoPropsFastForwardSeconds from './demos/demo.props.fast-forward-seconds.vue';
import DemoPropsFastForwardSecondsSource from './demos/demo.props.fast-forward-seconds.vue?raw';
import DemoPropsFastRewindSeconds from './demos/demo.props.fast-rewind-seconds.vue';
import DemoPropsFastRewindSecondsSource from './demos/demo.props.fast-rewind-seconds.vue?raw';
import DemoPropsHeight from './demos/demo.props.height.vue';
import DemoPropsHeightSource from './demos/demo.props.height.vue?raw';
import DemoPropsWidth from './demos/demo.props.width.vue';
import DemoPropsWidthSource from './demos/demo.props.width.vue?raw';
import DemoPropsPoster from './demos/demo.props.poster.vue';
import DemoPropsPosterSource from './demos/demo.props.poster.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoSlotsDefault from './demos/demo.slots.default.vue';
import DemoSlotsDefaultSource from './demos/demo.slots.default.vue?raw';
import DemoSlotsPlayIcon from './demos/demo.slots.play-icon.vue';
import DemoSlotsPlayIconSource from './demos/demo.slots.play-icon.vue?raw';
import DemoSlotsStopIcon from './demos/demo.slots.stop-icon.vue';
import DemoSlotsStopIconSource from './demos/demo.slots.stop-icon.vue?raw';
import DemoSlotsVolumeIcon from './demos/demo.slots.volume-icon.vue';
import DemoSlotsVolumeIconSource from './demos/demo.slots.volume-icon.vue?raw';
import DemoSlotsFullscreenIcon from './demos/demo.slots.fullscreen-icon.vue';
import DemoSlotsFullscreenIconSource from './demos/demo.slots.fullscreen-icon.vue?raw';
import DemoSlotsUnFullscreenIcon from './demos/demo.slots.un-fullscreen-icon.vue';
import DemoSlotsUnFullscreenIconSource from './demos/demo.slots.un-fullscreen-icon.vue?raw';
import DemoSlotsLoadingIcon from './demos/demo.slots.loading-icon.vue';
import DemoSlotsLoadingIconSource from './demos/demo.slots.loading-icon.vue?raw';
import DemoSlotsTime from './demos/demo.slots.time.vue';
import DemoSlotsTimeSource from './demos/demo.slots.time.vue?raw';

definePageMeta({
  title: 'Player',
  layout: 'default',
});

useHead({
  title: 'Player',
});
</script>
