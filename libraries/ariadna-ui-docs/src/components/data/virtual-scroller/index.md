---
layout: doc
---

# Timeline

VirtualScroller - представляет собой ориентированный на данные компонент для оптимизированного отображения больших 
объемов данных.

Вес <Badge type="info">~ 1.54 kB gzipped.</Badge>

## Описание

VirtualScroller - Vue-компонент предназначен для отображения больших списков данных с использованием техники 
виртуализации. Вместо отрисовки всех элементов списка одновременно, компонент отображает только те элементы, которые
видны в текущей области просмотра, что значительно улучшает производительность при работе с большими объемами данных.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import VirtualScroller from '@iwyfaf-vue-ui/ariadna-ui/VirtualScroller';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop          | Required | Type          | Default                                   | Description                                                                                                                                                  |
|---------------|----------|---------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `items`       | ✓        | `Array<Data>` | `[]`                                      | Данные виртуального скроллера.                                                                                                                               |
| `itemHeight`  | ✓        | `number`      | `undefined`                               | Высота каждого элемента списка (очень важно указать точную высоту). Передается в HTML структуру как CSS переменная. Нужен для правильно рассчета скроллинга. |
| `height`      | -        | `number`      | `EVirtualScrollerPropsDefault.HEIGHT`     | Высота компонента.                                                                                                                                           |
| `overscan`    | -        | `number`      | `EVirtualScrollerPropsDefault.OVERSCAN`   | Количество дополнительных элементов для рендера.                                                                                                             |
| `cssClass`    | -        | `string`      | `EVirtualScrollerPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.                                                                                                                        |

### `items`

- **Тип:** `Array<Data>`
- **Значение по умолчанию:** `[]`
- **Описание**: Данные виртуального скроллера.

::: details Пример
<demo src="./demos/demo.props.items.vue"></demo>
:::

### `itemHeight`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Высота каждого элемента списка (очень важно указать точную высоту). Передается в HTML структуру как 
CSS переменная. Нужен для правильно рассчета скроллинга.

::: details Пример
<demo src="./demos/demo.props.item-height.vue"></demo>
:::

### `height`

- **Тип:** `number`
- **Значение по умолчанию:** `EVirtualScrollerPropsDefault.HEIGHT`
- **Описание**: Высота компонента.

::: details Пример
<demo src="./demos/demo.props.height.vue"></demo>
:::

### `overscan`

- **Тип:** `number`
- **Значение по умолчанию:** `EVirtualScrollerPropsDefault.OVERSCAN`
- **Описание**: Количество дополнительных элементов для рендера.

::: details Пример
<demo src="./demos/demo.props.overscan.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EVirtualScrollerPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
  одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

## Slots

| Slot               | Description                                                                                                        |
|--------------------|--------------------------------------------------------------------------------------------------------------------|
| `default`          | Используется для кастомизации отображения каждого элементов списка.                                                |

### `default`

- **Описание:** Используется для кастомизации отображения каждого элементов списка.
- **Тип:** `(props: { item: TVirtualScrollerItem<Data> }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
::: 

### Emits

<!--@include: ../../../shared/emits/no-emits.md-->

## Exposes

| Prop                  | Type                             | Description                                                                         |
|-----------------------|----------------------------------|-------------------------------------------------------------------------------------|
| `scrollTo`            | `(index: number) => void`        | Используется для скролла на элемент по его индексу.                                 |
| `getVisibleIndexes`   | `() => TVirtualScrollerIndexes`  | Используется для получения начального и конечного индекса видимых элементов списка. |

### `scrollTo`

- **Описание:** Используется для скролла на элемент по его индексу.
- **Тип:** `(index: number) => void`

::: details Пример
<demo src="./demos/demo.expose.scroll-to.vue"></demo>
::: 

### `getVisibleIndexes`

- **Описание:** Используется для получения начального и конечного индекса видимых элементов списка.
- **Тип:** `() => TVirtualScrollerIndexes`

::: details Пример
<demo src="./demos/demo.expose.get-visible-indexes.vue"></demo>
::: 

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-support.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

::: details Пример расстановки стилей
```scss
$virtual-scroller: '.ar-virtual-scroller';

#{$virtual-scroller} {
  position: relative;
  width: 100%;
  overflow: hidden auto;
  will-change: scroll-position;

  // .ar-virtual-scroller__content
  &__content {
    position: absolute;
    width: 100%;
    will-change: transform;
    scroll-behavior: smooth;
  }

  // .ar-virtual-scroller__item
  &__item {
    height: var(--ar-virtual-scroller-item-height);
  }
}
```
:::
