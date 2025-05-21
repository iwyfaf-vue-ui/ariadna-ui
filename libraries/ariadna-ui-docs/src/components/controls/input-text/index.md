---
layout: doc
---

# InputText

InputText - представляет собой компонент HTML элемента `<input>` в текстовой форме с возможностью гибкой темизации.

Вес <Badge type="info">~ 1.73 kB gzipped.</Badge>

## Описание

InputText - Vue-компонент реализует текстовое поле ввода с поддержкой кастомизации внешнего вида и поведения через 
пропсы и слоты.

Компонент отображает `label`, если он передан, и связывает его с `<input>` по уникальному идентификатору. Компонент 
имеет множество слотов для конфигурации поведения `<input>` элемента. 

Через слот `placeholder` можно реализовать кастомный `placeholder` для сложных дизайнерских решений.

Для отображения ошибок предусмотрен слот, который появляется при наличии ошибок и флага `invalid`. Появление ошибок 
можно анимировать с помощью CSS.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import InputText from '@iwyfaf-vue-ui/ariadna-ui/InputText';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop           | Required | Type                   | Default                                                               | Description                                                  |
|----------------|----------|------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------|
| `modelValue`   | ✓        | `Nullable<string>`     | `null`                                                                | Значение компонента.                                         |
| `label`        | -        | `string`               | `undefined`                                                           | Текст элемента `label`.                                      |
| `type`         | -        | `TInputTextPropsType`  | `text`                                                                | Значение нативного атрибута `type` элемента `input`.         |
| `id`           | -        | `string`               | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.           |
| `placeholder`  | -        | `string`               | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.  |
| `name`         | -        | `string`               | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.         |
| `autocomplete` | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `autocomplete` элемента `input`. |
| `disabled`     | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.     |
| `readonly`     | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `readonly` элемента `input`.     |
| `size`         | -        | `TInputTextPropsSize`  | `medium`                                                              | Предопределенные варианты размеров для элемента `input`.     |
| `valid`        | -        | `boolean`              | `false`                                                               | Состояние компонента `valid`.                                |
| `invalid`      | -        | `boolean`              | `false`                                                               | Состояние компонента `invalid`.                              |
| `errors`       | -        | `Array<string>`        | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                |
| `cssClass`     | -        | `string`               | `ar-input-text`                                                       | Переопределяет структуру CSS классов.                        |
| `modifier`     | -        | `TSharedPropsModifier` | `undefined`                                                           | Модификатор базового CSS-класса.                             |

### `modelValue`

- **Тип:** `Nullable<string>`
- **Значение по умолчанию:** `null`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.model-value.vue"></demo>
:::

### `label`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для вывода элемента `label`. Реализует нативную браузерную связку 
`input` элемента с элементом `label`. Когда такая связь установлена, клик по `label` активирует 
`input`.

::: details Пример
<demo src="./demos/demo.props.label.vue"></demo>
:::

### `type`

- **Тип:** `TInputTextPropsType`
- **Значение по умолчанию:** `text`
- **Описание**: Значение нативного атрибута `type` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.type.vue"></demo>
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

### `name`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Значение нативного атрибута `name` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.name.vue"></demo>
:::

### `autocomplete`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `autocomplete` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.autocomplete.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `disabled` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `readonly`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `readonly` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.readonly.vue"></demo>
:::

### `size`

- **Тип:** `TInputTextPropsSize`
- **Значение по умолчанию:** `medium`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, 
`--medium` и `--large`.

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
- **Значение по умолчанию:** `ar-input-text`
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

## Slots

| Slot          | Description                                        |
|---------------|----------------------------------------------------|
| `placeholder` | Используется для вывода кастомного `placeholder`.  |
| `errors`      | Используется для вывода ошибок `input` поля.       |

### `placeholder`

- **Описание:** Используется для вывода кастомного `placeholder`. Если указан, то 
[`props.placeholder`](#placeholder) будет проигнорирован.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.placeholder.vue"></demo>
:::

### `errors`

- **Описание:** Используется для вывода ошибок `input` поля. 
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

## Emits

| Event                | Payload                                  | Description                                               |
|----------------------|------------------------------------------|-----------------------------------------------------------|
| `update:model-value` | `payload: TInputTextProps['modelValue']` | Событие срабатывает при обновлении значения `modelValue`. |
| `focus`              | `event: Event`                           | Событие срабатывает когда компонент получает фокусировку. |
| `blur`               | `event: Event`                           | Событие срабатывает когда компонент теряет фокусировку.   |
| `change`             | `event: Event`                           | Событие срабатывает когда значение компонента меняется.   |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TInputTextProps['modelValue']`

### focus

- **Описание:** Событие срабатывает когда компонент получает фокусировку.
- **Тип:** `event: Event`

### blur

- **Описание:** Событие срабатывает когда компонент теряет фокусировку.
- **Тип:** `event: Event`

### change

- **Описание:** Событие срабатывает когда значение компонента меняется.
- **Тип:** `event: Event`

## Accessibility

Компонент Badge не содержит никаких ролей и атрибутов.

### Поддержка клавиатуры

| Key    | Function                      |
|--------|-------------------------------|
| `tab`  | Перемещает фокус на `input`.  |

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
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$input-text: '.ar-input-text';

#{$input-text} {
  // .ar-input-text--theme
  &--theme {
    // .ar-input-text--theme .ar-input-text__input
    #{$input-text}__input {}
  }

  // .ar-input-text--focused
  &--focused {
    // .ar-input-text--focused.ar-input-text--theme
    &#{$input-text}--theme {
      // .ar-input-text--focused.ar-input-text--theme .ar-input-text__input
      #{$input-text}__input {}
    }
  }

  // .ar-input-text--hover
  &--hover {
    // .ar-input-text--hover.ar-input-text--theme
    &#{$input-text}--theme {
      // .ar-input-text--hover.ar-input-text--theme .ar-input-text__input
      #{$input-text}__input {}
    }
  }

  // .ar-input-text--disabled
  &--disabled {}

  // .ar-input-text--readonly
  &--readonly {
    #{$input-text}__input {}
  }

  // .ar-input-text--filled
  &--filled {
    // .ar-input-text--filled .ar-input-text__placeholder
    #{$input-text}__placeholder {}
  }

  // .ar-input-text--valid
  &--valid {
    // .ar-input-text--valid.ar-input-text--theme
    &#{$input-text}--theme {
      // .ar-input-text--valid.ar-input-text--theme .ar-input-text__input
      #{$input-text}__input {
        // .ar-input-text--valid.ar-input-text--theme .ar-input-text__input:hover
        &:hover {}
        // .ar-input-text--valid.ar-input-text--theme .ar-input-text__input:focus
        &:focus {}
      }
    }
  }

  // .ar-input-text--invalid
  &--invalid {
    // .ar-input-text--invalid.ar-input-text--theme
    &#{$input-text}--theme {
      // .ar-input-text--invalid.ar-input-text--theme .ar-input-text__input
      #{$input-text}__input {
        // .ar-input-text--invalid.ar-input-text--theme .ar-input-text__input:hover
        &:hover {}
        // .ar-input-text--invalid.ar-input-text--theme .ar-input-text__input:focus
        &:focus {}
      }
    }
  }

  // .ar-input-text--small
  &--small {
    #{$input-text}__input {}
  }

  // .ar-input-text--medium
  &--medium {
    #{$input-text}__input {}
  }

  // .ar-input-text--large
  &--large {
    #{$input-text}__input {}
  }

  // .ar-input-text--primary
  &--primary {
    // .ar-input-text--primary.ar-input-text--theme
    #{$input-text}__input {}
    // .ar-input-text--primary.ar-input-text--hovered
    &#{$input-text}--hovered {
      // .ar-input-text--primary.ar-input-text--hovered .ar-input-text__input
      #{$input-text}__input {}
    }
  }

  // .ar-input-text__label
  &__label {}

  // .ar-input-text__input
  &__input {}

  // .ar-input-text__placeholder
  &__placeholder {}

  // .ar-input-text__errors
  &__errors {
    // .ar-input-text__errors-expand-enter-active, .ar-input-text__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-input-text__errors--expand-enter-from, .ar-input-text__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
