---
layout: doc
---

# Tag

Tag - используется для категоризации контента.

Вес <Badge type="info">~ 0.75 kB gzipped.</Badge>

## Описание

Tag - Vue-компонент предназначен для категоризации и маркировки контента, визуального выделения элементов интерфейса.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Tag from '@iwyfaf-vue-ui/ariadna-ui/Tag';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop               | Required | Type                                 | Default                       | Description                                                                        |
|--------------------|----------|--------------------------------------|-------------------------------|------------------------------------------------------------------------------------|
| `tag`              | -        | `'div' \| 'span' \| 'button' \| 'a'` | `ETagPropsDefault.TAG`        | Определяет, какой html-элемент будет использоваться в качестве корневого элемента. |
| `size`             | -        | `TSharedPropsSize`                   | `ETagPropsDefault.SIZE`       | Предопределенные варианты размеров компонента.                                     |
| `rounded`          | -        | `boolean`                            | `false`                       | Теги отображаются с наибольшим радиусом закругления.                               |
| `cssClass`         | -        | `string`                             | `ETagPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.                                              |
| `modifier`         | -        | `TSharedPropsModifier`               | `undefined`                   | Модификатор базового CSS-класса.                                                   |

### `tag`

- **Тип:** `'div' | 'span' | 'button' | 'a'`
- **Значение по умолчанию:** `ETagPropsDefault.TAG`
- **Описание**: Определяет, какой html-элемент будет использоваться в качестве корневого элемента.

::: details Пример
<demo src="./demos/demo.props.tag.vue"></demo>
:::

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `ETagPropsDefault.SIZE`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и `--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `rounded`

- **Тип:** `boolean`
- **Значение по умолчанию:** `medium`
- **Описание**: Значки отображаются с наибольшим радиусом закругления. Добавляет модификатор `--rounded`.

::: details Пример
<demo src="./demos/demo.props.rounded.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ETagPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

### `modifier`

- **Тип:** `TSharedPropsModifier`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные вариации значка.

::: details Пример
<demo src="./demos/demo.props.modifier.vue"></demo>
:::


## Slots

| Slot      | Description                                                    |
|-----------|----------------------------------------------------------------|
| `default` | Используется для отображения основного содержимого компонента. |
| `icon`    | Используется для отображения иконки компонента.                |

### `default`

- **Описание:** Используется для отображения основного содержимого компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

### `icon`

- **Описание:** Используется для отображения иконки компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.icon.vue"></demo>
:::

## Emits

<!--@include: ../../../shared/emits/no-roles.md-->

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-elements.md-->

<!--@include: ../../../shared/accessibility/no-keyboard-support.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Размер

- `--small`: Задаются размеры для маленького значка.
- `--medium`: Задаются размеры для среднего значка.
- `--large`: Задаются размеры для большого значка.

### Модификация

- `--primary`: Задаются стили модификации значка (например `primary` или `success`).

### Остальные

- `--rounded`: Задаются стили закругленного значка.

::: details Пример расстановки стилей
```scss
$tag: '.ar-tag';

#{$tag} {
  // button.ar-tag
  @at-root button#{&} {}

  // .ar-tag--theme
  &--theme {}

  // .ar-tag--small
  &--small {}

  // .ar-tag--medium
  &--medium {}

  // .ar-tag--large
  &--large {}

  // .ar-tag--primary
  &--primary {
    // .ar-tag--primary.ar-tag--theme
    &#{$tag}--theme {}
  }

  // .ar-tag--secondary
  &--secondary {
    // .ar-tag--secondary.ar-tag--theme
    &#{$tag}--theme {}
  }

  // .ar-tag--success
  &--success {
    // .ar-tag--success.ar-tag--theme
    &#{$tag}--theme {}
  }

  // .ar-tag--warning
  &--warning {
    // .ar-tag--warning.ar-tag--theme
    &#{$tag}--theme {}
  }

  // .ar-tag--danger
  &--danger {
    // .ar-tag--danger.ar-tag--theme
    &#{$tag}--theme {}
  }

  // .ar-tag--rounded
  &--rounded {}
}
```
