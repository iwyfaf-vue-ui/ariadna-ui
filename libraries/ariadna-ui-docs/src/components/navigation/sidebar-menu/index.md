---
layout: doc
---

# SidebarMenu

SidebarMenu - это UI компонент, который отображает список навигационных элементов в вертикальной ориентации.

Вес <Badge type="info">~ 4.80 kB gzipped.</Badge>

## Описание

Vue-компонент SidebarMenu реализует вертикальное боковое меню с поддержкой вложенных пунктов, пользовательских иконок, 
бейджей и слотов для footer, header и иконки раскрытия меню.

Компонент принимает массив элементов меню через пропсы, отображает их в виде списка с возможностью прокрутки, определяет
активный пункт на основе текущего маршрута и поддерживает раскрытие подменю. Для каждого пункта меню используется 
отдельный компонент, обеспечивающий отображение иконок, бейджей и действий.

Компонент поддерживает управление состоянием `collapsed`, а также предоставляет стилизованные классы для интеграции в 
различные темы оформления.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import SidebarMenu from '@iwyfaf-vue-ui/ariadna-ui/SidebarMenu';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                | Required | Type                                                               | Default            | Description                                                                                           |
|---------------------| -------- |--------------------------------------------------------------------|--------------------|-------------------------------------------------------------------------------------------------------|
| `data`              | ✓        | `Array<TSidebarMenuItem>`                                          | `undefined`        | Массив элементов SidebarMenu.                                                                         |
| `collapsed`         | -        | `boolean`                                                          | `false`            | Состояние свернутости меню (`collapsed`).                                                             |
| `rememberExpanded`  | -        | `boolean`                                                          | `false`            | Указывает SidebarMenu, что ему нужно запомнить состояние раскрытия для каждого пункта меню отдельно.  |
| `cssClass`          | -        | `string`                                                           | `ar-sidebar-menu`  | Переопределяет структуру CSS классов.                                                                 |

### `data`

- **Тип:** `Array<TSidebarMenuItem>`
- **Значение по умолчанию:** `undefined`
- **Описание**: Массив элементов SidebarMenu.

::: details Пример
<demo src="./demos/demo.props.data.vue"></demo>
:::

### `collapsed`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние свернутости меню (`collapsed`). Добавляет модификатор `--collapsed`.

::: details Пример
<demo src="./demos/demo.props.collapsed.vue"></demo>
:::

### `rememberExpanded`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Указывает SidebarMenu, что ему нужно запомнить состояние раскрытия для каждого пункта меню отдельно.
По умолчанию, SidebarMenu сам скрывает неактивные пункты. Это полезно, если у вас большая структура и вы не хотите
самостоятельно закрывать неактивные пункты. Но если вам нужно сохранять уже открытые пункты после перехода на другие 
маршруты, укажите props `rememberExpanded` значение `true`.

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ar-sidebar-menu`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

## Slots

| Slot           | Description                 |
|----------------|-----------------------------|
| `header`       | Header элемент SidebarMenu. |
| `footer`       | Footer элемент SidebarMenu. |
| `dropdownIcon` | Иконка dropdown элемента.   |

### `header`

- **Описание:** Используется для вывода шапки SidebarMenu.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.header.vue"></demo>
:::

### `Footer`

- **Описание:** Используется для вывода шапки SidebarMenu.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.footer.vue"></demo>
:::

### `dropdownIcon`

- **Описание:** Используется для кастомизации вывода иконки dropdown элемента.
- **Тип:** `(props: { isOpen: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.dropdown-icon.vue"></demo>
:::

## Emits

| Emit                | Payload              | Description                                            |
|---------------------|----------------------|--------------------------------------------------------|
| `update:collapsed`  | `collapsed: boolean` | Вызывается, когда состояние `collapsed` было изменено. |  

### `update:collapsed`

- **Описание:** Событие вызывается, когда состояние `collapsed` было изменено.
- **Payload:** `collapsed: boolean`

## Accessibility

По умолчанию компонент SidebarMenu не содержит никаких ролей и атрибутов, любой атрибут передается корневому элементу,
поэтому при необходимости вы можете самостоятельно добавить необходимые вам атрибуты.

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-support.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Остальные

- `--collapsed`: Задаются стили для свёрнутого состояния меню.

::: details Пример расстановки стилей
```scss
$sidebar-menu: '.ar-sidebar-menu';

#{$sidebar-menu} {
  // .ar-sidebar-menu--collapsed
  &--collapsed {}

  // .ar-sidebar-menu--theme
  &--theme {
    & #{$sidebar-menu}__header,
    & #{$sidebar-menu}__footer {}

    // .ar-sidebar-menu--theme .ar-sidebar-menu__wrapper
    & #{$sidebar-menu}__wrapper {}

    // .ar-sidebar-menu--theme .ar-sidebar-menu__item
    & #{$sidebar-menu}__item {}

    // .ar-sidebar-menu--theme .ar-sidebar-menu__link
    & #{$sidebar-menu}__link {}

    // .ar-sidebar-menu--theme .ar-sidebar-menu__action
    & #{$sidebar-menu}__action {}

    // .ar-sidebar-menu--theme .ar-sidebar-menu__scroll
    & #{$sidebar-menu}__scroll {}
  }

  // .ar-sidebar-menu__wrapper
  &__wrapper {}

  // .ar-sidebar-menu__header
  &__header {}

  // .ar-sidebar-menu__items
  &__items {}

  // .ar-sidebar-menu__items-sub
  &__items-sub {}

  // .ar-sidebar-menu__footer
  &__footer {}

  // .ar-sidebar-menu__scroll
  &__scroll {

    // .ar-sidebar-menu__scroll--draggable
    &--draggable {}

    // .ar-sidebar-menu__scroll-area
    &-area {}

    // .ar-sidebar-menu__scroll-bar
    &-bar {}

    // .ar-sidebar-menu__scroll-bar
    &-bar {}    
    
    // .ar-sidebar-menu__scroll-thumb
    &-thumb {}

    // .ar-sidebar-menu__scroll--animation-enter-active, .ar-sidebar-menu__scroll--animation-leave-active
    &-animation-enter-active,
    &-animation-leave-active {}

    // .ar-sidebar-menu__scroll---animation-enter-from, .ar-sidebar-menu__scroll---animation-leave-to
    &-animation-enter-from,
    &-animation-leave-to {}
  }

  // .ar-sidebar-menu__item
  &__item {
    // .ar-sidebar-menu__item--hover
    &--hover {}

    // .ar-sidebar-menu__item--hover
    &--hover {}

    // .ar-sidebar-menu__item--open
    &--open {}

    // .ar-sidebar-menu__item--disabled
    &--disabled {}

    // .ar-sidebar-menu__item--level-1
    &--level-1 {}

    // .ar-sidebar-menu__item-wrapper
    &-wrapper {}

    // .ar-sidebar-menu__item-dropdown
    &-dropdown {
      // .ar-sidebar-menu__item-dropdown--open
      &--open {}
    }

    // .ar-sidebar-menu__item-title
    &-title {}

    // .ar-sidebar-menu__item-expand
    &-expand {}

    // .ar-sidebar-menu__item-expand-enter-active, .ar-sidebar-menu__item--expand-leave-active
    &-expand-enter-active,
    &-expand-leave-active {}

    // .ar-sidebar-menu__item--expand-enter-from, .ar-sidebar-menu__item---expand-leave-to
    &-expand-enter-from,
    &-expand-leave-to {}
  }

  // .ar-sidebar-menu__item-sub
  &__item-sub {
  }

  // .ar-sidebar-menu__link
  &__link {
    // .ar-sidebar-menu__link-textual
    &-textual {
    }

    // .ar-sidebar-menu__link-weblink
    &-weblink {
      // .ar-sidebar-menu__link-weblink--active
      &--active {
      }
    }
  }

  // .ar-sidebar-menu__icon
  &__icon {
  }

  // .ar-sidebar-menu__badge
  &__badge {
  }

  // .ar-sidebar-menu__action
  &__action {
  }
}
```
:::