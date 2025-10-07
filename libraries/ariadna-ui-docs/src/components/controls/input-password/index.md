---
layout: doc
---

# InputPassword

InputPassword - представляет собой компонент HTML элемента `<input>` в текстовой форме предназначенный для обеспечения
числового ввода.

Вес <Badge type="info">~ 2.92 kB gzipped.</Badge>

## Описание

InputPassword - Vue-компонент предназначен для ввода пароля с дополнительными функциями, такими как переключение 
видимости пароля, отображение индикатора сложности пароля и валидация введенного пароля по заданным правилам.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import InputPassword from '@iwyfaf-vue-ui/ariadna-ui/InputPassword';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                 | Required | Type                        | Default                                                               | Description                                                                                       |
|----------------------|----------|-----------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `modelValue`         | ✓        | `Nullable<string>`          | `null`                                                                | Значение компонента.                                                                              |
| `label`              | -        | `string`                    | `undefined`                                                           | Текст элемента `label`.                                                                           |
| `id`                 | -        | `string`                    | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                |
| `placeholder`        | -        | `string`                    | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                       |
| `name`               | -        | `string`                    | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.                                              |
| `autocomplete`       | -        | `boolean`                   | `false`                                                               | Значение нативного атрибута `autocomplete` элемента `input`.                                      |
| `disabled`           | -        | `boolean`                   | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                          |
| `readonly`           | -        | `boolean`                   | `false`                                                               | Значение нативного атрибута `readonly` элемента `input`.                                          |
| `size`               | -        | `TSharedPropsSize`          | `EInputPasswordPropsDefault.SIZE`                                     | Предопределенные варианты размеров для элемента `input`.                                          |
| `showPassword`       | -        | `boolean`                   | `false`                                                               | Отображать пароль в открытом виде по умолчанию (вместо маскирования).                             |
| `showPasswordToggle` | -        | `boolean`                   | `false`                                                               | Показывать/скрывать кнопку переключения видимости пароля.                                         |
| `rules`              | -        | `Array<TInputPasswordRule>` | `[]`                                                                  | Список правил для оценки/проверки пароля (например, проверка длины, наличие спецсимволов и т.п.). |
| `valid`              | -        | `boolean`                   | `false`                                                               | Состояние компонента `valid`.                                                                     |
| `invalid`            | -        | `boolean`                   | `false`                                                               | Состояние компонента `invalid`.                                                                   |
| `errors`             | -        | `Array<string>`             | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                     |
| `cssClass`           | -        | `string`                    | `EInputPasswordPropsDefault.CSS_CLASS`                                | Переопределяет структуру CSS классов.                                                             |
| `modifier`           | -        | `TSharedPropsModifier`      | `undefined`                                                           | Модификатор базового CSS-класса.                                                                  |

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

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `EInputNumberPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `showPassword`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Отображать пароль в открытом виде по умолчанию (вместо маскирования).

::: details Пример
<demo src="./demos/demo.props.show-password.vue"></demo>
:::

### `showPasswordToggle`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Показывать/скрывать кнопку переключения видимости пароля.

::: details Пример
<demo src="./demos/demo.props.show-password-toggle.vue"></demo>
:::

### `rules`

- **Тип:** `Array<TInputPasswordRule>`
- **Значение по умолчанию:** `[]`
- **Описание**: Список правил для оценки/проверки пароля (например, проверка длины, наличие спецсимволов и т.п.).

::: details Пример
<demo src="./demos/demo.props.rules.vue"></demo>
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

| Slot               | Description                                                                                                                                          |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `placeholder`      | Используется для кастомизации `placeholder`, например для создания анимации.                                                                         |
| `toggleButton`     | Используется для кастомизации кнопки переключения видимости пароля.                                                                                  |
| `meter`            | Используется для кастомизации отображения «сложности пароля». Например, выводить индикатор прогресса или шкалу.                                      |
| `meterLabel`       | Используется для кастомизации только текстовой метки «сложности пароля».                                                                             |
| `conditionsNotMet` | Используется для кастомизации невыполненных правил (например, если в пароле нет цифры, недостаточная длина и т.п.).                                  |
| `errors`           | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.                                   |

### `placeholder`

- **Описание:** Используется для отображения кастомного `placeholder`. Если указан, то
  [`props.placeholder`](#placeholder) будет проигнорирован.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.placeholder.vue"></demo>
:::

### `toggleButton`

- **Описание:** Используется для кастомизации кнопки переключения видимости пароля.
- **Тип:** `(props: { visible: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.toggle-button.vue"></demo>
:::

### `meter`

- **Описание:** Используется для кастомизации отображения «сложности пароля». Например, выводить индикатор прогресса или шкалу.
- **Тип:** `(props: { percentage: number; cssClass: string }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.meter.vue"></demo>
:::

### `meterLabel`

- **Описание:** Используется для кастомизации только текстовой метки «сложности пароля».
- **Тип:** `(props: { percentage: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.meter-label.vue"></demo>
:::

### `conditionsNotMet`

- **Описание:** Используется для кастомизации только текстовой метки «сложности пароля».
- **Тип:** `(props: {
    percentage: number;
    conditionsNotComplete: Array<TInputPasswordRuleItem>;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.conditions-not-met.vue"></demo>
:::

### `errors`

- **Описание:** Используется для отображения ошибок компонента.
- **Тип:** `(props: { errors: Array<string> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.errors.vue"></demo>
::: 

### Emits

| Event                | Payload                                       | Description                                                                                     |
|----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------|
| `update:model-value` | `payload: TInputPasswordProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`.                                       |
| `focus`              | `event: Event`                                | Событие срабатывает когда компонент получает фокусировку.                                       |
| `blur`               | `event: Event`                                | Событие срабатывает когда компонент теряет фокусировку.                                         |
| `change`             | `event: Event`                                | Событие срабатывает когда значение компонента поменялось.                                       |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `TInputPasswordProps['modelValue']`

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

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

### Поддержка клавиатуры

| Key       | Function                                               |
|-----------|--------------------------------------------------------|
| `escape`  | Скрывает панель «сложности пароля», если она открыта.  |

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
$input-password: '.ar-input-password';

#{$input-password} {
  // .ar-input-password--theme
  &--theme {
    // .ar-input-password--theme .ar-input-password__input
    #{$input-password}__input {
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {}
    }

    // .ar-input-password--theme .ar-input-password__progress-bar
    #{$input-password}__progress-bar {}

    // .ar-input-password--theme .ar-input-password__meter-panel
    #{$input-password}__meter-panel {}
  }

  // .ar-input-password--focused
  &--focused {
    // .ar-input-password--focused.ar-input-password--theme
    &#{$input-password}--theme {
      // .ar-input-password--focused.ar-input-password--theme .ar-input-password__input
      #{$input-password}__input {}
    }
  }

  // .ar-input-password--hovered
  &--hovered {
    // .ar-input-password--hover.ar-input-password--theme
    &#{$input-password}--theme {
      // .ar-input-password--hover.ar-input-password--theme .ar-input-password__input
      #{$input-password}__input {}
    }
  }

  // .ar-input-password--disabled
  &--disabled {}

  // .ar-input-password--readonly
  &--readonly {
    #{$input-password}__input {}
  }

  // .ar-input-password--filled
  &--filled {
    // .ar-input-password--filled .ar-input-password__placeholder
    #{$input-password}__placeholder {}
  }

  // .ar-input-password--valid
  &--valid {
    // .ar-input-password--valid.ar-input-password--theme
    &#{$input-password}--theme {
      // .ar-input-password--valid.ar-input-password--theme .ar-input-password__input
      #{$input-password}__input {
        // .ar-input-password--valid.ar-input-password--theme .ar-input-password__input:hover
        &:hover {}

        // .ar-input-password--valid.ar-input-password--theme .ar-input-password__input:focus
        &:focus {}
      }
    }
  }

  // .ar-input-password--invalid
  &--invalid {
    // .ar-input-password--invalid.ar-input-password--theme
    &#{$input-password}--theme {
      // .ar-input-password--invalid.ar-input-password--theme .ar-input-password__input
      #{$input-password}__input {}
    }
  }

  // .ar-input-password--small
  &--small {
    #{$input-password}__input {}
  }

  // .ar-input-password--medium
  &--medium {
    #{$input-password}__input {}
  }

  // .ar-input-password--large
  &--large {
    #{$input-password}__input {}
  }

  // .ar-input-password--primary
  &--primary {
    // .ar-input-password--primary.ar-input-password__input
    #{$input-password}__input {}

    // .ar-input-password--primary.ar-input-password--hovered
    &#{$input-password}--hovered {
      // .ar-input-password--primary.ar-input-password--hovered .ar-input-password__input
      #{$input-password}__input {}
    }
  }

  // .ar-input-password:has(.ar-input-password__toggle-button) .ar-input-password__input
  &:has(#{$input-password}__toggle-button) #{$input-password}__input {}

  // .ar-input-password__label
  &__label {}

  // .ar-input-password__input
  &__input {}

  // .ar-input-password__toggle-button
  &__toggle-button {}

  // .ar-input-password__progress-bar
  &__progress-bar {
    // .ar-input-password__progress-bar-item
    &-item {}
  }

  // .ar-input-password__meter-panel
  &__meter-panel {
    // .ar-input-password__meter-panel--visible
    &--visible {}

    // .ar-input-password__meter-panel--bottom
    &--bottom {}

    // .ar-input-password__meter-panel--top
    &--top {}
  }

  // .ar-input-password__placeholder
  &__placeholder {}

  // .ar-input-password__errors
  &__errors {
    // .ar-input-password__errors-expand-enter-active, .ar-input-password__errors--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-input-password__errors--expand-enter-from, .ar-input-password__errors---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }
}
```
:::
