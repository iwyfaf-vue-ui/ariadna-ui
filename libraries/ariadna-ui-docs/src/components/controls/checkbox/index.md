---
layout: doc
---

# Checkbox

Checkbox - представляет собой расширенную реализацию элемента формы `<input type="checkbox">`.

Вес <Badge type="info">~ 1.92 kB gzipped.</Badge>

## Описание

Checkbox - Vue-компонент реализует настраиваемый компонент расширенного управления элементом `<input type="checkbox">`
для использования в формах и пользовательских интерфейсах.

Позволяет кастомизировать нативный `<input type="checkbox">` или же скрыть его и реализовать кастомный.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Checkbox from '@iwyfaf-vue-ui/ariadna-ui/Checkbox';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop          | Required | Type                   | Default                                                               | Description                                                      |
|---------------|----------|------------------------|-----------------------------------------------------------------------|------------------------------------------------------------------|
| `modelValue`  | ✓        | `boolean`              | `false`                                                               | Значение компонента.                                             |
| `id`          | -        | `string`               | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.               |
| `name`        | -        | `string`               | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.             |
| `disabled`    | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.         |
| `size`        | -        | `TSharedPropsSize`     | `ECheckboxPropsDefault.SIZE`                                          | Предопределенные варианты размеров компонента.                   |
| `position`    | -        | `TCheckboxPropsType`   | `undefined`                                                           | Положение чекбокса относительно его контента.                    |
| `custom`      | -        | `boolean`              | `false`                                                               | Позволяет имплементировать кастомный `<input type="checkbox">`.  |
| `valid`       | -        | `boolean`              | `false`                                                               | Состояние компонента `valid`.                                    |
| `invalid`     | -        | `boolean`              | `false`                                                               | Состояние компонента `invalid`.                                  |
| `errors`      | -        | `Array<string>`        | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                    |
| `cssClass`    | -        | `string`               | `ECheckboxPropsDefault.CSS_CLASS`                                     | Переопределяет структуру CSS классов.                            |
| `modifier`    | -        | `TSharedPropsModifier` | `undefined`                                                           | Модификатор базового CSS-класса.                                 |
| `ariaLabel`   | -        | `string`               | `undefined`                                                           | `aria-label` для лучшей доступности.                             |

### `modelValue`
 
- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
:::

### `id`

- **Тип:** `string`
- **Значение по умолчанию:** Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()`.
- **Описание**: Значение нативного атрибута `placeholder` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.id.vue"></demo>
:::

### `name`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Значение нативного атрибута `name` элемента `input`.

::: details Пример
<demo src="./demos/demo.props.name.vue"></demo>
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
- **Значение по умолчанию:** `ECheckboxPropsDefault.SIZE` 
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`,
`--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `position`

- **Тип:** `TCheckboxPropsType`
- **Значение по умолчанию:** `undefined`
- **Описание**: Положение чекбокса относительно его контента. Добавляет модификаторы `--left` или `--right`.

::: details Пример
<demo src="./demos/demo.props.position.vue"></demo>
:::

### `custom`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Позволяет имплементировать кастомный `<input type="checkbox">`. Добавляет модификатор `--hidden` к 
`__input` элементу.

::: details Пример
<demo src="./demos/demo.props.custom.vue"></demo>
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
- **Значение по умолчанию:** `ECheckboxPropsDefault.CSS_CLASS`
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

### `ariaLabel`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: `aria-label` для лучшей доступности.

::: details Пример
<demo src="./demos/demo.props.aria-label.vue"></demo>
:::

## Slots

| Slot        | Description                                                |
|-------------|------------------------------------------------------------|
| `default`   | Слот для контента `Checkbox`.                              |
| `custom`    | Слот для кастомного содержимого `<input type="checkbox">`. |
| `errors`    | Используется для вывода ошибок `input` поля.               |

### `default`

- **Описание:** Используется для вывода контента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

### `custom`

- **Описание:** Используется для вывода дополнительно содержимого при реализации кастомного `<input type="checkbox">`,
совместно с props [custom](#custom)
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.custom.vue"></demo>
:::

### `errors`

- **Описание:** Используется для вывода ошибок `input` поля.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

## Emits

| Event                | Payload                                 | Description                                               |
|----------------------|-----------------------------------------|-----------------------------------------------------------|
| `update:model-value` | `payload: TCheckboxProps['modelValue']` | Событие срабатывает при обновлении значения `modelValue`. |
| `focus`              | `event: Event`                          | Событие срабатывает когда компонент получает фокусировку. |
| `blur`               | `event: Event`                          | Событие срабатывает когда компонент теряет фокусировку.   |
| `change`             | `event: Event`                          | Событие срабатывает когда значение компонента меняется.   |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TCheckboxProps['modelValue']`

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

### `aria-labeledby`

Добавляет `aria-labelledby` к элементу `label`. Значение атрибута указывается через пропс [`id`](#id), либо, если не
задан, формируется автоматически.

Это же самое значение подставляется в атрибут `id` элемента `input`.

### `aria-label`

С помощью пропса [`ariaLabel`](#arialabel) задается атрибут `aria-label`, который задает доступное имя элементу.

### Поддержка клавиатуры

| Key     | Function                                       |
|---------|------------------------------------------------|
| `tab`   | Перемещает фокус на `<input type="checkbox">`. |
| `space` | Переключает `checked` состояние.               |

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
- `--checked`: Задаются для визуализации состояние `checked` элемента `<input type="checkbox">`.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$checkbox: '.ar-checkbox';

#{$checkbox} {
  position: relative;

  // .ar-checkbox--theme
  &--theme {
    // .ar-checkbox--theme .ar-checkbox__input
    #{$checkbox}__input {
      // .ar-checkbox--theme .ar-checkbox__input::after
      &::after {}
    }

    // .ar-checkbox--theme .ar-checkbox__custom
    #{$checkbox}__custom {
      // .ar-checkbox--theme .ar-checkbox__custom::after
      &::after {}
    }
  }

  // .ar-checkbox--focused
  &--focused {
    // .ar-checkbox--focused.ar-checkbox--theme
    &#{$checkbox}--theme {
      // .ar-checkbox--focused.ar-checkbox--theme .ar-checkbox__input
      #{$checkbox}__input {}
    }
  }

  // .ar-checkbox--hovered
  &--hovered {
    // .ar-checkbox--hovered.ar-checkbox--theme
    &#{$checkbox}--theme {
      // .ar-checkbox--hovered.ar-checkbox--theme .ar-checkbox__input
      #{$checkbox}__input {}
    }
  }

  // .ar-checkbox--disabled
  &--disabled {
    #{$checkbox}__input,
    #{$checkbox}__custom {}
  }

  // .ar-checkbox--checked
  &--checked {
    // .ar-checkbox--checked .ar-checkbox__input
    #{$checkbox}__input {}

    // .ar-checkbox--checked .ar-checkbox__input
    #{$checkbox}__custom {}
  }

  // .ar-checkbox--right
  &--right {
    #{$checkbox}__label {}
  }

  // .ar-checkbox--valid
  &--valid {
    // .ar-checkbox--valid.ar-checkbox--theme
    &#{$checkbox}--theme {
      // .ar-checkbox--valid.ar-checkbox--theme .ar-checkbox__input
      #{$checkbox}__input {
        // .ar-checkbox--valid.ar-checkbox--theme .ar-checkbox__input:hover
        &:hover {}

        // .ar-checkbox--valid.ar-checkbox--theme .ar-checkbox__input:focus
        &:focus {}
      }

      // .ar-checkbox--valid.ar-checkbox--theme .ar-checkbox__custom
      #{$checkbox}__custom {
        // .ar-checkbox--valid.ar-checkbox--theme .ar-checkbox__custom .ar-checkbox__custom::after
        &::after {}
      }

      // .ar-checkbox--valid.ar-checkbox--theme.ar-checkbox--checked
      &#{$checkbox}--checked {
        // .ar-checkbox--valid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__input
        #{$checkbox}__input {
          // .ar-checkbox--valid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__input::after
          &::after {}
        }

        // .ar-checkbox--valid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__custom
        #{$checkbox}__custom {}
      }
    }
  }

  // .ar-checkbox--invalid
  &--invalid {
    // .ar-checkbox--invalid.ar-checkbox--theme
    &#{$checkbox}--theme {
      // .ar-checkbox--invalid.ar-checkbox--theme .ar-checkbox__input
      #{$checkbox}__input {
        // .ar-checkbox--invalid.ar-checkbox--theme .ar-checkbox__input:hover
        &:hover {}

        // .ar-checkbox--invalid.ar-checkbox--theme .ar-checkbox__input:focus
        &:focus {}
      }

      // .ar-checkbox--invalid.ar-checkbox--theme .ar-checkbox__custom
      #{$checkbox}__custom {
        // .ar-checkbox--invalid.ar-checkbox--theme .ar-checkbox__custom .ar-checkbox__custom::after
        &::after {}
      }

      // .ar-checkbox--invalid.ar-checkbox--theme.ar-checkbox--checked
      &#{$checkbox}--checked {
        // .ar-checkbox--invalid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__input
        #{$checkbox}__input {
          // .ar-checkbox--invalid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__input::after
          &::after {}
        }

        // .ar-checkbox--valid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__custom
        #{$checkbox}__custom {}
      }
    }
  }

  // .ar-checkbox--primary
  &--primary {
    // .ar-checkbox--primary.ar-checkbox--theme
    &#{$checkbox}--theme {
      // .ar-checkbox--primary.ar-checkbox--theme .ar-checkbox__input
      #{$checkbox}__input {
        // .ar-checkbox--primary.ar-checkbox--theme .ar-checkbox__input:hover
        &:hover {}

        // .ar-checkbox--primary.ar-checkbox--theme .ar-checkbox__input:focus
        &:focus {}
      }

      // .ar-checkbox--primary .ar-checkbox__custom
      #{$checkbox}__custom {
        // .ar-checkbox--primary .ar-checkbox__custom::after
        &::after {}
      }

      // .ar-checkbox--primary.ar-checkbox--theme.ar-checkbox--checked
      &#{$checkbox}--checked {
        // .ar-checkbox--primary.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__input
        #{$checkbox}__input {
          // .ar-checkbox--primary.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__input::after
          &::after {}
        }
        
        // .ar-checkbox--valid.ar-checkbox--theme.ar-checkbox--checked .ar-checkbox__custom
        #{$checkbox}__custom {}
      }
    }
  }

  // .ar-checkbox--small
  &--small {
    // .ar-checkbox--small .ar-checkbox__input
    #{$checkbox}__input {
      // .ar-checkbox--small .ar-checkbox__input::after
      &::after {}
    }
  }

  // .ar-checkbox--medium
  &--medium {
    // .ar-checkbox--medium .ar-checkbox__input
    #{$checkbox}__input {
      // .ar-checkbox--medium .ar-checkbox__input::after
      &::after {}
    }
  }

  // .ar-checkbox--large
  &--large {
    // .ar-checkbox--medium .ar-checkbox__input
    #{$checkbox}__input {
      // .ar-checkbox--medium .ar-checkbox__input::after
      &::after {}
    }
  }

  // .ar-checkbox__label
  &__label {}

  // .ar-checkbox__input
  &__input {
    // .ar-checkbox__input::after
    &::after {}

    // .ar-checkbox__input--hidden
    &--hidden {}
  }

  // .ar-checkbox__custom
  &__custom {
    // .ar-checkbox__custom::after
    &::after {}
  }

  // .ar-checkbox__content
  &__content {}

  // .ar-checkbox__errors
  &__errors {
    // .ar-checkbox__errors-expand-enter-active, .ar-checkbox__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-checkbox__errors--expand-enter-from, .ar-checkbox__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
