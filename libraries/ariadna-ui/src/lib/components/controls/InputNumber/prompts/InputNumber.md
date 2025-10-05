# Компонент InputNumber.vue

Техническое задание для компонента InputNumber:

Необходимо полностью реализовать Vue 3 компонент InputNumber.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── InputNumber                                            # Каталог с именем компонента
│   ├── composables                                        # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useInputNumber                                 # Каталог с composable useInputNumber
│   │   │   ├── useInputNumber.ts                          # Composable useInputNumber
│   │   │   ├── useInputNumber.types.ts                    # Типы composable useInputNumber
│   │   ├── useInputNumberHandlers                         # Каталог с composable useInputNumberHandlers
│   │   │   ├── useInputNumberHandlers.ts                  # Composable useInputNumberHandlers
│   │   │   ├── useInputNumberHandlers.types.ts            # Типы composable useInputNumberHandlers
│   ├── core                                               # Каталог с основными функциональными возможностям элемента
│   │   ├── element                                        # Каталог с функционалом работы с input элементом.
│   │   │   ├── input-number.element.core.ts               # Главный файл
│   │   │   ├── input-number.element.core.types.ts         # Файл с типами
│   │   ├── formatter                                      # Каталог с функционалом форматирования чисел.
│   │   │   ├── input-number.formatter.core.ts             # Главный файл
│   │   │   ├── input-number.formatter.core.types.ts       # Файл с типами
│   │   ├── events                                         # Каталог с функционалом кастомного события для InputNumber.
│   │   │   ├── input-number.events.core.ts                # Главный файл
│   │   │   ├── input-number.events.core.types.ts          # Файл с типами
│   ├── tests                                              # Каталог с Unit-тестами компонента
│   │   ├── components                                     # Каталог с Unit-тестами для компонентов
│   │   │   ├── InputNumber.test.ts                        # Unit-тесты главного компонента
│   │   ├── composables                                    # Каталог с Unit-тестами для composables
│   │   │   ├── useInputNumber.test.ts                     # Unit-тесты composable useInputNumber
│   │   │   ├── useInputNumberHandlers.test.ts             # Unit-тесты composable useInputNumberHandlers
│   │   ├── core                                           # Каталог с Unit-тестами для core
│   │   │   ├── input-number.element.core.test.ts          # Unit-тесты работы с input элементом.
│   │   │   ├── input-number.formatter.core.test.ts        # Unit-тесты форматирования чисел.
│   │   │   ├── input-number.events.core.test.ts           # Unit-тесты кастомного события для InputNumber.
│   │   ├── directives                                     # Каталог с Unit-тестами для core
│   │   │   ├── InputNumber.test.ts                        # Unit-тесты директивы InputNumber.
│   ├── types                                              # Каталог с типами компонента
│   │   ├── InputNumber.enums.ts                           # Enums компонента со значениями props по умолчанию
│   ├── InputNumber.vue                                    # Основной (входной) файл элемента
│   ├── InputNumber.d.ts                                   # Основной файл с типами элементов
```

## Описание компонента

Компонент InputNumber предназначен для ввода и управления числовыми значениями с возможностью 
инкрементации/декрементации, форматирования, валидации и отображения ошибок. Используется в формах и интерфейсах, где
требуется числовой ввод с дополнительными возможностями управления и кастомизации.

## Общие требования

- Компонент должен поддерживать SSR.
- Использование Composition API + `<script setup>`.
- Props типизация через `defineProps<T>()`.
- Slots типизация через `defineSlots<T>()`.
- Emits типизация через `defineEmits<T>()`.
- Строгое разделение логики, типов, core-функционала и тестов по соответствующим директориям.

## Функциональные требования

- Поддержка управления значением через кнопки увеличения/уменьшения (controls).
- Форматирование значения с учетом локали и маскирования.
- Валидация по минимальному и максимальному значению.
- Поддержка префикса/суффикса, кастомных классов и модификаторов.
- Корректная работа каретки при любом состоянии компонента.

### Props

| Prop           | Required | Type                       | Default                                                               | Description                                                                                  |
|----------------|----------|----------------------------|-----------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `modelValue`   | ✓        | `Nullable<number>`         | `0`                                                                   | Значение компонента.                                                                         |
| `label`        | -        | `string`                   | `undefined`                                                           | Текст элемента `label`.                                                                      |
| `id`           | -        | `string`                   | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                           |
| `placeholder`  | -        | `string`                   | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                  |
| `name`         | -        | `string`                   | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.                                         |
| `autocomplete` | -        | `boolean`                  | `false`                                                               | Значение нативного атрибута `autocomplete` элемента `input`.                                 |
| `disabled`     | -        | `boolean`                  | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                     |
| `readonly`     | -        | `boolean`                  | `false`                                                               | Значение нативного атрибута `readonly` элемента `input`.                                     |
| `controls`     | -        | `boolean`                  | `false`                                                               | Состояние отображения элементов для управления операциями увеличения и уменьшения значения.  |
| `size`         | -        | `TSharedPropsSize`         | `EInputNumberPropsDefault.SIZE`                                       | Предопределенные варианты размеров для элемента `input`.                                     |
| `min`          | -        | `number`                   | `undefined`                                                           | Минимальное значение `input`.                                                                |
| `max`          | -        | `number`                   | `undefined`                                                           | Максимальное значение `input`.                                                               |
| `step`         | -        | `Numberish`                | `EInputNumberPropsDefault.STEP`                                       | Шаговый коэффициент для увеличения или уменьшения значения. Может быть целым или десятичным. |
| `empty`        | -        | `string`                   | `null`                                                                | Значение элемента `input` по умолчанию, если значение отсутствует.                           |
| `prefix`       | -        | `string`                   | `undefined`                                                           | Текст, который будет показан до значения.                                                    |
| `suffix`       | -        | `string`                   | `undefined`                                                           | Текст, который будет показан после значения.                                                 |
| `locale`       | -        | `TBcpLanguageTags \| null` | `undefined`                                                           | Локаль, которая будет использоваться при форматировании значения `input`.                    |
| `masked`       | -        | `boolean`                  | `false`                                                               | Значение компонента будет замаскировано (может содержать разделительные символы).            |
| `valid`        | -        | `boolean`                  | `false`                                                               | Состояние компонента `valid`.                                                                |
| `invalid`      | -        | `boolean`                  | `false`                                                               | Состояние компонента `invalid`.                                                              |
| `errors`       | -        | `Array<string>`            | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                |
| `cssClass`     | -        | `string`                   | `EInputNumberPropsDefault.CSS_CLASS`                                  | Переопределяет структуру CSS классов.                                                        |
| `modifier`     | -        | `TSharedPropsModifier`     | `undefined`                                                           | Модификатор базового CSS-класса.                                                             |

### Slots

| Slot               | Description                                                                                                         |
|--------------------|---------------------------------------------------------------------------------------------------------------------|
| `placeholder`      | Используется для кастомизации `placeholder`, например для создания анимации.                                        |
| `decrementControl` | Используется для кастомизации контрола управления уменьшением значения.                                             |
| `incrementControl` | Используется для кастомизации контрола управления увеличением значения.                                             |
| `addonBefore`      | Содержимое, отображаемое перед полем ввода.                                                                         |
| `addonAfter`       | Содержимое, отображаемое после поля ввода.                                                                          |
| `errors`           | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.  |

### Emits

| Event                | Payload                                 | Description                                                                                     |
|----------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------|
| `update:model-value` | `payload: Numberish \| undefined`       | Событие срабатывает при обновлении значения `modelValue`.                                       |
| `focus`              | `event: Event`                          | Событие срабатывает когда компонент получает фокусировку.                                       |
| `blur`               | `event: Event`                          | Событие срабатывает когда компонент теряет фокусировку.                                         |
| `change`             | `event: Event`                          | Событие срабатывает когда значение компонента поменялось.                                       |
| `step`               | `payload: TInputNumberEmitStepPayload`  | Событие срабатывает при изменении значения компонента с помощью пошаговых элементов управления. |

### Поддержка клавиатуры

| Key           | Function                     |
|---------------|------------------------------|
| `tab`         | Перемещает фокус на `input`. |
| `up arrow`    | Увеличивает значение.        |
| `down arrow`  | Уменьшает значение.          |

## Требования к тестированию:

- Покрыть компонент unit-тестами.

## Требования к документации

- Типы должны находится в отдельном файле `useInputNumber.d.ts`; 
- Добавить TSDoc-комментарии к типам, компоненту и composable. 
- Описание сценариев применения компонента.
