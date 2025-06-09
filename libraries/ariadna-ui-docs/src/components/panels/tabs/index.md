---
layout: doc
---

# Tabs

Tabs - обеспечивают переключение между различными вкладками.

Вес <Badge type="info">~ 3.35 kB gzipped.</Badge>

## Описание

Tabs — контейнерный Vue-компонент предназначен для организации переключения между несколькими вкладками (табами), 
каждая из которых отображает свой контент. Позволяет пользователю удобно переключаться между разными представлениями
или разделами интерфейса.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Tabs from '@iwyfaf-vue-ui/ariadna-ui/Tabs';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop                 | Required | Type                   | Default                       | Description                                                                          |
|----------------------|----------|------------------------|-------------------------------|--------------------------------------------------------------------------------------|
| `tabs`               | ✓        | `Array<TTabItem>`      | `[]`                          | Список вкладок.                                                                      |
| `openedByDefault`    | -        | `number`               | `0`                           | Индекс таба, который будет открыт по умолчанию.                                      |
| `activeKeyByDefault` | -        | `string`               | `undefined`                   | Ключ таба, который будет открыт по умолчанию. Имеет приоритет над `openedByDefault`. |
| `titleKey`           | -        | `string`               | `ETabsPropsDefault.TITLE_KEY` | Ключ заголовков табов.                                                               |
| `slide`              | -        | `boolean`              | `false`                       | Включает функцию слайдирования.                                                      |
| `cssClass`           | -        | `string`               | `ETabsPropsDefault.CSS_CLASS` | Переопределяет структуру CSS классов.                                                |
| `modifier`           | -        | `TSharedPropsModifier` | `undefined`                   | Модификатор базового CSS-класса.                                                     |

### `tabs`

- **Тип:** `Array<TTabItem>`
- **Значение по умолчанию:** `[]`
- **Описание**: Список вкладок.

::: details Пример
<demo src="./demos/demo.props.tabs.vue"></demo>
:::

### `openedByDefault`

- **Тип:** `number`
- **Значение по умолчанию:** `0`
- **Описание**: Индекс таба, который будет открыт по умолчанию.

::: details Пример
<demo src="./demos/demo.props.opened-by-default.vue"></demo>
:::

### `activeKeyByDefault`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Ключ таба, который будет открыт по умолчанию. Имеет приоритет над `openedByDefault`. В качестве ключей
используется транслитированная версия поля `title`.

::: details Пример
<demo src="./demos/demo.props.active-key-by-default.vue"></demo>
:::

### `titleKey`

- **Тип:** `string`
- **Значение по умолчанию:** `ETabsPropsDefault.TITLE_KEY`
- **Описание**: Ключ заголовков табов.

::: details Пример
<demo src="./demos/demo.props.title-key.vue"></demo>
:::

### `slide`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Включает функцию слайдирования. Добавляет модификаторы `--slide` и `--sliding` в момент слайдирования.

::: details Пример
<demo src="./demos/demo.props.slide.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ETabsPropsDefault.CSS_CLASS`
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

| Slot                 | Description                                           |
|----------------------|-------------------------------------------------------|
| `label-${number}`    | Используется для для отображения label в header таба. |
| `default-${number}`  | Используется для отображения содержимого таба.        |

### `label-${number}`

- **Описание:** Используется для для отображения label в header таба.
- **Тип:** `(props: TTabsSlotsLabel) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.label.vue"></demo>
:::

### `default-${number}`

- **Описание:** Используется для отображения содержимого таба.
- **Тип:** `(props: TTabsSlotsDefault) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

## Emits

| Event    | Payload                      | Description                                                     |
|----------|------------------------------|-----------------------------------------------------------------|
| `change` | `payload: TTabsEmitsChange`  | Событие срабатывает при изменении активной вкладки компонента.  |

### `change` 

- **Описание:** Событие срабатывает при изменении активной вкладки компонента.
- **Тип:** `payload: TTabsEmitsChange`

::: details Пример
<demo src="./demos/demo.emits.change.vue" raw></demo>
:::

## Accessibility

Контейнер заголовка имеет `role="tablist"`. Так же каждый label заголовка имеет несколько `aria` атрибутов:

* `aria-selected`
  - Сообщает, активна ли вкладка.
* `aria-controls`
  - Связывает переключатель состояния с управляемым элементом (содержимым вкладки).

Контейнер содержимого вкладки имеет `role="tabpanel"`.

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

| Key           | Function                                                                          |
|---------------|-----------------------------------------------------------------------------------|
| `tab`         | Перемещает фокус на первую неактивную вкладку.                                    |
| `Enter`       | Активирует сфокусированную вкладку.                                               |
| `Space`       | Активирует сфокусированную вкладку.                                               |
| `Arrow right` | Активирует следующую вкладку. Если вкладка последняя, активирует первую вкладку.  |
| `Arrow left`  | Активирует предыдущую вкладку. Если вкладка первая, активирует последнюю вкладку. |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--slide`: Задаются для визуализации состояния возможности слайдирования.
- `--sliding`: Задаются для визуализации состояния активного слайдирования.

::: details Пример расстановки стилей
```scss
$tabs: '.ar-tabs';

#{$tabs} {
  // .ar-tabs--theme
  &--theme {
    // .ar-tabs--theme .ar-tabs__tab
    #{$tabs}__tab {}
  }

  // .ar-tabs--slide
  &--slide {
    // .ar-tabs--slide .ar-tabs__header
    #{$tabs}__header {}
  }

  // .ar-tabs--sliding
  &--sliding {
    // .ar-tabs--sliding .ar-tabs__header
    #{$tabs}__header {}

    // .ar-tabs--sliding .ar-tabs__tab
    #{$tabs}__tab {}
  }

  // .ar-tabs--primary
  &--primary {
    // .ar-tabs--primary.ar-tabs--theme
    &#{$tabs}--theme {
      #{$tabs}__tab {}
    }
  }

  // .ar-tabs__header
  &__header {
    // .e-tabs__header-box
    &-box {}
  }

  &__tab {}

  // .e-tabs__content
  &__content {
    // .e-tabs__content--active
    &--active {}
  }
}
```
:::
