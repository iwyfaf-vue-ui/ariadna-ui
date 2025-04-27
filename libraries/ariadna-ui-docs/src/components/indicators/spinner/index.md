---
layout: doc
---

# Spinner

Spinner - это UI компонент, который указывает на текущий процесс, например такой, как получение данных с сервера или
выполнение сложных вычислений.

Вес <Badge type="info">~ 0.60 kB gzipped.</Badge>

## Описание

Vue-компонент Spinner реализует индикатор загрузки, который отображает анимированный элемент для обозначения текущего 
процесса, например, получения данных или выполнения вычислений.

Компонент поддерживает различные размеры, позволяет задавать модификаторы и переопределять структуру CSS-классом, что
обеспечивает гибкую стилизацию через BEM.

В компоненте предусмотрен слот для вывода дополнительного контента.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Spinner from '@iwyfaf-vue-ui/ariadna-ui/Spinner';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop        | Required | Type                                                               | Default      | Description                                      |
|-------------| -------- |--------------------------------------------------------------------|--------------|--------------------------------------------------|
| `size`      | -        | `'small' \| 'medium' \| 'large'`                                   | `medium`     | Предопределенные варианты размеров для спиннера. |
| `cssClass`  | -        | `string`                                                           | `ar-spinner` | Переопределяет структуру CSS классов.            |
| `modifier`  | -        | `'primary' \| 'secondary' \| 'quaternary' \| 'tertiary' \| string` | `undefined`  | Модификатор базового CSS-класса.                 |

### `size`

- **Тип:** `'small' | 'medium' | 'large'`
- **Значение по умолчанию:** `medium`
- **Описание**: Предопределенные варианты размеров для спиннера. Добавляет модификаторы `--small`, `--medium` и
`--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ar-spinner`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

### `modifier`

- **Тип:** `'primary' | 'secondary' | 'quaternary' | 'tertiary' | string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные вариации значка.

::: details Пример
<demo src="./demos/demo.props.modifier.vue"></demo>
:::

## Slots

| Slot       | Description                                                |
|------------|------------------------------------------------------------|
| `default`  | Используется для вывода дополнительного контента спиннера. |

### `default`

- **Описание:** Используется для вывода содержимого значка.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

## Accessibility

Spinner использует `progressbar` role. Любой атрибут передается корневому элементу, поэтому при необходимости вы можете
самостоятельно добавить `aria`, `roles` и другие атрибуты.

### ARIA-атрибуты

Значение для описания компонента может быть определено с помощью `aria-label` или же вы можете указать текст в 
slot [default](#default).

::: details Пример
<demo src="./demos/demo.accessibility.aria-label.vue"></demo>
:::

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-elements.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Размер

- `--small`: Задаются размеры для маленького спиннера.
- `--medium`: Задаются размеры для среднего спиннера.
- `--large`: Задаются размеры для большого спиннера.

### Модификация

- `--primary`: Задаются стили модификации спиннера (например `primary` или `success`).

::: details Пример расстановки стилей
```scss
$spinner: '.ar-spinner';

#{$spinner} {
  // .ar-spinner__loader
  &__loader {}

  // .ar-spinner--theme
  &--theme {
    // .ar-spinner--theme .ar-spinner__loader
    #{$spinner}__loader {}
  }

  // .ar-spinner--small
  &--small {}

  // .ar-spinner--medium
  &--medium {}

  // .ar-spinner--large
  &--large {}

  // .ar-spinner--primary
  &--primary {
    // .ar-spinner--primary .ar-spinner__loader
    #{$spinner}__loader {}
  }

  // .ar-spinner--secondary
  &--secondary {
    // .ar-spinner--secondary .ar-spinner__loader
    #{$spinner}__loader {}
  }

  // .ar-spinner--success
  &--success {
    // .ar-spinner--success .ar-spinner__loader
    #{$spinner}__loader {}
  }

  // .ar-spinner--warning
  &--warning {
    // .ar-spinner--warning .ar-spinner__loader
    #{$spinner}__loader {}
  }

  // .ar-spinner--danger
  &--danger {
    // .ar-spinner--danger .ar-spinner__loader
    #{$spinner}__loader {}
  }
}
```
:::