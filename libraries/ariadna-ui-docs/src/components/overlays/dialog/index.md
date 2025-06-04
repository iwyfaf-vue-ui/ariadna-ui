---
layout: doc
---

# Dialog

Dialog - представляет собой контейнер для отображения содержимого в оверлейном окне.

Вес <Badge type="info">~ 1.95 kB gzipped.</Badge>

## Описание

Dialog - Vue-компонент предназначен для отображения модального окна (диалога) с возможностью кастомизации содержимого
через слоты, управления видимостью, размерами, поведением при взаимодействии пользователя (перетаскивание, 
максимизация, закрытие) и поддержкой различных режимов отображения.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Dialog from '@iwyfaf-vue-ui/ariadna-ui/Dialog';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                | Required | Type                   | Default                          | Description                                                                             |
|---------------------|----------|------------------------|----------------------------------|-----------------------------------------------------------------------------------------|
| `visible`           | ✓        | `boolean`              | `false`                          | Определяет видимость Dialog.                                                            |
| `maximized`         | -        | `boolean`              | `false`                          | Переводит Dialog в развернутый режим.                                                   |
| `draggable`         | -        | `boolean`              | `false`                          | Делает Dialog перетаскиваемым.                                                          |
| `contentScrollable` | -        | `boolean`              | `false`                          | Делает доступным для прокрутки только slot `content`.                                   |
| `persistent`        | -        | `boolean`              | `false`                          | Пользователь не может закрыть Dialog, щелкнув за его пределами или нажав клавишу `ESC`. |
| `noOverlayDismiss`  | -        | `boolean`              | `false`                          | Пользователь не может закрыть Dialog, нажав на элемент `overlay`.                       |
| `noEscDismiss`      | -        | `boolean`              | `false`                          | Пользователь не может закрыть Dialog, нажав клавишу `ESC`.                              |
| `shake`             | -        | `boolean`              | `false`                          | Встряхивает Dialog, чтобы привлечь внимание пользователя.                               |
| `overlay`           | -        | `boolean`              | `true`                           | Компонент отображает `overlay` элемент.                                                 |
| `appendTo`          | -        | `'body' \| string`     | `EDialogPropsDefault.APPEND_TO`  | Допустимый query selector или HTMLElement, указывающий, куда прикрепляется Dialog.      |
| `cssClass`          | -        | `string`               | `EDialogPropsDefault.CSS_CLASS ` | Переопределяет структуру CSS классов.                                                   |
| `modifier`          | -        | `TSharedPropsModifier` | `undefined`                      | Модификатор базового CSS-класса.                                                        |

### `visible`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Определяет видимость Dialog.

::: details Пример
<demo src="./demos/demo.props.v-model-visible.vue"></demo>
:::

### `maximized`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Переводит Dialog в развернутый режим. Добавляет модификатор `--maximized`. Открытие Dialog во весь 
экран достигается за счет CSS.

::: details Пример
<demo src="./demos/demo.props.maximized.vue"></demo>
:::

### `draggable`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Делает Dialog перетаскиваемым. Не работает с [`maximized`](#maximized). Во время перетаскивания 
добавляет модификатор `--dragging`. Перетаскивание осуществляется путем захвата элементов, которые расположены в слоте
[`header`](#header).

::: details Пример
<demo src="./demos/demo.props.draggable.vue"></demo>
:::

### `contentScrollable`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Делает доступным для прокрутки только slot [`content`](#content). Добавляет модификатор 
`--content-scrollable`. Скроллирование контента достигается за счет CSS.

::: details Пример
<demo src="./demos/demo.props.content-scrollable.vue"></demo>
:::

### `persistent`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Пользователь не может закрыть Dialog, щелкнув за его пределами или нажав клавишу `ESC`.

::: details Пример
<demo src="./demos/demo.props.persistent.vue"></demo>
:::

### `noOverlayDismiss`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Пользователь не может закрыть Dialog, нажав на элемент `overlay`. Нет необходимости устанавливать этот 
prop, если установлен pop [`persistent`](#persistent) или отключен prop [`overlay`](#overlay).

::: details Пример
<demo src="./demos/demo.props.no-overlay-dismiss.vue"></demo>
:::

### `noEscDismiss`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Пользователь не может закрыть Dialog, нажав клавишу `ESC`. Нет необходимости устанавливать этот prop, 
если установлен pop [`persistent`](#persistent).

::: details Пример
<demo src="./demos/demo.props.no-esc-dismiss.vue"></demo>
:::

### `shake`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Встряхивает Dialog, чтобы привлечь внимание пользователя при попытке закрыть его запрещенным способом.
Добавляет модификатор `--shake`. Эффект тряски диалогового окна достигается за счет CSS.

::: details Пример
<demo src="./demos/demo.props.shake.vue"></demo>
:::

### `overlay`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Компонент отображает `overlay` элемент.

::: details Пример
<demo src="./demos/demo.props.overlay.vue"></demo>
:::

### `appendTo`

- **Тип:** `'body' \| string`
- **Значение по умолчанию:** `EDialogPropsDefault.APPEND_TO`
- **Описание**: Допустимый query selector или HTMLElement, указывающий, куда прикрепляется Dialog. Для достижения 
функционала, используется встроенный компонент Vue 3 - `<Teleport>`.

::: details Пример
<demo src="./demos/demo.props.append-to.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EDialogPropsDefault.CSS_CLASS`
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

| Slot       | Description                             |
|------------|-----------------------------------------|
| `header`   | Слот для содержимого заголовка Dialog.  |
| `content`  | Слот для основного содержимого  Dialog. |
| `footer`   | Слот для нижнего колонтитула Dialog.    |

### `header`

- **Описание:** Используется для отображения содержимого заголовка Dialog.
- **Тип:** `(props: {
    hide: (event: Event) => void;
    toggleMaximize: (event: Event) => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.header.vue"></demo>
::: 

### `content`

- **Описание:** Используется для отображения основного содержимого Dialog.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.content.vue"></demo>
::: 

### `footer`

- **Описание:** Используется для отображения содержимого нижнего колонтитула Dialog.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.footer.vue"></demo>
::: 

## Emits

| Event            | Payload                             | Description                                                        |
|------------------|-------------------------------------|--------------------------------------------------------------------|
| `mounted`        | -                                   | Событие срабатывает при монтировании компонента Dialog.            |
| `update:visible` | `payload: TDialogProps['visible']`  | Событие срабатывает при обновлении значения [`visible`](#visible). |
| `show`           | -                                   | Событие срабатывает когда Dialog будет показан.                    |
| `hide`           | -                                   | Событие срабатывает когда Dialog будет скрыт.                      |
| `after-hide`     | -                                   | Событие срабатывает после того, как Dialog будет скрыт.            |
| `maximized`      | -                                   | Событие срабатывает когда Dialog становится развернутым.           |
| `unMaximized`    | -                                   | Событие срабатывает когда Dialog перестает быть развернутым.       |
| `drag-start`     | -                                   | Событие срабатывает при начале перетаскивания Dialog.              |
| `drag-end`       | -                                   | Событие срабатывает по завершении перетаскивания Dialog.           |

### mounted

- **Описание:** Событие срабатывает при монтировании компонента Dialog.
- **Тип:** -

### update:model-visible

- **Описание:** Событие срабатывает при обновлении значения [`visible`](#visible).
- **Тип:** `payload: TDialogProps['visible']`

### show

- **Описание:** Событие срабатывает когда значения [`visible`](#visible) становится `true`.
- **Тип:** -

### hide

- **Описание:** Событие срабатывает когда значения [`visible`](#visible) становится `false`.
- **Тип:** -

### after-hide

- **Описание:** Событие срабатывает после завершения `Transition` анимации компонента Dialog.
- **Тип:** -

### maximized

- **Описание:** Событие срабатывает когда значения [`maximized`](#maximized) становится `true`.
- **Тип:** -

### unMaximized

- **Описание:** Событие срабатывает когда значения [`maximized`](#maximized) становится `false`.
- **Тип:** -

### drag-start

- **Описание:** Событие срабатывает при начале перетаскивания Dialog.
- **Тип:** -

### drag-end

- **Описание:** Событие срабатывает по завершении перетаскивания Dialog.
- **Тип:** -

## Accessibility

Компонент использует `role="dialog"` и `aria-hidden="true"` на `overlay` элементе.

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

| Key   | Function                                         |
|-------|--------------------------------------------------|
| `esc` | Закрывает Dialog, если не запрещено через props. |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--maximized`: Задаются для визуализации состояния развернутого окна Dialog.
- `--dragging`: Задаются для визуализации состояния перетаскивания Dialog.
- `--content-scrollable`: Задаются для реализации прокрутки только содержимого Dialog.
- `--shake`: Задаются для визуализации эффект "тряски" Dialog.

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
