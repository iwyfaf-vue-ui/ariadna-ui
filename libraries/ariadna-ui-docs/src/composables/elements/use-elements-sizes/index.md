---
layout: doc
---

# useElementsSizes

`useElementsSizes` - это composable-функция, которая отслеживает размер переданных HTML-элементов. Она принимает 
реактивную ссылку на элементы и, при необходимости, callback-обработчик, который вызывается всякий раз, когда 
изменяется размер элемента.

Вес <Badge type="info">~ 0.50 kB gzipped.</Badge>

## Описание

`useElementSize` - composable-функция предназначеная для получения реактивных значений размеров массива DOM-элементов:

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
import useElementsSizes from '@iwyfaf-vue-ui/ariadna-ui/useElementsSizes';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Параметры composable

| Argument       | Required | Type                                                                         | Default | Description                                                                            |
|----------------|----------|------------------------------------------------------------------------------|---------|----------------------------------------------------------------------------------------|
| `elementsRef`  | ✓        | `Ref<Array<HTMLElement> \| null> \| ComputedRef<Array<HTMLElement> \| null>` | -       | Реактивная ссылка указывающая на массив `HTMLElement`.                                 |
| `handler`      | -        | `(sizes: Array<TUseElementsSizes>) => void`                                  | -       | Необязательная callback-функция, которая получает текущие значения размеров элементов. |

## Возвращаемые значение

| Property        | Type                             | Description                                           |
|-----------------|----------------------------------|-------------------------------------------------------|
| `sizes`         | `Ref<Array<TUseElementsSizes>>`  | Массив размеров элементов.                            | 

## Применение функции

Для использования composable-функции `useElementsSizes` в вашем проекте, импортируйте её и вызовите, с нужной вам
конфигурацией.

### Обычное применение

::: details Пример
<demo src="./demos/demo.default.vue"></demo>
:::

