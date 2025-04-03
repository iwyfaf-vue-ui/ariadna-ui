---
layout: doc
---

# CamelToKebab

CamelToKebab - это функция, которая преобразует строку `camelCase` или `PascalCase` в строку `kebab-case`.

Вес <Badge type="info">~ 0.20 kB gzipped.</Badge>

## Описание

Функция `camelToKebab` принимает первым параметром аргумент `string` и возвращает его же, но в стиле `kebab-case`.

## Установка

<!--@include: ../../../shared/install.md-->

## Применение функции

Подключив функцию к проекту, вызываем ее и передаем требуемые аргументы:

```typescript
import camelToKebab from '@iwyfaf-vue-ui/ariadna-ui/CamelToKebab';

camelToKebab('camelCase');
camelToKebab('XMLHttpRequest'); 
camelToKebab('already-kebab-case'); 
```

### Аргументы

| Argument | Required | Type      | Default | Description                                           |
|----------|----------|-----------|---------|-------------------------------------------------------|
| string   | ✓        | `string`  | -       | Входная Строка для преобразования в стиль kebab-case. |