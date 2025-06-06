---
layout: doc
---

# Timeline

Timeline - представляет собой ориентированный на данные компонент для визуализации серии связанных событий.

Вес <Badge type="info">~ 1.15 kB gzipped.</Badge>

## Описание

Timeline - Vue-компонент предназначен для визуализации последовательности событий, расположенных по временной шкале.
Он отображает события с возможностью позиционирования слева или справа, поддерживает кастомизацию через слоты и
позволяет гибко управлять отображением каждого события.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Timeline from '@iwyfaf-vue-ui/ariadna-ui/Timeline';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                | Required | Type                   | Default                              | Description                                                                             |
|---------------------|----------|------------------------|--------------------------------------|-----------------------------------------------------------------------------------------|
| `events`            | ✓        | `Array<Data>`          | `[]`                                 | Массив событий.                                                                         |
| `keyProperty`       | -        | `string`               | `ETimelinePropsDefault.KEY_PROPERTY` | Свойство, используемое для ключа при итерации по событиям.                              |
| `cssClass`          | -        | `string`               | `ETimelinePropsDefault.CSS_CLASS`    | Переопределяет структуру CSS классов.                                                   |
| `modifier`          | -        | `TSharedPropsModifier` | `undefined`                          | Модификатор базового CSS-класса.                                                        |

### `events`

- **Тип:** `Array<Data>`
- **Значение по умолчанию:** `[]`
- **Описание**: Массив событий. Допускаются любые поля, но есть одно обязательное - `position`. Свойство `position` 
может быть лишь одним из 2ух значений - `left` или `right` - указывает с какой стороны будет отображаться конкретное 
событие. Также должно быть поле, которое будет использоваться в качестве ключа (указывается через prop 
[keyProperty](#keyproperty)). Если нужны доп. поля - нужно сделать новый тип, который будет расширять базовый 
`TTimelineEvent`.

::: details Пример
<demo src="./demos/demo.props.events.vue"></demo>
:::

### `keyProperty`

- **Тип:** `string`
- **Значение по умолчанию:** `ETimelinePropsDefault.KEY_PROPERTY`
- **Описание**: Свойство, используемое для ключа при итерации по событиям. Если указать не существующий ключ - будет 
ошибка.

::: details Пример
<demo src="./demos/demo.props.key-property.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ETimelinePropsDefault.CSS_CLASS`
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

| Slot        | Description                                                       |
|-------------|-------------------------------------------------------------------|
| `event`     | Слот для содержимого события на Timeline.                         |
| `separator` | Слот для отображения разделителя между событиями Timeline.        |
| `opposite`  | Слот для отображения дополнительного контента на другой стороне.  |

### `event`

- **Описание:** Слот для содержимого события на Timeline.
- **Тип:** `(props: { event: Data; index: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.event.vue"></demo>
::: 

### `separator`

- **Описание:** Слот для отображения разделителя между событиями Timeline.
- **Тип:** `(props: { event: Data; index: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.separator.vue"></demo>
::: 

### `opposite`

- **Описание:** Слот для отображения дополнительного контента на другой стороне.
- **Тип:** `(props: { event: Data; index: number }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.opposite.vue"></demo>
::: 

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-elements.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

::: details Пример расстановки стилей
```scss
$timeline: '.ar-timeline';

#{$timeline} {
  // .ar-timeline--theme
  &--theme {
    // .ar-timeline--theme .ar-timeline__event
    #{$timeline}__event {
      // .ar-timeline--theme .ar-timeline__event-separator
      &-separator {
        // .ar-timeline--theme .ar-timeline__event-separator::before
        &::before {}

        // .ar-timeline--theme .ar-timeline__event-separator::before
        &::after {}
      }
    }
  }

  // .ar-timeline--primary
  &--primary {
    // .ar-timeline--primary.ar-card--theme
    &#{$timeline}--theme {
      // .ar-timeline--primary.ar-timeline--theme .ar-timeline__event
      #{$timeline}__event {
        // .ar-timeline--primary.ar-timeline--theme .ar-timeline__event-separator
        &-separator {
          // .ar-timeline--primary.ar-timeline--theme .ar-timeline__event-separator::before
          &::before {}
        }
      }
    }
  }

  // .ar-timeline__event
  &__event {
    // .ar-timeline__event--last
    &--last {
      // .ar-timeline__event--last .ar-timeline__event-separator
      #{$timeline}__event-separator {}
    }

    // .ar-timeline__event-content
    &-content {
      // .ar-timeline__event-content--left
      &--left {}
    }

    // .ar-timeline__event-spacer, // .ar-timeline__event-opposite
    &-spacer,
    &-opposite {}

    // .ar-timeline__event-separator
    &-separator {
      // .ar-timeline__event-separator::before, .ar-timeline__event-separator::after
      &::before,
      &::after {}

      // .ar-timeline__event-separator::before
      &::before {}

      // .ar-timeline__event-separator::after
      &::after {}
    }

    // .ar-timeline__event-opposite
    &-opposite {
      // .ar-timeline__event-opposite--right
      &--right {}
    }
  }
}
```
:::
