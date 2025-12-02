---
layout: doc
---

# SelectMultipleGroup

SelectMultipleGroup - представляет собой выбор нескольких элементов из группированной коллекции (списка).

Вес <Badge type="info">~ 5.08 kB gzipped.</Badge>

## Описание

SelectMultipleGroup - Vue-компонент предназначенный для выбора нескольких элементов из списка с группировкой опций. 
Он предназначен для использования в формах и интерфейсах, где требуется множественный выбор с поддержкой фильтрации, 
кастомизации отображения выбранных значений, управления через чекбокс, виртуализации длинных списков и расширенной 
работы со слотами.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import SelectMultipleGroup from '@iwyfaf-vue-ui/ariadna-ui/SelectMultipleGroup';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

### Props

| Prop                   | Required | Type                         | Default                                                               | Description                                                                                                                                                  |
|------------------------|----------|------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`           | ✓        | `Record<string, any> \| any` | `null`                                                                | Значение компонента.                                                                                                                                         |
| `filterValue`          | -        | `string`                     | `''`                                                                  | Фильтрует данные при конфигурации prop `filter`.                                                                                                             |
| `options`              | ✓        | `Array<any>`                 | `[]`                                                                  | Массив элементов для отображения в качестве доступных опций компонента.                                                                                      |
| `optionLabel`          | -        | `string`                     | `ESelectMultipleGroupPropsDefault.OPTION_LABEL`                       | Имя свойства, которое будет использоваться в качестве label опции. Выдаст ошибку, если `optionLabel` не соответствует объектам в `options`.                  |
| `optionValue`          | -        | `string \| null`             | `null`                                                                | Имя свойства, используемое в качестве значения опции и компонента, по умолчанию равно самой опции, если не определен.                                        |
| `optionGroupLabel`     | -        | `string`                     | `ESelectMultipleGroupPropsDefault.OPTION_GROUP_LABEL`                 | Имя свойства, которое будет использоваться в качестве label группы опций.                                                                                    |
| `optionGroupChildren`  | -        | `string`                     | `ESelectMultipleGroupPropsDefault.OPTION_GROUP_CHILDREN`              | Имя свойства для вложенных опций группы.                                                                                                                     |
| `label`                | -        | `string`                     | `undefined`                                                           | Текст элемента `label`.                                                                                                                                      |
| `id`                   | -        | `string`                     | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                                                                           |
| `placeholder`          | -        | `string`                     | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                                                                                  |
| `tiles`                | -        | `boolean`                    | `false`                                                               | Выбранные значения отображаются в виде плиток.                                                                                                               |
| `maxSelectedLabels`    | -        | `number`                     | `undefined`                                                           | Определяет, сколько всего выбранных элементов следует отображать.                                                                                            |
| `selectedItemsLabel`   | -        | `string`                     | `undefined`                                                           | Label, который будет отображаться после превышения максимального количества выбранных элементов. Будет работать, только если задан prop `maxSelectedLabels`. |
| `multiselectCheckbox`  | -        | `boolean`                    | `false`                                                               | Включает и выключает управление чекбоксом для множественного выбора.                                                                                         |
| `disabled`             | -        | `boolean`                    | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                                                                                     |
| `loading`              | -        | `boolean`                    | `false`                                                               | Находится ли компонент в состоянии загрузки.                                                                                                                 |
| `size`                 | -        | `TSharedPropsSize`           | `ESelectMultipleGroupPropsDefault.SIZE`                               | Предопределенные варианты размеров компонента.                                                                                                               |
| `filter`               | -        | `TSelectMultipleGroupFilter` | `undefined`                                                           | Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.                                                                    |
| `valid`                | -        | `boolean`                    | `false`                                                               | Состояние компонента `valid`.                                                                                                                                |
| `invalid`              | -        | `boolean`                    | `false`                                                               | Состояние компонента `invalid`.                                                                                                                              |
| `errors`               | -        | `Array<string>`              | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                                                                                |
| `cssClass`             | -        | `string`                     | `ESelectMultipleGroupPropsDefault.CSS_CLASS`                          | Переопределяет структуру CSS классов.                                                                                                                        |
| `modifier`             | -        | `TSharedPropsModifier`       | `undefined`                                                           | Модификатор базового CSS-класса.                                                                                                                             |
| `ariaLabel`            | -        | `string`                     | `ESelectMultipleGroupPropsDefault.ARIA_LABEL`                         | Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.                                                                 |

### `modelValue`

- **Тип:** `Record<string, any> | any`
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

- **Тип:** `Array<any>`
- **Значение по умолчанию:** `[]`
- **Описание**: Массив элементов для отображения в качестве доступных опций компонента.

::: details Пример
<demo src="./demos/demo.props.options.vue"></demo>
:::

### `optionLabel`

- **Тип:** `string`
- **Значение по умолчанию:** `ESelectMultipleGroupPropsDefault.OPTION_LABEL`
- **Описание**: Имя свойства, которое будет использоваться в качестве label опции. Выдаст ошибку, если `optionLabel`
  не соответствует объектам в `options`.

::: details Пример
<demo src="./demos/demo.props.option-label.vue"></demo>
:::

### `optionValue`

- **Тип:** `string | null`
- **Значение по умолчанию:** `null`
- **Описание**: Имя свойства, используемое в качестве значения опции и компонента, по умолчанию равно самой опции, если
  не определен.

::: details Пример
<demo src="./demos/demo.props.option-value.vue"></demo>
:::

### `optionGroupLabel`

- **Тип:** `string`
- **Значение по умолчанию:** `ESelectMultipleGroupPropsDefault.OPTION_GROUP_LABEL`
- **Описание**: Имя свойства, которое будет использоваться в качестве label группы опций.

::: details Пример
<demo src="./demos/demo.props.option-group-label.vue"></demo>
:::

### `optionGroupChildren`

- **Тип:** `string`
- **Значение по умолчанию:** `ESelectMultipleGroupPropsDefault.OPTION_GROUP_CHILDREN`
- **Описание**: Имя свойства для вложенных опций группы.

::: details Пример
<demo src="./demos/demo.props.option-group-children.vue"></demo>
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

### `tiles`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Выбранные значения отображаются в виде плиток.

::: details Пример
<demo src="./demos/demo.props.tiles.vue"></demo>
:::

### `maxSelectedLabels`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Определяет, сколько всего выбранных элементов следует отображать.

::: details Пример
<demo src="./demos/demo.props.max-selected-labels.vue"></demo>
:::

### `selectedItemsLabel`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Label, который будет отображаться после превышения максимального количества выбранных элементов.
  Будет работать, только если задан prop `maxSelectedLabels`.

::: details Пример
<demo src="./demos/demo.props.selected-items-label.vue"></demo>
:::

### `multiselectCheckbox`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Включает и выключает управление чекбоксом для множественного выбора.

::: details Пример
<demo src="./demos/demo.props.multiselect-checkbox.vue"></demo>
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
- **Значение по умолчанию:** `ESelectMultipleGroupPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `filter`

- **Тип:** `TSelectMultipleGroupFilter`
- **Значение по умолчанию:** `undefined`
- **Описание**: Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.

::: details Пример
<demo src="./demos/demo.props.filter.vue"></demo>
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
- **Значение по умолчанию:** `ESelectMultipleGroupPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать
  более одного вида компонента.

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
- **Значение по умолчанию:** `ESelectMultipleGroupPropsDefault.ARIA_LABEL`
- **Описание**: Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.

::: details Пример
<demo src="./demos/demo.props.aria-label.vue"></demo>
:::

## Slots

| Slot                   | Description                                                                                                             |
|------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `label`                | Слот для отображения `label`, который будет заменять `placeholder`, а также текст выбранного значения.                  |
| `optionsGroup`         | Слот для отображения списка групп опций.                                                                                |
| `options`              | Слот для отображения списка выбираемых опций.                                                                           |
| `empty`                | Слот для отображения контента при отсутствии доступных опций.                                                           |
| `tiles`                | Слот для отображения плиток выбранных значений.                                                                         |
| `multiselectCheckbox`  | Слот для отображения чекбокса для множественного выбора. Используется совместно с props `multiselectCheckbox`.          |
| `filterInput`          | Слот для отображения кастомного `input` для фильтрации. Используется совместно с props `filter` и `model-value-filter`. |
| `emptyFilter`          | Слот для отображения контента, когда фильтрация не дала результатов.                                                    |
| `filterIcon`           | Слот для отображения иконки фильтра рядом с `input` полем фильтрации.                                                   |
| `toggleIcon`           | Слот для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на содержимое слота `cleanIcon`.      |
| `cleanIcon`            | Слот для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.                                |
| `loadingIcon`          | Слот для отображения иконки загрузки.                                                                                   |
| `loading`              | Слот для отображения индикатора загрузки в элементе списка опций.                                                       |
| `errors`               | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.      |

### `label`

- **Описание:** Используется для отображения `label`, который будет заменять `placeholder`, а также текст выбранного
  значения.
- **Тип:** `(props: {
    selectedOptions: Array<Record<string, any>>;
    label: string;
    remove: (option: Record<string, any>) => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.label.vue"></demo>
:::

### `optionsGroup`

- **Описание:** Используется для отображения списка групп опций.
- **Тип:** `(props: { option: any }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.options-group.vue"></demo>
:::

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

### `tiles`

- **Описание:** Используется для отображения плиток выбранных значений.
- **Тип:** `(props: {
    selectedOptions: Array<any>;
    removeTile: (option: Record<string, any>) => void;
    optionLabel: string;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.tiles.vue"></demo>
:::

### `multiselectCheckbox`

- **Описание:** Используется для отображения чекбокса для множественного выбора. Используется совместно с props
[`multiselectCheckbox`](#multiselectcheckbox).
- **Тип:** `(props: { select: () => void; checked: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.multiselect-checkbox.vue"></demo>
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

| Event                 | Payload                                             | Description                                                  |
|-----------------------|-----------------------------------------------------|--------------------------------------------------------------|
| `update:modelValue`   | `payload: TSelectMultipleGroupProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`.    |
| `update:filter-value` | `payload: TSelectMultipleGroupProps['filterValue']` | Событие срабатывает при обновлении значения `filterValue`.   |
| `focus`               | `event: Event`                                      | Событие срабатывает когда компонент получает фокусировку.    |
| `blur`                | `event: Event`                                      | Событие срабатывает когда компонент теряет фокусировку.      |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `TSelectMultipleGroupProps['modelValue']`

::: details Пример
<demo src="./demos/demo.emits.update-model-value.vue"></demo>
:::

### update:filter-value

- **Описание:** Событие срабатывает при обновлении значения `filterValue`.
- **Тип:** `TSelectMultipleGroupProps['filterValue']`

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
$select-multiple-group: '.ar-select-multiple-group';

#{$select-multiple-group} {
  
  // .ar-select-multiple-group--theme
  &--theme {
    // .ar-select-multiple-group--theme .ar-select-multiple-group__header
    #{$select-multiple-group}__header {}

    // .ar-select-multiple-group--theme .ar-select-multiple-group__tile
    #{$select-multiple-group}__tile {
      // .ar-select-multiple--theme .ar-select-multiple__tile:hover
      &:hover {}
    }

    // .ar-select-multiple-group--theme .ar-select-multiple-group__body
    #{$select-multiple-group}__body {}

    // .ar-select-multiple-group--theme .ar-select-multiple-group__filter
    #{$select-multiple-group}__filter {
      // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input
      &-input {
        // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input > input
        > input {
          // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input > input:hover
          &:hover {}

          // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input > input:active, .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input > input:focus
          &:active,
          &:focus {}
        }
      }
    }

    // .ar-select-multiple-group--theme .ar-select-multiple-group__options
    #{$select-multiple-group}__options {
      &-group {
        // .ar-select-multiple-group--theme .ar-select-multiple-group__options-group-label
        &-label {}
      }
    }

    // .ar-select-multiple-group--theme .ar-select-multiple-group__option
    #{$select-multiple-group}__option {
      // .ar-select-multiple-group--theme .ar-select-multiple-group__option:hover, .ar-select-multiple-group--theme .ar-select-multiple-group__option--focused
      &:hover,
      &--focused {}

      // ar-select-multiple-group--theme .ar-select-multiple-group__option--selected
      &--selected {}
    }

    // .ar-select-multiple-group--theme .ar-select-multiple-group__clean
    #{$select-multiple-group}__clean {
      // .ar-select-multiple-group--theme .ar-select-multiple-group__clean-icon
      &-icon {
        // .ar-select-multiple-group--theme .ar-select-multiple-group__clean-icon:hover
        &:hover {}
      }
    }
  }

  // .ar-select-multiple-group--hovered
  &--hovered {
    // .ar-select-multiple-group--hover.ar-select-multiple-group--theme
    &#{$select-multiple-group}--theme {
      // .ar-select-multiple-group--hover.ar-select-multiple-group--theme .ar-select-multiple-group__header
      #{$select-multiple-group}__header {}
    }
  }

  // .ar-select-multiple-group--focused
  &--focused {
    // .ar-select-multiple-group--focused.ar-select-multiple-group--theme
    &#{$select-multiple-group}--theme {
      // .ar-select-multiple-group--focused.ar-select-multiple-group--theme .ar-select-multiple-group__header
      #{$select-multiple-group}__header {}
    }
  }

  // .ar-select-multiple-group--disabled
  &--disabled {}

  // .ar-select-multiple-group--small
  &--small {
    // .ar-select-multiple--small .ar-select-multiple__header
    #{$select-multiple-group}__header {}

    // .ar-select-multiple-group--small .ar-select-multiple-group__list
    #{$select-multiple-group}__list {}
  }

  // .ar-select-multiple-group--medium
  &--medium {
    // .ar-select-multiple-group--medium .ar-select-multiple-group__header
    #{$select-multiple-group}__header {}

    // .ar-select-multiple-group--medium .ar-select-multiple-group__list
    #{$select-multiple-group}__list {}
  }

  // .ar-select-multiple-group--large
  &--large {
    // .ar-select-multiple-group--large .ar-select-multiple-group__header
    #{$select-multiple-group}__header {}

    // .ar-select-multiple-group--large .ar-select-multiple-group__list
    #{$select-multiple-group}__list {}
  }

  // .ar-select-multiple-group--valid
  &--valid {
    // .ar-select-multiple-group--valid.ar-select-multiple-group--theme
    &#{$select-multiple-group}--theme {
      // .ar-select-multiple-group--valid.ar-select-multiple-group--theme .ar-select-multiple-group__header
      #{$select-multiple-group}__header {
        // .ar-select-multiple-group--valid.ar-select-multiple-group--theme .ar-select-multiple-group__header:hover
        &:hover {}

        // .ar-select-multiple-group--valid.ar-select-multiple-group--theme .ar-select-multiple-group__header:focus
        &:focus {}
      }
    }
  }

  // .ar-select-multiple-group--invalid
  &--invalid {
    // .ar-select-multiple-group--invalid .ar-select-multiple-group__label, .ar-select-multiple-group--invalid .ar-select-multiple-group__errors
    #{$select-multiple-group}__label,
    #{$select-multiple-group}__errors {}

    // .ar-select-multiple-group--invalid.ar-select-multiple-group--theme
    &#{$select-multiple-group}--theme {
      // .ar-select-multiple-group--invalid.ar-select-multiple-group--theme .ar-select-multiple-group__header
      #{$select-multiple-group}__header {
        // .ar-select-multiple-group--invalid.ar-select-multiple-group--theme .ar-select-multiple-group__header:hover
        &:hover {}

        // .ar-select-multiple-group--invalid.ar-select-multiple-group--theme .ar-select-multiple-group__header:focus
        &:focus {}
      }
    }
  }

  // .ar-select-multiple-group--primary
  &--primary {
    // .ar-select-multiple-group--primary.ar-select-multiple-group__header
    #{$select-multiple-group}__header {}

    // .ar-select-multiple-group--primary.ar-select-multiple-group--hovered
    &#{$select-multiple-group}--hovered {
      // .ar-select-multiple-group--primary.ar-select-multiple-group--hovered .ar-select-multiple-group__header
      #{$select-multiple-group}__header {}
    }

    // .ar-select-multiple-group--theme .ar-select-multiple-group__body
    #{$select-multiple-group}__body {}

    // .ar-select-multiple-group--theme .ar-select-multiple-group__filter
    #{$select-multiple-group}__filter {
      // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input
      &-input {
        // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input:hover
        &:hover {}

        // .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input:active, .ar-select-multiple-group--theme .ar-select-multiple-group__filter-input:focis
        &:active,
        &:focus {}
      }
    }

    // .ar-select-multiple-group--theme .ar-select-multiple-group__option
    #{$select-multiple-group}__option {
      // .ar-select-multiple-group--theme .ar-select-multiple-group__option:hover, .ar-select-multiple-group--theme .ar-select-multiple-group__option--focused
      &:hover,
      &--focused {}

      // ar-select-multiple-group--theme .ar-select-multiple-group__option--selected
      &--selected {}
    }
  }

  // .ar-select-multiple-group__label
  &__label {}

  // .ar-select-multiple-group__header
  &__header {
    // .ar-select-multiple-group__header-group
    &-group {}
  }

  // .ar-select-multiple-group__text
  &__text {
    // .ar-select-multiple-group__text-selected
    &-selected {}
  }

  // .ar-select-multiple-group__tile
  &__tile {}

  // .ar-select-multiple-group__loading
  &__loading {}

  // .ar-select-multiple-group__toggle
  &__toggle {
    // .ar-select-multiple-group__toggle-icon
    &-icon {}
  }

  // .ar-select-multiple-group__clean
  &__clean {
    // .ar-select-multiple-group__clean-icon
    &-icon {}
  }

  // .ar-select-multiple-group__body
  &__body {
    // .ar-select-multiple-group__body--opened
    &--opened {}
  }

  // .ar-select-multiple-group__filter
  &__filter {
    // .ar-select-multiple-group__filter-checkbox
    &-checkbox {}

    // .ar-select-multiple-group__filter-input
    &-input {
      // .ar-select-multiple-group__filter-input > input
      > input {}
    }

    // .ar-select-multiple-group__filter-icon
    &-icon {}
  }

  // .ar-select-multiple-group:has(.ar-select-multiple-group__filter-icon) .ar-select-multiple-group__filter-input > input
  &:has(#{$select-multiple-group}__filter-icon) #{$select-multiple-group}__filter-input > input {}

  // .ar-select-multiple-group__list
  &__list {
    // .ar-select-multiple-group__list-loading
    &-loading {}
  }

  // .ar-select-multiple-group__empty
  &__empty {
    // .ar-select-multiple-group__empty-filter
    &-filter {}

    // .ar-select-multiple-group__empty-options
    &-options {}
  }

  // .ar-select-multiple-group__options
  &__options {
    // .ar-select-multiple-group__options-group
    &-group {
      // .ar-select-multiple-group__options-group-label
      &-label {}
    }
  }

  // .ar-select-multiple-group__option
  &__option {
    &-checkbox {}
  }

  // .ar-select-multiple-group__errors
  &__errors {
    // .ar-select-multiple-group__errors-expand-enter-active, .ar-select-multiple-group__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-select-multiple-group__errors--expand-enter-from, .ar-select-multiple-group__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
