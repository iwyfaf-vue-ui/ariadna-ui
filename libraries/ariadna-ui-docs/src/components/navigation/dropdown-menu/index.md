---
layout: doc
---

# DropdownMenu

DropdownMenu - это UI компонент выпадающего меню, управляемый данными, с поддержкой многоуровневых вложенных подменю.

Вес <Badge type="info">~ 3.67 kB gzipped.</Badge>

## Описание

Vue-компонент `DropdownMenu` — выпадающее меню с поддержкой многоуровневой вложенности.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import DropdownMenu from '@iwyfaf-vue-ui/ariadna-ui/DropdownMenu';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                  | Required | Type                       | Default                               | Description                                                          |
|-----------------------|----------|----------------------------|---------------------------------------|----------------------------------------------------------------------|
| `data`                | ✓        | `Array<TDropdownMenuItem>` | `undefined`                           | Массив пунктов меню.                                                 |
| `expandMode`          | -        | `'click' \| 'hover'`       | `'click'`                             | Режим раскрытия подменю второго и последующих уровней.               |
| `closeOnClickOutside` | -        | `boolean`                  | `true`                                | Закрывать меню при клике вне его области.                            |
| `closeOnEscape`       | -        | `boolean`                  | `true`                                | Закрывать меню при нажатии клавиши Escape.                           |
| `disabled`            | -        | `boolean`                  | `false`                               | Блокирует открытие меню.                                             |
| `cssClass`            | -        | `string`                   | `EDropdownMenuPropsDefault.CSS_CLASS` | Переопределяет базовый CSS-класс корневого элемента и всех потомков. |

### `data`

- **Тип:** `Array<TDropdownMenuItem>`
- **Значение по умолчанию:** `undefined`
- **Описание**: Массив пунктов меню.

::: details Пример
<demo src="./demos/demo.props.data.vue"></demo>
:::

### `expandMode`

- **Тип:** `'click' | 'hover'`
- **Значение по умолчанию:** `'click'`
- **Описание**: Режим раскрытия подменю второго и последующих уровней.

::: details Пример
<demo src="./demos/demo.props.expand-mode.vue"></demo>
:::

### `closeOnClickOutside`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Закрывать меню при клике вне его области.

::: details Пример
<demo src="./demos/demo.props.close-on-click-outside.vue"></demo>
:::

### `closeOnEscape`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Закрывать меню при нажатии клавиши Escape.

::: details Пример
<demo src="./demos/demo.props.close-on-esc.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Блокирует открытие меню.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EDropdownMenuPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет базовый CSS-класс корневого элемента и всех потомков.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

## Slots

| Slot        | Description                                                                                |
|-------------|--------------------------------------------------------------------------------------------|
| `activator` | Элемент-триггер, открывающий меню. Получает текущее состояние и управляющие функции.       |
| `item`      | Кастомный рендер пункта меню. Если слот задан — стандартный рендер пункта не используется. |

### `activator`

- **Описание:** Элемент-триггер, открывающий меню. Получает текущее состояние и управляющие функции.
- **Тип:** `(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.activator.vue"></demo>
:::

### `item`

- **Описание:** Кастомный рендер пункта меню. Если слот задан — стандартный рендер пункта не используется.
- **Тип:** `(props: { item: TDropdownMenuItem; level: number; close: () => void }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.item.vue"></demo>
:::


## Emits

| Emit         | Payload             | Description                                                                                                                    |
|--------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `show`       | —                   | Событие срабатывает при открытии меню.                                                                                         |
| `hide`       | —                   | Событие срабатывает при закрытии меню.                                                                                         |
| `item-click` | `TDropdownMenuItem` | Событие срабатывает при клике на пункт меню (в т.ч. вложенный). Не эмитируется для пунктов-разделителей и отключённых пунктов. |

### show

- **Описание:** Событие срабатывает при открытии меню.
- **Тип:** `-`

::: details Пример
<demo src="./demos/demo.emits.show.vue"></demo>
:::

### hide

- **Описание:** Событие срабатывает при закрытии меню.
- **Тип:** `-`

::: details Пример
<demo src="./demos/demo.emits.hide.vue"></demo>
:::

### item-click

- **Описание:** Событие срабатывает при клике на пункт меню (в т.ч. вложенный). Не эмитируется для пунктов-разделителей и отключённых пунктов.
- **Тип:** `TDropdownMenuItem`

::: details Пример
<demo src="./demos/demo.emits.item-click.vue"></demo>
:::


## Exposes

| Method   | Type         | Description                            |
|----------|--------------|----------------------------------------|
| `open`   | `() => void` | Программно открывает меню.             |
| `close`  | `() => void` | Программно закрывает меню.             |
| `toggle` | `() => void` | Программно переключает состояние меню. |

### open

- **Описание:** Программно открывает меню.
- **Тип:** `() => void`

::: details Пример
<demo src="./demos/demo.expose.open.vue"></demo>
:::

### close

- **Описание:** Программно закрывает меню.
- **Тип:** `() => void`

::: details Пример
<demo src="./demos/demo.expose.close.vue"></demo>
:::

### toggle

- **Описание:** Программно переключает состояние меню.
- **Тип:** `() => void`

::: details Пример
<demo src="./demos/demo.expose.toggle.vue"></demo>
:::


## Accessibility

- Корневой контейнер меню: `role="menu"`, `aria-orientation="vertical"`.
- Каждый пункт: `role="menuitem"`.
- Отключённый пункт: `aria-disabled="true"`, игнорирует Tab-focus.
- Разделитель: `role="separator"`, `aria-orientation="horizontal"`.
- Пункт с подменю: `aria-haspopup="menu"`, `aria-expanded="{isSubOpen}"`.
- Активатор (через слот): `aria-haspopup="menu"`, `aria-expanded="{isOpen}"` — пробрасываются пользователем через
  `v-bind` в слоте `activator`.

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

| Key                     | Function                                                        |
|-------------------------|-----------------------------------------------------------------|
| `Escape`                | Закрытие корневого меню.                                        |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--open`: Задается для визуализации состояния открытого компонента.
- `--disabled`: Задается для визуализации состояния неактивного компонента.

::: details Пример расстановки стилей
```scss
$dropdown-menu: '.ar-dropdown-menu';

#{$dropdown-menu} {
  // .ar-dropdown-menu--theme
  &--theme {
    // .ar-dropdown-menu--theme .ar-dropdown-menu__list
    #{$dropdown-menu}__list {}

    // .ar-dropdown-menu--theme .ar-dropdown-menu__link
    #{$dropdown-menu}__link {}

    // .ar-dropdown-menu--theme .ar-dropdown-menu__item
    #{$dropdown-menu}__item {}

    // .ar-dropdown-menu--theme .ar-dropdown-menu__icon
    #{$dropdown-menu}__icon {}

    // .ar-dropdown-menu--theme .ar-dropdown-menu__arrow
    #{$dropdown-menu}__arrow {}

    // .ar-dropdown-menu--theme .ar-dropdown-menu__separator
    #{$dropdown-menu}__separator {}
  }

  // .ar-dropdown-menu--disabled
  &--disabled {}

  // .ar-dropdown-menu__activator
  &__activator {}

  // .ar-dropdown-menu__list
  &__list {
    // .ar-dropdown-menu__list--sub
    &--sub {}

    // .ar-dropdown-menu__list--vertical-bottom-right (default)
    &--vertical-bottom-right {}

    // .ar-dropdown-menu__list--vertical-bottom-left
    &--vertical-bottom-left {}

    // .ar-dropdown-menu__list--vertical-top-right
    &--vertical-top-right {}

    // .ar-dropdown-menu__list--vertical-top-left
    &--vertical-top-left {}
  }

  // .ar-dropdown-menu__item
  &__item {
    // .ar-dropdown-menu__item--separator
    &--separator {}

    // .ar-dropdown-menu__item--disabled
    &--disabled {}
  }

  // .ar-dropdown-menu__category
  &__category {}

  // .ar-dropdown-menu__link
  &__link {}

  // .ar-dropdown-menu__icon
  &__icon {}

  // .ar-dropdown-menu__label
  &__label {}

  // .ar-dropdown-menu__badge
  &__badge {}

  // .ar-dropdown-menu__arrow
  &__arrow {
    // Chevron pointing right (for items with sub-menus)
    &::after {}
  }

  // .ar-dropdown-menu__separator
  &__separator {}

  // .ar-dropdown-menu__reveal
  &__reveal {
    &-enter-active,
    &-leave-active {}

    &-enter-from,
    &-leave-to {}

    &-enter-to,
    &-leave-from {}
  }
}
```
:::
