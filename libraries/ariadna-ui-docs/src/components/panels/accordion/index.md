---
layout: doc
---

# Accordion

Accordion - представляет собой контейнерный элемент, для группировки коллекции содержимого в панели. Состоит из 
двух компонентов.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Accordion from '@iwyfaf-vue-ui/ariadna-ui/Accordion';
import AccordionItem from '@iwyfaf-vue-ui/ariadna-ui/AccordionItem';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Accordion

Accordion - предназначен для контейнерезации компонента [AccordionItem](#accordionitem).

Вес <Badge type="info">~ 1.14 kB gzipped.</Badge>

### Props

| Prop              | Required | Type                   | Default                            | Description                                                                                      |
|-------------------|----------|------------------------|------------------------------------|--------------------------------------------------------------------------------------------------|
| `singleMode`      | -        | `boolean`              | `false`                            | Позволяет вам открыть не более 1 AccordionItem, в противном случае столько, сколько вы захотите. |
| `opened`          | -        | `boolean`              | `false`                            | По умолчанию открыты все элементы AccordionItem.                                                 |
| `clickableHeader` | -        | `boolean`              | `true`                             | Интерактивная область header слота для всех элементов AccordionItem.                             |
| `disabled`        | -        | `boolean`              | `false`                            | Отключенное состояние. Все элементы AccordionItem его наследуют.                                 |
| `cssClass`        | -        | `string`               | `EAccordionPropsDefault.CSS_CLASS` | Переопределяет структуру CSS классов.                                                            |
| `modifier`        | -        | `TSharedPropsModifier` | `undefined`                        | Модификатор базового CSS-класса.                                                                 |

#### `singleMode`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Позволяет вам открыть не более 1 AccordionItem, в противном случае столько, сколько вы захотите.

::: details Пример
<demo src="./demos/demo.accordion.props.single-mode.vue"></demo>
:::

#### `opened`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: По умолчанию открыты все элементы AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion.props.opened.vue"></demo>
:::

#### `clickableHeader`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Отключенное состояние. Все элементы AccordionItem его наследуют.

::: details Пример
<demo src="./demos/demo.accordion.props.clickable-header.vue"></demo>
:::

#### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Интерактивная область header слота для всех элементов AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion.props.disabled.vue"></demo>
:::

#### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EAccordionPropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
  одного вида компонента.

::: details Пример
<demo src="./demos/demo.accordion.props.css-class.vue"></demo>
:::

#### `modifier`

- **Тип:** `TSharedPropsModifier`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные визуальные вариации компонента.

::: details Пример
<demo src="./demos/demo.accordion.props.modifier.vue"></demo>
:::

### Slots

| Slot            | Description         |
|-----------------|---------------------|
| `default`       | Слот по умолчанию.  |

#### `default`

- **Описание:** В основном должен использоваться для размещения компонентов AccordionItem.
- **Тип:** `() => VNode[]`

### Exposes

| Property    | Type                                       | Description                                                    |
|-------------|--------------------------------------------|----------------------------------------------------------------|
| `openAll`   | `() => void`                               | Функция для открытия всех AccordionItem.                       |
| `closeAll`  | `() => void`                               | Функция для закрытия всех AccordionItem                        |
| `updateBy`  | `(index: number, value: boolean) => void`  | Функция для обновления состояния AccordionItem по его индексу. |

#### `openAll`

- **Тип:** `() => void`
- **Описание**: Функция для открытия всех AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion.expose.open-all.vue"></demo>
:::

#### `closeAll`

- **Тип:** `() => void`
- **Описание**: Функция для закрытия всех AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion.expose.close-all.vue"></demo>
:::

#### `updateBy`

- **Тип:** `(index: number, value: boolean) => void`
- **Описание**: Функция для обновления состояния AccordionItem по его индексу.

::: details Пример
<demo src="./demos/demo.accordion.expose.update-by.vue"></demo>
:::

### Accessibility

По умолчанию компонент содержит атрибут `role="presentation"`, т.к. контейнерный элемент не несет в себе никакой 
семантической роли.

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

#### Поддержка клавиатуры

| Key   | Function                       |
|-------|--------------------------------|
| `tab` | Перемещает фокус на Accordion. |

### Стилизация

<!--@include: ../../../shared/styles/description.md-->

#### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--disabled`: Задаются для визуализации неактивного состояния компонента.

::: details Пример расстановки стилей
```scss
$accordion: '.ar-accordion';

#{$accordion} {
  // .ar-accordion--disabled
  &--disabled {}
}
```
:::

## AccordionItem

AccordionItem - предназначен для отображения интерактивного элемента пользовательского интерфейса, который позволяет
пользователю раскрывать и скрывать содержимое внутри компонента Accordion.

Вес <Badge type="info">~ 2.29 kB gzipped.</Badge>

### Props

| Prop          | Required | Type                   | Default                                  | Description                               |
|---------------|----------|------------------------|------------------------------------------|-------------------------------------------|
| `opened`      | -        | `boolean`              | `false`                                  | Состояние открытия элемента аккордеона.   |
| `disabled`    | -        | `boolean`              | `false`                                  | Состояние отключения элемента аккордеона. |
| `ariaLabel`   | -        | `string`               | `EAccordionItemPropsDefault.ARIA_LABEL`  | Aria-label для заголовка.                 |

#### `opened`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние открытия элемента аккордеона.

::: details Пример
<demo src="./demos/demo.accordion-item.props.opened.vue"></demo>
:::

#### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние отключения элемента аккордеона.

::: details Пример
<demo src="./demos/demo.accordion-item.props.disabled.vue"></demo>
:::

#### `ariaLabel`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Aria-label для заголовка.

::: details Пример
<demo src="./demos/demo.accordion-item.props.aria-label.vue"></demo>
:::

### Slots

| Slot          | Description                                                                     |
|---------------|---------------------------------------------------------------------------------|
| `default`     | Слот по умолчанию для отображения основного содержимого элемента AccordionItem. |
| `header`      | Слот для отображения содержимого заголовка элемента AccordionItem.              |
| `activator`   | Слот для передачи управления активатором элемента AccordionItem.                |

#### `default`

- **Описание:** Слот по умолчанию для отображения основного содержимого элемента AccordionItem.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.accordion-item.slots.default.vue"></demo>
:::

#### `header`

- **Описание:** Слот для отображения содержимого заголовка элемента AccordionItem.
- **Тип:** `(props: { opened: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.accordion-item.slots.header.vue"></demo>
:::

#### `activator`

- **Описание:** Слот для передачи управления активатором элемента AccordionItem.
- **Тип:** `(props: {
    opened: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
  }) => VNode[]`

::: details Пример
<demo src="./demos/demo.accordion-item.slots.activator.vue"></demo>
:::

### Emits

| Event    | Payload          | Description                                               |
|----------|------------------|-----------------------------------------------------------|
| `change` | `value: boolean` | Событие срабатывает при изменении значения компонента.    |
| `focus`  | `event: Event`   | Событие срабатывает когда компонент получает фокусировку. |
| `blur`   | `event: Event`   | Событие срабатывает когда компонент теряет фокус.         |

### change

- **Описание:** Событие срабатывает при изменении значения компонента.
- **Тип:** `value: boolean`

### focus

- **Описание:** Событие срабатывает когда компонент получает фокусировку.
- **Тип:** `event: Event`

### blur

- **Описание:** Событие срабатывает когда компонент теряет фокус.
- **Тип:** `event: Event`

## Exposes

| Property  | Type           | Description                                                     |
|-----------|----------------|-----------------------------------------------------------------|
| `toggle`  | `() => void`   | Переключает открытое/закрытое состояние элемента AccordionItem. |
| `open`    | `() => void`   | Открывает AccordionItem.                                        |
| `close`   | `() => void`   | Закрывает AccordionItem.                                        |

#### `toggle`

- **Тип:** `() => void`
- **Описание**: Переключает открытое/закрытое состояние элемента AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion-item.expose.toggle.vue"></demo>
:::

#### `open`

- **Тип:** `() => void`
- **Описание**: Открывает AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion-item.expose.open.vue"></demo>
:::

#### `close`

- **Тип:** `() => void`
- **Описание**: Закрывает AccordionItem.

::: details Пример
<demo src="./demos/demo.accordion-item.expose.close.vue"></demo>
:::

## Accessibility

Контейнер заголовка AccordionItem имеет `role="button"`. Так же контейнер заголовка имеет несколько `aria` атрибутов:

* `aria-expanded`
  - Сообщает, раскрыт ли AccordionItem.
* `aria-disabled`
  - Сообщает, отключен ли AccordionItem.
* `aria-pressed`
  - Используется для кнопок-переключателей.
* `aria-controls`
  - Связывает переключатель состояния с управляемым элементом (контентом AccordionItem).
* `aria-label`
  - Задает текстовую метку для элемента, если видимый текст отсутствует или недостаточно описателен.

<!--@include: ../../../shared/accessibility/roles-can-inherit.md-->

### Поддержка клавиатуры

| Key          | Function                                                                                                                        |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| `esc`        | Закрывает AccordionItem.                                                                                                        |
| `esc`        | Закрывает AccordionItem.                                                                                                        |
| `Enter`      | Открывает/Закрывает AccordionItem.                                                                                              |
| `Space`      | Открывает/Закрывает AccordionItem.                                                                                              |
| `Up arrow`   | Перемещает фокус на предыдущий AccordionItem. Если фокус находится на первом элементе, перемещает фокус на последний элементе.  |
| `Down arrow` | Перемещает фокус на следующий AccordionItem.  Если фокус находится на последнем элементе, перемещает фокус на первый элементе.  |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Состояние

- `--active`: Задаются для визуализации состояния открытого AccordionItem.
- `--focused`: Задаются для визуализации фокусировки AccordionItem.
- `--hovered`: Задаются для визуализации наведения на AccordionItem.
- `--disabled`: Задаются для визуализации неактивного состояния AccordionItem.

::: details Пример расстановки стилей
```scss
$accordion-item: '.ar-accordion-item';

#{$accordion-item} {
  // .ar-accordion-item--theme
  &--theme {}

  // .ar-accordion-item--active
  &--active {
    // .ar-accordion-item--active.ar-accordion-item__header
    #{$accordion-item}__header {}
  }

  // .ar-accordion-item--disabled
  &--disabled {}

  // .ar-accordion-item--primary
  &--primary {
    // .ar-accordion-item--primary.ar-accordion-item--theme
    &#{$accordion-item}--theme {}
  }

  // .ar-accordion-item__header
  &__header {}

  // .ar-accordion-item__reveal
  &__reveal {
    // .ar-accordion-item__reveal-enter-active, .ar-accordion-item__reveal-leave-active
    &-enter-active,
    &-leave-active {}

    // .ar-accordion-item__reveal-enter-from, .ar-accordion-item__reveal-leave-to
    &-enter-from,
    &-leave-to {}
  }
}
```
:::
