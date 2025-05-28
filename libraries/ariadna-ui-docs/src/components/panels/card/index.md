---
layout: doc
---

# Card

Card - представляет собой гибкий контейнерный компонент.

Вес <Badge type="info">~ 1.27 kB gzipped.</Badge>

## Описание

Card — универсальный контейнерный Vue-компонент для отображения информации в виде карточки с поддержкой кастомизации
содержимого через слоты и управления состоянием сворачивания основного контента.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Card from '@iwyfaf-vue-ui/ariadna-ui/Card';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop           | Required | Type                   | Default                       | Description                               |
|----------------|----------|------------------------|-------------------------------|-------------------------------------------|
| `tag`          | -        | `TCardPropsTag`        | `ECardPropsDefault.TAG`       | Корневой HTML-тег компонента.             |
| `symbols`      | -        | `TCardPropsSymbols`    | `undefined`                   | Настройка символов для скрытия контента.  |
| `cssClass`     | -        | `string`               | `ECardPropsDefault.CSS_CLASS` | Переопределяет структуру CSS классов.     |
| `modifier`     | -        | `TSharedPropsModifier` | `undefined`                   | Модификатор базового CSS-класса.          |

### `tag`

- **Тип:** `TCardPropsTag`
- **Значение по умолчанию:** `ECardPropsDefault.TAG`
- **Описание**: Корневой HTML-тег компонента. 

::: details Пример
<demo src="./demos/demo.props.tag.vue"></demo>
:::

### `symbols`

- **Тип:** `TCardPropsSymbols`
- **Значение по умолчанию:** `undefined`
- **Описание**: Настройка символов для скрытия контента.

::: details Пример
<demo src="./demos/demo.props.symbols.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ECardPropsDefault.CSS_CLASS`
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

| Slot            | Description                                         |
|-----------------|-----------------------------------------------------|
| `picture`       | Используется для отображения изображения карточки.  |
| `contentHeader` | Используется для отображения заголовка контента.    |
| `content`       | Используется для отображения контента карточки.     |
| `contentFooter` | Используется для отображения подвала контента.      |
| `footer`        | Используется для отображения подвала карточки.      |

### `picture`

- **Описание:** Используется для отображения изображения карточки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.picture.vue"></demo>
:::

### `contentHeader`

- **Описание:** Используется для отображения заголовка контента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.content-header.vue"></demo>
:::

### `content`

- **Описание:** Используется для отображения контента карточки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.content.vue"></demo>
:::

### `contentFooter`

- **Описание:** Используется для отображения подвала контента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.content-footer.vue"></demo>
:::

### `footer`

- **Описание:** Используется для отображения подвала карточки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.footer.vue"></demo>
:::

## Accessibility

Любой допустимый атрибут передается корневому элементу, поэтому, если вам требуется использовать одну из ролей,
например `region`, вы можете использовать свойство `role`.

```vue
<Card tag="article"></Card>
```

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-elements.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

::: details Пример расстановки стилей
```scss
$card: '.ar-card';

#{$card} {
  // .ar-card--theme
  &--theme {}

  // .ar-card--primary
  &--primary {
    // .ar-card--primary.ar-card--theme
    &#{$card}--theme {}
  }

  // .ar-card__body
  &__body {}  
  
  // .ar-card__picture
  &__picture {}

  // .ar-card__content
  &__content {
    // .ar-card__content-header
    &-header {}

    // .ar-card__content-text
    &-text {
      // .ar-card__content-text--collapse
      &--collapse {
        // .ar-card__content-text--collapse-enter-active, .ar-card__content-text--collapse-leave-active
        &-enter-active,
        &-leave-active {}

        // .ar-card__content-text--collapse-enter-from, .ar-card__content-text--collapse-leave-to
        &-enter-from,
        &-leave-to {}
      }

      // .ar-card__content-text--collapsed
      &--collapsed {}
    }

    // .ar-card__content-footer
    &-footer {}
  }

  // .ar-card__content__footer
  &__footer {}
}
```
:::
