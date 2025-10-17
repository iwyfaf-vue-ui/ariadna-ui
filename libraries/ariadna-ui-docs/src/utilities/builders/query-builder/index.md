---
layout: doc
---

# QueryBuilder

`QueryBuilder` - это класс для создания query-параметров и управления ими.

Вес <Badge type="info">~ 0.61 kB gzipped.</Badge>

## Описание

Утилита `QueryBuilder` предназначена для удобного и типобезопасного построения и управления параметрами URL-запросов. 
Она позволяет создавать, изменять, удалять и очищать параметры запроса, а также формировать строку запроса и объект 
параметров для дальнейшего использования в приложении.

## Установка

<!--@include: ../../../shared/install.md-->

## Применение класса

```typescript
import QueryBuilder from '@iwyfaf-vue-ui/ariadna-ui/QueryBuilder';
```

Подключив класс к проекту, создайте экземпляр `QueryBuilder` и вызывайте методы для работы с query-параметрами:

::: details Пример
<demo src="./demos/demo.default.vue" raw></demo>
:::

### Методы класса

#### setParam

Устанавливает значение параметра в виде строки.

::: details Пример
<demo src="./demos/demo.setParam.vue"></demo>
:::

#### setArrayParam

Устанавливает значение параметра в виде массива.

::: details Пример
<demo src="./demos/demo.setArrayParam.vue"></demo>
:::

#### deleteParams

Удаляет указанные `query` параметры.

::: details Пример
<demo src="./demos/demo.deleteParams.vue" raw></demo>
:::

#### clearQuery

Удаляет параметры с пустыми значениями: пустая строка, `null`, `undefined` или пустой массив.

::: details Пример
<demo src="./demos/demo.clearQuery.vue" raw></demo>
:::

#### removeQuery

Полностью очищает все параметры и возвращает `undefined`.

::: details Пример
<demo src="./demos/demo.removeQuery.vue" raw></demo>
:::

#### buildQueryString

Формирует `query` строку из текущих параметров.

::: details Пример
<demo src="./demos/demo.buildQueryString.vue" raw></demo>
:::

#### buildQueryObject

Формирует `query` объект из текущих параметров.

::: details Пример
<demo src="./demos/demo.buildQueryObject.vue" raw></demo>
:::

### Аргументы конструктора

| Argument    | Required | Type                                                                                           | Default | Description                                    |
|-------------|----------|------------------------------------------------------------------------------------------------|---------|------------------------------------------------|
| `params`    | -        | `Partial<Record<keyof Query, string \| (string \| null \| undefined)[] \| undefined \| null>>` | `{}`    | Функция, которую нужно дебаунсить.             |

Фактически, `query` это всегда строки, а значит, нужно не допустить попадание в query-параметры данных кроме строк, 
`undefined`, `null` и их же в виде массива. Это необходимо для дальнейшей очистки этих query - как пустых.

Класс `QueryBuilder` и его методы буду выдавать ошибку типизации, при попытке передать к query, например, число или 
булево значение. Приведение этих данных к корректным для `QueryBuilder` типам - на ответственности разработчика.

### Использование с генериками 

`QueryBuilder` поддерживает generics, позволяя определять структуру query-параметров.

```typescript
type TQueryParams = {
  search: string;
  tags: string[];
  page: string;
};

const query = new QueryBuilder<TQueryParams>();
query.setParam('search', 'vitepress');
query.setArrayParam('tags', ['docs', 'vue']);
query.setParam('page', '1');

console.log(query.buildQueryString()); // "search=vitepress&tags=docs,vue&page=1"
console.log(query.buildQueryObject()); // { search: "vitepress", tags: ["docs", "vue"], page: 1 }
```
