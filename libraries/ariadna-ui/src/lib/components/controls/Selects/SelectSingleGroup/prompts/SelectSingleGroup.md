# Компонент SelectSingleGroup.vue

Техническое задание для компонента SelectSingleGroup:

Необходимо полностью реализовать Vue 3 компонент SelectSingleGroup.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── SelectSingleGroup                                      # Каталог с именем компонента
│   ├── composables                                        # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useSelectSingleGroup                           # Каталог с composable useSelectSingleGroup
│   │   │   ├── useSelectSingleGroup.ts                    # Composable useSelectSingleGroup
│   │   │   ├── useSelectSingleGroup.types.ts              # Типы composable useSelectSingleGroup
│   │   ├── useSelectSingleGroupActions                    # Каталог с composable useSelectSingleGroupActions
│   │   │   ├── useSelectSingleGroupActions.ts             # Composable useSelectSingleGroupActions
│   │   │   ├── useSelectSingleGroupActions.types.ts       # Типы composable useSelectSingleGroupActions
│   │   ├── useSelectSingleGroupScroll                     # Каталог с composable useSelectSingleGroupScroll
│   │   │   ├── useSelectSingleGroupScroll.ts              # Composable useSelectSingleGroupScroll
│   │   │   ├── useSelectSingleGroupScroll.types.ts        # Типы composable useSelectSingleGroupScroll
│   ├── tests                                              # Каталог с Unit-тестами компонента
│   │   ├── components                                     # Каталог с Unit-тестами для компонентов
│   │   │   ├── SelectSingleGroup.test.ts                  # Unit-тесты главного компонента
│   │   ├── composables                                    # Каталог с Unit-тестами для composables
│   │   │   ├── SelectSingleGroup.test.ts                  # Unit-тесты composable SelectSingleGroup
│   │   │   ├── SelectSingleGroupActions.test.ts           # Unit-тесты composable SelectSingleGroupActions
│   │   │   ├── useSelectSingleGroupScroll.test.ts         # Unit-тесты composable useSelectSingleGroupScroll
│   ├── types                                              # Каталог с типами компонента
│   │   ├── SelectSingleGroup.enums.ts                     # Enums компонента
│   │   ├── SelectSingleGroup.types.ts                     # Типы компонента
│   ├── SelectSingleGroup.vue                              # Основной (входной) файл элемента
│   ├── SelectSingleGroup.d.ts                             # Основной файл с типами элементов
```

## Описание компонента

Компонент SelectSingleGroup предназначен для создания выпадающего списка с группировкой опций, позволяющего 
пользователю выбрать одно значение из предложенных вариантов. Он поддерживает фильтрацию, кастомизацию отображения, 
работу с ошибками и различные состояния (загрузка, отключён, валидация). Используется в формах и интерфейсах, где 
требуется выбор одного элемента из множества.

## Общие требования

- Компонент должен поддерживать SSR.
- Использование Composition API + `<script setup>`.
- Props типизация через `defineProps<T>()`.
- Slots типизация через `defineSlots<T>()`.
- Emits типизация через `defineEmits<T>()`.
- Строгое разделение логики, типов, core-функционала и тестов по соответствующим директориям.

## Функциональные требования

- Отображение выпадающего списка с сгруппированными опциями.
- Возможность фильтрации опций по тексту.
- Поддержка виртуализации длинных списков через `VirtualScroller`.
- Состояния: loading, disabled, valid/invalid, selected.
- Кастомизация отображения через слоты (опции, фильтр, иконки, ошибки и др.).
- Управление фокусом и навигацией с клавиатуры (Space, Enter, Esc, ArrowUp, ArrowDown).
- Отображение ошибок и сообщений валидации.
- Эмит событий при изменении значения, фильтра, фокусе и потере фокуса.

### Props

| Prop                   | Required | Type                         | Default                                                               | Description                                                                                                                                 |
|------------------------|----------|------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`           | ✓        | `Record<string, any> \| any` | `null`                                                                | Значение компонента.                                                                                                                        |
| `filterValue`          | -        | `string`                     | `''`                                                                  | Фильтрует данные при конфигурации prop `filter`.                                                                                            |
| `options`              | ✓        | `Array<any>`                 | `[]`                                                                  | Массив элементов для отображения в качестве доступных опций компонента.                                                                     |
| `optionLabel`          | -        | `string`                     | `ESelectSingleGroupPropsDefault.OPTION_LABEL`                         | Имя свойства, которое будет использоваться в качестве label опции. Выдаст ошибку, если `optionLabel` не соответствует объектам в `options`. |
| `optionValue`          | -        | `string \| null`             | `null`                                                                | Имя свойства, используемое в качестве значения опции и компонента, по умолчанию равно самой опции, если не определен.                       |
| `optionGroupLabel`     | -        | `string`                     | `ESelectSingleGroupPropsDefault.OPTION_GROUP_LABEL`                   | Имя свойства, которое будет использоваться в качестве label группы опций.                                                                   |
| `optionGroupChildren`  | -        | `string`                     | `ESelectSingleGroupPropsDefault.OPTION_GROUP_CHILDREN`                | Имя свойства для вложенных опций группы.                                                                                                    |
| `label`                | -        | `string`                     | `undefined`                                                           | Текст элемента `label`.                                                                                                                     |
| `id`                   | -        | `string`                     | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                                                          |
| `placeholder`          | -        | `string`                     | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                                                                 |
| `disabled`             | -        | `boolean`                    | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                                                                    |
| `loading`              | -        | `boolean`                    | `false`                                                               | Находится ли компонент в состоянии загрузки.                                                                                                |
| `size`                 | -        | `TSharedPropsSize`           | `ESelectSingleGroupPropsDefault.SIZE`                                 | Предопределенные варианты размеров компонента.                                                                                              |
| `filter`               | -        | `TSelectSingleGroupFilter`   | `undefined`                                                           | Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.                                                   |
| `valid`                | -        | `boolean`                    | `false`                                                               | Состояние компонента `valid`.                                                                                                               |
| `invalid`              | -        | `boolean`                    | `false`                                                               | Состояние компонента `invalid`.                                                                                                             |
| `errors`               | -        | `Array<string>`              | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                                                               |
| `cssClass`             | -        | `string`                     | `ESelectSingleGroupPropsDefault.CSS_CLASS`                            | Переопределяет структуру CSS классов.                                                                                                       |
| `modifier`             | -        | `TSharedPropsModifier`       | `undefined`                                                           | Модификатор базового CSS-класса.                                                                                                            |
| `ariaLabel`            | -        | `string`                     | `ESelectSingleGroupPropsDefault.ARIA_LABEL`                           | Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.                                                |

### Slots

| Slot            | Description                                                                                                             |
|-----------------|-------------------------------------------------------------------------------------------------------------------------|
| `optionsGroup`  | Слот для отображения списка групп опций.                                                                                |
| `options`       | Слот для отображения списка выбираемых опций.                                                                           |
| `empty`         | Слот для отображения контента при отсутствии доступных опций.                                                           |
| `filterInput`   | Слот для отображения кастомного `input` для фильтрации. Используется совместно с props `filter` и `model-value-filter`. |
| `emptyFilter`   | Слот для отображения контента, когда фильтрация не дала результатов.                                                    |
| `filterIcon`    | Слот для отображения иконки фильтра рядом с `input` полем фильтрации.                                                   |
| `toggleIcon`    | Слот для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на содержимое слота `cleanIcon`.      |
| `cleanIcon`     | Слот для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.                                |
| `loadingIcon`   | Слот для отображения иконки загрузки.                                                                                   |
| `loading`       | Слот для отображения индикатора загрузки в элементе списка опций.                                                       |
| `errors`        | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.      |

### Emits

| Event                 | Payload                                           | Description                                                  |
|-----------------------|---------------------------------------------------|--------------------------------------------------------------|
| `update:modelValue`   | `payload: TSelectSingleGroupProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`.    |
| `update:filter-value` | `payload: TSelectSingleGroupProps['filterValue']` | Событие срабатывает при обновлении значения `filterValue`.   |
| `focus`               | `event: Event`                                    | Событие срабатывает когда компонент получает фокусировку.    |
| `blur`                | `event: Event`                                    | Событие срабатывает когда компонент теряет фокусировку.      |

### Поддержка клавиатуры

| Key              | Function                                                     |
|------------------|--------------------------------------------------------------|
| `Space`, `Enter` | Открывает список опций или выбирает/снимает выбранную опцию. |
| `ArrowUp`        | Перемещение по опциями вверх.                                |
| `ArrowDown`      | Перемещение по опциями вниз.                                 |
| `Esc`            | Закрывает список опций.                                      |

## Требования к тестированию:

- Покрыть компонент unit-тестами.

## Требования к документации

- Типы должны находится в отдельном файле `SelectSingleGroup.d.ts`;
- Добавить TSDoc-комментарии к типам, компоненту и composable.
- Описание сценариев применения компонента. 
