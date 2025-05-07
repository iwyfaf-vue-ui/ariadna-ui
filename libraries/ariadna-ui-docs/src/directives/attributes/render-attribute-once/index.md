---
layout: doc
---

# RenderAttributeOnce

`RenderAttributeOnce` - это Vue директива, предназначена для однократного добавления заданных HTML-атрибутов к элементу, 
если эти атрибуты ещё не были установлены. Используется для предотвращения повторной установки атрибутов при повторных
рендерах компонента.

Вес <Badge type="info">~ 0.20 kB gzipped.</Badge>

## Описание

Vue-директива `RenderAttributeOnce` - реализует установку HTML-атрибутов для элемента, только если они еще не были 
установлены. Это гарантирует, что каждый атрибут из предоставленных в значении директивы, отображается
только один раз и не перезаписывается, если он уже существует.

Актуально для SSR, когда значение атрибутов может быть генерировано дважды, на клиенте и на сервере.

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import vRenderAttributeOnce from '@iwyfaf-vue-ui/ariadna-ui/RenderAttributeOnce';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Применение директивы

Задача директивы `RenderAttributeOnce` - избежать повторного рендера данных в перечисленных в binding атрибутах. 
Директива принимает любое количество атрибутов в виде `key: value`, где `key` - атрибут, а `value` - его значение, 
которое никогда не изменится.

```vue
<template>
  <label v-render-attribute-once="{ for: randomId, foo: 'value', bar: 'value' }"></label>
  <textarea v-render-attribute-once="{ id: randomId, foo: 'value', bar: 'value' }" />
</template>

<script setup lang="ts">
// Directives
import vRenderAttributeOnce from '@iwyfaf-vue-ui/ariadna-ui/RenderAttributeOnce';

const randomId = (Math.random() + 1).toString(36).substring(7);
</script>
```

::: details Пример
<demo src="./demos/demo.full.vue"></demo>
:::