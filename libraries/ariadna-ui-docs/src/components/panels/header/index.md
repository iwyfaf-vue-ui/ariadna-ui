---
layout: doc
---

# Header

Header - используется для оформления верхней части интерфейса.

Вес <Badge type="info">~ 1.17 kB gzipped.</Badge>

## Описание

Header — предназначен для оформления верхней области интерфейса (шапки приложения) и размещения в ней произвольного 
содержимого: логотипа, заголовка, элементов навигации, поисковой строки, пользовательских действий и других элементов.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Header from '@iwyfaf-vue-ui/ariadna-ui/Header';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop              | Required | Type                   | Default                         | Description                                                                                     |
|-------------------|----------|------------------------|---------------------------------|-------------------------------------------------------------------------------------------------|
| `tag`             | -        | `THeaderPropsTag`      | `EHeaderPropsDefault.TAG`       | HTML тег для рендеринга компонента.                                                             |
| `scrollThreshold` | -        | `number`               | `undefined`                     | Порога для скролла в пикселях, ниже которого к компоненту добавляется модификатор `--scrolled`. |
| `cssClass`        | -        | `string`               | `EHeaderPropsDefault.CSS_CLASS` | Переопределяет структуру CSS классов.                                                           |
| `modifier`        | -        | `TSharedPropsModifier` | `undefined`                     | Модификатор базового CSS-класса.                                                                |

### `tag`

- **Тип:** `THeaderPropsTag`
- **Значение по умолчанию:** `EHeaderPropsDefault.TAG`
- **Описание**: HTML тег для рендеринга компонента.

::: details Пример
<demo src="./demos/demo.props.tag.vue"></demo>
:::

### `scrollThreshold`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Порога для скролла в пикселях, ниже которого к компоненту добавляется модификатор `--scrolled`.

::: details Пример
<demo src="./demos/demo.props.scroll-threshold.vue"></demo>
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

| Slot       | Description                                                             |
|------------|-------------------------------------------------------------------------|
| `logo`     | Используется для отображения логотипа.                                  |
| `title`    | Используется для отображения заголовка компонента.                      |
| `subtitle` | Используется для отображения текста под основным заголовком компонента. |
| `default`  | Используется для отображения основной части компонента.                 |
| `right`    | Используется для отображения правой части компонента.                   |

### `logo`

- **Описание:** Используется для отображения логотипа.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.logo.vue"></demo>
:::

### `title`

- **Описание:** Используется для отображения заголовка компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.title.vue"></demo>
:::

### `subtitle`

- **Описание:** Используется для отображения текста под основным заголовком компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.subtitle.vue"></demo>
:::

### `default`

- **Описание:** Используется для отображения основной части компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

### `right`

- **Описание:** Используется для отображения правой части компонента.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.right.vue"></demo>
:::

## Emits

| Event      | Payload            | Description                                                                               |
|------------|--------------------|-------------------------------------------------------------------------------------------|
| `scrolled` | `payload: boolean` | Событие срабатывает при скролле выше или ниже заданного порога в props `scrollThreshold`. |

### scrolled

- **Описание:** Событие срабатывает при скролле выше или ниже заданного порога в props `scrollThreshold`.
- **Тип:** `payload: boolean`

::: details Пример
<demo src="./demos/demo.emits.scrolled.vue"></demo>
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

### Состояние

- `--hovered`: Задаются для визуализации наведения на компонент.
- `--scrolled`: Задаются для визуализации компонента при скролле ниже порога указанного в prop [`scrollThreshold`](#scrollthreshold).

::: details Пример расстановки стилей
```scss
@use '../../../ariadna' as theme;

$header: '.ar-header';

#{$header} {
  // .ar-header--theme
  &--theme {}

  // .ar-header--scrolled
  &--scrolled {
    // .ar-header--scrolled.ar-header--theme
    &#{$header}--theme {}
  }

  // .ar-header--primary
  &--primary {
    // .ar-header--primary.ar-header--theme
    &#{$header}--theme {}
  }
 
  // .ar-header__head
  &__head {
    // .ar-header__head-logo
    &-logo {}

    // .ar-header__head-title
    &-title {}

    // .ar-header__head-subtitle
    &-subtitle {}
  }

  // .ar-header__content
  &__content {}

  // .ar-header__right
  &__right {}
}
```
:::
