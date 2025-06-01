---
layout: doc
---

# Dropbox

Dropbox - представляет собой элемент-контейнер для содержимого, которое должно отображаться после триггера 
кнопки-активатора. Содержимое и кнопка-активатор должны располагаться внутри компонента Dropbox с помощью слотов.

Вес <Badge type="info">~ 1.54 kB gzipped.</Badge>

## Описание

Dropbox - Vue-компонент предназначен для отображения выпадающего контейнера с пользовательским содержимым, который
открывается по действию пользователя (например, по клику на активатор). Компонент обеспечивает управление видимостью
содержимого, обработку событий закрытия по клику вне компонента или по нажатию клавиши `Escape`, а также поддержку
пользовательских слотов для гибкой кастомизации.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Dropbox from '@iwyfaf-vue-ui/ariadna-ui/Dropbox';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                  | Required | Type                      | Default                           | Description                                                           |
|-----------------------|----------|---------------------------|-----------------------------------|-----------------------------------------------------------------------|
| `modelValue`          | ✓        | `boolean`                 | `false`                           | Значение компонента.                                                  |
| `disableAutoPosition` | -        | `boolean`                 | `false`                           | Отключение автоматического позиционирования.                          |
| `closeOnClickOutside` | -        | `boolean`                 | `false`                           | Указывает, должен ли Dropbox быть скрыт при нажатии за его пределами. |
| `closeOnEscape`       | -        | `boolean`                 | `true`                            | Указывает, должно ли нажатие клавиши `Escape` скрывать Dropbox.       |
| `cssClass`            | -        | `string`                  | `EDropboxPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.                                 |
| `modifier`            | -        | `TSharedPropsModifier`    | `undefined`                       | Модификатор базового CSS-класса.                                      |

### `modelValue`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Значение компонента.

::: details Пример
<demo src="./demos/demo.props.v-model.vue"></demo>
:::

### `disableAutoPosition`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Отключение автоматического позиционирования. Использует [usePosition](/composables/elements/use-position/).

::: details Пример
<demo src="./demos/demo.props.disable-auto-position.vue"></demo>
:::

### `closeOnClickOutside`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Указывает, должен ли Dropbox быть скрыт при нажатии за его пределами.

::: details Пример
<demo src="./demos/demo.props.close-on-click-outside.vue"></demo>
:::

### `closeOnEscape`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Указывает, должно ли нажатие клавиши `Escape` скрывать Dropbox.

::: details Пример
<demo src="./demos/demo.props.close-on-escape.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EDropboxPropsDefault.CSS_CLASS`
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

| Slot        | Description                  |
|-------------|------------------------------|
| `default`   | Слот для контента Dropbox.   |
| `activator` | Слот для активатора Dropbox. |
| `header`    | Слот для заголовка Dropbox.  |
 
### `default`

- **Описание:** Используется для отображения содержимого, которое будет показывать внутри Dropbox.
- **Тип:** `(props: { opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
::: 

### `activator`

- **Описание:** Используется для отображения активатора, по действию на который Dropbox будет менять свое состояние.
- **Тип:** `(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.activator.vue"></demo>
::: 

### `header`

- **Описание:** Используется для отображения заголовка Dropbox.
- **Тип:** `(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.header.vue"></demo>
::: 

## Emits

| Event                | Payload                                | Description                                               |
|----------------------|----------------------------------------|-----------------------------------------------------------|
| `update:model-value` | `payload: TDropboxProps['modelValue']` | Событие срабатывает при обновлении значения `modelValue`. |
| `show`               | -                                      | Событие срабатывает когда Dropbox будет показан.          |
| `hide`               | -                                      | Событие срабатывает когда Dropbox будет скрыт.            |

### update:model-value

- **Описание:** Событие срабатывает при обновлении значения `modelValue`.
- **Тип:** `payload: TDropboxProps['modelValue']`

### show

- **Описание:** Событие срабатывает когда Dropbox будет показан.
- **Тип:** -

### hide

- **Описание:** Событие срабатывает когда Dropbox будет скрыт.
- **Тип:** -

## Exposes

| Property     | Type                  | Description                                           |
|--------------|-----------------------|-------------------------------------------------------|
| `open`       | `() => Promise<void>` | Функция для открытия Dropbox.                         |
| `close`      | `() => void`          | Функция для закрытия Dropbox.                         |
| `toggle`     | `() => Promise<void>` | Функция для переключения открытого состояния Dropbox. |
| `calculate`  | `() => void`          | Функция для вычисления местоположения Dropbox.        |

## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

| Key   | Function                     |
|-------|------------------------------|
| `tab` | Перемещает фокус на Dropbox. |
| `esc` | Закрывает Dropbox.           |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--opened`: Задаются для визуализации состояния открытого Dropbox.

::: details Пример расстановки стилей
```scss
$dropbox: '.ar-dropbox';

#{$dropbox} {
  // .ar-dropbox--theme
  &--theme {
    // .ar-dropbox--theme .ar-dropbox__input
    #{$dropbox}__content {
      // .ar-dropbox--theme .ar-dropbox__content-header, .ar-dropbox--theme .ar-dropbox__content-main
      &-header,
      &-main {}
    }
  }

  // .ar-dropbox--opened
  &--opened {
    // ar-dropbox--opened .ar-dropbox__content
    #{$dropbox}__content {
      // .ar-dropbox--opened .ar-dropbox__content--vertical-bottom-right,
      // .ar-dropbox--opened .ar-dropbox__content--vertical-bottom-left
      &--vertical-bottom-right,
      &--vertical-bottom-left,
      &--vertical-bottom-center {}

      // .ar-dropbox--opened .ar-dropbox__content--vertical-top-right,
      // .ar-dropbox--opened .ar-dropbox__content--vertical-top-left
      &--vertical-top-left,
      &--vertical-top-right {}

      // .ar-dropbox--opened .ar-dropbox__content--horizontal-right-center
      &--horizontal-right-center { }

      // .ar-dropbox--opened  .ar-dropbox__content--vertical-top-center, .ar-dropbox--opened  .ar-dropbox__content--vertical-bottom-center
      &--vertical-top-center,
      &--vertical-bottom-center {}
    }
  }

  // .ar-dropbox--primary
  &--primary {
    // .ar-dropbox--primary.ar-dropbox--theme
    &#{$dropbox}--theme {
      // .ar-dropbox--primary.ar-dropbox--theme ar-dropbox__content
      #{$dropbox}__content {
        // .ar-dropbox--primary.ar-dropbox--theme .ar-dropbox__content-header, .ar-dropbox--primary.ar-dropbox--theme .ar-dropbox__content-main
        &-header,
        &-main {}
      }
    }
  }

  // .ar-dropbox__content
  &__content {
    // .e-dropbox__content-header
    &-header {}

    // .e-dropbox__content-main
    &-main {}

    // .ar-dropbox__content--vertical-bottom-right
    &--vertical-bottom-right {}

    // .ar-dropbox__content--vertical-top-right
    &--vertical-top-right {}

    // .ar-dropbox__content--vertical-bottom-left
    &--vertical-bottom-left {}

    // .ar-dropbox__content--vertical-top-left
    &--vertical-top-left {}

    // .ar-dropbox__content--horizontal-right-center
    &--horizontal-right-center {}

    // .ar-dropbox__content--vertical-top-center, .ar-dropbox__content--vertical-bottom-center
    &--vertical-top-center,
    &--vertical-bottom-center {}
  }
}
```
:::
