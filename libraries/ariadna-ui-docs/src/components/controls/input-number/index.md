---
layout: doc
---

# InputNumber

InputText - представляет собой компонент HTML элемента `<input>` в текстовой форме предназначенный для обеспечения 
числового ввода.

Вес <Badge type="info">~ 6.02 kB gzipped.</Badge>

## Описание

InputText - Vue-компонент предназначен для ввода и управления числовыми значениями с возможностью 
инкрементации/декрементации, форматирования, валидации и отображения ошибок. Используется в формах и интерфейсах, где
требуется числовой ввод с дополнительными возможностями управления и кастомизации.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import InputNumber from '@iwyfaf-vue-ui/ariadna-ui/InputNumber';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props


| Prop           | Required | Type                       | Default                                                               | Description                                                                                  |
|----------------|----------|----------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `modelValue`   | ✓        | `Nullable<number>`         | `0`                                                                   | Значение компонента.                                                                         |
| `label`        | -        | `string`                   | `undefined`                                                           | Текст элемента `label`.                                                                      |
| `id`           | -        | `string`                   | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                           |
| `placeholder`  | -        | `string`                   | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                  |
| `name`         | -        | `string`                   | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.                                         |
| `autocomplete` | -        | `boolean`                  | `false`                                                               | Значение нативного атрибута `autocomplete` элемента `input`.                                 |
| `disabled`     | -        | `boolean`                  | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                     |
| `readonly`     | -        | `boolean`                  | `false`                                                               | Значение нативного атрибута `readonly` элемента `input`.                                     |
| `controls`     | -        | `boolean`                  | `false`                                                               | Состояние отображения элементов для управления операциями увеличения и уменьшения значения.  |
| `size`         | -        | `TSharedPropsSize`         | `EInputNumberPropsDefault.SIZE`                                       | Предопределенные варианты размеров для элемента `input`.                                     |
| `min`          | -        | `number`                   | `undefined`                                                           | Минимальное значение `input`.                                                                |
| `max`          | -        | `number`                   | `undefined`                                                           | Максимальное значение `input`.                                                               |
| `step`         | -        | `Numberish`                | `EInputNumberPropsDefault.STEP`                                       | Шаговый коэффициент для увеличения или уменьшения значения. Может быть целым или десятичным. |
| `empty`        | -        | `string \| null`           | `null`                                                                | Значение элемента `input` по умолчанию, если значение отсутствует.                           |
| `prefix`       | -        | `string`                   | `undefined`                                                           | Текст, который будет показан до значения.                                                    |
| `suffix`       | -        | `string`                   | `undefined`                                                           | Текст, который будет показан после значения.                                                 |
| `locale`       | -        | `TBcpLanguageTags \| null` | `undefined`                                                           | Локаль, которая будет использоваться при форматировании значения `input`.                    |
| `masked`       | -        | `boolean`                  | `false`                                                               | Значение компонента будет замаскировано (может содержать разделительные символы).            |
| `valid`        | -        | `boolean`                  | `false`                                                               | Состояние компонента `valid`.                                                                |
| `invalid`      | -        | `boolean`                  | `false`                                                               | Состояние компонента `invalid`.                                                              |
| `errors`       | -        | `Array<string>`            | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                |
| `cssClass`     | -        | `string`                   | `EInputNumberPropsDefault.CSS_CLASS`                                  | Переопределяет структуру CSS классов.                                                        |
| `modifier`     | -        | `TSharedPropsModifier`     | `undefined`                                                           | Модификатор базового CSS-класса.                                                             |

### `modelValue`

- **Тип:** `Nullable<number>`
- **Значение по умолчанию:** `0`
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

### `controls`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние отображения элементов для управления операциями увеличения и уменьшения значения.

::: details Пример
<demo src="./demos/demo.props.controls.vue"></demo>
:::

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `EInputNumberPropsDefault.SIZE` 
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `min`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Минимальное значение `input`.

::: details Пример
<demo src="./demos/demo.props.min.vue"></demo>
:::

### `max`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Максимальное значение `input`.

::: details Пример
<demo src="./demos/demo.props.max.vue"></demo>
:::

### `step`

- **Тип:** `Numberish`
- **Значение по умолчанию:** `EInputNumberPropsDefault.STEP`
- **Описание**: Шаговый коэффициент для увеличения или уменьшения значения. Может быть целым или десятичным.

::: details Пример
<demo src="./demos/demo.props.step.vue"></demo>
:::

### `empty`

- **Тип:** `string | null`
- **Значение по умолчанию:** `null`
- **Описание**: Значение элемента `input` по умолчанию, если значение отсутствует.

::: details Пример
<demo src="./demos/demo.props.empty.vue"></demo>
:::

### `prefix`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Текст, который будет показан до значения.

::: details Пример
<demo src="./demos/demo.props.prefix.vue"></demo>
:::

### `suffix`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Текст, который будет показан после значения.

::: details Пример
<demo src="./demos/demo.props.suffix.vue"></demo>
:::

### `locale`

- **Тип:** `TBcpLanguageTags | null`
- **Значение по умолчанию:** `undefined`
- **Описание**: Локаль, которая будет использоваться при форматировании значения `input`.

::: details Пример
<demo src="./demos/demo.props.locale.vue"></demo>
:::

### `masked`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение компонента будет замаскировано (может содержать разделительные символы).

::: details Пример
<demo src="./demos/demo.props.masked.vue"></demo>
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
- **Значение по умолчанию:** `EInputTextPropsDefault.CSS_CLASS`
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

| Slot               | Description                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
| `placeholder`      | Используется для кастомизации `placeholder`, например для создания анимации.                                        |
| `decrementControl` | Используется для кастомизации контрола управления уменьшением значения.                                             |
| `incrementControl` | Используется для кастомизации контрола управления увеличением значения.                                             |
| `addonBefore`      | Содержимое, отображаемое перед полем ввода.                                                                         |
| `addonAfter`       | Содержимое, отображаемое после поля ввода.                                                                          |
| `errors`           | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.  |

### `placeholder`

- **Описание:** Используется для отображения кастомного `placeholder`. Если указан, то
  [`props.placeholder`](#placeholder) будет проигнорирован.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.placeholder.vue"></demo>
:::

### `decrementControl`

- **Описание:** Используется для кастомизации контрола управления уменьшением значения.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.decrement-control.vue"></demo>
:::

### `incrementControl`

- **Описание:** Используется для кастомизации контрола управления увеличением значения.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.increment-control.vue"></demo>
:::

### `addonBefore`

- **Описание:** Содержимое, отображаемое перед полем ввода.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.addon-before.vue"></demo>
:::

### `addonAfter`

- **Описание:** Содержимое, отображаемое после поля ввода.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.addon-after.vue"></demo>
:::

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

## Emits

| Event                | Payload                                 | Description                                                                                     |
|----------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------|
| `update:model-value` | `payload: Numberish \| undefined`       | Событие срабатывает при обновлении значения `modelValue`.                                       |
| `focus`              | `event: Event`                          | Событие срабатывает когда компонент получает фокусировку.                                       |
| `blur`               | `event: Event`                          | Событие срабатывает когда компонент теряет фокусировку.                                         |
| `change`             | `event: Event`                          | Событие срабатывает когда значение компонента поменялось.                                       |
| `step`               | `payload: TInputNumberEmitStepPayload`  | Событие срабатывает при изменении значения компонента с помощью пошаговых элементов управления. |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: Numberish | null`

::: details Пример
<demo src="./demos/demo.emits.update-model-value.vue"></demo>
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

### change

- **Описание:** Событие срабатывает когда значение компонента поменялось.
- **Тип:** `event: Event`

::: details Пример
<demo src="./demos/demo.emits.change.vue"></demo>
::: 

### step

- **Описание:** Событие срабатывает при изменении значения компонента с помощью пошаговых элементов управления.
- **Тип:** `payload: TInputNumberEmitStepPayload`

::: details Пример
<demo src="./demos/demo.emits.step.vue"></demo>
::: 


## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

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
$input-number: '.ar-input-number';

#{$input-number} {
  // .ar-input-number--theme
  &--theme {
    // .ar-input-number--theme .ar-input-number__input
    #{$input-number}__input {}

    // .ar-input-number--theme .ar-input-number__addon-before, .ar-input-number--theme .ar-input-number__addon-after
    #{$input-number}__addon-before,
    #{$input-number}__addon-after {}
  }

  // .ar-input-number--focused
  &--focused {
    // .ar-input-number--focused.ar-input-number--theme
    &#{$input-number}--theme {
      // .ar-input-number--focused.ar-input-number--theme .ar-input-number__input
      #{$input-number}__input {}
    }
  }

  // .ar-input-number--hovered
  &--hovered {
    // .ar-input-number--hover.ar-input-number--theme
    &#{$input-number}--theme {
      // .ar-input-number--hover.ar-input-number--theme .ar-input-number__input
      #{$input-number}__input {}
    }
  }

  // .ar-input-number--disabled
  &--disabled {}

  // .ar-input-number--readonly
  &--readonly {
    #{$input-number}__input {}
  }

  // .ar-input-number--filled
  &--filled {
    // .ar-input-number--filled .ar-input-number__placeholder
    #{$input-number}__placeholder {}
  }

  // .ar-input-number--valid
  &--valid {
    // .ar-input-number--valid.ar-input-number--theme
    &#{$input-number}--theme {
      // .ar-input-number--valid.ar-input-number--theme .ar-input-number__input
      #{$input-number}__input {
        // .ar-input-number--valid.ar-input-number--theme .ar-input-number__input:hover
        &:hover {}

        // .ar-input-number--valid.ar-input-number--theme .ar-input-number__input:focus
        &:focus {}
      }
    }
  }

  // .ar-input-number--invalid
  &--invalid {
    // .ar-input-number--invalid.ar-input-number--theme
    &#{$input-number}--theme {
      // .ar-input-number--invalid.ar-input-number--theme .ar-input-number__input
      #{$input-number}__input {
        // .ar-input-number--invalid.ar-input-number--theme .ar-input-number__input:hover
        &:hover {}

        // .ar-input-number--invalid.ar-input-number--theme .ar-input-number__input:focus
        &:focus {}
      }
    }
  }

  // .ar-input-number--small
  &--small {
    #{$input-number}__input {}
  }

  // .ar-input-number--medium
  &--medium {
    #{$input-number}__input {}
  }

  // .ar-input-number--large
  &--large {
    #{$input-number}__input {}
  }

  // .ar-input-number--primary
  &--primary {
    // .ar-input-number--primary.ar-input-number__input
    #{$input-number}__input {}

    // .ar-input-number--primary.ar-input-number--hovered
    &#{$input-number}--hovered {
      // .ar-input-number--primary.ar-input-number--hovered .ar-input-number__input
      #{$input-number}__input {}
    }
  }

  // .ar-input-number__label
  &__label {}

  // .ar-input-number__addon-wrapper
  &__wrapper {}

  // .ar-input-number__decrement-control
  &__decrement-control {}

  // .ar-input-number__increment-control
  &__increment-control {}

  // .ar-input-number__addon-before
  &__addon-before {
    // .ar-input-number__addon-before + .ar-input-number__input
    + #{$input-number}__input {}
  }

  // .ar-input-number__addon-after
  &__addon-after {}

  // .ar-input-number__input
  &__input {
    // .ar-input-number__input:has(+ .ar-input-number__addon-after)
    &:has(+ #{$input-number}__addon-after) {}
  }

  // .ar-input-number__placeholder
  &__placeholder {}

  // .ar-input-number__errors
  &__errors {
    // .ar-input-number__errors-expand-enter-active, .ar-input-number__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-input-number__errors--expand-enter-from, .ar-input-number__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
