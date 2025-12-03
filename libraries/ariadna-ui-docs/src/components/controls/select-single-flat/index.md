---
layout: doc
---

# SelectSingleFlat

SelectSingleFlat - представляет собой выбор отдельного элемента из плоской коллекции (списка).

Вес <Badge type="info">~ 4.23 kB gzipped.</Badge>

## Описание

SelectSingleFlat - Vue-компонент предназначенный для выбора одного значения из списка плоских опций. Он поддерживает 
фильтрацию, кастомизацию отображения, работу с ошибками и различные состояния (загрузка, отключён, валидация). 
Используется в формах и интерфейсах, где требуется выбор одного элемента из множества.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import SelectSingleFlat from '@iwyfaf-vue-ui/ariadna-ui/SelectSingleFlat';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop              | Required | Type                               | Default                                                               | Description                                                                                                                                 |
|-------------------|----------|------------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`      | ✓        | `Primitive`                        | `null`                                                                | Значение компонента.                                                                                                                        |
| `filterValue`     | -        | `string`                           | `''`                                                                  | Фильтрует данные при конфигурации prop `filter`.                                                                                            |
| `options`         | ✓        | `Array<Primitive>`                 | `[]`                                                                  | Массив элементов для отображения в качестве доступных опций компонента.                                                                     |
| `label`           | -        | `string`                           | `undefined`                                                           | Текст элемента `label`.                                                                                                                     |
| `id`              | -        | `string`                           | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                                                          |
| `placeholder`     | -        | `string`                           | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                                                                 |
| `disabled`        | -        | `boolean`                          | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                                                                    |
| `loading`         | -        | `boolean`                          | `false`                                                               | Находится ли компонент в состоянии загрузки.                                                                                                |
| `size`            | -        | `TSharedPropsSize`                 | `ESelectSingleFlatPropsDefault.SIZE`                                  | Предопределенные варианты размеров компонента.                                                                                              |
| `filter`          | -        | `boolean`                          | `false`                                                               | Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.                                                   |
| `virtualScroller` | -        | `TSelectSingleFlatVirtualScroller` | `undefined`                                                           | Активирует использование VirtualScroller в списке опций.                                                                                    |
| `valid`           | -        | `boolean`                          | `false`                                                               | Состояние компонента `valid`.                                                                                                               |
| `invalid`         | -        | `boolean`                          | `false`                                                               | Состояние компонента `invalid`.                                                                                                             |
| `errors`          | -        | `Array<string>`                    | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                                                               |
| `cssClass`        | -        | `string`                           | `ESelectSingleFlatPropsDefault.CSS_CLASS`                             | Переопределяет структуру CSS классов.                                                                                                       |
| `modifier`        | -        | `TSharedPropsModifier`             | `undefined`                                                           | Модификатор базового CSS-класса.                                                                                                            |
| `ariaLabel`       | -        | `string`                           | `ESelectSingleFlatPropsDefault.ARIA_LABEL`                            | Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.                                                |

### `modelValue`

- **Тип:** `Primitive`
- **Значение по умолчанию:** `null`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
:::

### `filterValue`

- **Тип:** `string`
- **Значение по умолчанию:** `''`
- **Описание**: Фильтрует данные при конфигурации prop `filter`.

::: details Пример
<demo src="./demos/demo.props.v-model-filter.vue"></demo>
:::

### `options`

- **Тип:** `Array<Primitive>`
- **Значение по умолчанию:** `[]`
- **Описание**: Массив элементов для отображения в качестве доступных опций компонента.

::: details Пример
<demo src="./demos/demo.props.options.vue"></demo>
::: 

### `label`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для отображения элемента `label`. Реализует нативную браузерную связку звезд с элементом
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

### `placeholder`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Значение нативного атрибута `placeholder` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.placeholder.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `disabled` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `loading`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Находится ли компонент в состоянии загрузки.

::: details Пример
<demo src="./demos/demo.props.loading.vue"></demo>
:::

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `ESelectSingleFlatPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::


### `filter`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.

::: details Пример
<demo src="./demos/demo.props.filter.vue"></demo>
:::

### `virtualScroller`

- **Тип:** `TSelectSingleFlatVirtualScroller`
- **Значение по умолчанию:** `undefined`
- **Описание**: Активирует использование VirtualScroller в списке опций.

::: details Пример
<demo src="./demos/demo.props.virtual-scroller.vue"></demo>
:::


### `valid`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `valid`. Используется для валидации данных. Добавляет
  модификаторы `--valid`.

::: details Пример
<demo src="./demos/demo.props.valid.vue"></demo>
:::

### `invalid`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние компонента `invalid`. Используется для валидации данных. Добавляет
  модификаторы `--invalid`.

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
- **Значение по умолчанию:** `ESelectSinglePropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при
  необходимости создавать более одного вида компонента.

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

### `ariaLabel`

- **Тип:** `string`
- **Значение по умолчанию:** `ESelectSinglePropsDefault.ARIA_LABEL`
- **Описание**: Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.

::: details Пример
<demo src="./demos/demo.props.aria-label.vue"></demo>
:::


## Slots

| Slot          | Description                                                                                                             |
|---------------|-------------------------------------------------------------------------------------------------------------------------|
| `options`     | Слот для отображения списка выбираемых опций.                                                                           |
| `empty`       | Слот для отображения контента при отсутствии доступных опций.                                                           |
| `filterInput` | Слот для отображения кастомного `input` для фильтрации. Используется совместно с props `filter` и `model-value-filter`. |
| `emptyFilter` | Слот для отображения контента, когда фильтрация не дала результатов.                                                    |
| `filterIcon`  | Слот для отображения иконки фильтра рядом с `input` полем фильтрации.                                                   |
| `toggleIcon`  | Слот для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на содержимое слота `cleanIcon`.      |
| `cleanIcon`   | Слот для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.                                |
| `loadingIcon` | Слот для отображения иконки загрузки.                                                                                   |
| `loading`     | Слот для отображения индикатора загрузки в элементе списка опций.                                                       |
| `errors`      | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.      |

### `options`

- **Описание:** Используется для отображения списка выбираемых опций.
- **Тип:** `(props: { option: any }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.options.vue"></demo>
:::

### `empty`

- **Описание:** Используется для отображения контента при отсутствии доступных опций.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.empty.vue"></demo>
:::

### `filterInput`

- **Описание:** Используется для отображения кастомного `input` для фильтрации. Используется совместно с props `filter`
  и `model-value-filter`.
- **Тип:** `(props: { onFilter: (filterState: string) => any[] }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.filter-input.vue"></demo>
:::

### `emptyFilter`

- **Описание:** Используется для отображения контента, когда фильтрация не дала результатов.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.empty-filter.vue"></demo>
:::

### `filterIcon`

- **Описание:** Используется для отображения иконки фильтра рядом с `input` полем фильтрации.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.filter-icon.vue"></demo>
:::

### `toggleIcon`

- **Описание:** Используется для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на содержимое
  слота `cleanIcon`.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.toggle-icon.vue"></demo>
:::

### `cleanIcon`

- **Описание:** Используется для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.clean-icon.vue"></demo>
:::

### `loadingIcon`

- **Описание:** Используется для отображения иконки загрузки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.loading-icon.vue"></demo>
:::

### `loading`

- **Описание:** Используется для отображения индикатора загрузки в элементе списка опций.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.loading.vue"></demo>
:::

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 


## Emits

| Event                 | Payload                                          | Description                                                  |
|-----------------------|--------------------------------------------------|--------------------------------------------------------------|
| `update:modelValue`   | `payload: TSelectSingleFlatProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`.    |
| `update:filter-value` | `payload: TSelectSingleFlatProps['filterValue']` | Событие срабатывает при обновлении значения `filterValue`.   |
| `focus`               | `event: Event`                                   | Событие срабатывает когда компонент получает фокусировку.    |
| `blur`                | `event: Event`                                   | Событие срабатывает когда компонент теряет фокусировку.      |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `TSelectSingleFlatProps['modelValue']`

::: details Пример
<demo src="./demos/demo.emits.update-model-value.vue"></demo>
:::

### update:filter-value

- **Описание:** Событие срабатывает при обновлении значения `filterValue`.
- **Тип:** `TSelectSingleFlatProps['filterValue']`

::: details Пример
<demo src="./demos/demo.emits.update-filter-value.vue"></demo>
:::

### focus

- **Описание:** Событие срабатывает когда компонент получает фокусировку.
- **Тип:** `event: Event`

::: details Пример
<demo src="./demos/demo.emits.focus.vue"></demo>
:::

### blur

- **Описание:** Событие срабатывает когда компонент теряет фокусировку.
- **Тип:** `event: Event`

::: details Пример
<demo src="./demos/demo.emits.blur.vue"></demo>
:::

## Accessibility

### `aria-label`

С помощью пропса [ariaLabel](#aria-label) задается атрибут `aria-label`, который задает доступное имя элементу.

### `aria-expanded` && `aria-controls` && `aria-disabled` && `aria-pressed`

Для элемента `header` заданы атрибуты, отображающие открытие/закрытие или недоступность списка, а также связывающие его
с элементом дроплиста `body`.

### `aria-hidden`

Элементы с иконками имеют `aria-hidden="true"`.

### Поддержка клавиатуры

| Key              | Function                                                     |
|------------------|--------------------------------------------------------------|
| `Space`, `Enter` | Открывает список опций или выбирает/снимает выбранную опцию. |
| `ArrowUp`        | Перемещение по опциями вверх.                                |
| `ArrowDown`      | Перемещение по опциями вниз.                                 |
| `Esc`            | Закрывает список опций.                                      |

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
- `--selected`: Задаются для визуализации выбранного значения компонента.
- `--opened`: Задаются для визуализации открытого списка компонента.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$select-single-flat: '.ar-select-single-flat';

#{$select-single-flat} {
  // .ar-select-single-flat--theme
  &--theme {
    // .ar-select-single-flat--theme .ar-select-single-flat__header
    #{$select-single-flat}__header {}

    // .ar-select-single-flat--theme .ar-select-single-flat__body
    #{$select-single-flat}__body {}

    // .ar-select-single-flat--theme .ar-select-single-flat__filter
    #{$select-single-flat}__filter {

      // .ar-select-single-flat--theme .ar-select-single-flat__filter-input
      &-input {
        // .ar-select-single-flat--theme .ar-select-single-flat__filter-input > input
        > input {
          // .ar-select-single-flat--theme .ar-select-single-flat__filter-input > input:hover
          &:hover {}

          // .ar-select-single-flat--theme .ar-select-single-flat__filter-input > input:active, .ar-select-single-flat--theme .ar-select-single-flat__filter-input > input:focus
          &:active,
          &:focus {}
        }
      }
    }

    // .ar-select-single-flat--theme .ar-select-single-flat__option
    #{$select-single-flat}__option {
      // .ar-select-single-flat--theme .ar-select-single-flat__option:hover, .ar-select-single-flat--theme .ar-select-single-flat__option--focused
      &:hover,
      &--focused {}

      // ar-select-single--theme .ar-select-single-flat__option--selected
      &--selected {}
    }

    // .ar-select-single-flat--theme .ar-select-single-flat__clean
    #{$select-single-flat}__clean {
      // .ar-select-single-flat--theme .ar-select-single-flat__clean-icon
      &-icon {
        // .ar-select-single-flat--theme .ar-select-single-flat__clean-icon:hover
        &:hover {}
      }
    }
  }

  // .ar-select-single-flat--hovered
  &--hovered {
    // .ar-select-single-flat--hover.ar-select-single-flat--theme
    &#{$select-single-flat}--theme {
      // .ar-select-single-flat--hover.ar-select-single-flat--theme .ar-select-single-flat__header
      #{$select-single-flat}__header {}
    }
  }

  // .ar-select-single-flat--focused
  &--focused {
    // .ar-select-single-flat--focused.ar-select-single-flat--theme
    &#{$select-single-flat}--theme {
      // .ar-select-single-flat--focused.ar-select-single-flat--theme .ar-select-single-flat__header
      #{$select-single-flat}__header {}
    }
  }

  // .ar-select-single-flat--disabled
  &--disabled {}

  // .ar-select-single-flat--small
  &--small {
    // .ar-select-single-flat--small .ar-select-single-flat__header
    #{$select-single-flat}__header {}

    // .ar-select-single-flat--small .ar-select-single-flat__list
    #{$select-single-flat}__list {}
  }

  // .ar-select-single-flat--medium
  &--medium {
    // .ar-select-single-flat--medium .ar-select-single-flat__header
    #{$select-single-flat}__header {}

    // .ar-select-single-flat--medium .ar-select-single-flat__list
    #{$select-single-flat}__list {}
  }

  // .ar-select-single-flat--large
  &--large {
    // .ar-select-single-flat--large .ar-select-single-flat__header
    #{$select-single-flat}__header {}

    // .ar-select-single-flat--large .ar-select-single-flat__list
    #{$select-single-flat}__list {}
  }

  // .ar-select-single-flat--valid
  &--valid {
    // .ar-select-single-flat--valid.ar-select-single-flat--theme
    &#{$select-single-flat}--theme {
      // .ar-select-single-flat--valid.ar-select-single-flat--theme .ar-select-single-flat__header
      #{$select-single-flat}__header {
        // .ar-select-single-flat--valid.ar-select-single-flat--theme .ar-select-single-flat__header:hover
        &:hover {}

        // .ar-select-single-flat--valid.ar-select-single-flat--theme .ar-select-single-flat__header:focus
        &:focus {}
      }
    }
  }

  // .ar-select-single-flat--invalid
  &--invalid {
    // .ar-select-single-flat--invalid.ar-select-single-flat--theme
    &#{$select-single-flat}--theme {
      // .ar-select-single-flat--invalid.ar-select-single-flat--theme .ar-select-single-flat__label, .ar-select-single-flat--invalid.ar-select-single-flat--theme .ar-select-single-flat__errors
      #{$select-single-flat}__label,
      #{$select-single-flat}__errors {}

      #{$select-single-flat}__header {
        // .ar-select-single-flat--invalid.ar-select-single-flat--theme .ar-select-single-flat__header:hover
        &:hover {}

        // .ar-select-single-flat--invalid.ar-select-single-flat--theme .ar-select-single-flat__header:focus
        &:focus {}
      }
    }
  }

  // .ar-select-single-flat--primary
  &--primary {
    // .ar-select-single-flat--primary.ar-select-single-flat__header
    #{$select-single-flat}__header {}

    // .ar-select-single-flat--primary.ar-select-single-flat--hovered
    &#{$select-single-flat}--hovered {
      // .ar-select-single-flat--primary.ar-select-single-flat--hovered .ar-select-single-flat__header
      #{$select-single-flat}__header {}
    }

    // .ar-select-single-flat--theme .ar-select-single-flat__body
    #{$select-single-flat}__body {}

    // .ar-select-single-flat--theme .ar-select-single-flat__filter
    #{$select-single-flat}__filter {
      // .ar-select-single-flat--theme .ar-select-single-flat__filter-input
      &-input {
        // .ar-select-single-flat--theme .ar-select-single-flat__filter-input:hover
        &:hover {}

        // .ar-select-single-flat--theme .ar-select-single-flat__filter-input:active, .ar-select-single-flat--theme .ar-select-single-flat__filter-input:focis
        &:active,
        &:focus {}
      }
    }

    // .ar-select-single-flat--theme .ar-select-single-flat__option
    #{$select-single-flat}__option {
      // .ar-select-single-flat--theme .ar-select-single-flat__option:hover, .ar-select-single-flat--theme .ar-select-single-flat__option--focused
      &:hover,
      &--focused {}

      // ar-select-single--theme .ar-select-single-flat__option--selected
      &--selected {}
    }
  }

  // .ar-select-single-flat__label
  &__label {}

  // .ar-select-single-flat__header
  &__header {}

  // .ar-select-single-flat__loading
  &__loading {}

  // .ar-select-single-flat__toggle
  &__toggle {
    // .ar-select-single-flat__toggle-icon
    &-icon {}
  }

  // .ar-select-single-flat__clean
  &__clean {
    // .ar-select-single-flat__clean-icon
    &-icon {}
  }

  // .ar-select-single-flat__body
  &__body {
    // .ar-select-single-flat__body--opened
    &--opened {}
  }

  // .ar-select-single-flat__filter
  &__filter {
    // .ar-select-single-flat__filter-input
    &-input {
      // .ar-select-single-flat__filter-input > input
      > input {}
    }

    // .ar-select-single-flat__filter-icon
    &-icon {}
  }

  // .ar-select-single-flat:has(.ar-select-single-flat__filter-icon) .ar-select-single-flat__filter-input > input
  &:has(#{$select-single-flat}__filter-icon) #{$select-single-flat}__filter-input > input {}

  // .ar-select-single-flat__list
  &__list {
    // .ar-select-single-flat__list-loading
    &-loading {}
  }

  // .ar-select-single-flat__empty
  &__empty {
    // .ar-select-single-flat__empty-filter
    &-filter {}

    // .ar-select-single-flat__empty-options
    &-options {}
  }

  // .ar-select-single-flat__option
  &__option {}

  // .ar-select-single-flat__errors
  &__errors {
    // .ar-select-single-flat__errors-expand-enter-active, .ar-select-single-flat__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-select-single-flat__errors--expand-enter-from, .ar-select-single-flat__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
