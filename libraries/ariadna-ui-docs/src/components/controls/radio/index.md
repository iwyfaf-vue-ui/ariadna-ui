---
layout: doc
---

# Radio

Radio - представляет собой расширенную реализацию элемента формы `<input type="radio">`.

Вес <Badge type="info">~ 1.56 kB gzipped.</Badge>

## Описание

Radio - Vue-компонент реализует настраиваемый компонент расширенного управления элементом `<input type="radio">`
для использования в формах и пользовательских интерфейсах.

Позволяет кастомизировать нативный `<input type="radio">` или же скрыть его и реализовать кастомный.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Radio from '@iwyfaf-vue-ui/ariadna-ui/Radio';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop         | Required | Type                   | Default                                                               | Description                                                  |
|--------------|----------|------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------|
| `modelValue` | ✓        | `any`                  | `null`                                                                | Значение компонента.                                         |
| `value`      | ✓        | `any`                  | `null`                                                                | Нативное значение элемента `<input type="radio">`.           |
| `id`         | -        | `string`               | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.           |
| `name`       | -        | `string`               | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.         |
| `disabled`   | -        | `boolean`              | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.     |
| `size`       | -        | `TSharedPropsSize`     | `ERadioPropsDefault.SIZE`                                             | Предопределенные варианты размеров компонента.               |
| `position`   | -        | `TRadioPropsPosition`  | `undefined`                                                           | Положение радио-кнопки относительно его контента.            |
| `custom`     | -        | `boolean`              | `false`                                                               | Позволяет имплементировать кастомный `<input type="radio">`. |
| `valid`      | -        | `boolean`              | `false`                                                               | Состояние компонента `valid`.                                |
| `invalid`    | -        | `boolean`              | `false`                                                               | Состояние компонента `invalid`.                              |
| `cssClass`   | -        | `string`               | `ERadioPropsDefault.CSS_CLASS`                                        | Переопределяет структуру CSS классов.                        |
| `modifier`   | -        | `TSharedPropsModifier` | `undefined`                                                           | Модификатор базового CSS-класса.                             |

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
- **Значение по умолчанию:** `ERadioPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`,
`--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `position`

- **Тип:** `TRadioPropsPosition`
- **Значение по умолчанию:** `undefined`
- **Описание**: Положение радио-кнопки относительно его контента. Добавляет модификаторы `--left` или `--right`.

::: details Пример
<demo src="./demos/demo.props.position.vue"></demo>
:::

### `custom`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Позволяет имплементировать кастомный `<input type="radio">`. Добавляет модификатор `--hidden` к
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

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ERadioPropsDefault.CSS_CLASS`
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

| Slot        | Description                                             |
|-------------|---------------------------------------------------------|
| `default`   | Слот для контента `Radio`.                              |
| `custom`    | Слот для кастомного содержимого `<input type="radio">`. |

### `default`

- **Описание:** Используется для вывода контента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

### `custom`

- **Описание:** Используется для вывода дополнительно содержимого при реализации кастомного `<input type="radio">`,
  совместно с props [custom](#custom)
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.custom.vue"></demo>
:::

## Emits

| Event                | Payload                               | Description                                               |
|----------------------|---------------------------------------|-----------------------------------------------------------|
| `update:model-value` | `payload: TRadioProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`. |
| `focus`              | `event: Event`                        | Событие срабатывает когда компонент получает фокусировку. |
| `blur`               | `event: Event`                        | Событие срабатывает когда компонент теряет фокусировку.   |
| `change`             | `event: Event`                        | Событие срабатывает когда значение компонента меняется.   |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TRadioProps['modelValue']`

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

### Поддержка клавиатуры

| Key     | Function                                    |
|---------|---------------------------------------------|
| `tab`   | Перемещает фокус на `<input type="radio">`. |
| `space` | Переключает `checked` состояние.            |

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
- `--checked`: Задаются для визуализации состояние `checked` элемента `<input type="radio">`.
- `--disabled`: Задаются для визуализации неактивного состояния компонента.
- `--valid`: Задаются для визуализации валидного состояния компонента.
- `--invalid`: Задаются для визуализации невалидного состояния компонента.

::: details Пример расстановки стилей
```scss
$radio: '.ar-radio';

#{$radio} {
  // .ar-radio--theme
  &--theme {
    // .ar-radio--theme .ar-radio__input
    #{$radio}__input {}

    // .ar-radio--theme .ar-radio__custom
    #{$radio}__custom {}
  }

  // .ar-radio--focused
  &--focused {
    // .ar-radio--focused.ar-radio--theme
    &#{$radio}--theme {
      // .ar-radio--focused.ar-radio--theme .ar-radio__label
      #{$radio}__label {}
    }
  }

  // .ar-radio--hovered
  &--hovered {
    // .ar-radio--hovered.ar-radio--theme
    &#{$radio}--theme {
      // .ar-radio--hovered.ar-radio--theme .ar-radio__label
      #{$radio}__label {}
      // .ar-radio-hover .ar-radio__custom
      #{$radio}__custom {}
    }
  }

  // .ar-radio--disabled
  &--disabled {
    #{$radio}__label {}
  }

  // .ar-radio--checked
  &--checked {
    // .ar-radio--checked.ar-radio--theme
    &#{$radio}--theme {
      // .ar-radio--checked.ar-radio--theme.ar-radio--small
      &#{$radio}--small {
        // .ar-radio--checked.ar-radio--theme.ar-radio--small .ar-radio__input
        #{$radio}__input {}
      }

      // .ar-radio--checked.ar-radio--theme.ar-radio--medium
      &#{$radio}--medium {
        // .ar-radio--checked.ar-radio--theme.ar-radio--medium .ar-radio__input
        #{$radio}__input {}
      }

      // .ar-radio--checked.ar-radio--theme.ar-radio--large
      &#{$radio}--large {
        // .ar-radio--checked.ar-radio--theme.ar-radio--large .ar-radio__input
        #{$radio}__input {}
      }

      // .ar-radio-checked .ar-radio__custom
      #{$radio}__custom {}
    }
  }

  // .ar-radio--right
  &--right {
    #{$radio}__label {}
  }

  // .ar-radio--small
  &--small {
    // .ar-radio--small .ar-radio__label
    #{$radio}__label {}

    // .ar-radio--small .ar-radio__input
    #{$radio}__input {}

    // .ar-radio--small .ar-radio__custom
    #{$radio}__custom {}
  }

  // .ar-radio--medium
  &--medium {
    // .ar-radio--medium .ar-radio__label
    #{$radio}__label {}

    // .ar-radio--medium .ar-radio__input
    #{$radio}__input {}

    // .ar-radio--medium .ar-radio__custom
    #{$radio}__custom {}
  }

  // .ar-radio--large
  &--large {
    // .ar-radio--large .ar-radio__label
    #{$radio}__label {}

    // .ar-radio--large .ar-radio__input
    #{$radio}__input {}

    // .ar-radio--large .ar-radio__custom
    #{$radio}__custom {}
  }

  // .ar-radio--valid
  &--valid {
    // .ar-radio--valid.ar-radio--theme
    &#{$radio}--theme {
      // .ar-radio--valid.ar-radio--theme .ar-radio__custom
      #{$radio}__custom {}

      // .ar-radio--valid.ar-radio--theme.ar-radio--checked
      &#{$radio}--checked {
        // .ar-radio--valid.ar-radio--theme.ar-radio--checked .ar-radio__input
        #{$radio}__input {}
        // .ar-radio--valid.ar-radio--theme.ar-radio--checked .ar-radio__custom
        #{$radio}__custom {}
      }
    }
  }

  // .ar-radio--invalid
  &--invalid {
    // .ar-radio--invalid.ar-radio--theme
    &#{$radio}--theme {
      // .ar-radio--invalid.ar-radio--theme .ar-radio__custom
      #{$radio}__custom {}

      // .ar-radio--invalid.ar-radio--theme.ar-radio--checked
      &#{$radio}--checked {
        // .ar-radio--invalid.ar-radio--theme.ar-radio--checked .ar-radio__input
        #{$radio}__input {}
        // .ar-radio--invalid.ar-radio--theme.ar-radio--checked .ar-radio__custom
        #{$radio}__custom {}
      }
    }
  }

  // .ar-radio--primary
  &--primary {
    // .ar-radio--primary.ar-radio--theme
    &#{$radio}--theme {
      // .ar-radio--primary.ar-radio--theme .ar-radio__custom
      #{$radio}__custom {}

      // .ar-radio--primary.ar-radio--theme.ar-radio--checked
      &#{$radio}--checked {
        // .ar-radio--primary.ar-radio--theme.ar-radio--checked .ar-radio__input
        #{$radio}__input {}
        // .ar-radio--primary.ar-radio--theme.ar-radio--checked .ar-radio__custom
        #{$radio}__custom {}
      }
    }
  }

  // .ar-radio__label
  &__label {}

  // .ar-radio__input
  &__input {
    // .ar-radio__input--hidden
    &--hidden {}
  }

  // .ar-radio__custom
  &__custom {}

  // .ar-radio__content
  &__content {}
}
```
:::
