---
layout: doc
---

# Rating

Rating - представляет собой выбор рейтинга, основанный на звездочках.

Вес <Badge type="info">~ 3.25 kB gzipped.</Badge>

## Описание

Radio - Vue-компонент предназначенный для отображения и выбора рейтинга в виде набора звёзд (или других иконок). 
Пользователь может выставить оценку, увидеть текущий рейтинг, сбросить его, а также просмотреть возможные ошибки.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Rating from '@iwyfaf-vue-ui/ariadna-ui/Rating';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop            | Required | Type                         | Default                                                               | Description                                                                                                      |
|-----------------|----------|------------------------------|-----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `modelValue`    | ✓        | `number`                     | `0`                                                                   | Значение компонента.                                                                                             |
| `label`         | -        | `string`                     | `undefined`                                                           | Текст элемента `label`.                                                                                          |
| `id`            | -        | `string`                     | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение для атрибутов `id` и `for`.                                                                             |
| `starCount`     | -        | `number`                     | `ERatingPropsDefault.STAR_COUNT`                                      | Количество отображаемых звёзд.                                                                                   |
| `fillStep`      | -        | `number`                     | `ERatingPropsDefault.FILL_STEP`                                       | Значение шага заполнения рейтинговой звездочки.                                                                  |
| `singleMode`    | -        | `boolean`                    | `false`                                                               | Будет отображаться одна звездочка вместо общего количества звездочек. Работает только с prop `:readonly="true"`. |
| `size`          | -        | `TSharedPropsSize`           | `ERatingPropsDefault.SIZE`                                            | Предопределенные варианты размеров компонента.                                                                   |
| `showValue`     | -        | `boolean`                    | `false`                                                               | Отобразит текущий рейтинг в виде понятных значений. Например: `3.5/5`.                                           |
| `valuePosition` | -        | `TRatingPropsValuePosition`  | `ERatingPropsDefault.VALUE_POSITION`                                  | Расположите значение относительно звезд.                                                                         |
| `reset`         | -        | `boolean`                    | `false`                                                               | Включает или отключает возможность сброса рейтинга.                                                              |
| `disabled`      | -        | `boolean`                    | `false`                                                               | Состояние компонента `disabled`.                                                                                 |
| `readonly`      | -        | `boolean`                    | `false`                                                               | Отключение режима редактирования.                                                                                |
| `valid`         | -        | `boolean`                    | `false`                                                               | Состояние компонента `valid`.                                                                                    |
| `invalid`       | -        | `boolean`                    | `false`                                                               | Состояние компонента `invalid`.                                                                                  |
| `cssClass`      | -        | `string`                     | `ERatingPropsDefault.CSS_CLASS`                                       | Переопределяет структуру CSS классов.                                                                            |
| `modifier`      | -        | `TSharedPropsModifier`       | `undefined`                                                           | Модификатор базового CSS-класса.                                                                                 |

### `modelValue`

- **Тип:** `number`
- **Значение по умолчанию:** `5`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
::: 

### `label`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для вывода элемента `label`. Реализует нативную браузерную связку звезд с элементом 
`label`. Когда такая связь установлена, клик по `label` активирует управление рейтингом.

::: details Пример
<demo src="./demos/demo.props.label.vue"></demo>
:::

### `id`

- **Тип:** `string`
- **Значение по умолчанию:** Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()`.
- **Описание**: Значение для атрибутов `id` рейтинга и `for` элемента `label`.

::: details Пример
<demo src="./demos/demo.props.id.vue"></demo>
:::

### `starCount`

- **Тип:** `number`
- **Значение по умолчанию:** `ERatingPropsDefault.STAR_COUNT`
- **Описание**: Количество отображаемых звёзд.

::: details Пример
<demo src="./demos/demo.props.star-count.vue"></demo>
:::

### `fillStep`

- **Тип:** `number`
- **Значение по умолчанию:** `ERatingPropsDefault.FILL_STEP`
- **Описание**: Значение шага заполнения рейтинговой звездочки.

::: details Пример
<demo src="./demos/demo.props.fill-step.vue"></demo>
:::

### `singleMode`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Будет отображаться одна звездочка вместо общего количества звездочек. Работает только с prop 
`:readonly="true"`.

::: details Пример
<demo src="./demos/demo.props.single-mode.vue"></demo>
:::

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `ERatingPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров компонента. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `showValue`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Отобразит текущий рейтинг в виде понятных значений. Например: `3.5/5`.

::: details Пример
<demo src="./demos/demo.props.show-value.vue"></demo>
:::

### `valuePosition`

- **Тип:** `TRatingPropsValuePosition`
- **Значение по умолчанию:** `ERatingPropsDefault.VALUE_POSITION`
- **Описание**: Расположите значение относительно звезд.

::: details Пример
<demo src="./demos/demo.props.value-position.vue"></demo>
:::

### `reset`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Включает или отключает возможность сброса рейтинга.

::: details Пример
<demo src="./demos/demo.props.reset.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `disabled`. Добавляет модификатор `--disabled`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `readonly`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Отключение режима редактирования. Добавляет модификатор `--readonly`.

::: details Пример
<demo src="./demos/demo.props.readonly.vue"></demo>
:::

### `valid`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `valid`. Используется для валидации данных. Добавляет модификатор `--valid`.

::: details Пример
<demo src="./demos/demo.props.valid.vue"></demo>
:::

### `invalid`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `invalid`. Используется для валидации данных. Добавляет модификатор `--invalid`.

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
- **Значение по умолчанию:** `ERatingPropsDefault.CSS_CLASS`
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

| Slot       | Description                                              |
|------------|----------------------------------------------------------|
| `active`   | Используется для вывода кастомной активной звезды.       |
| `inactive` | Используется для вывода кастомной неактивной звезды.     |
| `value`    | Используется для вывода кастомного значения рейтинга.    |
| `reset`    | Используется для вывода кнопки сброса значения рейтинга. |
| `errors`   | Используется для вывода ошибок компонента.               |

### `active`

- **Описание:** Используется для отображения кастомной активной звезды.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.active-inactive.vue"></demo>
:::

### `inactive`

- **Описание:** Используется для отображения кастомной неактивной звезды.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.active-inactive.vue"></demo>
:::

### `value`

- **Описание:** Используется для кастомизации отображения значения компонента.
- **Тип:** `(props: { value: string | undefined; starCount: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.value.vue"></demo>
:::

### `reset`

- **Описание:** Используется для кастомизации отображения кнопки сброса значения компонента.
- **Тип:** `(props: { reset: () => void }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.reset.vue"></demo>
:::

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 


## Emits

| Event                | Payload                               | Description                                               |
|----------------------|---------------------------------------|-----------------------------------------------------------|
| `update:model-value` | `payload: TRatingProps['modelValue']` | Событие срабатывает при обновлении значения `modelValue`. |
| `focus`              | `event: Event`                        | Событие срабатывает когда компонент получает фокусировку. |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TRatingProps['modelValue']`

### focus

- **Описание:** Событие срабатывает когда компонент получает фокусировку.
- **Тип:** `event: Event`

## Accessibility

Компонент Badge не содержит никаких ролей и атрибутов.

### Поддержка клавиатуры

| Key   | Function                        |
|-------|---------------------------------|
| `tab` | Перемещает фокус на звезды.     |
| `esc` | Сбрасывает значение компонента. |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Размер

- `--small`: Задаются размеры для маленького значка.
- `--medium`: Задаются размеры для среднего значка.
- `--large`: Задаются размеры для большого значка.

### Состояние

- `--focused`: Задаются для визуализации фокусировки компонента.
- `--hovered`: Задаются для визуализации наведения на компонент.
- `--filled`: Задаются для визуализации заполненности значения компонента.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--readonly`: Задаются для визуализации состояния отключенного режима редактирования компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$rating: '.ar-rating';

#{$rating} {
  // .ar-rating--theme
  &--theme {}

  // .ar-rating--focused
  &--focused {
    // .ar-rating--focused .ar-rating__group
    #{$rating}__group {}
  }

  // .ar-rating--hovered
  &--hovered {
    // .ar-rating--hovered .ar-rating__group
    #{$rating}__group {}
  }

  // .ar-rating--disabled
  &--disabled {}

  // .ar-rating--readonly
  &--readonly {}

  // .ar-rating--small
  &--small {}

  // .ar-rating--medium
  &--medium {}

  // .ar-rating--large
  &--large {}

  // .ar-rating--valid
  &--valid {
    // .ar-rating--valid.ar-rating--theme
    &#{$rating}--theme {
      // .ar-rating--valid.ar-rating--theme .ar-rating__group
      #{$rating}__group {
        // .ar-rating--valid.ar-rating--theme .ar-rating__group::before
        &::before {}
      }
    }
  }

  // .ar-rating----invalid
  &--invalid {
    // .ar-rating----invalid.ar-rating--theme
    &#{$rating}--theme {
      // .ar-rating----invalid.ar-rating--theme .ar-rating__group
      #{$rating}__group {
        // .ar-rating----invalid.ar-rating--theme .ar-rating__group::before
        &::before {}
      }
    }
  }

  // .ar-rating----primary
  &--primary {
    // .ar-rating----primary.ar-rating--theme
    &#{$rating}--theme {}
  }

  // .ar-rating__label
  &__label {}

  // .ar-rating__group
  &__group {
    // .ar-rating__group::before
    &::before {}
  }

  // .ar-rating__rating
  &__rating {
    // .ar-rating__rating:hover
    &:hover {
      // .ar-rating__rating:hover .ar-rating__rating-mask--active
      #{$rating}__rating-mask--active {
        // .ar-rating__rating:hover .ar-rating__rating-mask--active svg
        svg {}
        // .ar-rating__rating:hover .ar-rating__rating-mask--active i
        i {}
      }
    }

    // .ar-rating__rating-mask
    &-mask {
      // .ar-rating__rating-mask--active, .ar-rating__rating-mask--inactive
      &--active,
      &--inactive {}

      // .ar-rating__rating-mask--active
      &--active {
        // .ar-rating__rating-mask--active svg
        svg {}

        // .ar-rating__rating-mask--active i
        i {}
      }

      // .ar-rating__rating-mask--inactive
      &--inactive {
        // .ar-rating__rating-mask--inactive svg
        svg {}
      }
    }

    // .ar-rating__rating svg
    svg {}

    // .ar-rating__rating  i
    i {}
  }

  // .ar-rating__label
  &__label {
    // .ar-rating__label-content
    &-content {}
  }

  // .ar-rating__value
  &__value {}

  // .ar-rating__reset
  &__reset {}

  // .ar-rating__errors
  &__errors {
    // .ar-rating__errors-expand-enter-active, .ar-rating__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-rating__errors--expand-enter-from, .ar-rating__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
