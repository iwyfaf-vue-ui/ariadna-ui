<template>
  <Previewer :component="DemoPropsPositionY" :component-source="DemoPropsPositionYSource">
    <template #header> Prop positionY </template>

    <template #description> Позиционирование по оси Y. </template>

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

  <Previewer :component="DemoPropsPositionX" :component-source="DemoPropsPositionXSource">
    <template #header> Prop positionX </template>

    <template #description> Позиционирование по оси X. </template>

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

  <Previewer :component="DemoPropsGroup" :component-source="DemoPropsGroupSource">
    <template #header> Prop group </template>

    <template #description> Уникальный идентификатор для группы сообщений. </template>

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
    <template #header> Prop max </template>

    <template #description>
      Максимальное количество всплывающих сообщений, отображаемых одновременно.
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
    :component="DemoPropsHideProgressbar"
    :component-source="DemoPropsHideProgressbarSource"
  >
    <template #header> Prop hideProgressbar </template>

    <template #description>
      Должен ли индикатор времени жизни всплывающего сообщения отображаться в уведомлении или нет.
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

  <Previewer :component="DemoPropsTransition" :component-source="DemoPropsTransitionSource">
    <template #header> Prop transition </template>

    <template #description>
      Определяет название анимации перехода, применяемой к всплывающим сообщениям, когда они входят
      в DOM и выходят из него.
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

  <Previewer :component="DemoPropsAppendTo" :component-source="DemoPropsAppendToSource">
    <template #header> Prop appendTo </template>

    <template #description>
      Существующий query selector или HTMLElement, указывающий, куда монтируется компонент.
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

  <Previewer :component="DemoPropsOnMouseEnter" :component-source="DemoPropsOnMouseEnterSource">
    <template #header> Prop onMouseEnter </template>

    <template #description>
      Используется для указания callback-функции, которая будет запускаться при срабатывании события
      mouseenter на компоненте.
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

  <Previewer :component="DemoPropsOnMouseLeave" :component-source="DemoPropsOnMouseLeaveSource">
    <template #header> Prop onMouseLeave </template>

    <template #description>
      Используется для указания callback-функции, которая будет запускаться при срабатывании события
      mouseleave на компоненте.
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

  <Previewer :component="DemoPropsOnClick" :component-source="DemoPropsOnClickSource">
    <template #header> Prop onClick </template>

    <template #description>
      Используется для указания callback-функции, которая будет запускаться при срабатывании события
      click на компоненте.
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

  <Previewer :component="DemoSlotsDetail" :component-source="DemoSlotsDetailSource">
    <template #header> Slot detail </template>

    <template #description> Используется для кастомизации сообщения. </template>

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

  <Previewer :component="DemoSlotsMessageIcon" :component-source="DemoSlotsMessageIconSource">
    <template #header> Slot messageIcon </template>

    <template #description> Используется для кастомизации иконки сообщения. </template>

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

  <Previewer :component="DemoSlotsSummary" :component-source="DemoSlotsSummarySource">
    <template #header> Slot summary </template>

    <template #description>
      Используется для отображения краткой сводки всплывающего окна.
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

  <Previewer :component="DemoSlotsCaption" :component-source="DemoSlotsCaptionSource">
    <template #header> Slot caption </template>

    <template #description> Используется для отображения подписи всплывающего окна. </template>

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

  <Previewer :component="DemoSlotsCloseIcon" :component-source="DemoSlotsCloseIconSource">
    <template #header> Slot closeIcon </template>

    <template #description> Используется для кастомизации иконки закрытия. </template>

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

  <Previewer :component="DemoSlotsInfoIcon" :component-source="DemoSlotsInfoIconSource">
    <template #header> Slot infoIcon </template>

    <template #description> Используется для кастомизации иконки сообщения-информации. </template>

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

  <Previewer :component="DemoSlotsWarnIcon" :component-source="DemoSlotsWarnIconSource">
    <template #header> Slot warnIcon </template>

    <template #description>
      Используется для кастомизации иконки сообщения-предупреждения.
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

  <Previewer :component="DemoSlotsDangerIcon" :component-source="DemoSlotsDangerIconSource">
    <template #header> Slot dangerIcon </template>

    <template #description> Используется для кастомизации иконки сообщения-ошибки. </template>

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

  <Previewer :component="DemoSlotsSuccessIcon" :component-source="DemoSlotsSuccessIconSource">
    <template #header> Slot successIcon </template>

    <template #description> Используется для кастомизации иконки сообщения-успеха. </template>

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

    <template #description> Событие срабатывает при добавлении всплывающего окна. </template>

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

  <Previewer :component="DemoEmitsClose" :component-source="DemoEmitsCloseSource">
    <template #header> Emit close </template>

    <template #description> Событие срабатывает при закрытии всплывающего окна. </template>

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

  <Previewer :component="DemoEmitsTtlEnd" :component-source="DemoEmitsTtlEndSource">
    <template #header> Emit ttl-end </template>

    <template #description>
      Событие срабатывает при истечении времени жизни всплывающего окна.
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

  <Previewer :component="DemoApiCreated" :component-source="DemoApiCreatedSource">
    <template #header> API created </template>

    <template #description> Хук жизненного цикла created. </template>

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

  <Previewer :component="DemoApiMounted" :component-source="DemoApiMountedSource">
    <template #header> API mounted </template>

    <template #description> Хук жизненного цикла mounted. </template>

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

  <Previewer :component="DemoApiUnMounted" :component-source="DemoApiUnMountedSource">
    <template #header> API unMounted </template>

    <template #description> Хук жизненного цикла unMounted. </template>

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

  <Previewer :component="DemoApiAdd" :component-source="DemoApiAddSource">
    <template #header> API add </template>

    <template #description> Добавляет новое Toast-уведомление в очередь отображения. </template>

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

  <Previewer :component="DemoApiRemove" :component-source="DemoApiRemoveSource">
    <template #header> API remove </template>

    <template #description> Удаляет Toast-уведомление по его внутреннему идентификатору. </template>

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

  <Previewer :component="DemoApiRemoveGroup" :component-source="DemoApiRemoveGroupSource">
    <template #header> API removeGroup </template>

    <template #description> Удаляет все Toast-уведомления по группе. </template>

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

  <Previewer :component="DemoApiRemoveAll" :component-source="DemoApiRemoveAllSource">
    <template #header> API removeAll </template>

    <template #description> Удаляет все Toast-уведомления. </template>

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
import DemoPropsPositionY from './demos/demo.props.position-y.vue';
import DemoPropsPositionYSource from './demos/demo.props.position-y.vue?raw';
import DemoPropsPositionX from './demos/demo.props.position-x.vue';
import DemoPropsPositionXSource from './demos/demo.props.position-x.vue?raw';
import DemoPropsGroup from './demos/demo.props.group.vue';
import DemoPropsGroupSource from './demos/demo.props.group.vue?raw';
import DemoPropsMax from './demos/demo.props.max.vue';
import DemoPropsMaxSource from './demos/demo.props.max.vue?raw';
import DemoPropsHideProgressbar from './demos/demo.props.hide-progressbar.vue';
import DemoPropsHideProgressbarSource from './demos/demo.props.hide-progressbar.vue?raw';
import DemoPropsTransition from './demos/demo.props.transition.vue';
import DemoPropsTransitionSource from './demos/demo.props.transition.vue?raw';
import DemoPropsAppendTo from './demos/demo.props.append-to.vue';
import DemoPropsAppendToSource from './demos/demo.props.append-to.vue?raw';
import DemoPropsOnMouseEnter from './demos/demo.props.on-mouse-enter.vue';
import DemoPropsOnMouseEnterSource from './demos/demo.props.on-mouse-enter.vue?raw';
import DemoPropsOnMouseLeave from './demos/demo.props.on-mouse-leave.vue';
import DemoPropsOnMouseLeaveSource from './demos/demo.props.on-mouse-leave.vue?raw';
import DemoPropsOnClick from './demos/demo.props.on-click.vue';
import DemoPropsOnClickSource from './demos/demo.props.on-click.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoSlotsDetail from './demos/demo.slots.detail.vue';
import DemoSlotsDetailSource from './demos/demo.slots.detail.vue?raw';
import DemoSlotsMessageIcon from './demos/demo.slots.message-icon.vue';
import DemoSlotsMessageIconSource from './demos/demo.slots.message-icon.vue?raw';
import DemoSlotsSummary from './demos/demo.slots.summary.vue';
import DemoSlotsSummarySource from './demos/demo.slots.summary.vue?raw';
import DemoSlotsCaption from './demos/demo.slots.caption.vue';
import DemoSlotsCaptionSource from './demos/demo.slots.caption.vue?raw';
import DemoSlotsCloseIcon from './demos/demo.slots.close-icon.vue';
import DemoSlotsCloseIconSource from './demos/demo.slots.close-icon.vue?raw';
import DemoSlotsInfoIcon from './demos/demo.slots.info-icon.vue';
import DemoSlotsInfoIconSource from './demos/demo.slots.info-icon.vue?raw';
import DemoSlotsWarnIcon from './demos/demo.slots.warn-icon.vue';
import DemoSlotsWarnIconSource from './demos/demo.slots.warn-icon.vue?raw';
import DemoSlotsDangerIcon from './demos/demo.slots.danger-icon.vue';
import DemoSlotsDangerIconSource from './demos/demo.slots.danger-icon.vue?raw';
import DemoSlotsSuccessIcon from './demos/demo.slots.success-icon.vue';
import DemoSlotsSuccessIconSource from './demos/demo.slots.success-icon.vue?raw';
import DemoEmitsAdd from './demos/demo.emits.add.vue';
import DemoEmitsAddSource from './demos/demo.emits.add.vue?raw';
import DemoEmitsClose from './demos/demo.emits.close.vue';
import DemoEmitsCloseSource from './demos/demo.emits.close.vue?raw';
import DemoEmitsTtlEnd from './demos/demo.emits.ttl-end.vue';
import DemoEmitsTtlEndSource from './demos/demo.emits.ttl-end.vue?raw';
import DemoApiCreated from './demos/demo.api.created.vue';
import DemoApiCreatedSource from './demos/demo.api.created.vue?raw';
import DemoApiMounted from './demos/demo.api.mounted.vue';
import DemoApiMountedSource from './demos/demo.api.mounted.vue?raw';
import DemoApiUnMounted from './demos/demo.api.un-mounted.vue';
import DemoApiUnMountedSource from './demos/demo.api.un-mounted.vue?raw';
import DemoApiAdd from './demos/demo.api.add.vue';
import DemoApiAddSource from './demos/demo.api.add.vue?raw';
import DemoApiRemove from './demos/demo.api.remove.vue';
import DemoApiRemoveSource from './demos/demo.api.remove.vue?raw';
import DemoApiRemoveGroup from './demos/demo.api.remove-group.vue';
import DemoApiRemoveGroupSource from './demos/demo.api.remove-group.vue?raw';
import DemoApiRemoveAll from './demos/demo.api.remove-all.vue';
import DemoApiRemoveAllSource from './demos/demo.api.remove-all.vue?raw';

definePageMeta({
  title: 'Toast',
  layout: 'default',
});

useHead({
  title: 'Toast',
});
</script>
