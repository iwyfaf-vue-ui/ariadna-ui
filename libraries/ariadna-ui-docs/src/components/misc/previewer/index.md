---
layout: doc
---

# Previewer

Previewer - это UI компонент, который реализует демонстрацию других Vue компонентов с возможностью отображения их 
исходного кода. Идеально подходит для документации, дизайн-систем и playground-песочниц.

Вес <Badge type="info">~ 1.70 kB gzipped.</Badge>

## Описание

Vue-компонент Previewer реализует демонстрацию других Vue-компонентов с возможностью отображения их исходного кода. 

Позволяет отображать любой переданный компонент, показывать его исходный код с возможностью копирования в буфер обмена,
а также анимировать раскрытие/скрытие блока кода.

Все элементы управления (заголовок, описание, кнопки) могут быть переопределены через слоты, что делает компонент 
удобным для использования в документации, дизайн-системах и playground-песочницах.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Previewer from '@iwyfaf-vue-ui/ariadna-ui/Previewer';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop              | Required | Type                    | Default                             | Description                                                                |
|-------------------|----------|-------------------------|-------------------------------------|----------------------------------------------------------------------------|
| `component`       | -        | `Component \| string`   | `undefined`                         | Компонент, который будет отображаться в режиме предварительного просмотра. |
| `componentSource` | -        | `string`                | `undefined`                         | Исходный код компонента, который будет отображаться в виде чистого текста. |
| `showCode`        | -        | `boolean`               | `false`                             | Показывать ли блок кода сразу.                                             |
| `showCodeToggle`  | -        | `boolean`               | `true`                              | Показывать ли кнопку переключения кода.                                         |
| `cssClass`        | -        | `string`                | `EPreviewerPropsDefault.CSS_CLASS`  | Переопределяет структуру CSS классов.                                      |
| `modifier`        | -        | `TSharedPropsModifier`  | `undefined`                         | Модификатор базового CSS-класса.                                  |


### `component`

- **Тип:** `Component | string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Компонент, который будет отображаться в режиме предварительного просмотра.

::: details Пример
<demo src="./demos/demo.props.component.vue"></demo>
:::

### `componentSource`

- **Тип:** `string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Исходный код компонента, который будет отображаться в виде чистого текста. Передать текст можно
любым удобным для вас способом.

::: details Пример
<demo src="./demos/demo.props.component-source.vue"></demo>
:::

### `showCode`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Показывать ли блок кода сразу.

::: details Пример
<demo src="./demos/demo.props.show-code.vue"></demo>
:::

### `showCodeToggle`

- **Тип:** `boolean`
- **Значение по умолчанию:** `true`
- **Описание**: Показывать ли кнопку переключения кода.

::: details Пример
<demo src="./demos/demo.props.show-code-toggle.vue"></demo>
:::

### `modifier`

- **Тип:** `TSharedPropsModifier`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные визуальные вариации компонента.

::: details Пример
<demo src="./demos/demo.props.modifier.vue"></demo>
:::

## Slots

| Slot             | Description                                                                                 |
|------------------|---------------------------------------------------------------------------------------------|
| `header`         | Слот для отображения содержимого заголовка над просматриваемым компонентом.                 |
| `description`    | Слот для отображения содержимого описания под заголовком и над просматриваемым компонентом. |
| `showCodeToggle` | Слот для настройки отображения кнопки переключения кода.                                    |
| `copy`           | Слот для настройки отображения пользовательской кнопки копирования.                         |
| `source`         | Слот для настройки внешнего вида исходного кода компонента.                                 |

### `header`

- **Описание:** Используется для отображения заголовка над просматриваемым компонентом.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.header.vue"></demo>
:::

### `description`

- **Описание:** Используется для отображения описание над просматриваемым компонентом и под заголовком.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.description.vue"></demo>
::: 

### `showCodeToggle`

- **Описание:** Используется для кастомизации кнопки переключения кода.
- **Тип:** `(props: { toggle: () => void; isShown: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.show-code-toggle.vue"></demo>
::: 

### `copy`

- **Описание:** Используется для кастомизации кнопки копирования исходного кода компонента.
- **Тип:** `(props: { handler: Promise<unknown>; isCopied: boolean }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.copy.vue"></demo>
::: 

### `source`

- **Описание:** Используется для кастомизации внешнего вида исходного кода компонента.
- **Тип:** `(props: { source: string }) => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.source.vue"></demo>
:::  

## Accessibility

- Для кнопки переключения кода, присутствует атрибут `aria-pressed`. Он сообщает о состоянии переключателя (например, 
показан ли код).
- Для кнопки копирования исходного кода, присутствует атрибут `aria-live`. Он сообщает о появлении новых сообщений 
(например, "Copied!"), чтобы пользователь не пропустил важную информацию.
- Для элемента с исходным кодом компонента, присутствует атрибут `tabindex` со значением `0`. Он позволяет пользователю
с клавиатурой сфокусироваться на блоке с кодом для прокрутки или копирования.
- Исходный код компонента обернут в теги `<pre><code>`. Они гарантируют корректное отображение и восприятие кода 
технологиями чтения с экрана.

### Поддержка клавиатуры

Исходный код компонента поддерживает выделение через клавишу `Tab`.

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

::: details Пример расстановки стилей
```scss
$previewer: '.ar-previewer';

#{$previewer} {
  // .ar-previewer--theme
  &--theme {
    // .ar-previewer--theme .ar-previewer__component, .ar-previewer--theme .ar-previewer__action, .ar-previewer--theme .ar-previewer__code
    & #{$previewer}__component,
    & #{$previewer}__action,
    & #{$previewer}__code {}
  }

  // .ar-previewer--primary
  &--primary {
    // .ar-previewer--primary.ar-previewer--theme
    &#{$previewer}--theme {}
  }

  // .ar-previewer__header
  &__header {}

  // .ar-previewer__description
  &__description {}

  // .ar-previewer__component
  &__component {
    // .ar-previewer__component:not(:has(+ .ar-previewer__action))
    &:not(:has(+ #{$previewer}__action)) {}
  }

  // .ar-previewer__action
  &__action {
    // .ar-previewer__action:not(:has(+ .ar-previewer__code))
    &:not(:has(+ #{$previewer}__code)) {}
  }

  // .ar-previewer__code
  &__code {}
}
```
:::
