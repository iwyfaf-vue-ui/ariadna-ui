<template>
  <Previewer :component="DemoFull" :component-source="DemoFullSource">
    <template #header> Полный пример </template>

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

  <Previewer :component="DemoPropsMoveSlowFactor" :component-source="DemoPropsMoveSlowFactorSource">
    <template #header> Prop moveSlowFactor </template>

    <template #description>
      Коэффициент замедления перемещения картинки. 1 — обычная скорость, меньше 1 — медленнее,
      больше 1 — быстрее.
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
    :component="DemoPropsResizeCalculationMs"
    :component-source="DemoPropsResizeCalculationMsSource"
  >
    <template #header> Prop resizeCalculationMs </template>

    <template #description>
      Время расчета анимации слайда в миллисекундах. Используется для скрытия изображения через
      CSS-модификатор __slider--is-calculating.
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

  <Previewer :component="DemoPropsSwipeVerge" :component-source="DemoPropsSwipeVergeSource">
    <template #header> Prop swipeVerge </template>

    <template #description>
      Граница, когда свайп будет засчитан (в процентах, от 0 до 100).
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

  <Previewer :component="DemoPropsZoomStep" :component-source="DemoPropsZoomStepSource">
    <template #header> Prop zoomStep </template>

    <template #description> Шаг приближения/отдаления. </template>

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

  <Previewer :component="DemoPropsZoomMax" :component-source="DemoPropsZoomMaxSource">
    <template #header> Prop zoomMax </template>

    <template #description> Максимальное приближение в процентах (от 0 до n). </template>

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

  <Previewer :component="DemoPropsQueue" :component-source="DemoPropsQueueSource">
    <template #header> Prop queue </template>

    <template #description>
      Порядок отображения медиа-файлов. Может быть массивом с двумя элементами: ['VIDEO', 'IMAGE'].
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
    <template #header> Prop loop </template>

    <template #description> Включить/выключить зацикливание слайдера. </template>

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
    <template #header> Prop noOverlayDismiss </template>

    <template #description>
      Пользователь не может закрыть Viewer, щелкнув вне элемента слайдера.
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
    <template #header> Prop noOverlayDismiss </template>

    <template #description> Пользователь не может закрыть Viewer, по клавише Esc. </template>

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
    :component="DemoPropsIframeVideoHelper"
    :component-source="DemoPropsIframeVideoHelperSource"
  >
    <template #header> Prop iframeVideoHelper </template>

    <template #description>
      Помощник работы с iframe. После того, как prop будет прокинут, Viewer начнёт детектить
      поддерживаемые хосты и раздавать соответствующий тип = IFRAME. Также будет доступна функция
      registerIframe в некоторых слотах для регистрации iframe. Это обязательно для управления
      проигрыванием.
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
    <template #header> Prop cssClass </template>

    <template #description>
      Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости
      создавать более одного вида компонента.
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

  <Previewer :component="DemoSlotsEmpty" :component-source="DemoSlotsEmptySource">
    <template #header> Slot empty </template>

    <template #description> Слот для отображения состояния, если массив галлерея пуста. </template>

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

    <template #description> Слот для кастомной иконки кнопки закрытия Viewer. </template>

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

  <Previewer :component="DemoSlotsPrevIcon" :component-source="DemoSlotsPrevIconSource">
    <template #header> Slot prevIcon </template>

    <template #description>
      Слот для кастомной иконки кнопки перехода к предыдущему слайду.
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

  <Previewer :component="DemoSlotsNextIcon" :component-source="DemoSlotsNextIconSource">
    <template #header> Slot nextIcon </template>

    <template #description>
      Слот для кастомной иконки кнопки перехода к следующему слайду.
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

  <Previewer :component="DemoSlotsZoomInfo" :component-source="DemoSlotsZoomInfoSource">
    <template #header> Slot zoomInfo </template>

    <template #description> Слот для отображения информации о текущем уровне зума. </template>

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
    :component="DemoSlotsGalleryVideoItem"
    :component-source="DemoSlotsGalleryVideoItemSource"
  >
    <template #header> Slot galleryVideoItem </template>

    <template #description> Слот для кастомного отображения элемента видео в галерее. </template>

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
    :component="DemoSlotsGalleryImageItem"
    :component-source="DemoSlotsGalleryImageItemSource"
  >
    <template #header> Slot galleryImageItem </template>

    <template #description>
      Слот для кастомного отображения элемента изображения в галерее.
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
    :component="DemoSlotsGalleryVideoLabel"
    :component-source="DemoSlotsGalleryVideoLabelSource"
  >
    <template #header> Slot galleryVideoLabel </template>

    <template #description>
      Слот для кастомного отображения подписи или счетчика количества видео в галерее.
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
    :component="DemoSlotsGalleryImageLabel"
    :component-source="DemoSlotsGalleryImageLabelSource"
  >
    <template #header> Slot galleryImageLabel </template>

    <template #description>
      Слот для кастомного отображения подписи или счетчика количества изображений в галерее.
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

  <Previewer :component="DemoSlotsSlideItem" :component-source="DemoSlotsSlideItemSource">
    <template #header> Slot sliderItem </template>

    <template #description>
      Слот для кастомного отображения слайда (изображения или видео).
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

  <Previewer :component="DemoSlotsCalculating" :component-source="DemoSlotsCalculatingSource">
    <template #header> Slot calculating </template>

    <template #description>
      Слот для кастомного отображения контента во время его вычисления позиции слайда (время
      вычисления задается в props resizeCalculationMs.
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

  <Previewer :component="DemoExposeGetZoom" :component-source="DemoExposeGetZoomSource">
    <template #header> Expose getZoom </template>

    <template #description> Возвращает текущий уровень зума. </template>

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

  <Previewer :component="DemoExposeGetIndex" :component-source="DemoExposeGetIndexSource">
    <template #header> Expose getIndex </template>

    <template #description> Возвращает текущий индекс слайда. </template>

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
    :component="DemoExposeGetGalleryLength"
    :component-source="DemoExposeGetGalleryLengthSource"
  >
    <template #header> Expose getGalleryLength </template>

    <template #description> Возвращает общее количество элементов в галерее. </template>

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
    :component="DemoExposeGetCurrentSlide"
    :component-source="DemoExposeGetCurrentSlideSource"
  >
    <template #header> Expose getCurrentSlide </template>

    <template #description>
      Возвращает текущий слайд из галереи. Слайд может быть либо изображением, либо видео.
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

  <Previewer :component="DemoApiSetCreated" :component-source="DemoApiSetCreatedSource">
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

  <Previewer :component="DemoApiSetMounted" :component-source="DemoApiSetMountedSource">
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

  <Previewer :component="DemoApiSetUnMounted" :component-source="DemoApiSetUnMountedSource">
    <template #header> API mounted </template>

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

  <Previewer :component="DemoApiSetGallery" :component-source="DemoApiSetGallerySource">
    <template #header> API mounted </template>

    <template #description> Устанавливает новую галерею. </template>

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

  <Previewer :component="DemoApiSetZoom" :component-source="DemoApiSetZoomSource">
    <template #header> API setZoom </template>

    <template #description> Устанавливает уровень зума. </template>

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

  <Previewer :component="DemoApiSetLoop" :component-source="DemoApiSetLoopSource">
    <template #header> API setLoop </template>

    <template #description> Включает или отключает зацикливание галереи. </template>

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

  <Previewer :component="DemoApiSetSwipe" :component-source="DemoApiSetSwipeSource">
    <template #header> API setSwipe </template>

    <template #description> Включает или отключает возможность свайпа. </template>

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

  <Previewer :component="DemoApiSetSrcKey" :component-source="DemoApiSetSrcKeySource">
    <template #header> API setSrcKey </template>

    <template #description> Устанавливает ключ источник видео/картинки. </template>

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

  <Previewer :component="DemoApiSetShowGallery" :component-source="DemoApiSetShowGallerySource">
    <template #header> API setShowGallery </template>

    <template #description> Включает/Выключает блок галереи. </template>

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

  <Previewer :component="DemoApiOpen" :component-source="DemoApiOpenSource">
    <template #header> API open </template>

    <template #description> Открывает галерею и отображает первый слайд. </template>

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

  <Previewer :component="DemoApiOpenWithGallery" :component-source="DemoApiOpenWithGallerySource">
    <template #header> API openWithGallery </template>

    <template #description> Открывает Viewer с определёнными настройками. </template>

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

  <Previewer :component="DemoApiNext" :component-source="DemoApiNextSource">
    <template #header> API next </template>

    <template #description> Переключает на следующий слайд в галерее. </template>

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

  <Previewer :component="DemoApiPrev" :component-source="DemoApiPrevSource">
    <template #header> API prev </template>

    <template #description> Переключает на предыдущий слайд в галерее. </template>

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

  <Previewer :component="DemoApiGoTo" :component-source="DemoApiGoToSource">
    <template #header> API goTo </template>

    <template #description> Переходит к слайду по указанному индексу. </template>

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
import DemoFull from './demos/demo.full.vue';
import DemoFullSource from './demos/demo.full.vue?raw';
import DemoPropsMoveSlowFactor from './demos/demo.props.move-slow-factor.vue';
import DemoPropsMoveSlowFactorSource from './demos/demo.props.move-slow-factor.vue?raw';
import DemoPropsResizeCalculationMs from './demos/demo.props.resize-calculation-ms.vue';
import DemoPropsResizeCalculationMsSource from './demos/demo.props.resize-calculation-ms.vue?raw';
import DemoPropsSwipeVerge from './demos/demo.props.swipe-verge.vue';
import DemoPropsSwipeVergeSource from './demos/demo.props.swipe-verge.vue?raw';
import DemoPropsZoomStep from './demos/demo.props.zoom-step.vue';
import DemoPropsZoomStepSource from './demos/demo.props.zoom-step.vue?raw';
import DemoPropsZoomMax from './demos/demo.props.zoom-max.vue';
import DemoPropsZoomMaxSource from './demos/demo.props.zoom-max.vue?raw';
import DemoPropsQueue from './demos/demo.props.queue.vue';
import DemoPropsQueueSource from './demos/demo.props.queue.vue?raw';
import DemoPropsLoop from './demos/demo.props.loop.vue';
import DemoPropsLoopSource from './demos/demo.props.loop.vue?raw';
import DemoPropsNoOverlayDismiss from './demos/demo.props.no-overlay-dismiss.vue';
import DemoPropsNoOverlayDismissSource from './demos/demo.props.no-overlay-dismiss.vue?raw';
import DemoPropsNoEscDismiss from './demos/demo.props.no-esc-dismiss.vue';
import DemoPropsNoEscDismissSource from './demos/demo.props.no-esc-dismiss.vue?raw';
import DemoPropsIframeVideoHelper from './demos/demo.props.iframe-video-helper.vue';
import DemoPropsIframeVideoHelperSource from './demos/demo.props.iframe-video-helper.vue?raw';
import DemoPropsAppendTo from './demos/demo.props.append-to.vue';
import DemoPropsAppendToSource from './demos/demo.props.append-to.vue?raw';
import DemoPropsCssClass from './demos/demo.props.css-class.vue';
import DemoPropsCssClassSource from './demos/demo.props.css-class.vue?raw';
import DemoSlotsEmpty from './demos/demo.slots.empty.vue';
import DemoSlotsEmptySource from './demos/demo.slots.empty.vue?raw';
import DemoSlotsCloseIcon from './demos/demo.slots.close-icon.vue';
import DemoSlotsCloseIconSource from './demos/demo.slots.close-icon.vue?raw';
import DemoSlotsPrevIcon from './demos/demo.slots.prev-icon.vue';
import DemoSlotsPrevIconSource from './demos/demo.slots.prev-icon.vue?raw';
import DemoSlotsNextIcon from './demos/demo.slots.next-icon.vue';
import DemoSlotsNextIconSource from './demos/demo.slots.next-icon.vue?raw';
import DemoSlotsZoomInfo from './demos/demo.slots.zoom-info.vue';
import DemoSlotsZoomInfoSource from './demos/demo.slots.zoom-info.vue?raw';
import DemoSlotsGalleryVideoItem from './demos/demo.slots.gallery-video-item.vue';
import DemoSlotsGalleryVideoItemSource from './demos/demo.slots.gallery-video-item.vue?raw';
import DemoSlotsGalleryImageItem from './demos/demo.slots.gallery-image-item.vue';
import DemoSlotsGalleryImageItemSource from './demos/demo.slots.gallery-image-item.vue?raw';
import DemoSlotsGalleryVideoLabel from './demos/demo.slots.gallery-video-label.vue';
import DemoSlotsGalleryVideoLabelSource from './demos/demo.slots.gallery-video-label.vue?raw';
import DemoSlotsGalleryImageLabel from './demos/demo.slots.gallery-image-label.vue';
import DemoSlotsGalleryImageLabelSource from './demos/demo.slots.gallery-image-label.vue?raw';
import DemoSlotsSlideItem from './demos/demo.slots.slide-item.vue';
import DemoSlotsSlideItemSource from './demos/demo.slots.slide-item.vue?raw';
import DemoSlotsCalculating from './demos/demo.slots.calculating.vue';
import DemoSlotsCalculatingSource from './demos/demo.slots.calculating.vue?raw';
import DemoExposeGetZoom from './demos/demo.expose.get-zoom.vue';
import DemoExposeGetZoomSource from './demos/demo.expose.get-zoom.vue?raw';
import DemoExposeGetIndex from './demos/demo.expose.get-index.vue';
import DemoExposeGetIndexSource from './demos/demo.expose.get-index.vue?raw';
import DemoExposeGetGalleryLength from './demos/demo.expose.get-gallery-length.vue';
import DemoExposeGetGalleryLengthSource from './demos/demo.expose.get-gallery-length.vue?raw';
import DemoExposeGetCurrentSlide from './demos/demo.expose.get-current-slide.vue';
import DemoExposeGetCurrentSlideSource from './demos/demo.expose.get-current-slide.vue?raw';
import DemoApiSetCreated from './demos/demo.api.created.vue';
import DemoApiSetCreatedSource from './demos/demo.api.created.vue?raw';
import DemoApiSetMounted from './demos/demo.api.mounted.vue';
import DemoApiSetMountedSource from './demos/demo.api.mounted.vue?raw';
import DemoApiSetUnMounted from './demos/demo.api.un-mounted.vue';
import DemoApiSetUnMountedSource from './demos/demo.api.un-mounted.vue?raw';
import DemoApiSetGallery from './demos/demo.api.set-gallery.vue';
import DemoApiSetGallerySource from './demos/demo.api.set-gallery.vue?raw';
import DemoApiSetZoom from './demos/demo.api.set-zoom.vue';
import DemoApiSetZoomSource from './demos/demo.api.set-zoom.vue?raw';
import DemoApiSetLoop from './demos/demo.api.set-loop.vue';
import DemoApiSetLoopSource from './demos/demo.api.set-loop.vue?raw';
import DemoApiSetSwipe from './demos/demo.api.set-swipe.vue';
import DemoApiSetSwipeSource from './demos/demo.api.set-swipe.vue?raw';
import DemoApiSetSrcKey from './demos/demo.api.set-src-key.vue';
import DemoApiSetSrcKeySource from './demos/demo.api.set-src-key.vue?raw';
import DemoApiSetShowGallery from './demos/demo.api.set-show-gallery.vue';
import DemoApiSetShowGallerySource from './demos/demo.api.set-show-gallery.vue?raw';
import DemoApiOpen from './demos/demo.api.open.vue';
import DemoApiOpenSource from './demos/demo.api.open.vue?raw';
import DemoApiOpenWithGallery from './demos/demo.api.open-with-gallery.vue';
import DemoApiOpenWithGallerySource from './demos/demo.api.open-with-gallery.vue?raw';
import DemoApiNext from './demos/demo.api.next.vue';
import DemoApiNextSource from './demos/demo.api.next.vue?raw';
import DemoApiPrev from './demos/demo.api.prev.vue';
import DemoApiPrevSource from './demos/demo.api.prev.vue?raw';
import DemoApiGoTo from './demos/demo.api.go-to.vue';
import DemoApiGoToSource from './demos/demo.api.go-to.vue?raw';

definePageMeta({
  title: 'Viewer',
  layout: 'default',
});

useHead({
  title: 'Viewer',
});
</script>
