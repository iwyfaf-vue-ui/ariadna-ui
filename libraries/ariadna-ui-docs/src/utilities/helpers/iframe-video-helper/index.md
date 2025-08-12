---
layout: doc
---

# IframeVideoHelper

IframeVideoHelper - это вспомогательный класс для управления iframe-видео с поддерживаемых хостингов (например, YouTube,
Rutube, Vimeo).

Вес <Badge type="info">~ 1.35 kB gzipped.</Badge>

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import IframeVideoHelper from '@iwyfaf-vue-ui/ariadna-ui/IframeVideoHelper';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Методы класса

| Method           | Argument | Type                 | ReturnType       | Description                                                  |
|------------------|----------|----------------------|------------------|--------------------------------------------------------------|
| `isSupported`    | `url`    | `string`             | `boolean`        | Проверяет, поддерживается ли переданный URL.                 |
| `getIframeUrl`   | `url`    | `string`             | `string \| null` | Преобразует ссылку на видео в URL для вставки в iframe.      |
| `registerIframe` | `iframe` | `HTMLIFrameElement`  | `void`           | Регистрирует iframe и определяет его хост.                   |
| `play`           | `iframe` | `HTMLIFrameElement`  | `void`           | Запускает воспроизведение видео в iframe.                    |
| `stop`           | `iframe` | `HTMLIFrameElement`  | `void`           | Останавливает воспроизведение видео в iframe.                |
| `playAll`        | `-`      | `HTMLIFrameElement`  | `void`           | Запускает воспроизведение всех зарегистрированных видео.     |
| `stopAll`        | `-`      | `HTMLIFrameElement`  | `void`           | Останавливает воспроизведение всех зарегистрированных видео. |
| `clear`          | `-`      | `HTMLIFrameElement`  | `void`           | Очищает список зарегистрированных iframe.                    |

## Применение

### Метод `isSupported`

Метод `isSupported` позволяет проверить, поддерживается ли переданный URL.

::: details Пример
<demo src="./demos/demo.is-supported.vue"></demo>
:::

### Метод `getIframeUrl`

Метод `getIframeUrl` преобразует ссылку на видео в URL, подходящий для вставки в iframe.

::: details Пример
<demo src="./demos/demo.get-frame-url.vue"></demo>
:::

### Метод `registerIframe`

Метод `registerIframe` сохраняет `iframe` и определяет его хост.

::: details Пример
<demo src="./demos/demo.register-iframe.vue"></demo>
:::

### Метод `play`

Метод `play` запускает воспроизведение указанного iframe.

::: details Пример
<demo src="./demos/demo.play.vue"></demo>
:::

### Метод `stop`

Метод `stop` останавливает воспроизведение указанного iframe.

::: details Пример
<demo src="./demos/demo.stop.vue"></demo>
:::

### Метод `playAll`

Метод `playAll` запускает воспроизведение всех зарегистрированных iframe.

::: details Пример
<demo src="./demos/demo.play-all.vue"></demo>
:::

### Метод `stopAll`

Метод `stopAll` останавливает воспроизведение всех зарегистрированных iframe.

::: details Пример
<demo src="./demos/demo.stop-all.vue"></demo>
:::

### Метод `clear`

Метод `clear` удаляет все зарегистрированные iframe.

::: details Пример
<demo src="./demos/demo.clear.vue"></demo>
:::

## Поддерживаемые платформы 

- YouTube (`youtube.com`, `youtu.be`)
- Rutube (`rutube.ru`)

## Примечания

- Для YouTube `enablejsapi=1` необходимо для управления через `postMessage`.
- Управление воспроизведением возможно только для корректно загруженных `iframe`.
