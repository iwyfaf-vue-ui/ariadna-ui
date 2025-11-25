# Компонент SelectSingle.vue

Техническое задание для компонента SelectSingle:

Необходимо полностью реализовать Vue 3 компонент SelectSingle.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── SelectSingle                                           # Каталог с именем компонента
│   ├── composables                                        # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useSelectSingle                                # Каталог с composable useSelectSingle
│   │   │   ├── useSelectSingle.ts                         # Composable useSelectSingle
│   │   │   ├── useSelectSingle.types.ts                   # Типы composable useSelectSingle
│   │   ├── useSelectSingleActions                         # Каталог с composable useSelectSingleActions
│   │   │   ├── useSelectSingleActions.ts                  # Composable useSelectSingleActions
│   │   │   ├── useSelectSingleActions.types.ts            # Типы composable useSelectSingleActions
│   ├── tests                                              # Каталог с Unit-тестами компонента
│   │   ├── components                                     # Каталог с Unit-тестами для компонентов
│   │   │   ├── SelectSingle.test.ts                       # Unit-тесты главного компонента
│   │   ├── composables                                    # Каталог с Unit-тестами для composables
│   │   │   ├── useSelectSingle.test.ts                    # Unit-тесты composable useSelectSingle
│   │   │   ├── useSelectSingleActions.test.ts             # Unit-тесты composable useSelectSingleActions
│   ├── types                                              # Каталог с типами компонента
│   │   ├── SelectSingle.enums.ts                          # Enums компонента
│   │   ├── SelectSingle.types.ts                          # Типы компонента
│   ├── SelectSingle.vue                                   # Основной (входной) файл элемента
│   ├── SelectSingle.d.ts                                  # Основной файл с типами элементов
```

## Описание компонента

Компонент SelectSingle предназначен для выбора одного значения из списка опций. Он поддерживает фильтрацию, 
кастомизацию отображения, работу с ошибками и различные состояния (загрузка, отключён, валидация). Используется в 
формах и интерфейсах, где требуется выбор одного элемента из множества.

## Общие требования

- Компонент должен поддерживать SSR.
- Использование Composition API + `<script setup>`.
- Props типизация через `defineProps<T>()`.
- Slots типизация через `defineSlots<T>()`.
- Emits типизация через `defineEmits<T>()`.
- Строгое разделение логики, типов, core-функционала и тестов по соответствующим директориям.

## Функциональные требования

- Отображение выпадающего списка с опциями.
- Возможность фильтрации опций по тексту.
- Поддержка виртуализации длинных списков через `VirtualScroller`.
- Состояния: loading, disabled, valid/invalid, selected.
- Кастомизация отображения через слоты (опции, фильтр, иконки, ошибки и др.).
- Управление фокусом и навигацией с клавиатуры (Space, Enter, Esc, ArrowUp, ArrowDown).
- Отображение ошибок и сообщений валидации.
- Эмит событий при изменении значения, фильтра, фокусе и потере фокуса.

### Props

| Prop              | Required | Type                           | Default                                                               | Description                                                                                                                                 |
|-------------------|----------|--------------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`      | ✓        | `Record<string, any> \| any`   | `null`                                                                | Значение компонента.                                                                                                                        |
| `filterValue`     | -        | `string`                       | `''`                                                                  | Фильтрует данные при конфигурации prop `filter`.                                                                                            |
| `options`         | ✓        | `Array<any>`                   | `[]`                                                                  | Массив элементов для отображения в качестве доступных опций компонента.                                                                     |
| `optionLabel`     | -        | `string`                       | `ESelectSinglePropsDefault.OPTION_LABEL`                              | Имя свойства, которое будет использоваться в качестве label опции. Выдаст ошибку, если `optionLabel` не соответствует объектам в `options`. |
| `optionValue`     | -        | `string \| null`               | `null`                                                                | Имя свойства, используемое в качестве значения опции и компонента, по умолчанию равно самой опции, если не определен.                       |
| `label`           | -        | `string`                       | `undefined`                                                           | Текст элемента `label`.                                                                                                                     |
| `id`              | -        | `string`                       | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                                                          |
| `placeholder`     | -        | `string`                       | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                                                                 |
| `disabled`        | -        | `boolean`                      | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                                                                    |
| `loading`         | -        | `boolean`                      | `false`                                                               | Находится ли компонент в состоянии загрузки.                                                                                                |
| `size`            | -        | `TSharedPropsSize`             | `ESelectSinglePropsDefault.SIZE`                                      | Предопределенные варианты размеров компонента.                                                                                              |
| `filter`          | -        | `TSelectSingleFilter`          | `undefined`                                                           | Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.                                                   |
| `virtualScroller` | -        | `TSelectSingleVirtualScroller` | `undefined`                                                           | Активирует использование VirtualScroller в списке опций.                                                                                    |
| `valid`           | -        | `boolean`                      | `false`                                                               | Состояние компонента `valid`.                                                                                                               |
| `invalid`         | -        | `boolean`                      | `false`                                                               | Состояние компонента `invalid`.                                                                                                             |
| `errors`          | -        | `Array<string>`                | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                                                               |
| `cssClass`        | -        | `string`                       | `ESelectSinglePropsDefault.CSS_CLASS`                                 | Переопределяет структуру CSS классов.                                                                                                       |
| `modifier`        | -        | `TSharedPropsModifier`         | `undefined`                                                           | Модификатор базового CSS-класса.                                                                                                            |
| `ariaLabel`       | -        | `string`                       | `ESelectSinglePropsDefault.ARIA_LABEL`                                | Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.                                                |

### Slots

| Slot          | Description                                                                                                             |
|---------------|-------------------------------------------------------------------------------------------------------------------------|
| `options`     | Слот для отображения списка выбираемых опций.                                                                           |
| `empty`       | Слот для отображения контента при отсутствии доступных опций.                                                           |
| `filterInput` | Слот для отображения кастомного `input` для фильтрации. Используется совместно с props `filter` и `model-value-filter`. |
| `emptyFilter` | Слот для отображения контента, когда фильтрация не дала результатов.                                                    |
| `filterIcon`  | Слот для отображения иконки фильтра рядом с `input` полем фильтрации.                                                   |
| `toggleIcon`  | Слот для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на содержимое слота `cleanIcon`.      |
| `cleanIcon`   | Слот для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.                                |
| `loadingIcon` | Слот для отображения иконки загрузки.                                                                                   |
| `loading`     | Слот для отображения индикатора загрузки в элементе списка опций.                                                       |
| `errors`      | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.      |

### Emits

| Event                 | Payload                                       | Description                                                  |
|-----------------------|-----------------------------------------------|--------------------------------------------------------------|
| `update:modelValue`   | `payload: TSelectSingleProps['modelValue']`   | Событие срабатывает при обновлении значения `modelValue`.    |
| `update:filter-value` | `payload: TSelectSingleProps['filterValue']`  | Событие срабатывает при обновлении значения `filterValue`.   |
| `focus`               | `event: Event`                                | Событие срабатывает когда компонент получает фокусировку.    |
| `blur`                | `event: Event`                                | Событие срабатывает когда компонент теряет фокусировку.      |

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

- Типы должны находится в отдельном файле `useSelectSingle.d.ts`; 
- Добавить TSDoc-комментарии к типам, компоненту и composable. 
- Описание сценариев применения компонента.
 
