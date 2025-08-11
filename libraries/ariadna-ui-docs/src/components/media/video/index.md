---
layout: doc
---

# Video

Video - это пользовательская реализация тега `<video>`.

Вес <Badge type="info">~ 5.39 kB gzipped.</Badge>

## Описание

Компонент `Video` предназначен для отображения видеоплеера с пользовательскими контролами.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                            | Required | Type                                       | Default                                                  | Description                                                                                                                     |
|---------------------------------|----------|--------------------------------------------|----------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `src`                           | ✓        | `string`                                   | `-`                                                      | Источник видео.                                                                                                                 |
| `preload`                       | -        | `Exclude<HTMLVideoElement['preload'], ''>` | `EVideoPropsDefault.PRELOAD`                             | Нативный атрибут `preload` тега `<video>`.                                                                                      |
| `controls`                      | -        | `boolean`                                  | `true`                                                   | Включает / выключает элементы управления плеера.                                                                                |
| `showControlsAlways`            | -        | `boolean`                                  | `false`                                                  | Элементы управления никогда не скрываются.                                                                                      |
| `timeToHideControlsMs`          | -        | `number`                                   | `EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_MS`            | Время, в течение которого элементы управления будут скрыты, когда пользователь не будет активно перемещать курсор внутри видео. |
| `timeToHideControlsOnOutsideMs` | -        | `number`                                   | `EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS` | Время, по истечении которого элементы управления будут скрыты, если мышь находится за пределами видео.                          |
| `muted`                         | -        | `boolean`                                  | `false`                                                  | Отключает звук в видео, а также удаляет иконку регулировки громкости.                                                           |
| `autoplay`                      | -        | `boolean`                                  | `false`                                                  | Включает автоматическое воспроизведение, работает только с отключенным props [muted](#muted).                                   |
| `loop`                          | -        | `boolean`                                  | `false`                                                  | Включает зацикливание видео.                                                                                                    |
| `volume`                        | -        | `number`                                   | `EVideoPropsDefault.VOLUME`                              | Значение громкости видео в диапазоне от 0 до 1.                                                                                 |
| `fastForwardSeconds`            | -        | `number`                                   | `EVideoPropsDefault.FAST_FORWARD_SECONDS`                | Количество секунд для быстрой перемотки вперед.                                                                                 |
| `fastRewindSeconds`             | -        | `number`                                   | `EVideoPropsDefault.FAST_REWIND_SECONDS`                 | Количество секунд для быстрой перемотки назад.                                                                                  |
| `height`                        | -        | `number`                                   | `undefined`                                              | Высота видео. Игнорируется, когда включен полноэкранный режим.                                                                  |
| `width`                         | -        | `number`                                   | `undefined`                                              | Ширина видео. Игнорируется, когда включен полноэкранный режим.                                                                  |
| `poster`                        | -        | `string`                                   | `undefined`                                              | Постер к видео. Если вы не укажете его, будет взят случайный кадр из видео.                                                     |
| `cssClass`                      | -        | `string`                                   | `EVideoPropsDefault.CSS_CLASS`                           | Переопределяет структуру CSS классов.                                                                                           |

### `src`

- **Тип:** `string`
- **Значение по умолчанию:** `-`
- **Описание**: Обязательный аттрибут плеера. Является ссылкой на источник видео.

::: details Пример
<demo src="./demos/demo.props.src.vue"></demo>
:::

### `preload`

- **Тип:** `Exclude<HTMLVideoElement['preload'], ''>`
- **Значение по умолчанию:** `EVideoPropsDefault.PRELOAD`
- **Описание**: Поведение загрузки видео плеером, посмотреть подробнее про каждое значение можно [здесь](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video#preload).
В примере ниже стоит `none`, это значит, что пока плеер не начнёт проигрывать видео - он не будет его загружать.

::: details Пример
<demo src="./demos/demo.props.preload.vue"></demo>
:::

### `controls`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Включает / выключает блок элементов управления видео. В примере ниже элементы управления выключены.

::: details Пример
<demo src="./demos/demo.props.controls.vue"></demo>
:::

### `showControlsAlways`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Если true, то элементы управления никогда не скрываются и [timeToHideControlsMs](#timetohidecontrolsms)
не будет играть никакого значения.

::: details Пример
<demo src="./demos/demo.props.show-controls-always.vue"></demo>
:::

### `timeToHideControlsMs`

- **Тип:** `number`
- **Значение по умолчанию:** `EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_MS`
- **Описание**: Указывает через какое время (в милисекундах) элементы управления будут скрыты. Условия при которых 
элементы управления могут быть скрыты: 
  - Видео проигрывается, а пользователь не двигает мышью по плееру. 
  - Также если видео проигрывается, а курсор пользователя не находится на блоке элементов управления. 

В остальных случаях блок controls виден и на нём висит модификатор `--visible`.

::: details Пример
<demo src="./demos/demo.props.time-to-hide-controls-ms.vue"></demo>
:::

### `timeToHideControlsOnOutsideMs`

- **Тип:** `number`
- **Значение по умолчанию:** `EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS`
- **Описание**: Указывает через какое время (в милисекундах) элементы управления будут скрыты в случае перемещения мыш
и за пределы видео-плеера.

::: details Пример
<demo src="./demos/demo.props.time-to-hide-controls-on-outside-ms.vue"></demo>
:::

### `muted`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Отключает звук у видео, также убирает иконку громкости.

::: details Пример
<demo src="./demos/demo.props.muted.vue"></demo>
:::

### `autoplay`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Включает автопроигрывание видео, работает ТОЛЬКО совместо с props [muted](#muted).

::: details Пример
<demo src="./demos/demo.props.autoplay.vue"></demo>
:::

### `loop`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Включает зацикливание видео.

::: details Пример
<demo src="./demos/demo.props.loop.vue"></demo>
:::

### `volume`

- **Тип:** `number`
- **Значение по умолчанию:** `EVideoPropsDefault.VOLUME`
- **Описание**: Значение громкости видео в диапазоне от 0 до 1.

::: details Пример
<demo src="./demos/demo.props.volume.vue"></demo>
:::

### `fastForwardSeconds`

- **Тип:** `number`
- **Значение по умолчанию:** `EVideoPropsDefault.FAST_FORWARD_SECONDS`
- **Описание**: Количество секунд, на которое будет совершена быстрая перемотка вперёд.

::: details Пример
<demo src="./demos/demo.props.fast-forward-seconds.vue"></demo>
:::

### `fastRewindSeconds`

- **Тип:** `number`
- **Значение по умолчанию:** `EVideoPropsDefault.FAST_REWIND_SECONDS`
- **Описание**: Количество секунд, на которое будет совершена быстрая перемотка назад.

::: details Пример
<demo src="./demos/demo.props.fast-rewind-seconds.vue"></demo>
:::

### `height`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Высота видео. Игнорируется, когда включен полноэкранный режим.

::: details Пример
<demo src="./demos/demo.props.height.vue"></demo>
:::

### `width`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Ширина видео. Игнорируется, когда включен полноэкранный режим.

::: details Пример
<demo src="./demos/demo.props.width.vue"></demo>
:::

### `poster`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Постер к видео. Если вы не укажете его, будет взят случайный кадр из видео.

::: details Пример
<demo src="./demos/demo.props.poster.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EVideoPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
  одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

## Slots

| Slot               | Description                                                                                               |
|--------------------|-----------------------------------------------------------------------------------------------------------|
| `default`          | Слот для содержимого которое отобразится в случае, если браузер пользователя не поддерживает тег `video`. |
| `playIcon`         | Слот для иконки кнопки плей.                                                                              |
| `stopIcon`         | Слот для иконки кнопки паузы.                                                                             |
| `volumeIcon`       | Слот для иконки кнопки громкости.                                                                         |
| `fullscreenIcon`   | Слот для иконки входа в полноэкранный режим.                                                              |
| `unFullscreenIcon` | Слот для иконки выхода из полноэкранного режима.                                                          |
| `loadingIcon`      | Слот для иконки загрузки видео.                                                                           |
| `time`             | Слот для отображение времени.                                                                             |

### `default`

- **Описание:** Слот для содержимого которое отобразится в случае, если браузер пользователя не поддерживает тег 
`video`.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
::: 

### `playIcon`

- **Описание:** Слот для иконки кнопки плей.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.play-icon.vue"></demo>
::: 

### `stopIcon`

- **Описание:** Слот для иконки кнопки паузы.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.stop-icon.vue"></demo>
::: 

### `volumeIcon`

- **Описание:** Слот для иконки кнопки громкости.
- **Тип:** `(props: { volume: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.volume-icon.vue"></demo>
::: 

### `fullscreenIcon`

- **Описание:** Слот для иконки входа в полноэкранный режим.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.fullscreen-icon.vue"></demo>
::: 

### `unFullscreenIcon`

- **Описание:** Слот для иконки выхода из полноэкранного режима.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.un-fullscreen-icon.vue"></demo>
::: 

### `loadingIcon`

- **Описание:** Слот для иконки загрузки видео.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.loading-icon.vue"></demo>
::: 

### `time`

- **Описание:** Слот для иконки загрузки видео.
- **Тип:** `(props: {
    timePassedInSeconds: number;
    durationInSeconds: number;
    parseTime: (time: number) => string;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.time.vue"></demo>
::: 

## Emits

| Event          | Payload                              | Description                                              |
|----------------|--------------------------------------|----------------------------------------------------------|
| `fullscreen`   | -                                    | Событие срабатывает при включении полноэкранного режима. |
| `unFullscreen` | -                                    | Событие срабатывает при выходе из полноэкранного режима. |
| `play`         | -                                    | Событие срабатывает начале воспроизведения видео.        |
| `playing`      | `payload: TVideoPlayingPayloadEmit`  | Событие срабатывает при воспроизведении видео.           |
| `stop`         | -                                    | Событие срабатывает остановке воспроизведения видео.     |
| `muted`        | -                                    | Событие срабатывает когда видео замьючено.               |

### fullscreen

- **Описание:** Событие срабатывает при включении полноэкранного режима.
- **Тип:** -

### unFullscreen

- **Описание:** Событие срабатывает при выходе из полноэкранного режима.
- **Тип:** -

### play

- **Описание:** Событие срабатывает начале воспроизведения видео.
- **Тип:** -

### playing

- **Описание:** Событие срабатывает при воспроизведении видео.
- **Тип:** `payload: TVideoPlayingPayloadEmit`

### stop

- **Описание:** Событие срабатывает остановке воспроизведения видео.
- **Тип:** -

### muted

- **Описание:** Событие срабатывает когда видео замьючено.
- **Тип:** -

## Exposes

| Property             | Type                           | Description                                                               |
|----------------------|--------------------------------|---------------------------------------------------------------------------|
| `play`               | `() => void`                   | Функция для запуска воспроизведения видео.                                |
| `stop`               | `() => void`                   | Функция для остановки воспроизведения видео.                              |
| `togglePlay`         | `() => void`                   | Функция для запуска или остановки воспроизведения видео.                  |
| `getPlayedState`     | `() => boolean`                | Функция, которая позволяет вам узнать, воспроизводится ли видео или нет.  |
| `fullscreen`         | `() => void`                   | Функция для активации полноэкранного режима.                              |
| `unFullscreen`       | `() => void`                   | Функция для отключения полноэкранного режима.                             |
| `toggleFullscreen`   | `() => void`                   | Функция для переключения полноэкранного режима.                           |
| `getFullscreenState` | `() => boolean`                | Функция, позволяющая получить состояние полноэкранного режима.            |
| `seek`               | `(toSeconds: number) => void`  | Функция, позволяющая перемотать видео назад на нужный промежуток времени  |

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

### Поддержка клавиатуры

| Key            | Function                               |
|----------------|----------------------------------------|
| `Arrow right`  | Перематывает видео на N секунд вперед. |
| `Arrow left`   | Перематывает видео на N секунд назад.  |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

::: details Пример расстановки стилей
```scss
$video: '.ar-video';
$slider: '.ar-slider';

#{$video} {
  // .ar-video--theme
  &--theme {
    // .ar-video--theme .ar-video__controls
    #{$video}__controls {
      // .ar-video--theme .ar-video__controls-group
      &-group {}
    }

    // .ar-video--theme
    #{$slider} {
      // .ar-video--theme .ar-slider--timeline
      &--timeline {
        // .ar-video--theme .ar-slider--timeline .ar-slider__track
        #{$slider}__track {
          // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional
          &-additional {
            // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional-thumb
            &-thumb {}

            // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional-playing
            &-playing {}

            // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional-loading
            &-loading {}

            // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional-hover
            &-hover {}
          }
        }
      }

      // .ar-video--theme .ar-slider--timeline
      &--volume {
        // .ar-video--theme .ar-slider--timeline .ar-slider__track
        #{$slider}__track {
          // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional
          &-additional {
            // .ar-video--theme .ar-slider--timeline .ar-slider__track-additional-volume
            &-volume {}
          }
        }
      }
    }
  }

  // .ar-video__video
  &__video {}

  // .ar-video__loading
  &__loading {}

  // .ar-video__controls
  &__controls {
    // .ar-video__controls--visible
    &--visible {}

    // .ar-video__controls-group
    &-group {}

    // .ar-video__controls-action, .ar-video__controls-volume, .ar-video__controls-fullscreen
    &-action,
    &-fullscreen {
      &:focus {}
      &:focus-visible {}
    }

    // .ar-video__controls-volume
    &-volume {
      // .ar-video__controls-volume:hover
      &:hover {
        // .ar-video__controls-volume:hover .ar-video__controls-volume-slider
        #{$video}__controls-volume-slider {}
      }

      &:focus {}
      &:focus-visible {}

      // .ar-video__controls-volume-slider
      &-slider {}
    }

    // .ar-video__controls-fullscreen
    &-fullscreen {}
  }

  // .ar-video__time
  &__time {}

  // .ar-video__timeline
  &__timeline {
    // .ar-video__timeline:focus
    &:focus {}
    
    // .ar-video:focus-visible
    &:focus-visible {}

    // .ar-video__timeline:hover
    &:hover {
      #{$slider}--timeline {
        #{$slider}__track-additional-hover {}
      }
    }

    // .ar-video__timeline-time-popup
    &-time-popup {
      // .ar-video__timeline-time-popup--visible
      &--visible {}
    }
  }

  // .ar-video .ar-slider
  #{$slider} {
    // .ar-video .ar-slider--timeline
    &--timeline {
      // .ar-video .ar-slider--timeline .ar-slider__track
      #{$slider}__track {
        // .ar-video .ar-slider--timeline .ar-slider__track-additional
        &-additional {
          // .ar-video .ar-slider--timeline .ar-slider__track-additional-hover
          &-hover {}
          // .ar-video .ar-slider--timeline .ar-slider__track-additional-thumb
          &-thumb {}
        }
      }
    }

    // .ar-video .ar-slider--volume
    &--volume {
      // .ar-video .ar-slider--volume .ar-slider__track
      #{$slider}__track {
        // .ar-video .ar-slider--volume .ar-slider__track-additional
        &-additional {
          // .ar-video .ar-slider--volume .ar-slider__track-additional-thumb
          &-thumb {}
        }
      }
    }
  }
}
```
:::
