# Компонент SelectMultipleGroup.vue

Техническое задание для компонента SelectMultipleGroup:

Необходимо полностью реализовать Vue 3 компонент SelectMultipleGroup.vue по требованиям ниже, включая ВСЕ перечисленные
в структуре файлы.

## Структура:

```text
├── SelectMultipleGroup                                    # Каталог с именем компонента
│   ├── composables                                        # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useSelectMultipleGroup                         # Каталог с composable SelectMultipleGroup
│   │   │   ├── useSelectMultipleGroup.ts                  # Composable SelectMultipleGroup
│   │   │   ├── useSelectMultipleGroup.types.ts            # Типы composable SelectMultipleGroup
│   │   ├── useSelectMultipleGroupActions                  # Каталог с composable SelectMultipleGroupActions
│   │   │   ├── useSelectMultipleGroupActions.ts           # Composable SelectMultipleGroupActions
│   │   │   ├── useSelectMultipleGroupActions.types.ts     # Типы composable SelectMultipleGroupActions
│   │   ├── useSelectMultipleGroupCheckbox                 # Каталог с composable SelectMultipleGroupCheckbox
│   │   │   ├── useSelectMultipleGroupCheckbox.ts          # Composable SelectMultipleGroupCheckbox
│   │   │   ├── useSelectMultipleGroupCheckbox.types.ts    # Типы composable SelectMultipleGroupCheckbox
│   ├── tests                                              # Каталог с Unit-тестами компонента
│   │   ├── components                                     # Каталог с Unit-тестами для компонентов
│   │   │   ├── SelectMultipleGroup.test.ts                # Unit-тесты главного компонента
│   │   ├── composables                                    # Каталог с Unit-тестами для composables
│   │   │   ├── SelectMultipleGroup.test.ts                # Unit-тесты composable SelectMultipleGroup
│   │   │   ├── SelectMultipleGroupActions.test.ts         # Unit-тесты composable SelectMultipleGroupActions
│   │   │   ├── SelectMultipleGroupCheckbox.test.ts        # Unit-тесты composable SelectMultipleGroupCheckbox
│   ├── types                                              # Каталог с типами компонента
│   │   ├── SelectMultipleGroup.enums.ts                   # Enums компонента
│   │   ├── SelectMultipleGroup.types.ts                   # Типы компонента
│   ├── SelectMultipleGroup.vue                            # Основной (входной) файл элемента
│   ├── SelectMultipleGroup.d.ts                           # Основной файл с типами элементов
```

## Описание компонента

Компонент SelectMultipleGroup предназначен для выбора нескольких элементов из списка с группировкой опций. Он 
предназначен для использования в формах и интерфейсах, где требуется множественный выбор с поддержкой фильтрации, 
кастомизации отображения выбранных значений, управления через чекбокс, виртуализации длинных списков и расширенной 
работы со 
слотами.

## Общие требования

- Компонент должен поддерживать SSR.
- Использование Composition API + `<script setup>`.
- Props типизация через `defineProps<T>()`.
- Slots типизация через `defineSlots<T>()`.
- Emits типизация через `defineEmits<T>()`.
- Строгое разделение логики, типов, core-функционала и тестов по соответствующим директориям.

## Функциональные требования

- Отображение выпадающего списка с сгруппированными опциями с возможностью выбора нескольких значений.
- Кастомизация отображения выбранных значений: как текст, плитки или по шаблону.
- Фильтрация опций по тексту с возможностью кастомизации поля фильтрации.
- Управление выбором всех опций через чекбокс (multiselectCheckbox).
- Виртуализация длинных списков опций (VirtualScroller).
- Состояния загрузки, ошибки, валидности/невалидности.
- Поддержка кастомных слотов для всех ключевых частей UI.
- Управление с клавиатуры: открытие/закрытие, навигация по опциям, выбор/снятие выбора.
- Поддержка кастомных aria-атрибутов для улучшения доступности.

### Props

| Prop                   | Required | Type                         | Default                                                               | Description                                                                                                                                                  |
|------------------------|----------|------------------------------|-----------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modelValue`           | ✓        | `Record<string, any> \| any` | `null`                                                                | Значение компонента.                                                                                                                                         |
| `filterValue`          | -        | `string`                     | `''`                                                                  | Фильтрует данные при конфигурации prop `filter`.                                                                                                             |
| `options`              | ✓        | `Array<any>`                 | `[]`                                                                  | Массив элементов для отображения в качестве доступных опций компонента.                                                                                      |
| `optionLabel`          | -        | `string`                     | `ESelectMultipleGroupPropsDefault.OPTION_LABEL`                       | Имя свойства, которое будет использоваться в качестве label опции. Выдаст ошибку, если `optionLabel` не соответствует объектам в `options`.                  |
| `optionValue`          | -        | `string \| null`             | `null`                                                                | Имя свойства, используемое в качестве значения опции и компонента, по умолчанию равно самой опции, если не определен.                                        |
| `optionGroupLabel`     | -        | `string`                     | `ESelectMultipleGroupPropsDefault.OPTION_GROUP_LABEL`                 | Имя свойства, которое будет использоваться в качестве label группы опций.                                                                                    |
| `optionGroupChildren`  | -        | `string`                     | `ESelectMultipleGroupPropsDefault.OPTION_GROUP_CHILDREN`              | Имя свойства для вложенных опций группы.                                                                                                                     |
| `label`                | -        | `string`                     | `undefined`                                                           | Текст элемента `label`.                                                                                                                                      |
| `id`                   | -        | `string`                     | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                                                                           |
| `placeholder`          | -        | `string`                     | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                                                                                  |
| `tiles`                | -        | `boolean`                    | `false`                                                               | Выбранные значения отображаются в виде плиток.                                                                                                               |
| `maxSelectedLabels`    | -        | `number`                     | `undefined`                                                           | Определяет, сколько всего выбранных элементов следует отображать.                                                                                            |
| `selectedItemsLabel`   | -        | `string`                     | `undefined`                                                           | Label, который будет отображаться после превышения максимального количества выбранных элементов. Будет работать, только если задан prop `maxSelectedLabels`. |
| `multiselectCheckbox`  | -        | `boolean`                    | `false`                                                               | Включает и выключает управление чекбоксом для множественного выбора.                                                                                         |
| `disabled`             | -        | `boolean`                    | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                                                                                     |
| `loading`              | -        | `boolean`                    | `false`                                                               | Находится ли компонент в состоянии загрузки.                                                                                                                 |
| `size`                 | -        | `TSharedPropsSize`           | `ESelectMultipleGroupPropsDefault.SIZE`                               | Предопределенные варианты размеров компонента.                                                                                                               |
| `filter`               | -        | `TSelectMultipleGroupFilter` | `undefined`                                                           | Активирует встроенную фильтрацию опций, выводит дефолтное содержимое слота `filterInput`.                                                                    |
| `valid`                | -        | `boolean`                    | `false`                                                               | Состояние компонента `valid`.                                                                                                                                |
| `invalid`              | -        | `boolean`                    | `false`                                                               | Состояние компонента `invalid`.                                                                                                                              |
| `errors`               | -        | `Array<string>`              | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                                                                                |
| `cssClass`             | -        | `string`                     | `ESelectMultipleGroupPropsDefault.CSS_CLASS`                          | Переопределяет структуру CSS классов.                                                                                                                        |
| `modifier`             | -        | `TSharedPropsModifier`       | `undefined`                                                           | Модификатор базового CSS-класса.                                                                                                                             |
| `ariaLabel`            | -        | `string`                     | `ESelectMultipleGroupPropsDefault.ARIA_LABEL`                         | Значение атрибута `aria-label`. Используется для улучшения доступности элементов компонента.                                                                 |

### Slots

| Slot                   | Description                                                                                                             |
|------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `label`                | Слот для отображения `label`, который будет заменять `placeholder`, а также текст выбранного значения.                  |
| `optionsGroup`         | Слот для отображения списка групп опций.                                                                                |
| `options`              | Слот для отображения списка выбираемых опций.                                                                           |
| `empty`                | Слот для отображения контента при отсутствии доступных опций.                                                           |
| `tiles`                | Слот для отображения плиток выбранных значений.                                                                         |
| `multiselectCheckbox`  | Слот для отображения чекбокса для множественного выбора. Используется совместно с props `multiselectCheckbox`.          |
| `filterInput`          | Слот для отображения кастомного `input` для фильтрации. Используется совместно с props `filter` и `model-value-filter`. |
| `emptyFilter`          | Слот для отображения контента, когда фильтрация не дала результатов.                                                    |
| `filterIcon`           | Слот для отображения иконки фильтра рядом с `input` полем фильтрации.                                                   |
| `toggleIcon`           | Слот для отображения иконки раскрытия дроплиста. При выборе элемента - заменяется на содержимое слота `cleanIcon`.      |
| `cleanIcon`            | Слот для отображения иконки clean (очистить). Этот слот появляется, когда выбрана опция.                                |
| `loadingIcon`          | Слот для отображения иконки загрузки.                                                                                   |
| `loading`              | Слот для отображения индикатора загрузки в элементе списка опций.                                                       |
| `errors`               | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.      |

### Emits

| Event                 | Payload                                             | Description                                                  |
|-----------------------|-----------------------------------------------------|--------------------------------------------------------------|
| `update:modelValue`   | `payload: TSelectMultipleGroupProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`.    |
| `update:filter-value` | `payload: TSelectMultipleGroupProps['filterValue']` | Событие срабатывает при обновлении значения `filterValue`.   |
| `focus`               | `event: Event`                                      | Событие срабатывает когда компонент получает фокусировку.    |
| `blur`                | `event: Event`                                      | Событие срабатывает когда компонент теряет фокусировку.      |

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

- Типы должны находится в отдельном файле `SelectMultipleGroup.d.ts`;
- Добавить TSDoc-комментарии к типам, компоненту и composable.
- Описание сценариев применения компонента. 
