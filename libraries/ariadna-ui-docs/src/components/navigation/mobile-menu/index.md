---
layout: doc
---

# MobileMenu

MobileMenu - представляет собой компонент для отображения мобильного навигационного меню с поддержкой вложенных 
элементов и анимацией переходов между уровнями.

Вес <Badge type="info">~ 3.40 kB gzipped.</Badge>

## Описание

DesktopMenu - Vue-компонент предназначен для отображения навигационного меню в мобильной версии веб-приложения. Он
обеспечивает удобный доступ к основным разделам сайта или приложения, поддерживает вложенные меню и плавные анимации
открытия/закрытия.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import DesktopMenu from '@iwyfaf-vue-ui/ariadna-ui/DesktopMenu';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop            | Required | Type                     | Default                              | Description                            |
|-----------------|----------|--------------------------|--------------------------------------|----------------------------------------|
| `menu`          | ✓        | `Array<TMobileMenuItem>` | -                                    | Данные для отображения меню.           |
| `animationTime` | -        | `number`                 | `300`                                | Время анимации в миллисекундах.        |
| `cssClass`      | -        | `string`                 | `EMobileMenuPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.  |
| `ariaLabel`     | -        | `string`                 | `undefined`                          | `aria-label` атрибут для тега `<nav>`. |

### `menu`

- **Тип:** `Array<TMobileMenuItem>`
- **Значение по умолчанию:** -
- **Описание**: Данные меню.

::: details Пример
<demo src="./demos/demo.full.vue"></demo>
:::

### `animationTime`

- **Тип:** `number`
- **Значение по умолчанию:** `300`
- **Описание**: Время анимации в миллисекундах.

::: details Пример
<demo src="./demos/demo.props.animation-time.vue" raw></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EMobileMenuPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue" raw></demo>
:::

### `ariaLabel`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: `aria-label` атрибут для тега `<nav>`.

::: details Пример
<demo src="./demos/demo.props.aria-label.vue" raw></demo>
:::

## Slots

| Slot             | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| `navbarItem`     | Слот для отображения одного элемента навигационной панели меню.           |
| `allContent`     | Слот для отображения всего содержимого меню.                              |
| `pageStackTitle` | Слот для отображения заголовка в стеке страниц.                           |
| `itemBeforeIcon` | Слот для отображения иконки перед элементом меню.                         |
| `itemAfterIcon`  | Слот для отображения иконки после элементом меню.                         |
| `itemLabel`      | Слот для отображения текста элемента меню.                                |
| `item`           | Слот для отображения элемента меню.                                       |
| `backIcon`       | Слот для отображения элемента "Назад".                                    |
| `closeIcon`      | Слот для отображения элемента "Закрыть".                                  |
| `headerLabel`    | Слот для отображения контента для заголовка.                              |
| `fullHeader`     | Слот для отображения всего заголовка.                                     |
| `loading`        | Слот для отображения состояния загрузки.                                  |
| `[key: string]`  | Слот для кастомного контента на конкретной странице навигационного меню.  |

### `navbarItem`

- **Описание:** Слот для отображения одного элемента навигационной панели меню.
- **Тип:** `(props: { item: TMobileMenuItem; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.navbar-item.vue"></demo>
::: 

### `allContent`

- **Описание:** Слот для отображения всего содержимого меню.
- **Тип:** `(props: {
    currentMenuItem: TMobileMenuItem;
    menu: Array<TMobileMenuItem>;
    opened: boolean;
    onClick: (item: TSharedMenu) => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.all-content.vue"></demo>
::: 

### `pageStackTitle`

- **Описание:** Слот для отображения заголовка в стеке страниц.
- **Тип:** `(props: { item: TSharedMenu; level: number; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.page-stack-title.vue"></demo>
::: 

### `itemBeforeIcon`

- **Описание:** Слот для отображения иконки перед элементом меню.
- **Тип:** `(props: { icon: string; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.item-before-icon.vue" raw></demo>
::: 

### `itemAfterIcon`

- **Описание:** Слот для отображения иконки после элементом меню.
- **Тип:** `(props: { icon: string; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.item-after-icon.vue" raw></demo>
::: 

### `itemLabel`

- **Описание:** Слот для отображения текста элемента меню.
- **Тип:** `(props: { label: string; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.item-label.vue"></demo>
::: 

### `item`

- **Описание:** Слот для отображения элемента меню.
- **Тип:** `(props: { item: TSharedMenu; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.item.vue"></demo>
::: 

### `backIcon`

- **Описание:** Слот для отображения элемента "Назад".
- **Тип:** `(props: { back: TMobileMenuItemCommandEvent['back']; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.back-icon.vue"></demo>
::: 

### `closeIcon`

- **Описание:** Слот для отображения элемента "Закрыть".
- **Тип:** `(props: { close: TMobileMenuItemCommandEvent['close']; opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.close-icon.vue"></demo>
::: 

### `headerLabel`

- **Описание:** Слот для отображения контента для заголовка.
- **Тип:** `(props: { opened: boolean; item: TMobileMenuItem | null }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.header-label.vue"></demo>
::: 

### `fullHeader`

- **Описание:** Слот для отображения всего заголовка.
- **Тип:** `(props: {
    opened: boolean;
    label: string;
    back: TMobileMenuItemCommandEvent['back'];
    close: TMobileMenuItemCommandEvent['close'];
    backVisible: boolean;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.full-header.vue"></demo>
::: 

### `loading`

- **Описание:** Слот для отображения состояния загрузки.
- **Тип:** `(props: { opened: boolean; item: TMobileMenuItem }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.loading.vue"></demo>
::: 

### `[key: string]`

- **Описание:** Слот для кастомного контента на конкретной странице навигационного меню.
- **Тип:** `(props: {
    item: TMobileMenuItem;
    opened: boolean;
    onClick: (item: TSharedMenu) => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.menu-.vue"></demo>
::: 

## Emits

| Event    | Payload | Description                            |
|----------|---------|----------------------------------------|
| `open`   | -       | Событие срабатывает при открытии меню. |
| `close`  | -       | Событие срабатывает при закрытии меню. |

### open

- **Описание:** Событие срабатывает при открытии меню.
- **Тип:** -

### close

- **Описание:** Событие срабатывает при закрытии меню.
- **Тип:** -

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-support.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--loading`: Задаются для визуализации состояния отсутствия данных в компоненте.
- `--invalid`: Задаются для визуализации состояния ошибки.

::: details Пример расстановки стилей
```scss
$mobile-menu: '.ar-mobile-menu';

#{$mobile-menu} {
  // .ar-mobile-menu--theme
  &--theme {
    // .ar-mobile-menu--theme .ar-mobile-menu__overlay
    #{$mobile-menu}__overlay {}

    // .ar-mobile-menu--theme .ar-mobile-menu__page
    #{$mobile-menu}__page {
      // .ar-mobile-menu--theme .ar-mobile-menu__page-item
      &-item {}
    }

    // .ar-mobile-menu--theme .ar-mobile-menu__navbar
    #{$mobile-menu}__navbar {
      // .ar-mobile-menu--theme .ar-mobile-menu__navbar-item
      &-item {
        // .ar-mobile-menu--theme .ar-mobile-menu__navbar-item--active
        &--active {}
      }
    }
  }

  // .ar-mobile-menu__overlay
  &__overlay {}

  // .ar-mobile-menu__header
  &__header {
    // .ar-mobile-menu__header-back
    &-back {
      // .ar-mobile-menu__header--visible
      &--visible {}
    }

    // .ar-mobile-menu__header-label
    &-label {}
  }

  // .ar-mobile-menu__menu
  &__menu {
    // .ar-mobile-menu__menu--resize
    &--resize {}
  }

  // .ar-mobile-menu__page
  &__page {
    // .ar-mobile-menu__page-item
    &-item {}

    // .ar-mobile-menu__page-title
    &-title {}

    // .ar-mobile-menu__page-link
    &-link {}

    // .ar-mobile-menu__page-loading
    &-loading {}
  }

  // .ar-mobile-menu__navbar
  &__navbar {
    // .ar-mobile-menu__navbar-item
    &-item {}
  }

  // .ar-mobile-menu__reveal
  &__reveal {
    // .ar-mobile-menu__reveal-enter-active, .ar-mobile-menu__reveal-leave-active
    &-enter-active,
    &-leave-active {}

    // .ar-mobile-menu__reveal-leave-to, .ar-mobile-menu__reveal-enter-from
    &-enter-from,
    &-leave-to {}
  }
}
```
:::
