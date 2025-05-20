---
layout: doc
---

# OnClickOutside

`OnClickOutside` - это Vue директива, которая определяет `click` или `touchstart` событие за пределами связанного 
элемента и вызывает указанную `callback`-функцию. Полезна для закрытия выпадающих списков, модальных элементов или 
всплывающих окон, когда пользователь взаимодействует не с этими элементами.

Вес <Badge type="info">~ 0.61 kB gzipped.</Badge>

## Описание

Vue-директива `OnClickOutside` - привязывает прослушиватель событий к `document` и вызывает `callback`-функцию, когда 
событие `click` или `touchstart` происходит за пределами целевого элемента. Она автоматически управляет 
прослушивателями событий в течение жизненного цикла компонента (`mounted`, `updated`, `unmounted`).

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

### Vue 3

```typescript
import vOnClickOutside from '@iwyfaf-vue-ui/ariadna-ui/OnClickOutside';
```

### Nuxt 3

<!--@include: ../../../shared/import/nuxt-3.md-->

## Применение директивы

После подключения директивы к проекту, можно использовать её в шаблоне компонента для обработки кликов вне 
определённого элемента.

### Пример

::: details Пример
<demo src="./demos/demo.default.vue"></demo>
:::
