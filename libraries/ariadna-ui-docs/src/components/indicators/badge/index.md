---
layout: doc
---

# Badge

Badge - это небольшой индикатор состояния другого элемента.

Вес <Badge type="info">~ 0.68 kB gzipped.</Badge>

## Описание

Badge - Vue компонент представляет собой простой UI-элемент для отображения небольших фрагментов информации, таких как
уведомления, статусы или метки.

* Поддерживает default slot для отображения текста/контента.
* Модификации внешнего вида через props:
  - `size`
  - `rounded`

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import Badge from '@iwyfaf-vue-ui/ariadna-ui/Badge';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Props

| Prop       | Required | Type                   | Default                        | Description                                                                                       |
|------------|----------|------------------------|--------------------------------|---------------------------------------------------------------------------------------------------|
| `tag`      | -        | `TBadgePropsTag`       | `EBadgePropsDefault.TAG`       | HTML-тег, который будет отображаться как корневой элемент компонента.                             |
| `size`     | -        | `TSharedPropsSize`     | `EBadgePropsDefault.SIZE`      | Предопределенные варианты размеров для значка.                                                    |
| `rounded`  | -        | `boolean`              | `false`                        | Значки отображаются с наибольшим радиусом закругления.                                            |
| `floating` | -        | `boolean`              | `false`                        | Должен ли значок перемещаться в правую верхнюю часть относительно родительского элемента или нет. |
| `cssClass` | -        | `string`               | `EBadgePropsDefault.CSS_CLASS` | Переопределяет структуру CSS классов.                                                             |
| `modifier` | -        | `TSharedPropsModifier` | `undefined`                    | Модификатор базового CSS-класса.                                                                  |

### `tag`

- **Тип:** `TBadgePropsTag`
- **Значение по умолчанию:** `EBadgePropsDefault.TAG`
- **Описание**: HTML-тег, который будет отображаться как корневой элемент компонента.

::: details Пример
<demo src="./demos/demo.props.tag.vue"></demo>
:::

### `size`

- **Тип:** `TSharedPropsSize`
- **Значение по умолчанию:** `medium`
- **Описание**: Предопределенные варианты размеров для значка. Добавляет модификаторы `--small`, `--medium` и
`--large`. 

::: details Пример
<demo src="./demos/demo.props.size.vue"></demo>
:::

### `rounded`

- **Тип:** `boolean`
- **Значение по умолчанию:** `medium`
- **Описание**: Значки отображаются с наибольшим радиусом закругления. Добавляет модификатор `--rounded`.

::: details Пример
<demo src="./demos/demo.props.rounded.vue"></demo>
:::

### `floating`

- **Тип:** `boolean`
- **Значение по умолчанию:** `medium`
- **Описание**: Должен ли значок перемещаться в правую верхнюю часть относительно родительского элемента или нет. 
Добавляет модификатор `--floating`.

::: warning Важно!
Родительский элемент должен быть `position: relative;`.
:::

::: details Пример
<demo src="./demos/demo.props.floating.vue"></demo>
:::

### `cssClass`

- **Тип:** `string`
- **Значение по умолчанию:** `EBadgePropsDefault.CSS_CLASS`
- **Описание**: Переопределяет CSS-класс корневого элемента и его потомков. Полезен, при необходимости создавать более
одного вида компонента.

::: details Пример
<demo src="./demos/demo.props.css-class.vue"></demo>
:::

### `modifier`

- **Тип:** `TSharedPropsModifier`
- **Значение по умолчанию:** `undefined`
- **Описание**: Модификатор базового CSS-класса. Позволяет создавать различные вариации значка.

::: details Пример
<demo src="./demos/demo.props.modifier.vue"></demo>
:::

## Slots

| Slot       | Description                                       |
|------------|---------------------------------------------------|
| `default`  | Используется для отображения содержимого значка.  |

### `default`

- **Описание:** Используется для отображения содержимого значка.
- **Тип:** `() => VNode[]`

::: details Пример
<demo src="./demos/demo.slots.default.vue"></demo>
:::

## Accessibility

По умолчанию компонент Badge не содержит никаких ролей и атрибутов, любой атрибут передается корневому элементу, 
поэтому при необходимости вы можете самостоятельно добавить `aria`, `roles` и другие атрибуты.

### Поддержка клавиатуры

<!--@include: ../../../shared/accessibility/no-keyboard-elements.md-->

## Стилизация

<!--@include: ../../../shared/styles/description.md-->

### Тема

- `--theme`: Задаются цветовые стили.

### Размер

- `--small`: Задаются размеры для маленького значка.
- `--medium`: Задаются размеры для среднего значка.
- `--large`: Задаются размеры для большого значка.

### Модификация

- `--primary`: Задаются стили модификации значка (например `primary` или `success`).

### Остальные

- `--rounded`: Задаются стили закругленного значка.
- `--floating`: Значок перемещается в правую верхнюю часть относительно родительского элемента.

::: details Пример расстановки стилей
```scss
$badge: '.ar-badge';

#{$badge} {
  // .ar-badge--theme
  &--theme {}

  // .ar-badge--small
  &--small {}

  // .ar-badge--medium
  &--medium {}

  // .ar-badge--large
  &--large { }

  // .ar-badge--primary
  &--primary {}

  // .ar-badge--secondary
  &--secondary {}

  // .ar-badge--rounded
  &--rounded {}

  // .ar-badge--floating
  &--floating {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    margin: 0;
    pointer-events: none;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
}
```
:::
