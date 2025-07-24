---
layout: doc
---

# Slider

Slider - представляет собой компонент, обеспечивающий ввод данных с помощью перетаскивания.

Вес <Badge type="info">~ 4.07 kB gzipped.</Badge>

## Описание

Slider - Vue-компонент реализует выбор числового значения или диапазона значений с помощью ползунка. Используется для
ввода данных пользователем в удобном визуальном формате с возможностью точной настройки.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Slider from '@iwyfaf-vue-ui/ariadna-ui/Slider';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop         | Required | Type                                | Default                                                               | Description                                                                                                    |
|--------------|----------|-------------------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `modelValue` | ✓        | `Array<[number, number] \| number>` | `-`                                                                   | Значения для треков.                                                                                           |
| `tracks`     | ✓        | `Array<TSliderTrack>`               | `-`                                                                   | Треки слайдера.                                                                                                |
| `label`      | -        | `string`                            | `undefined`                                                           | Текст элемента `label`.                                                                                        | 
| `id`         | -        | `string`                            | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение атрибута `id` элементов `track` и `label`.                                                            |
| `min`        | -        | `number`                            | `ESliderPropsDefault.MIN`                                             | Минимальное значение слайдера.                                                                                 |
| `max`        | -        | `number`                            | `ESliderPropsDefault.MAX`                                             | Максимальное значение слайдера.                                                                                |
| `step`       | -        | `number \| null`                    | `null`                                                                | Шаг изменения значения.                                                                                        |
| `points`     | -        | `Array<number> \| null`             | `null`                                                                | Определяет точки на треке, в которых трек может перемещаться. Имеет более высокий приоритет, чем props `step`. |
| `disabled`   | -        | `boolean`                           | `false`                                                               | Состояние компонента `disabled`.                                                                               |
| `valid`      | -        | `boolean`                           | `false`                                                               | Состояние компонента `valid`.                                                                                  |
| `invalid`    | -        | `boolean`                           | `false`                                                               | Состояние компонента `invalid`.                                                                                |
| `errors`     | -        | `Array<string>`                     | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                                  |
| `cssClass`   | -        | `string`                            | `ESliderPropsDefault.CSS_CLASS`                                       | Переопределяет структуру CSS классов.                                                                          |
| `modifier`   | -        | `TSharedPropsModifier`              | `undefined`                                                           | Модификатор базового CSS-класса.                                                                               |

### `modelValue`

- **Тип:** `Array<[number, number] | number>`
- **Значение по умолчанию:** `-`
- **Описание**: Значения для треков. Может принимать одиночное значение или диапазон. Используется совместо с пропсом 
[tracks](#tracks). Порядок важен. 1 элемент массива - это `value` 1 трека из массива `tracks` 2 элемент массива - это 
`value` 2 трека из массива `tracks` И т.д. Если трек должен иметь 2 значения (слева и справа), то в `modelValue` 
указывается он таким образом:` [[0, 0]]`.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
:::

### `tracks`

- **Тип:** `Array<TSliderTrack>`
- **Значение по умолчанию:** `-`
- **Описание**: Конфигурирует треки слайдера, где каждый трек имеет свои настройки. Настройки описаны в типе 
`TSliderTrack`.

1. `key` - Уникальный идентификатор трека.
2. `thumb` - Рендерит тумблер, позволяющий обновлять значения трека.
3. `label` - Рендерит лейбл трека, отображающий его значение.
4. `labelPostfix` - Постфикс для лейбла.
5. `labelPrefix` - Префикс для лейбла.
6. `zIndex` - В случае нескольких треков помогает настроить приоритет в z-координате.

::: details Пример
<demo src="./demos/demo.props.tracks.vue"></demo>
:::

### `label`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для отображения элемента `label`.

::: details Пример
<demo src="./demos/demo.props.label.vue"></demo>
:::

### `id`

- **Тип:** `string`
- **Значение по умолчанию:** Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()`.
- **Описание**: Значение атрибута `id` элементов `track` и `label`.

::: details Пример
<demo src="./demos/demo.props.id.vue"></demo>
:::

### `min`

- **Тип:** `number`
- **Значение по умолчанию:** `ESliderPropsDefault.MIN`
- **Описание**: Минимальное значение, которое можно установить для слайдера.

::: details Пример
<demo src="./demos/demo.props.min.vue"></demo>
:::

### `max`

- **Тип:** `number`
- **Значение по умолчанию:** `ESliderPropsDefault.MAX`
- **Описание**: Максимальное значение, которое можно установить для слайдера.

::: details Пример
<demo src="./demos/demo.props.max.vue"></demo>
:::

### `step`

- **Тип:** `number | null`
- **Значение по умолчанию:** `null`
- **Описание**: Шаг изменения значения. По умолчанию шага нет и значение отдаётся со всеми цифрами после запятой.

::: details Пример
<demo src="./demos/demo.props.step.vue"></demo>
:::

### `points`

- **Тип:** `Array<number> | null`
- **Значение по умолчанию:** `null`
- **Описание**: Определяет конкретные точки на треке. Пропс [step](#step) будет игнорироваться при использовании 
props points. . Добавляет модификатор `--points`.

::: details Пример
<demo src="./demos/demo.props.points.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `disabled`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `valid`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `valid`. Используется для валидации данных. Добавляет модификаторы `--valid`.

::: details Пример
<demo src="./demos/demo.props.valid.vue"></demo>
:::

### `invalid`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `invalid`. Используется для валидации данных. Добавляет модификаторы `--invalid`.

::: details Пример
<demo src="./demos/demo.props.invalid.vue"></demo>
:::

### `errors`

- **Тип:** `Array<string>`
- **Значение по умолчанию:** `[]`
- **Описание**: Массив ошибок. Используется в слоте `errors`.

::: details Пример
<demo src="./demos/demo.props.errors.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ESliderPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

### `modifier`

- **Тип:** `TSharedPropsModifier`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные визуальные вариации компонента.

::: details Пример
<demo src="./demos/demo.props.modifier.vue"></demo>
:::

## Slots

| Slot     | Description                                              |
|----------|----------------------------------------------------------|
| `point`  | Используется для кастомного отображения точек на треке.  |
| `errors` | Используется для отображения ошибок `textarea` поля.     |

### `point`

- **Описание:** Используется для кастомного отображения точек на треке.
- **Тип:** `(props: { value: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.point.vue"></demo>
::: 

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

## Emits

| Event                | Payload                                                                           | Description                                                            |
|----------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `update:model-value` | `payload: TSliderProps['modelValue']`                                             | Событие срабатывает при обновлении значения `modelValue`.              |
| `changeStart`        | `payload: { track: TSliderTrack; value: Array<number> \| number; index: number }` | Событие срабатывает когда начинается изменение любого трека.           |
| `change`             | `payload: { track: TSliderTrack; value: Array<number> \| number; index: number }` | Событие срабатывает когда изменяется значение любого трека.            |
| `changeEnd`          | `payload: { track: TSliderTrack; value: Array<number> \| number; index: number }` | Событие срабатывает когда завершается изменение значения любого трека. |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TSliderProps['modelValue']`

### changeStart

- **Описание:** Событие срабатывает когда начинается изменение любого трека.
- **Тип:** `payload: { track: TSliderTrack; value: Array<number> | number; index: number }`

### change

- **Описание:** Событие срабатывает когда завершается изменение значения любого трека.
- **Тип:** `payload: { track: TSliderTrack; value: Array<number> | number; index: number }`

### changeEnd

- **Описание:** Событие срабатывает когда изменяется значение любого трека.
- **Тип:** `payload: { track: TSliderTrack; value: Array<number> | number; index: number }`

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-support.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--hovered`: Задаются для визуализации наведения на компонент.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$slider: '.ar-slider';

#{$slider} {
  // .ar-slider--theme
  &--theme {
    // .ar-slider--theme .ar-slider__point
    #{$slider}__point {}

    // .ar-slider--theme .ar-slider__track
    #{$slider}__track {
      // .ar-slider--theme .ar-slider__track-additional
      &-additional {
        // .ar-slider--theme .ar-slider__track-additional-label
        &-label {}

        // .ar-slider--theme .ar-slider__track-additional-double
        &-double {}

        // .ar-slider--theme .ar-slider__track-thumb
        &-thumb {
          // .ar-slider--theme .ar-slider__track-thumb-double
          &-double {}
        }
      }
    }
  }

  // .ar-slider--points
  &--points {
    // .ar-slider--points.ar-slider__point
    #{$slider}__point {}
  }

  // .ar-slider--hovered
  &--hovered {
    // .ar-slider--hover.ar-slider--theme
    &#{$slider}--theme {
      // .ar-slider--hover.ar-slider--theme .ar-slider__track
      #{$slider}__track {}
    }
  }

  // .ar-slider--disabled
  &--disabled {}

  // .ar-slider--valid
  &--valid {
    // .ar-slider--valid.ar-slider--theme
    &#{$slider}--theme {
      // .ar-slider--valid.ar-slider--theme .ar-slider__track
      #{$slider}__track {
        // .ar-slider--valid.ar-slider--theme .ar-slider__textarea:hover
        &:hover {}

        // .ar-slider--valid.ar-slider--theme .ar-slider__textarea:focus
        &:focus {}
      }
    }
  }

  // .ar-slider--invalid
  &--invalid {
    // .ar-slider--invalid.ar-slider--theme
    &#{$slider}--theme {
      // .ar-slider--invalid.ar-slider--theme .ar-slider__track
      #{$slider}__track {
        // .ar-slider--invalid.ar-slider--theme .ar-slider__textarea:hover
        &:hover {}

        // .ar-slider--invalid.ar-slider--theme .ar-slider__textarea:focus
        &:focus {}
      }
    }
  }

  // .ar-slider--primary
  &--primary {
    // .ar-slider--primary.ar-slider__track
    #{$slider}__track {}

    // .ar-slider--primary.ar-slider--hovered
    &#{$slider}--hovered {
      // .ar-slider--primary.ar-slider--hovered .ar-slider__track
      #{$slider}__track {}
    }
  }

  // .ar-slider__group
  &__group {}

  // .ar-slider__label
  &__label {}

  // .ar-slider__points
  &__points {}

  // .ar-slider__point
  &__point {
    // .ar-slider__point-value
    &-value {}
  }

  // .ar-slider__track
  &__track {
    // .ar-slider__track-additional
    &-additional {
      // .ar-slider__track-additional-label
      &-label {
        // .ar-slider__track-additional-label--right
        &--left {}

        // .ar-slider__track-additional-label--right
        &--right {}

        // .ar-slider__track-additional-label--visible
        &--visible {}
      }

      // .ar-slider__track-additional-thumb
      &-thumb {
        // .ar-slider__track-additional-thumb--right
        &--right {}

        // .ar-slider__track-additional-thumb--left
        &--left {}

        &--drag {}
      }
    }
  }

  // .ar-slider__errors
  &__errors {
    // .ar-slider__errors-expand-enter-active, .ar-slider__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-slider__errors--expand-enter-from, .ar-slider__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
