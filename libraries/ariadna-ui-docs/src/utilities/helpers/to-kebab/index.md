---
layout: doc
---

# ToKebab

ToKebab - это функция, которая преобразует строку `camelCase` или `PascalCase` в строку `kebab-case`.

Вес <Badge type="info">~ 0.20 kB gzipped.</Badge>

## Описание

Функция `toKebab` принимает первым параметром аргумент `string` и возвращает его же, но в стиле `kebab-case`.

## Установка

<!--@include: ../../../shared/install.md-->

## Применение функции

Подключив функцию к проекту, вызываем ее и передаем требуемые аргументы:

```typescript
import toKebab from '@iwyfaf-vue-ui/ariadna-ui/ToKebab';

toKebab('camelCase');
toKebab('XMLHttpRequest');
toKebab('already-kebab-case'); 
```

### Аргументы

| Argument | Required | Type      | Default | Description                                           |
|----------|----------|-----------|---------|-------------------------------------------------------|
| string   | ✓        | `string`  | -       | Входная Строка для преобразования в стиль kebab-case. |