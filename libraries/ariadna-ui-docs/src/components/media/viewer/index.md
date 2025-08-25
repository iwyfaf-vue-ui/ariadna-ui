---
layout: doc
---

# Viewer

Viewer - это реализация компонента "Просмотрщика", который представляет видео и фото содержимое в виде галереи, с 
интерактивным функционалом (zoom. slide и т.д.).

Вес <Badge type="info">~ 7.69 kB gzipped.</Badge>

## Описание

Компонент `Video` предназначен для просмотра медиа-контента (изображений и видео) в виде галереи с возможностью
масштабирования, свайпа, циклического просмотра и кастомизации интерфейса через слоты. Он реализует функционал
полноэкранного просмотрщика, позволяя пользователю листать слайды, увеличивать изображения, просматривать видео
(в том числе через iframe), а также использовать различные пользовательские элементы управления (иконки, подписи,

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

#### ViewerService

```typescript
// main.ts
import viewerService from '@iwyfaf-vue-ui/ariadna-ui/ViewerService';

// ...
app.use(ViewerService)
// ...
```

```typescript
import Viewer from '@iwyfaf-vue-ui/ariadna-ui/Viewer';
```

### Nuxt 3

#### ViewerService

```typescript
// plugins/viewer.plugin.ts
import viewerService from '@iwyfaf-vue-ui/ariadna-ui/ViewerService';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(viewerService);
});
```

```typescript
import Viewer from '@iwyfaf-vue-ui/ariadna-ui/Viewer';
```

<!--@include: ../../../shared/import/nuxt-3.md-->

### useViewer

Composable `useViewer`, предоставляет доступ к API Viewer из любой точки приложения. Он включает в себя методы 
идентичные `ref`, за исключением `get` методов.

::: warning Важно!
Для работы `useViewer` требуется регистрация `viewerService` в вашем приложении.
:::

Также включает: 

- Метод жизненного цикла `created`. 
- Метод жизненного цикла `mounted`. 
- Метод жизненного цикла `unMounted`.

```typescript
import useViewer from '@iwyfaf-vue-ui/ariadna-ui/useViewer';
```

## Props

| Prop                  | Required | Type                                       | Default                                     | Description                                                                                    |
|-----------------------|----------|--------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------|
| `moveSlowFactor`      | -        | `number`                                   | `EViewerPropsDefault.MOVE_SLOW_FACTOR`      | Коэффициент замедления перемещения картинки.                                                   |
| `resizeCalculationMs` | -        | `number`                                   | `EViewerPropsDefault.RESIZE_CALCULATION_MS` | Время расчета анимации слайда в миллисекундах.                                                 |
| `swipeVerge`          | -        | `number`                                   | `EViewerPropsDefault.SWIPE_VERGE`           | Граница, когда свайп будет засчитан (в процентах, от `0` до `100`).                            |
| `zoomStep`            | -        | `number`                                   | `EViewerPropsDefault.ZOOM_STEP`             | Шаг приближения/отдаления.                                                                     |
| `zoomMax`             | -        | `number`                                   | `EViewerPropsDefault.ZOOM_MAX`              | Максимальное приближение в процентах (от `0` до `n`).                                          |
| `queue`               | -        | `['IMAGE' \| 'VIDEO', 'IMAGE' \| 'VIDEO']` | `[EViewerMedia.VIDEO, EViewerMedia.IMAGE]`  | Порядок отображения медиа-файлов.                                                              |
| `loop`                | -        | `boolean`                                  | `false`                                     | Включить/выключить зацикливание слайдера.                                                      |
| `noOverlayDismiss`    | -        | `boolean`                                  | `false`                                     | Пользователь не может закрыть Viewer, щелкнув вне элемента слайдера.                           |
| `noEscDismiss`        | -        | `boolean`                                  | `false`                                     | Пользователь не может закрыть Viewer, по клавише `Esc`.                                        |
| `iframeVideoHelper`   | -        | `IIframeVideoHelper`                       | `undefined`                                 | Пользователь не может закрыть Viewer, по клавише `Esc`.                                        |
| `appendTo`            | -        | `'body' \| string`                         | `EViewerPropsDefault.APPEND_TO`             | Существующий query selector или `HTMLElement`, указывающий, куда монтируется диалоговое окно.  |
| `cssClass`            | -        | `string`                                   | `EViewerPropsDefault.CSS_CLASS`             | Переопределяет структуру CSS классов.                                                          |

### `moveSlowFactor`

- **Тип:** `number`
- **Значение по умолчанию:** `EViewerPropsDefault.MOVE_SLOW_FACTOR`
- **Описание**: Коэффициент замедления перемещения картинки. 1 — обычная скорость, меньше 1 — медленнее, больше 1 — 
быстрее.

::: details Пример
<demo src="./demos/demo.props.move-slow-factor.vue"></demo>
:::

### `resizeCalculationMs`

- **Тип:** `number`
- **Значение по умолчанию:** `EViewerPropsDefault.RESIZE_CALCULATION_MS`
- **Описание**: Время расчета анимации слайда в миллисекундах. Используется для скрытия изображения через 
CSS-модификатор `__slider--is-calculating`.

::: details Пример
<demo src="./demos/demo.props.resize-calculation-ms.vue"></demo>
:::

### `swipeVerge`

- **Тип:** `number`
- **Значение по умолчанию:** `EViewerPropsDefault.SWIPE_VERGE`
- **Описание**: Граница, когда свайп будет засчитан (в процентах, от 0 до 100).

::: details Пример
<demo src="./demos/demo.props.swipe-verge.vue"></demo>
:::

### `zoomStep`

- **Тип:** `number`
- **Значение по умолчанию:** `EViewerPropsDefault.ZOOM_STEP`
- **Описание**: Шаг приближения/отдаления.

::: details Пример
<demo src="./demos/demo.props.zoom-step.vue"></demo>
:::

### `zoomMax`

- **Тип:** `number`
- **Значение по умолчанию:** `EViewerPropsDefault.ZOOM_MAX`
- **Описание**: Максимальное приближение в процентах (от `0` до `n`).

::: details Пример
<demo src="./demos/demo.props.zoom-max.vue"></demo>
:::

### `queue`

- **Тип:** `['IMAGE' \| 'VIDEO', 'IMAGE' \| 'VIDEO']`
- **Значение по умолчанию:** `[EViewerMedia.VIDEO, EViewerMedia.IMAGE]`
- **Описание**: Порядок отображения медиа-файлов. Может быть массивом с двумя элементами: `['VIDEO', 'IMAGE']`.

::: details Пример
<demo src="./demos/demo.props.queue.vue"></demo>
:::

### `loop`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Включить/выключить зацикливание слайдера.

::: details Пример
<demo src="./demos/demo.props.loop.vue"></demo>
:::

### `noOverlayDismiss`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Пользователь не может закрыть Viewer, щелкнув вне элемента слайдера.

::: details Пример
<demo src="./demos/demo.props.no-overlay-dismiss.vue"></demo>
:::

### `noEscDismiss`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Пользователь не может закрыть Viewer, по клавише `Esc`.

::: details Пример
<demo src="./demos/demo.props.no-esc-dismiss.vue"></demo>
:::

### `iframeVideoHelper`

- **Тип:** `IIframeVideoHelper`
- **Значение по умолчанию:** `undefined`
- **Описание**: Помощник работы с `iframe`. После того, как prop будет прокинут, Viewer начнёт детектить поддерживаемые
хосты и раздавать соответствующий тип = `IFRAME`. Также будет доступна функция `registerIframe` в некоторых слотах для
регистрации `iframe`. Это обязательно для управления проигрыванием.

::: details Пример
<demo src="./demos/demo.props.iframe-video-helper.vue"></demo>
:::

### `appendTo`

- **Тип:** `IIframeVideoHelper`
- **Значение по умолчанию:** `undefined`
- **Описание**: Существующий query selector или `HTMLElement`, указывающий, куда монтируется диалоговое окно.

::: details Пример
<demo src="./demos/demo.props.append-to.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EViewerPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
  одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

## Slots

| Slot                | Description                                                                                                                                                     |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `empty`             | Слот для отображения состояния, если массив галлерея пуста.                                                                                                     |
| `closeIcon`         | Слот для кастомной иконки кнопки закрытия Viewer.                                                                                                               |
| `prevIcon`          | Слот для кастомной иконки кнопки перехода к предыдущему слайду.                                                                                                 |
| `nextIcon`          | Слот для кастомной иконки кнопки перехода к следующему слайду.                                                                                                  |
| `zoomInfo`          | Слот для отображения информации о текущем уровне зума.                                                                                                          |
| `galleryVideoItem`  | Слот для кастомного отображения элемента видео в галерее.                                                                                                       |
| `galleryImageItem`  | Слот для кастомного отображения элемента изображения в галерее.                                                                                                 |
| `galleryVideoLabel` | Слот для кастомного отображения подписи или счетчика количества видео в галерее.                                                                                |
| `galleryImageLabel` | Слот для кастомного отображения подписи или счетчика количества изображений в галерее.                                                                          |
| `sliderItem`        | Слот для кастомного отображения слайда (изображения или видео).                                                                                                 |
| `calculating`       | Слот для кастомного отображения контента во время его вычисления позиции слайда (время вычисления задается в props [resizeCalculationMs](#resizecalculationms). |

### `empty`

- **Описание:** Слот для отображения состояния, если массив галлерея пуста.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.empty.vue"></demo>
::: 

### `closeIcon`

- **Описание:** Слот для кастомной иконки кнопки закрытия Viewer.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.close-icon.vue"></demo>
::: 

### `prevIcon`

- **Описание:** Слот для кастомной иконки кнопки перехода к предыдущему слайду.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.prev-icon.vue"></demo>
::: 

### `nextIcon`

- **Описание:** Слот для кастомной иконки кнопки перехода к следующему слайду.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.next-icon.vue"></demo>
::: 

### `zoomInfo`

- **Описание:** Слот для отображения информации о текущем уровне зума.
- **Тип:** `(props: { zoom: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.zoom-info.vue"></demo>
::: 

### `galleryVideoItem`

- **Описание:** Слот для кастомного отображения элемента видео в галерее.
- **Тип:** `(props: { videoItem: TViewerMediaItem }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.gallery-video-item.vue"></demo>
::: 

### `galleryImageItem`

- **Описание:** Слот для кастомного отображения элемента изображения в галерее.
- **Тип:** `(props: { imageItem: TViewerMediaItem }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.gallery-image-item.vue"></demo>
::: 

### `galleryVideoLabel`

- **Описание:** Слот для кастомного отображения подписи или счетчика количества видео в галерее.
- **Тип:** `(props: { videoCount: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.gallery-video-label.vue"></demo>
::: 

### `galleryImageLabel`

- **Описание:** Слот для кастомного отображения подписи или счетчика количества изображений в галерее.
- **Тип:** `(props: { imageCount: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.gallery-image-label.vue"></demo>
::: 

### `sliderItem`

- **Описание:** Слот для кастомного отображения слайда (изображения или видео).
- **Тип:** `(props: {
    mediaItem: TViewerMediaItem;
    registerIframe: (iframe: Element) => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.slide-item.vue"></demo>
::: 

### `calculating`

- **Описание:** Слот для кастомного отображения контента во время его вычисления позиции слайда (время вычисления задается в props [resizeCalculationMs](#resizecalculationms).
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.calculating.vue"></demo>
::: 

## Emits

| Event                        | Payload                                 | Description                                                 |
|------------------------------|-----------------------------------------|-------------------------------------------------------------|
| `update:iframe-video-helper` | `iframeVideoHelper: IIframeVideoHelper` | Событие срабатывает при обновлении видео-помощника iframe.  |
| `open`                       | -                                       | Событие срабатывает при открытии Viewer.                    |
| `close`                      | -                                       | Событие срабатывает при закрытии Viewer.                    |
| `slideChange`                | `slideItem: TViewerMediaItem`           | Событие срабатывает при изменении активного слайда Viewer.  |

### update:iframe-video-helper

- **Описание:** Событие срабатывает при обновлении видео-помощника iframe.
- **Тип:** `iframeVideoHelper: IIframeVideoHelper`

### open

- **Описание:** Событие срабатывает при открытии Viewer.
- **Тип:** -

### close

- **Описание:** Событие срабатывает при закрытии Viewer.
- **Тип:** -

### slideChange

- **Описание:** Событие срабатывает при изменении активного слайда Viewer.
- **Тип:** `slideItem: TViewerMediaItem`

## Exposes

| Property           | Type                      | Description                                                                            |
|--------------------|---------------------------|----------------------------------------------------------------------------------------|
| `getZoom`          | `() => number`            | Возвращает текущий уровень зума.                                                       |
| `getIndex`         | `() => number`            | Возвращает текущий индекс слайда.                                                      |
| `getGalleryLength` | `() => number`            | Возвращает общее количество элементов в галерее.                                       |
| `getCurrentSlide`  | `() => TViewerMediaItem`  | Возвращает текущий слайд из галереи. Слайд может быть либо изображением, либо видео.   |

### `getZoom`

- **Описание:** Возвращает текущий уровень зума.
- **Тип:** `() => number`

::: details Пример
<demo src="./demos/demo.expose.get-zoom.vue"></demo>
::: 

### `getIndex`

- **Описание:** Возвращает текущий индекс слайда.
- **Тип:** `() => number`

::: details Пример
<demo src="./demos/demo.expose.get-index.vue"></demo>
::: 

### `getGalleryLength`

- **Описание:** Возвращает общее количество элементов в галерее.
- **Тип:** `() => number`

::: details Пример
<demo src="./demos/demo.expose.get-gallery-length.vue"></demo>
::: 

### `getCurrentSlide`

- **Описание:** Возвращает текущий слайд из галереи. Слайд может быть либо изображением, либо видео.
- **Тип:** `() => TViewerMediaItem`

::: details Пример
<demo src="./demos/demo.expose.get-current-slide.vue"></demo>
::: 

## API

| Property          | Params                                                                           | ReturnType | Description                                   |
|-------------------|----------------------------------------------------------------------------------|------------|-----------------------------------------------|
| `created`         | `callback: () => void`                                                           | `void`     | Хук жизненного цикла created.                 |
| `mounted`         | `callback: () => void`                                                           | `void`     | Хук жизненного цикла mounted.                 |
| `unMounted`       | `callback: () => void`                                                           | `void`     | Хук жизненного цикла unMounted.               |
| `setGallery`      | `gallery: TViewerGallery`                                                        | `void`     | Устанавливает новую галерею.                  |
| `setZoom`         | `zoom: number`                                                                   | `void`     | Устанавливает уровень зума.                   |
| `setLoop`         | `loop: number`                                                                   | `void`     | Включает или отключает зацикливание галереи.  |
| `setSwipe`        | `swipe: boolean`                                                                 | `void`     | Включает или отключает возможность свайпа.    |
| `setSrcKey`       | `srcKey: string`                                                                 | `void`     | Устанавливает ключ источник видео/картинки.   |
| `setShowGallery`  | `show: boolean`                                                                  | `void`     | Включает/Выключает блок галереи.              |
| `open`            | -                                                                                | `void`     | Открывает галерею и отображает первый слайд.  |
| `openWithGallery` | `gallery: TViewerGallery, index: number \| TViewerApiOpenWithGalleryCallback<T>` | `void`     | Открывает Viewer с определёнными настройками. |
| `next`            | -                                                                                | `void`     | Переключает на следующий слайд в галерее.     |
| `prev`            | -                                                                                | `void`     | Переключает на предыдущий слайд в галерее.    |
| `goTo`            | `index: number`                                                                  | `void`     | Переходит к слайду по указанному индексу.     |

### `created`

- **Описание:** Хук жизненного цикла created.
- **Параметры:** `callback: () => void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.created.vue"></demo>
::: 

### `mounted`

- **Описание:** Хук жизненного цикла mounted.
- **Параметры:** `callback: () => void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.mounted.vue"></demo>
::: 

### `unMounted`

- **Описание:** Хук жизненного цикла unMounted.
- **Параметры:** `callback: () => void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.un-mounted.vue"></demo>
::: 

### `setGallery`

- **Описание:** Устанавливает новую галерею.
- **Параметры:** `gallery: TViewerGallery`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-gallery.vue"></demo>
::: 

### `setZoom`

- **Описание:** Устанавливает уровень зума.
- **Параметры:** `zoom: number`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-zoom.vue"></demo>
::: 

### `setLoop`

- **Описание:** Включает или отключает зацикливание галереи.
- **Параметры:** `loop: number`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-loop.vue"></demo>
::: 

### `setSwipe`

- **Описание:** Включает или отключает возможность свайпа.
- **Параметры:** `swipe: boolean`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-swipe.vue"></demo>
::: 

### `setSrcKey`

- **Описание:** Устанавливает ключ источник видео/картинки.
- **Параметры:** `srcKey: string`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-src-key.vue"></demo>
::: 

### `setShowGallery`

- **Описание:** Включает/Выключает блок галереи.
- **Параметры:** `show: boolean`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-show-gallery.vue"></demo>
::: 

### `open`

- **Описание:** Открывает галерею и отображает первый слайд.
- **Параметры:** -
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.set-show-gallery.vue"></demo>
::: 

### `openWithGallery`

- **Описание:** Открывает Viewer с определёнными настройками.
- **Параметры:** `gallery: TViewerGallery, index: number | TViewerApiOpenWithGalleryCallback<T>`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.open-with-gallery.vue"></demo>
::: 

### `next`

- **Описание:** Переключает на следующий слайд в галерее.
- **Параметры:** -
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.next.vue"></demo>
::: 

### `goTo`

- **Описание:** Переходит к слайду по указанному индексу.
- **Параметры:** `index: number`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.go-to.vue"></demo>
::: 

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

### Поддержка клавиатуры

| Key           | Function                      |
|---------------|-------------------------------|
| `Arrow right` | Переход к следующему слайду.  |
| `Arrow left`  | Переход к предыдущему слайду. |
| `Esc`         | Закрытие Viewer.              |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояния

- `--active`: Viewer активен.

::: details Пример расстановки стилей
```scss
$viewer: '.ar-viewer';

#{$viewer} {
  // .ar-viewer--active
  &--active {
  }

  // .ar-viewer__gallery
  &__gallery {
    // .ar-viewer__gallery-video, .ar-viewer__gallery-image
    &-video,
    &-image {
    }

    // .ar-viewer__gallery-label
    &-label {
    }

    // .ar-viewer__gallery-item
    &-item {
      &--selected {
      }
    }
  }

  // .ar-viewer__content
  &__content {
    // .ar-viewer__content--zoom
    &--zoom {
      // .ar-viewer__content--zoom .ar-viewer__slider-item-nested
      #{$viewer}__slider-item-nested {
        // .ar-viewer__content--zoom .m-viewer__slider-item-nested:active
        &:active {
        }
      }

      // .ar-viewer__content--zoom .ar-viewer__controls-zoom
      #{$viewer}__controls-zoom {
      }
    }
  }

  // .ar-viewer__slider
  &__slider {
    // .ar-viewer__slider--no-transition
    &--no-transition {
    }

    // .ar-viewer__slider--is-calculating
    &--is-calculating {
      #{$viewer}__slider-item {
      }
    }

    // .ar-viewer__slider-item
    &-item {
      // .ar-viewer__slider-item-nested
      &-nested {
      }

      // .ar-viewer__slider-item-calculating
      &-calculating {
      }

      // .ar-viewer__slider-item-video
      &-video {
        // .ar-viewer__slider-item-video .ar-viewer__slider-item-nested
        #{$viewer}__slider-item-nested {
        }
      }

      // .ar-viewer__slider video, .ar-viewer__slider iframe
      video,
      iframe {
      }
    }

    // .ar-viewer__empty
    &__empty {
    }

    // .ar-viewer__controls
    &__controls {
      // .ar-viewer__controls-close
      &-close {
      }

      // .ar-viewer__controls-prev
      &-prev {
        // .ar-viewer__controls-prev--disabled
        &--disabled {
        }
      }

      // .ar-viewer__controls-next
      &-next {
        // .ar-viewer__controls-next--disabled
        &--disabled {
        }
      }

      // .ar-viewer__controls-zoom
      &-zoom {
        // .ar-viewer__controls-zoom-text
        &-text {
        }
      }
    }
  }
}
```
:::
