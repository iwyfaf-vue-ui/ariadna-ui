---
layout: doc
---

# Capitalize

Capitalize - это функция, которая делает первую букву заданной строки заглавной.

Вес <Badge type="info">~ 0.15 kB gzipped.</Badge>

## Описание

Функция `capitalize` принимает первым параметром аргумент `string` и возвращает его же, но уже с заглавной буквой.

## Установка

<!--@include: ../../../shared/install.md-->

## Применение функции

Подключив функцию к проекту, вызываем ее и передаем требуемые аргументы:

```typescript
import capitalize from '@iwyfaf-vue-ui/ariadna-ui/Capitalize';

capitalize('hello');
capitalize('world'); 
```

### Аргументы

| Argument | Required | Type      | Default | Description                                          |
|----------|----------|-----------|---------|------------------------------------------------------|
| string   | ✓        | `string`  | -       | Входная строка для преобразования с заглавной буквы. |