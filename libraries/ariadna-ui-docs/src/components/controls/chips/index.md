---
layout: doc
---

# Chips

Chips - представляет собой компонент для ввода нескольких значений в поле ввода.

Вес <Badge type="info">~ 2.87 kB gzipped.</Badge>

## Описание

Chips - Vue-компонент предназначен для ввода и отображения множества значений в виде "чипсов" (небольших интерактивных
элементов).

## Подключение

### Vue 3

```typescript
import Chips from '@iwyfaf-vue-ui/ariadna-ui/Chips';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop          | Required | Type                     | Default                                                               | Description                                                           |
|---------------|----------|--------------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------------|
| `modelValue`  | ✓        | `Array<any>`             | `[]`                                                                  | Значение компонента.                                                  |
| `label`       | -        | `string`                 | `undefined`                                                           | Текст элемента `label`.                                               |
| `id`          | -        | `string`                 | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                    |
| `placeholder` | -        | `string`                 | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.           |
| `writable`    | -        | `boolean`                | `false`                                                               | Управляет состоянием ручного ввода данных в компонент.                |
| `clearable`   | -        | `boolean`                | `false`                                                               | Управляет отображением элемента, который очищает значение компонента. |
| `disabled`    | -        | `boolean`                | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.              |
| `size`        | -        | `TSharedPropsSize`       | `EChipsPropsDefault.SIZE`                                             | Предопределенные варианты размеров компонента.                        |
| `valid`       | -        | `boolean`                | `false`                                                               | Состояние компонента `valid`.                                         |
| `invalid`     | -        | `boolean`                | `false`                                                               | Состояние компонента `invalid`.                                       |
| `errors`      | -        | `Array<string>`          | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                         |
| `cssClass`    | -        | `string`                 | `EChipsPropsDefault.CSS_CLASS`                                        | Переопределяет структуру CSS классов.                                 |
| `modifier`    | -        | `TSharedPropsModifier`   | `undefined`                                                           | Модификатор базового CSS-класса.                                      |

### `modelValue`

- **Тип:** `Array<any>`
- **Значение по умолчанию:** `[]`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
:::

### `label`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для отображения элемента `label`. Реализует нативную браузерную связку
  `input` элемента с элементом `label`. Когда такая связь установлена, клик по `label` активирует `input`.

::: details Пример
<demo src="./demos/demo.props.label.vue"></demo>
:::

### `id`

- **Тип:** `string`
- **Значение по умолчанию:** Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()`.
- **Описание**: Значение нативного атрибута `placeholder` элемента `input`.

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

### `writable`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Управляет состоянием ручного ввода данных в компонент.

::: details Пример
<demo src="./demos/demo.props.writable.vue"></demo>
:::

### `clearable`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Управляет отображением элемента, который очищает значение компонента.

::: details Пример
<demo src="./demos/demo.props.clearable.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `disabled` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `EChipsPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
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
- **Значение по умолчанию:** `EChipsPropsDefault.CSS_CLASS`
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

| Slot     | Description                                                                                                        |
|----------|--------------------------------------------------------------------------------------------------------------------|
| `chip`   | Слот для отображения значения каждого чипса.                                                                       |
| `remove` | Слот для отображения кнопки удаления каждого чипса.                                                                |
| `clear`  | Слот для отображения кнопки очистки значения компонента.                                                           |
| `input`  | Слот для отображения элемента ввода (`input`) новых значений компонента.                                           |
| `errors` | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте. |

### `chip`

- **Описание:** Слот для отображения значения каждого чипса.
- **Тип:** `(props: { value: string }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.chip.vue"></demo>
:::

### `remove`

- **Описание:** Слот для отображения кнопки удаления каждого чипса.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.remove.vue"></demo>
:::

### `clear`

- **Описание:** Слот для отображения кнопки очистки значения компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.clear.vue"></demo>
:::

### `input`

- **Описание:** Слот для отображения элемента ввода (`input`) новых значений компонента.
- **Тип:** `(props: { id: string; inputValue: string | undefined }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.input.vue"></demo>
:::

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

## Emits

| Event               | Payload                             | Description                                               |
|---------------------|-------------------------------------|-----------------------------------------------------------|
| `update:modelValue` | `payload: TChipProps['modelValue']` | Событие срабатывает при обновлении значения `modelValue`. |
| `add`               | `payload: TChipsEmitAddPayload`     | Событие срабатывает при добавлении одного значения.       |
| `remove`            | `payload: TChipsEmitRemovePayload`  | Событие срабатывает при удаление одного значения.         |
| `clear`             | `event: Event`                      | Событие срабатывает при очистке всех значений.            |
| `focus`             | `event: Event`                      | Событие срабатывает когда компонент получает фокусировку. |
| `blur`              | `event: Event`                      | Событие срабатывает когда компонент теряет фокусировку.   |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TChipProps['modelValue']`

::: details Пример
<demo src="./demos/demo.emits.update-model-value.vue"></demo>
::: 

### add

- **Описание:** Событие срабатывает при добавлении одного значения.
- **Тип:** `payload: TChipsEmitAddPayload`

::: details Пример
<demo src="./demos/demo.emits.add.vue"></demo>
::: 

### remove

- **Описание:** Событие срабатывает при удаление одного значения.
- **Тип:** `payload: TChipsEmitRemovePayload`

::: details Пример
<demo src="./demos/demo.emits.remove.vue"></demo>
::: 

### clear

- **Описание:** Событие срабатывает при очистке всех значений.
- **Тип:** `event: Event`

::: details Пример
<demo src="./demos/demo.emits.clear.vue"></demo>
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

- Список значений компонента имеет атрибут `role` со значением `listbox`.
- Каждое значение компонента имеет атрибут `role` со значением `option`.
- Элемент удаления значения имеет атрибут `role` со значением `button`.

### Поддержка клавиатуры

При наличии фокуса на компоненте:

| Key                            | Function                                                                        |
|--------------------------------|---------------------------------------------------------------------------------|
| `ArrowLeft`                    | Выбирает последний элемент в списке чипсов и осуществляет навигацию до первого. |
| `RightLeft`                    | Выбирает первый элемент в списке чипсов и осуществляет навигацию до последнего. |

При наличии фокуса на элемента очистки значения:

| Key                            | Function                     |
|--------------------------------|------------------------------|
| `Space`,`Enter`, `NumpadEnter` | Очищает значение компонента. |

При наличии фокуса на элемента ввода:

| Key                            | Function                                         |
|--------------------------------|--------------------------------------------------|
| `Space`,`Enter`, `NumpadEnter` | Добавляет в значение компонента введеные данные. |

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
- `--selected`: Задаются для визуализации заполненности значения компонента.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$chips: '.ar-chips';

#{$chips} {
  // .ar-chips--theme
  &--theme {
    // .ar-chips--theme .ar-chips__item
    #{$chips}__group {}

    // .ar-chips--theme .ar-chips__item
    #{$chips}__item {
      &-remove {}

      // .ar-chips--theme .ar-chips--focused
      &--focused {
        // .ar-chips--theme .ar-chips--focused .ar-chips--theme .ar-chips__item-remove
        #{$chips}__item-remove {}
      }
    }
  }

  // .ar-chips--small
  &--small {
    // .ar-chips--small .ar-chips__item
    #{$chips}__item {
      // .ar-chips--small .ar-chips__item .ar-chips__item-remove
      &-remove {}
    }
  }

  // .ar-chips--medium
  &--medium {
    // .ar-chips--medium .ar-chips__item
    #{$chips}__item {
      // .ar-chips--medium .ar-chips__item .ar-chips__item-remove
      &-remove {}
    }
  }

  // .ar-chips--large
  &--large {
    // .ar-chips--large .ar-chips__item
    #{$chips}__item {
      // .ar-chips--large .ar-chips__item .ar-chips__item-remove
      &-remove {}
    }
  }

  // .ar-chips--valid
  &--valid {
    // .ar-chips--valid .ar-chips__label, .ar-chips--valid .ar-chips__errors
    #{$chips}__label {}

    // .ar-chips--valid.ar-chips--theme
    &#{$chips}--theme {
      // .ar-chips--valid.ar-chips--theme .ar-chips__header
      #{$chips}__group {}
    }
  }

  // .ar-chips--invalid
  &--invalid {
    // .ar-chips--invalid .ar-chips__label, .ar-chips--invalid .ar-chips__errors
    #{$chips}__label,
    #{$chips}__errors {}

    // .ar-chips--invalid.ar-chips--theme
    &#{$chips}--theme {
      // .ar-chips--invalid.ar-chips--theme .ar-chips__group
      #{$chips}__group {}
    }
  }

  // .ar-chips--primary
  &--primary {
    // .ar-chips--primary.ar-chips__header
    #{$chips}__group {}

    // .ar-chips--primary .ar-chips__item
    #{$chips}__item {
      &-remove {}

      // .ar-chips--theme .ar-chips--focused
      &--focused {
        // .ar-chips--theme .ar-chips--focused .ar-chips--theme .ar-chips__item-remove
        #{$chips}__item-remove {}
      }
    }

    // .ar-chips--primary.ar-chips--hovered
    &#{$chips}--hovered {
      // .ar-chips--primary.ar-chips--hovered .ar-chips__header
      #{$chips}__header {}
    }
  }

  // .ar-chips__group
  &__group {}

  // .ar-chips__label
  &__label {}

  // .ar-chips__list
  &__list {}
  // .ar-chips__item
  &__item {
    // .ar-chips__item-remove
    &-remove {}
  }

  // .ar-chips__errors
  &__errors {
    // .ar-chips__errors-expand-enter-active, .ar-chips__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-chips__errors--expand-enter-from, .ar-chips__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
