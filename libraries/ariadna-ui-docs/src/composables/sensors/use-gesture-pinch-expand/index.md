---
layout: doc
---

# useGesturePinchExpand

`useGesturePinchExpand` - это composable-функция предназначеная для обработки сведение пальцев (`pinch`) или разведение
пальцев (`expand`) указанного элемента контейнера.

Вес <Badge type="info">~ 0.67 kB gzipped.</Badge>

## Описание

`useGesturePinchExpand` - composable-функция предназначенная для отслеживания жестов `pinch` (сведение пальцев) и 
`expand` (разведение пальцев) на заданном контейнере или окне браузера. Он позволяет реагировать на изменение 
расстояния между двумя пальцами пользователя, предоставляя информацию о типе жеста и координатах центра.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import useGesturePinchExpand from '@iwyfaf-vue-ui/ariadna-ui/useGesturePinchExpand';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Параметры composable

| Argument      | Required | Type                                                                         | Default                                | Description                                                                                                                                                        |
|---------------|----------|------------------------------------------------------------------------------|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `handler`     | ✓        | `(pinchExpandEvent: TUseGesturePinchExpandEvent, event: TouchEvent) => void` | -                                      | Функция обратного вызова, вызываемая при обнаружении жестов `pinch` или `expand`. Получает объект `pinchExpandEvent` и исходное значение `TouchEvent`.             |
| `container`   | ✓        | `Ref<HTMLElement \| null>`                                                   | -                                      | Реактивная ссылка на HTMLElement контейнера, к которому будут подключены слушатели жестов. Если значение равно `null`, прослушиватели будут подключены к `window`. |
| `options`     | -        | `TUseGesturePinchExpandOptions`                                              | `useGesturePinchExpandDefaultOptions`  | Необязательный объект конфигурации.                                                                                                                                |

## Возвращаемые значение

<!--@include: ../../../shared/functions/return-void.md-->

## Применение функции

Для использования composable-функции `useGesturePinchExpand` в вашем проекте, импортируйте её и вызовите, с нужной вам
конфигурацией.

### Обычное применение

::: details Пример
<demo src="./demos/demo.default.vue"></demo>
:::
