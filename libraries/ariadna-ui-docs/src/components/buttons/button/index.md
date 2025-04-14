---
layout: doc
---

# Button

Button - легко настраиваемый компонент кнопки для пользовательского интерфейса.

Вес <Badge type="info">~ 1.20 kB gzipped.</Badge>

## Описание

Button - Vue компонент представляет собой универсальную кнопку, которая поддерживает:

* Разные HTML-теги для рендера (`button`, `span`, `a`);
* Иконки и текст с возможностью кастомизации через слоты;
* Гибкое позиционирование иконки;
* Модификации внешнего вида через props:
  - `size`
  - `rounded`
  - `textual`
  - `outlined`
* Поддержка состояний через props:
  - `disabled`
  - `loading`
  - `selected`
* ARIA-атрибуты для доступности.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Button from '@iwyfaf-vue-ui/ariadna-ui/Button';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop           | Required | Type                                                               | Default     | Description                                                       |
|----------------| -------- |--------------------------------------------------------------------|-------------|-------------------------------------------------------------------|
| `tag`          | -        | `'button' \| 'span' \| 'a'`                                        | `button`    | HTML-тег, который будет отображаться как компонент кнопки.        |
| `type`         | -        | `'button' \| 'submit' \| 'reset'`                                  | `button`    | Определяет тип кнопки при отображении в виде элемента `<button>`. |
| `iconPosition` | -        | `'left' \| 'right' \| 'top' \| 'bottom'`                           | `left`      | Положение иконки относительно текста кнопки.                      |
| `size`         | -        | `'small' \| 'medium' \| 'large'`                                   | `medium`    | Предопределенные варианты размеров для кнопки.                    |
| `rounded`      | -        | `boolean`                                                          | `false`     | Кнопки отображаются с наибольшим радиусом закругления.            |
| `textual`      | -        | `boolean`                                                          | `false`     | Кнопки отображаются в виде текстовых элементов.                   |
| `outlined`     | -        | `boolean`                                                          | `false`     | Outlined отображают кнопки с границами, но с прозрачным фоном.    |
| `selected`     | -        | `boolean`                                                          | `false`     | Определяет состояние `selected`.                                  |
| `disabled`     | -        | `boolean`                                                          | `false`     | Определяет состояние `disabled`.                                  |
| `loading`      | -        | `boolean`                                                          | `false`     | Определяет состояние `loading`.                                   |
| `cssClass`     | -        | `string`                                                           | `ar-button` | Переопределяет структуру CSS классов.                             |
| `modifier`     | -        | `'primary' \| 'secondary' \| 'quaternary' \| 'tertiary' \| string` | `undefined` | Модификатор базового CSS-класса.                                  |

### `tag`

- **Тип:** `'button' | 'span' | 'a'`
- **Значение по умолчанию:** `button`
- **Описание**: HTML-тег, который будет отображаться как компонент кнопки.

::: details Пример
<demo src="./demos/demo.props.tag.vue"></demo>
:::

### `type`

- **Тип:** `'button' | 'submit' | 'reset'`
- **Значение по умолчанию:** `button`
- **Описание**: Определяет тип кнопки, если кнопка рендерится как `<button>` элемент. Определяет поведение кнопки по 
умолчанию в формах и взаимодействиях.

::: details Пример
<demo src="./demos/demo.props.type.vue"></demo>
:::

### `iconPosition`

- **Тип:** `'left' | 'right' | 'top' | 'bottom'`
- **Значение по умолчанию:** `left`
- **Описание**: Положение иконки относительно текста кнопки. Добавляет модификаторы `--icon-left`, `--icon-right`,
`--icon-top` и `--icon-bottom`.

::: details Пример
<demo src="./demos/demo.props.icon-position.vue"></demo>
:::

### `size`

- **Тип:** `'small' | 'medium' | 'large'`
- **Значение по умолчанию:** `medium`
- **Описание**: Предопределенные варианты размеров для кнопки. Добавляет модификаторы `--small`, `--medium` и 
`--large`.

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `rounded`

- **Тип:** `boolean`
- **Значение по умолчанию:** `medium`
- **Описание**: Кнопки отображаются с наибольшим радиусом закругления. Добавляет модификатор `--rounded`.

::: details Пример
<demo src="./demos/demo.props.rounded.vue"></demo>
:::

### `textual`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Кнопки отображаются в виде текстовых элементов. Добавляет модификатор `--textual`.

::: details Пример
<demo src="./demos/demo.props.textual.vue"></demo>
:::

### `outlined`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Outlined отображают кнопки с границами, но с прозрачным фоном. Добавляет модификатор `--outlined`.

::: details Пример
<demo src="./demos/demo.props.outlined.vue"></demo>
:::

### `selected`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние `selected`. Например, когда необходимо отобразить выбранный элемент. Добавляет модификатор 
`--selected`.

::: details Пример
<demo src="./demos/demo.props.selected.vue"></demo>
:::

### `disabled`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние `disabled`. Добавляет модификатор `--disabled`.

::: details Пример
<demo src="./demos/demo.props.disabled.vue"></demo>
:::

### `loading`

- **Тип:** `boolean`
- **Значение по умолчанию:** `false`
- **Описание**: Состояние `loading`. Добавляет модификаторы `--loading` и `--disabled`.

::: details Пример
<demo src="./demos/demo.props.loading.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `ar-button`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более 
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

### `modifier`

- **Тип:** `'primary' | 'secondary' | 'quaternary' | 'tertiary' | string`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные вариации кнопки.

::: details Пример
<demo src="./demos/demo.props.modifier.vue"></demo>
:::

## Slots

| Slot       | Description                                      |
|------------|--------------------------------------------------|
| `default`  | Используется для вывода содержимого кнопки.      |
| `icon`     | Используется для вывода иконки кнопки.           |
| `loading`  | Используется для отображения состояния загрузки. |


### `default`

- **Описание:** Используется для вывода содержимого кнопки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

### `icon`

- **Описание:** Используется для вывода иконки кнопки. Имеет атрибут `aria-hidden` со значением `true` по умолчанию.
Положение иконки можно задать через props [`iconPosition`](#iconposition).
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.icon.vue"></demo>
:::

### `loading`

- **Описание:** Используется для отображения состояния загрузки.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.loading.vue"></demo>
:::

## Emits

| Event    | Payload              | Description                                      |
|----------|----------------------|--------------------------------------------------|
| `click`  | `event: MouseEvent`  | Событие срабатывает при клике мышкой по кнопке.  |

### click

- **Описание:** Событие срабатывает при клике мышкой по кнопке. Если кнопка в состоянии `disabled` или `loading` - 
событие не сработает.
- **Тип:** `event: MouseEvent`

## Accessibility

Компонент `Button` отображает собственный элемент `button`, который неявно включает в себя любой переданный prop.

::: details Пример
<demo src="./demos/demo.accessibility.aria-label.vue"></demo>
:::

### ARIA-атрибуты

- `aria-disabled`: Указывает на состояние кнопки (активна / неактивна).
  - Если `disabled=true`, кнопка будет иметь ARIA-атрибуты `aria-disabled="true"`.
- `aria-selected`: Отображает, выбрана ли кнопка (`selected=true/false`).
- `aria-busy`: Показывает, выполняется ли загрузка (`loading=true`).
- `aria-hidden`: Скрывает иконку от ScreenReader.

### Поддержка клавиатуры

| Key     | Function                                                            |
|---------|---------------------------------------------------------------------|
| `tab`   | Перемещает фокус на кнопку или ссылку (не работает с `tag="span"`). |
| `enter` | Активирует кнопку.                                                  |
| `space` | Активирует кнопку.                                                  |

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Размер

- `--small`: Задаются размеры для маленькой кнопки.
- `--medium`: Задаются размеры для средней кнопки.
- `--large`: Задаются размеры для большой кнопки.

### Положение иконки

- `--icon-left`: Задаются стили положения иконки слева, относительно текста.
- `--icon-top`: Задаются стили положения иконки сверху, относительно текста.
- `--icon-right`: Задаются стили положения иконки справа, относительно текста.
- `--icon-bottom`: Задаются стили положения иконки снизу, относительно текста.

### Состояния

- `--selected`: Задаются стили состояния выбранной кнопки.
- `--loading`: Задаются стили состояния загрузки кнопки.
- `--disabled`: Задаются стили состояния отключенной кнопки.

### Модификация

- `--primary`: Задаются стили модификации кнопки (например `primary` или `success`).

### Остальные

- `--rounded`: Задаются стили закругленной кнопки.
- `--textual`: Задаются стили отображения кнопки - как текста.
- `--outlined`: Задаются стили отображения кнопки - как с границами.

::: details Пример расстановки стилей
```scss
$button: '.ar-button';

#{$button} {
  // .ar-button:hover
  &:hover {}

  // .ar-button--theme
  &--theme {
    // .ar-button--theme:hover
    &:hover {}

    // .ar-button--theme:active
    &:active {}
  }

  // .ar-button--small
  &--small {}

  // .ar-button--medium
  &--medium {}

  // .ar-button--large
  &--large {}

  // .ar-button--icon-top, .ar-button--icon-bottom
  &--icon-top,
  &--icon-bottom {
    // .ar-button--icon-top .ar-button__group, .ar-button--icon-bottom .ar-button__group
    #{$button}__group {
      flex-direction: column;
    }
  }

  // .ar-button--icon-top, .ar-button--icon-left
  &--icon-top,
  &--icon-left {
    // .ar-button--icon-top .ar-button__icon, .ar-button--icon-left .ar-button__icon
    #{$button}__icon {
      order: -1;
    }
  }

  &--icon-bottom,
  &--icon-right {
    // .ar-button--icon-bottom .ar-button__icon, .ar-button--icon-right .ar-button__icon
    #{$button}__icon {
      order: 100;
    }
  }

  // .ar-button--selected
  &--selected {}

  // .ar-button--loading
  &--loading {
    // .ar-button--loading .ar-button__group
    #{$button}__group {}

    // .ar-button--loading .ar-button__loading
    #{$button}__loading {}
  }

  // .ar-button--disabled
  &--disabled {}

  // .ar-button--primary
  &--primary {
    // .ar-button--primary.ar-button--theme
    &#{$button}--theme {

      // .ar-button--primary.ar-button--theme:hover
      &:hover {}

      // .ar-button--primary.ar-button--theme:active
      &:active {}
    }
  }

  // .ar-button--secondary
  &--secondary {
    // .ar-button--secondary.ar-button--theme
    &#{$button}--theme {

      // .ar-button--secondary.ar-button--theme:hover
      &:hover {}

      // .ar-button--secondary.ar-button--theme:active
      &:active {}
    }
  }

  // .ar-button--rounded
  &--rounded {}

  // .ar-button--textual
  &--textual {
    background: transparent;
    border-color: transparent;

    // .ar-button--textual.ar-button--primary, .ar-button--textual.ar-button--secondary
    &#{$button}--primary,
    &#{$button}--secondary {
      background: transparent;
      border-color: transparent;
    }
  }

  // .ar-button--outlined
  &--outlined {
    background: transparent;

    // .ar-button--text.ar-button--primary, .ar-button--text.ar-button--secondary
    &#{$button}--primary,
    &#{$button}--secondary {
      background: transparent;
    }
  }

  // .ar-button__group
  &__group {
    display: inline-flex;
    flex-direction: row;
    gap: 4px;
  }

  // .ar-button__loading
  &__loading {}
}
```
:::
