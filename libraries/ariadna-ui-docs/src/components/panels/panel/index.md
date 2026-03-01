---
layout: doc
---

# Panel

Panel - группирующий компонент, имеющий функцию переключения видимости содержимого.

Вес <Badge type="info">~ 1.54 kB gzipped.</Badge>

## Описание

Panel — предназначен для группировки контента с возможностью сворачивать и разворачивать его содержимое.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Panel from '@iwyfaf-vue-ui/ariadna-ui/Panel';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop         | Required | Type                   | Default                         | Description                                                         |
|--------------|----------|------------------------|---------------------------------|---------------------------------------------------------------------|
| `header`     | -        | `string`               | `undefined`                     | Текст заголовка панели.                                             |
| `toggleable` | -        | `boolean`              | `false`                         | Определяет, можно ли сворачивать и разворачивать содержимое панели. |
| `collapsed`  | -        | `boolean`              | `false`                         | Определяет начальное состояние содержимого панели.                  |
| `cssClass`   | -        | `string`               | `EPanelPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.                               |
| `modifier`   | -        | `TSharedPropsModifier` | `undefined`                     | Модификатор базового CSS-класса.                                    |

### `header`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Текст заголовка панели.

::: details Пример
<demo src="./demos/demo.props.header.vue"></demo>
:::

### `toggleable`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Определяет, можно ли сворачивать и разворачивать содержимое панели.

::: details Пример
<demo src="./demos/demo.props.toggleable.vue"></demo>
:::

### `collapsed`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Определяет начальное состояние содержимого панели.

::: details Пример
<demo src="./demos/demo.props.collapsed.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EHeaderPropsDefault.CSS_CLASS`
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

| Slot           | Description                                                                       |
|----------------|-----------------------------------------------------------------------------------|
| `default`      | Используется для кастомизации содержимого панели.                                 |
| `header`       | Используется для кастомизации заголовка панели.                                   |
| `icons`        | Используется для добавления иконок в заголовке панели.                            |
| `toggleButton` | Используется для кастомизации кнопки сворачивания или разворачивания.             |
| `toggleIcon`   | Используется для кастомизации содержимого кнопки сворачивания или разворачивания. |
| `footer`       | Используется для кастомизации подвала панели.                                     |

### `default`

- **Описание:** Используется для кастомизации содержимого панели.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

### `header`

- **Описание:** Используется для кастомизации заголовка панели.
- **Тип:** `(props: { isCollapsed: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.header.vue"></demo>
:::

### `icons`

- **Описание:** Используется для добавления иконок в заголовке панели.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.icons.vue"></demo>
:::

### `toggleButton`

- **Описание:** Используется для кастомизации кнопки сворачивания или разворачивания.
- **Тип:** `(props: {
    isCollapsed: boolean;
    toggleCollapsed: (event: TPanelToggleEvent['originalEvent']) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.toggle-button.vue"></demo>
:::

### `toggleIcon`

- **Описание:** Используется для кастомизации содержимого кнопки сворачивания или разворачивания.
- **Тип:** `(props: { isCollapsed: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.toggle-icon.vue"></demo>
:::

### `footer`

- **Описание:** Используется для кастомизации подвала панели.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.footer.vue"></demo>
:::


## Emits

| Event    | Payload                       | Description                                                                 |
|----------|-------------------------------|-----------------------------------------------------------------------------|
| `toggle` | `payload: TPanelToggleEvent`  | Событие срабатывает при сворачивании или разворачивании содержимого панели. |

### toggle

- **Описание:** Событие срабатывает при сворачивании или разворачивании содержимого панели.
- **Тип:** `payload: TPanelToggleEvent`

::: details Пример
<demo src="./demos/demo.emits.toggle.vue"></demo>
:::

## Exposes

| Prop      | Type                                  | Description                                                   |
|-----------|---------------------------------------|---------------------------------------------------------------|
| `toggle`  | `(event: TPanelToggleEvent) => void`  | Метод для сворачивания или разворачивания содержимого панели. |

### toggle

- **Описание:** Метод для сворачивания или разворачивания содержимого панели.
- **Тип:** `(event: TPanelToggleEvent) => void`

::: details Пример
<demo src="./demos/demo.expose.toggle.vue"></demo>
:::

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

| Key             | Function                                                                                   |
|-----------------|--------------------------------------------------------------------------------------------|
| `tab`           | Перемещает фокус на следующий фокусируемый элемент в последовательности вкладок страницы.  |
| `shift` + `tab` | Перемещает фокус на предыдущий фокусируемый элемент в последовательности вкладок страницы. |
| `enter`         | Переключает видимость основного содержимого.                                               |
| `space`         | Переключает видимость основного содержимого.                                               |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--hovered`: Задаются для визуализации наведения на компонент.
- `--collapsed`: Задаются для визуализации компонента при сворачивании основного содержимого.

::: details Пример расстановки стилей
```scss
$panel: '.ar-panel';

#{$panel} {
  // .ar-panel--theme
  &--theme {
    // .ar-panel--theme.ar-panel__header
    #{$panel}__header {}

    // .ar-panel--theme.ar-panel__footer
    #{$panel}__footer {}
  }

  // .ar-panel--primary
  &--primary {
    // .ar-panel--primary.ar-panel--theme
    #{$panel}__header {}

    // .ar-panel--primary.ar-panel--theme
    #{$panel}__footer {}
  }

  // .ar-panel--collapsed
  &--collapsed {
    // .ar-panel--collapsed.ar-panel--theme
    &#{$panel}--theme {
      // .ar-panel--collapsed.ar-panel--theme .ar-panel__header
      #{$panel}__header {}
    }
  }

  // .ar-panel__header
  &__header {}

  // .ar-panel__icons
  &__icons {}

  // .ar-panel__expander
  &__expander {}

  // .ar-panel__inner
  &__inner {

    // .ar-panel__inner--collapse
    &--collapse {
      // .ar-panel__inner--collapse-enter-active, .ar-panel__inner--collapse-leave-active
      &-enter-active,
      &-leave-active {}

      // .ar-panel__inner--collapse-enter-from, .ar-panel__inner--collapse-leave-to
      &-enter-from,
      &-leave-to {}
    }
  }

  // .ar-panel__content
  &__content {}

  // .ar-panel__footer
  &__footer {}
}
```
:::
