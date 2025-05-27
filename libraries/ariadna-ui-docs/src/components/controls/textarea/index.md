---
layout: doc
---

# Textarea

Textarea - представляет собой компонент HTML элемента `<textarea>` в текстовой форме с возможностью гибкой темизации.

Вес <Badge type="info">~ 1.77 kB gzipped.</Badge>

## Описание

Textarea - Vue-компонент реализует текстовое поле ввода с поддержкой кастомизации внешнего вида и поведения через
пропсы и слоты.

Компонент отображает `label`, если он передан, и связывает его с `<textarea>` по уникальному идентификатору. Компонент
имеет множество слотов для конфигурации поведения `<textarea>` элемента.

Через слот `placeholder` можно реализовать кастомный `placeholder` для сложных дизайнерских решений.

Для отображения ошибок предусмотрен слот, который появляется при наличии ошибок и флага `invalid`. Появление ошибок
можно анимировать с помощью CSS.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Textarea from '@iwyfaf-vue-ui/ariadna-ui/Textarea';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop           | Required | Type                   | Default                                                               | Description                                                     |
|----------------|----------|------------------------|-----------------------------------------------------------------------|-----------------------------------------------------------------|
| `modelValue`   | ✓        | `Nullable<string>`     | `null`                                                                | Значение компонента.                                            |
| `label`        | -        | `string`               | `undefined`                                                           | Текст элемента `label`.                                         | 
| `id`           | -        | `string`               | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `textarea`.           |
| `placeholder`  | -        | `string`               | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `textarea`.  |
| `name`         | -        | `string`               | `undefined`                                                           | Значение нативного атрибута `name` элемента `textarea`.         |
| `rows`         | -        | `Numberish`            | `'2'`                                                                 | Количество строк элемента `textarea`.                           |
| `cols`         | -        | `Numberish`            | `'20'`                                                                | Количество столбцов элемента `textarea`.                        |
| `autocomplete` | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `autocomplete` элемента `textarea`. |
| `spellcheck`   | -        | `boolean`              | `true`                                                                | Включение нативной проверки орфографии.                         |
| `disabled`     | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `disabled` элемента `textarea`.     |
| `readonly`     | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `readonly` элемента `textarea`.     |
| `valid`        | -        | `boolean`              | `false`                                                               | Состояние компонента `valid`.                                   |
| `invalid`      | -        | `boolean`              | `false`                                                               | Состояние компонента `invalid`.                                 |
| `errors`       | -        | `Array<string>`        | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                   |
| `cssClass`     | -        | `string`               | `ETextareaPropsDefault.CSS_CLASS`                                     | Переопределяет структуру CSS классов.                           |
| `modifier`     | -        | `TSharedPropsModifier` | `undefined`                                                           | Модификатор базового CSS-класса.                                |

### `modelValue`

- **Тип:** `Nullable<string>`
- **Значение по умолчанию:** `null`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
:::

### `label`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для отображения элемента `label`. Реализует нативную браузерную связку `textarea` элемента
с элементом `label`. Когда такая связь установлена, клик по `label` активирует `textarea`.

::: details Пример
<demo src="./demos/demo.props.label.vue"></demo>
:::

### `id`

- **Тип:** `string`
- **Значение по умолчанию:** Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()`.
- **Описание**: Значение нативного атрибута `placeholder` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.id.vue"></demo>
:::

### `placeholder`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Значение нативного атрибута `placeholder` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.placeholder.vue"></demo>
:::

### `name`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Значение нативного атрибута `name` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.name.vue"></demo>
:::

### `rows`

- **Тип:** `Numberish`
- **Значение по умолчанию:** `'2'`
- **Описание**: Значение нативного атрибута `rows` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.rows.vue"></demo>
:::

### `cols`

- **Тип:** `Numberish`
- **Значение по умолчанию:** `'20'`
- **Описание**: Значение нативного атрибута `cols` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.cols.vue"></demo>
:::

### `autocomplete`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `autocomplete` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.autocomplete.vue"></demo>
:::

### `spellcheck`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `spellcheck` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.spellcheck.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `disabled` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `readonly`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение нативного атрибута `readonly` элемента `textarea`.

::: details Пример
<demo src="./demos/demo.props.readonly.vue"></demo>
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
- **Значение по умолчанию:** `ETextareaPropsDefault.CSS_CLASS`
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

| Slot          | Description                                            |
|---------------|--------------------------------------------------------|
| `placeholder` | Используется для отображения кастомного `placeholder`. |
| `errors`      | Используется для отображения ошибок `textarea` поля.   |

### `placeholder`

- **Описание:** Используется для отображения кастомного `placeholder`. Если указан, то [`props.placeholder`](#placeholder)
будет проигнорирован.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.placeholder.vue"></demo>
:::

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

## Emits

| Event                | Payload                                  | Description                                               |
|----------------------|------------------------------------------|-----------------------------------------------------------|
| `update:model-value` | `payload: TTextareaProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`. |
| `focus`              | `event: Event`                           | Событие срабатывает когда компонент получает фокусировку. |
| `blur`               | `event: Event`                           | Событие срабатывает когда компонент теряет фокусировку.   |
| `change`             | `event: Event`                           | Событие срабатывает когда значение компонента меняется.   |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TTextareaProps['modelValue']`

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

| Key    | Function                        |
|--------|---------------------------------|
| `tab`  | Перемещает фокус на `textarea`. |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--focused`: Задаются для визуализации фокусировки компонента.
- `--hovered`: Задаются для визуализации наведения на компонент.
- `--filled`: Задаются для визуализации заполненности значения компонента.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$textarea: '.ar-textarea';

#{$textarea} {
  // .ar-textarea--theme
  &--theme {
    // .ar-textarea--theme .ar-textarea__textarea
    #{$textarea}__textarea {}
  }

  // .ar-textarea--focused
  &--focused {
    // .ar-textarea--focused.ar-textarea--theme
    &#{$textarea}--theme {
      // .ar-textarea--focused.ar-textarea--theme .ar-textarea__textarea
      #{$textarea}__textarea {}
    }
  }

  // .ar-textarea--hovered
  &--hovered {
    // .ar-textarea--hover.ar-textarea--theme
    &#{$textarea}--theme {
      // .ar-textarea--hover.ar-textarea--theme .ar-textarea__textarea
      #{$textarea}__textarea {}
    }
  }

  // .ar-textarea--disabled
  &--disabled {}

  // .ar-textarea--readonly
  &--readonly {
    #{$textarea}__textarea {}
  }

  // .ar-textarea--filled
  &--filled {
    // .ar-textarea--filled .ar-textarea__placeholder
    #{$textarea}__placeholder {}
  }

  // .ar-textarea--valid
  &--valid {
    // .ar-textarea--valid.ar-textarea--theme
    &#{$textarea}--theme {
      // .ar-textarea--valid.ar-textarea--theme .ar-textarea__textarea
      #{$textarea}__textarea {
        // .ar-textarea--valid.ar-textarea--theme .ar-textarea__textarea:hover
        &:hover {}
        // .ar-textarea--valid.ar-textarea--theme .ar-textarea__textarea:focus
        &:focus {}
      }
    }
  }

  // .ar-textarea--invalid
  &--invalid {
    // .ar-textarea--invalid.ar-textarea--theme
    &#{$textarea}--theme {
      // .ar-textarea--invalid.ar-textarea--theme .ar-textarea__textarea
      #{$textarea}__textarea {
        // .ar-textarea--invalid.ar-textarea--theme .ar-textarea__textarea:hover
        &:hover {}
        // .ar-textarea--invalid.ar-textarea--theme .ar-textarea__textarea:focus
        &:focus {}
      }
    }
  }

  // .ar-textarea--primary
  &--primary {
    // .ar-textarea--primary.ar-textarea__textarea
    #{$textarea}__textarea {}
    // .ar-textarea--primary.ar-textarea--hovered
    &#{$textarea}--hovered {
      // .ar-textarea--primary.ar-textarea--hovered .ar-textarea__input
      #{$textarea}__input {}
    }
  }

  // .ar-textarea__label
  &__label {}

  // .ar-textarea__textarea
  &__textarea {}

  // .ar-textarea__placeholder
  &__placeholder {}

  // .ar-textarea__errors
  &__errors {
    // .ar-textarea__errors-expand-enter-active, .ar-textarea__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-textarea__errors--expand-enter-from, .ar-textarea__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
