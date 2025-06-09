---
layout: doc
---

# useElementSize

`useElementSize` - это composable-функция, которая отслеживает размер переданного HTML-элемента. Она принимает 
реактивную ссылку на элемент и, при необходимости, callback-обработчик, который вызывается всякий раз, когда изменяется
размер элемента.

Вес <Badge type="info">~ 0.50 kB gzipped.</Badge>

## Описание

`useElementSize` - composable-функция предназначеная для получения реактивных значений размеров DOM-элемента:

- `width`
- `scrollWidth`
- `height`
- `scrollHeight`

с использованием API `ResizeObserver`. Позволяет отслеживать изменения размеров элемента и выполнять дополнительную 
логику через опциональный обработчик.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import useElementSize from '@iwyfaf-vue-ui/ariadna-ui/useElementSize';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Параметры composable

| Argument   | Required | Type                                                           | Default | Description                                                                 |
|------------|----------|----------------------------------------------------------------|---------|-----------------------------------------------------------------------------|
| `element`  | ✓        | `Ref<HTMLElement \| null> \| ComputedRef<HTMLElement \| null>` | -       | Ссылка реактивная ссылка указывающая на HTMLElement.                        |
| `timeout`  | -        | `number`                                                       | `200`   | Тайм-аут для троттлинга в миллисекундах.                                    |
| `handler`  | -        | `(values: TUseElementSizeReturn) => void`                      | -       | Необязательная callback-функция, которая получает текущие значения размера. |

## Возвращаемые значение

| Property        | Type           | Description                                           |
|-----------------|----------------|-------------------------------------------------------|
| `width`         | `Ref<number>`  | Реактивная ширина элемента в пикселях.                |
| `scrollWidth`   | `Ref<number>`  | Реактивная прокручиваемая ширина элемента в пикселях. |
| `height`        | `Ref<number>`  | Реактивная высота элемента в пикселях.                |
| `scrollHeight`  | `Ref<number>`  | Реактивная прокручиваемая высота элемента в пикселях. |

## Применение функции

Для использования composable-функции `useElementSize` в вашем проекте, импортируйте её и вызовите, с нужной вам
конфигурацией.

### Обычное применение

::: details Пример
<demo src="./demos/demo.default.vue"></demo>
:::

