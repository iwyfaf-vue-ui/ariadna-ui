---
layout: doc
---

# Toast

Компонент Toast используется для отображения всплываюших сообщений.

Вес <Badge type="info">~ 2.84 kB gzipped.</Badge>

## Описание

Компонент `Toast` предназначен для отображения кратких всплывающих уведомлений (нотификаций), информирующих
пользователя о результатах действий или системных событиях. Уведомления появляются поверх основного контента.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

#### ToastService

```typescript
// main.ts
import ToastService from '@iwyfaf-vue-ui/ariadna-ui/ToastService';

// ...
app.use(toastService)
// ...
```

```typescript
import Toast from '@iwyfaf-vue-ui/ariadna-ui/Toast';
```

### Nuxt 3

#### ToastService

```typescript
// plugins/toast.plugin.ts
import ToastService from '@iwyfaf-vue-ui/ariadna-ui/ToastService';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastService);
});
```

```typescript
import Toast from '@iwyfaf-vue-ui/ariadna-ui/Toast';
```

<!--@include: ../../../shared/import/nuxt-3.md-->

### useToast

Composable `useToast`, предоставляет доступ к API компонента `Toast` из любой точки приложения.

::: warning Важно!
Для работы `useToast` требуется регистрация `toastService` в вашем приложении.
:::

```typescript
import useToast from '@iwyfaf-vue-ui/ariadna-ui/useToast';
```

## Props

| Prop               | Required | Type               | Default                         | Description                                                                                                                |
|--------------------|----------|--------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `positionY`        | -        | `TToastPositionY`  | `EToastPropsDefault.POSITION_Y` | Позиционирование по оси Y.                                                                                                 |
| `positionX`        | -        | `TToastPositionX`  | `EToastPropsDefault.POSITION_X` | Позиционирование по оси X.                                                                                                 |
| `group`            | -        | `string`           | `EToastPropsDefault.GROUP`      | Уникальный идентификатор для группы сообщений.                                                                             |
| `max`              | -        | `number`           | `undefined`                     | Максимальное количество всплывающих сообщений, отображаемых одновременно.                                                  |
| `hideProgressbar`  | -        | `boolean`          | `false`                         | Должен ли индикатор времени жизни всплывающего сообщения отображаться в уведомлении или нет.                               |
| `transition`       | -        | `string`           | `EToastPropsDefault.TRANSITION` | Определяет название анимации перехода, применяемой к всплывающим сообщениям, когда они входят в DOM и выходят из него.     |
| `appendTo`         | -        | `body' \| string`  | `EToastPropsDefault.APPEND_TO`  | Существующий query selector или `HTMLElement`, указывающий, куда монтируется компонент.                                    |
| `onMouseEnter`     | -        | `Function`         | `undefined`                     | Используется для указания callback-функции, которая будет запускаться при срабатывании события `mouseenter` на компоненте. |
| `onMouseLeave`     | -        | `Function`         | `undefined`                     | Используется для указания callback-функции, которая будет запускаться при срабатывании события `mouseleave` на компоненте. |
| `onClick`          | -        | `Function`         | `undefined`                     | Используется для указания callback-функции, которая будет запускаться при срабатывании события `click` на компоненте.      |
| `cssClass`         | -        | `string`           | `EToastPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.                                                                                      |

### `positionY`

- **Тип:** `TToastPositionY`
- **Значение по умолчанию:** `EToastPropsDefault.POSITION_Y`
- **Описание**: Позиционирование по оси Y.

::: details Пример
<demo src="./demos/demo.props.position-y.vue"></demo>
:::

### `positionX`

- **Тип:** `TToastPositionX`
- **Значение по умолчанию:** `EToastPropsDefault.POSITION_X`
- **Описание**: Позиционирование по оси X.

::: details Пример
<demo src="./demos/demo.props.position-x.vue"></demo>
:::

### `group`

- **Тип:** `string`
- **Значение по умолчанию:** `EToastPropsDefault.GROUP`
- **Описание**: Уникальный идентификатор для группы сообщений.

::: details Пример
<demo src="./demos/demo.props.group.vue"></demo>
:::

### `max`

- **Тип:** `number`
- **Значение по умолчанию:** `undefined`
- **Описание**: Максимальное количество всплывающих сообщений, отображаемых одновременно.

::: details Пример
<demo src="./demos/demo.props.max.vue"></demo>
:::

### `hideProgressbar`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Должен ли индикатор времени жизни всплывающего сообщения отображаться в уведомлении или нет.

::: details Пример
<demo src="./demos/demo.props.hide-progressbar.vue"></demo>
:::

### `transition`

- **Тип:** `string`
- **Значение по умолчанию:** `EToastPropsDefault.TRANSITION`
- **Описание**: Определяет название анимации перехода, применяемой к всплывающим сообщениям, когда они входят в DOM и 
выходят из него.

::: details Пример
<demo src="./demos/demo.props.transition.vue"></demo>
:::

### `appendTo`

- **Тип:** `body' | string`
- **Значение по умолчанию:** `EToastPropsDefault.APPEND_TO`
- **Описание**: Существующий query selector или `HTMLElement`, указывающий, куда монтируется компонент.

::: details Пример
<demo src="./demos/demo.props.append-to.vue"></demo>
:::

### `onMouseEnter`

- **Тип:** `Function`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для указания callback-функции, которая будет запускаться при срабатывании события 
`mouseenter` на компоненте.

::: details Пример
<demo src="./demos/demo.props.on-mouse-enter.vue"></demo>
:::

### `onMouseLeave`

- **Тип:** `Function`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для указания callback-функции, которая будет запускаться при срабатывании события 
`mouseleave` на компоненте.

::: details Пример
<demo src="./demos/demo.props.on-mouse-leave.vue"></demo>
:::

### `onClick`

- **Тип:** `Function`
- **Значение по умолчанию:** `undefined`
- **Описание**: Используется для указания callback-функции, которая будет запускаться при срабатывании события `click`
на компоненте.

::: details Пример
<demo src="./demos/demo.props.on-click.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EToastPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
  одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::


## Slots

| Slot          | Description                                                    |
|---------------|----------------------------------------------------------------|
| `detail`      | Используется для кастомизации сообщения.                       |
| `messageIcon` | Используется для кастомизации иконки сообщения.                |
| `summary`     | Используется для отображения краткой сводки всплывающего окна. |
| `caption`     | Используется для отображения подписи всплывающего окна.        |
| `closeIcon`   | Используется для кастомизации иконки закрытия.                 |
| `infoIcon`    | Используется для кастомизации иконки сообщения-информации.     |
| `warnIcon`    | Используется для кастомизации иконки сообщения-предупреждения. |
| `dangerIcon`  | Используется для кастомизации иконки сообщения-ошибки.         |
| `successIcon` | Используется для кастомизации иконки сообщения-успеха.         |

### `detail`

- **Описание:** Используется для кастомизации сообщения.
- **Тип:** `(props: { detail: TToastMessage['detail'] }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.detail.vue"></demo>
:::

### `messageIcon`

- **Описание:** Используется для кастомизации иконки сообщения.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.message-icon.vue"></demo>
:::

### `summary`

- **Описание:** Используется для отображения краткой сводки всплывающего окна.
- **Тип:** `(props: { summary: TToastMessage['summary'] }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.summary.vue"></demo>
:::

### `caption`

- **Описание:** Используется для отображения подписи всплывающего окна.
- **Тип:** `(props: { caption: TToastMessage['caption'] }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.caption.vue"></demo>
:::

### `closeIcon`

- **Описание:** Используется для кастомизации иконки закрытия.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.close-icon.vue"></demo>
:::

### `infoIcon`

- **Описание:** Используется для кастомизации иконки сообщения-информации.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.info-icon.vue"></demo>
:::

### `warnIcon`

- **Описание:** Используется для кастомизации иконки сообщения-предупреждения.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.warn-icon.vue"></demo>
:::

### `dangerIcon`

- **Описание:** Используется для кастомизации иконки сообщения-ошибки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.danger-icon.vue"></demo>
:::

### `successIcon`

- **Описание:** Используется для кастомизации иконки сообщения-успеха.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.success-icon.vue"></demo>
:::

## Emits

| Event      | Payload                 | Description                                                        |
|------------|-------------------------|--------------------------------------------------------------------|
| `add`      | `payload: TToastEvent`  | Событие срабатывает при добавлении всплывающего окна.              |
| `close`    | `payload: TToastEvent`  | Событие срабатывает при закрытии всплывающего окна.                |
| `ttl-end`  | `payload: TToastEvent`  | Событие срабатывает при истечении времени жизни всплывающего окна. |

### `add`

- **Описание:** Событие срабатывает при добавлении всплывающего окна.
- **Тип:** `payload: TToastEvent`

::: details Пример
<demo src="./demos/demo.emits.add.vue"></demo>
::: 

### `close`

- **Описание:** Событие срабатывает при закрытии всплывающего окна.
- **Тип:** `payload: TToastEvent`

::: details Пример
<demo src="./demos/demo.emits.close.vue"></demo>
::: 

### `ttl-end`

- **Описание:** Событие срабатывает при истечении времени жизни всплывающего окна.
- **Тип:** `payload: TToastEvent`

::: details Пример
<demo src="./demos/demo.emits.ttl-end.vue"></demo>
::: 



## API

| Prop          | Params                           | ReturnType | Description                                                  |
|---------------|----------------------------------|------------|--------------------------------------------------------------|
| `created`     | `callback: () => void`           | `void`     | Хук жизненного цикла created.                                |
| `mounted`     | `callback: () => void`           | `void`     | Хук жизненного цикла mounted.                                |
| `unMounted`   | `callback: () => void`           | `void`     | Хук жизненного цикла unMounted.                              |
| `add`         | `(message: TToastMessage): void` | `void`     | Добавляет новое Toast-уведомление в очередь отображения.     |
| `remove`      | `(id: number): void`             | `void`     | Удаляет Toast-уведомление по его внутреннему идентификатору. |
| `removeGroup` | `(group: string): void`          | `void`     | Удаляет все Toast-уведомления по группе.                     |
| `removeAll`   | `(): void`                       | `void`     | Удаляет все Toast-уведомления.                               |

### `created`

- **Описание:** Хук жизненного цикла created.
- **Параметры:** `callback: () => void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.created.vue"></demo>
:::

### `mounted`

- **Описание:** Хук жизненного цикла mounted.
- **Параметры:** `callback: () => void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.mounted.vue"></demo>
:::

### `unMounted`

- **Описание:** Хук жизненного цикла unMounted.
- **Параметры:** `callback: () => void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.un-mounted.vue"></demo>
:::

### `add`

- **Описание:** Добавляет новое Toast-уведомление в очередь отображения.
- **Параметры:** `(message: TToastMessage): void`
- **Возвращаемый тип:** `void`

Объект сообщения, передаваемый в метод `add()`.

| Prop       | Required | Type                   | Default       | Description                                                                                                     |
|------------|----------|------------------------|---------------|-----------------------------------------------------------------------------------------------------------------|
| `summary`  | -        | `string`               | `undefined`   | Краткий заголовок уведомления.                                                                                  |
| `detail`   | -        | `string`               | `undefined`   | Подробный текст уведомления.                                                                                    |
| `caption`  | -        | `string`               | `undefined`   | Подпись уведомления.                                                                                            |
| `ttl`      | -        | `number`               | `undefined`   | Время жизни в миллисекундах. Если не задано — сообщение sticky (не закрывается автоматически).                  |
| `closable` | -        | `boolean`              | `true`        | Разрешает пользователю закрыть сообщение вручную.                                                               |
| `modifier` | -        | `TSharedPropsModifier` | `undefined`   | Визуальный модификатор типа уведомления: `info`, `warning`, `danger`, `success`.                                |
| `group`    | -        | `string`               | `'default'`   | Идентификатор группы. Сообщение доставляется только в тот экземпляр `Toast`, у которого совпадает prop `group`. |


::: details Пример
<demo src="./demos/demo.api.add.vue"></demo>
:::

### `remove`

- **Описание:** Удаляет Toast-уведомление по его внутреннему идентификатору.
- **Параметры:** `(id: number): void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.remove.vue"></demo>
:::

### `removeGroup`

- **Описание:** Удаляет все Toast-уведомления по группе.
- **Параметры:** `(group: string): void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.remove-group.vue"></demo>
:::

### `removeAll`

- **Описание:** Удаляет все Toast-уведомления.
- **Параметры:** `(): void`
- **Возвращаемый тип:** `void`

::: details Пример
<demo src="./demos/demo.api.remove-all.vue"></demo>
:::


## Accessibility

<!--@include: ../../../shared/accessibility/no-roles.md-->

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-elements.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояния

- `--hovered`: Пользователь произвел hover действие на Toast.
- `--y-top`: Toast позиционируется вверху по вертикали.
- `--y-bottom`: Toast позиционируется спизу по вертикали.
- `--y-center`: Toast позиционируется по центру по вертикали.
- `--x-right`: Toast позиционируется справа по горизонтали.
- `--x-left`: Toast позиционируется слева по горизонтали.
- `--x-center`: Toast позиционируется по центру по горизонтали.

::: details Пример расстановки стилей
```scss
$toast: '.ar-toast';

#{$toast} {
  // .ar-toast--theme
  &--theme {
    // .ar-panel--theme.ar-panel__message
    #{$toast}__message {
      // .ar-toast--theme .ar-toast__message--secondary
      &--secondary {
        // .ar-toast--theme .ar-toast__message--secondary .ar-toast__message-header
        #{$toast}__message-header {}
      }

      // .ar-toast--theme .ar-toast__message--success
      &--success {
        // .ar-toast--theme .ar-toast__message--success .ar-toast__message-header
        #{$toast}__message-header {}
      }

      // .ar-toast--theme .ar-toast__message--warning
      &--warning {
        // .ar-toast--theme .ar-toast__message--warning .ar-toast__message-header
        #{$toast}__message-header {}
      }

      // .ar-toast--theme .ar-toast__message--danger
      &--danger {
        // .ar-toast--theme .ar-toast__message--danger .ar-toast__message-header
        #{$toast}__message-header {}
      }

      // .ar-panel--theme.ar-panel__message-header
      &-header {}

      // .ar-toast--theme .ar-toast__message-progress-bar (default)
      #{$toast}__message-progress-bar {}

      // .ar-toast--theme .ar-toast__message--secondary .ar-toast__message-progress-bar
      &--secondary #{$toast}__message-progress-bar {}

      // .ar-toast--theme .ar-toast__message--success .ar-toast__message-progress-bar
      &--success #{$toast}__message-progress-bar {}

      // .ar-toast--theme .ar-toast__message--warning .ar-toast__message-progress-bar
      &--warning #{$toast}__message-progress-bar {}

      // .ar-toast--theme .ar-toast__message--danger .ar-toast__message-progress-bar
      &--danger #{$toast}__message-progress-bar {}
    }
  }

  // .ar-toast--y-top
  &--y-top {}

  // .ar-toast--y-bottom
  &--y-bottom {}

  // .ar-toast--y-center
  &--y-center {}

  // .ar-toast--x-right
  &--x-right {}

  // .ar-toast--x-left
  &--x-left {}

  // .ar-toast--x-center
  &--x-center {
    // .ar-toast--x-center.ar-toast--y-center
    &#{$toast}--y-center {}
  }

  // .ar-toast__message
  &__message {
    // .ar-toast__message:not(:has(.ar-toast__message-detail))
    &:not(:has(#{$toast}__message-detail)) {
      // .ar-toast__message:not(:has(.ar-toast__message-detail)) .ar-toast__message-header
      #{$toast}__message-header {}
    }

    // .ar-toast__message-header
    &-header {}

    // .ar-toast__message-icon
    &-icon {}

    // .ar-toast__message-summary
    &-summary {}

    // .ar-toast__message-aside
    &-aside {}

    // .ar-toast__message-caption
    &-caption {}

    // .ar-toast__message-detail
    &-detail {}

    // .ar-toast__message-progress
    &-progress {}

    // .ar-toast__message-progress-bar
    &-progress-bar {}
  }

  // --- default fade-in transition  ---

  &__fade-in-enter-active {}

  &__fade-in-leave-active {}

  &__fade-in-enter-from {}

  &__fade-in-leave-to {}
}
```
:::
