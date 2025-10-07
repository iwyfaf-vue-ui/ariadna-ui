# Компонент InputPassword.vue

Техническое задание для компонента InputPassword:

Необходимо полностью реализовать Vue 3 компонент InputPassword.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── InputPassword                                          # Каталог с именем компонента
│   ├── composables                                        # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useInputPassword                               # Каталог с composable useInputPassword
│   │   │   ├── useInputPassword.ts                        # Composable useInputPassword
│   │   │   ├── useInputPassword.types.ts                  # Типы composable useInputPassword
│   │   ├── useInputPasswordRules                          # Каталог с composable useInputPasswordRules
│   │   │   ├── useInputPasswordRules.ts                   # Composable useInputPasswordRules
│   │   │   ├── useInputPasswordRules.types.ts             # Типы composable useInputPasswordRules
│   │   ├── useInputPasswordMeterPanel                     # Каталог с composable useInputPasswordMeterPanel
│   │   │   ├── useInputPasswordMeterPanel.ts              # Composable useInputPasswordMeterPanel
│   │   │   ├── useInputPasswordMeterPanel.types.ts        # Типы composable useInputPasswordMeterPanel
│   ├── tests                                              # Каталог с Unit-тестами компонента
│   │   ├── components                                     # Каталог с Unit-тестами для компонентов
│   │   │   ├── InputPassword.test.ts                      # Unit-тесты главного компонента
│   │   ├── composables                                    # Каталог с Unit-тестами для composables
│   │   │   ├── useInputPassword.test.ts                   # Unit-тесты composable useInputPassword
│   │   │   ├── useInputPasswordRules.test.ts              # Unit-тесты composable useInputPasswordRules
│   │   │   ├── useInputPasswordMeterPanel.test.ts         # Unit-тесты composable useInputPasswordMeterPanel
│   ├── types                                              # Каталог с типами компонента
│   │   ├── InputPassword.enums.ts                         # Enums компонента
│   │   ├── InputPassword.types.ts                         # Типы компонента
│   ├── InputPassword.vue                                  # Основной (входной) файл элемента
│   ├── InputPassword.d.ts                                 # Основной файл с типами элементов
```

## Описание компонента

Компонент InputPassword предназначен для ввода пароля с дополнительными функциями, такими как переключение видимости 
пароля, отображение индикатора сложности пароля и валидация введенного пароля по заданным правилам.

## Общие требования

- Компонент должен поддерживать SSR.
- Использование Composition API + `<script setup>`.
- Props типизация через `defineProps<T>()`.
- Slots типизация через `defineSlots<T>()`.
- Emits типизация через `defineEmits<T>()`.
- Строгое разделение логики, типов, core-функционала и тестов по соответствующим директориям.

## Функциональные требования

- 

### Props

| Prop                 | Required | Type                        | Default                                                               | Description                                                                                       |
|----------------------|----------|-----------------------------|-----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| `modelValue`         | ✓        | `Nullable<string>`          | `null`                                                                | Значение компонента.                                                                              |
| `label`              | -        | `string`                    | `undefined`                                                           | Текст элемента `label`.                                                                           |
| `id`                 | -        | `string`                    | Случайно сгенерированная строка с помощью помощника Vue 3.5 `useId()` | Значение нативного атрибута `id` элемента `input`.                                                |
| `placeholder`        | -        | `string`                    | `undefined`                                                           | Значение нативного атрибута `placeholder` элемента `input`.                                       |
| `name`               | -        | `string`                    | `undefined`                                                           | Значение нативного атрибута `name` элемента `input`.                                              |
| `autocomplete`       | -        | `boolean`                   | `false`                                                               | Значение нативного атрибута `autocomplete` элемента `input`.                                      |
| `disabled`           | -        | `boolean`                   | `false`                                                               | Значение нативного атрибута `disabled` элемента `input`.                                          |
| `readonly`           | -        | `boolean`                   | `false`                                                               | Значение нативного атрибута `readonly` элемента `input`.                                          |
| `size`               | -        | `TSharedPropsSize`          | `EInputPasswordPropsDefault.SIZE`                                     | Предопределенные варианты размеров для элемента `input`.                                          |
| `showPassword`       | -        | `boolean`                   | `false`                                                               | Отображать пароль в открытом виде по умолчанию (вместо маскирования).                             |
| `showPasswordToggle` | -        | `boolean`                   | `false`                                                               | Показывать/скрывать кнопку переключения видимости пароля.                                         |
| `rules`              | -        | `Array<TInputPasswordRule>` | `[]`                                                                  | Список правил для оценки/проверки пароля (например, проверка длины, наличие спецсимволов и т.п.). |
| `valid`              | -        | `boolean`                   | `false`                                                               | Состояние компонента `valid`.                                                                     |
| `invalid`            | -        | `boolean`                   | `false`                                                               | Состояние компонента `invalid`.                                                                   |
| `errors`             | -        | `Array<string>`             | `[]`                                                                  | Массив ошибок. Используется в слоте `errors`.                                                     |
| `cssClass`           | -        | `string`                    | `EInputPasswordPropsDefault.CSS_CLASS`                                | Переопределяет структуру CSS классов.                                                             |
| `modifier`           | -        | `TSharedPropsModifier`      | `undefined`                                                           | Модификатор базового CSS-класса.                                                                  |

### Slots

| Slot               | Description                                                                                                                                          |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `placeholder`      | Используется для кастомизации `placeholder`, например для создания анимации.                                                                         |
| `toggleButton`     | Используется для кастомизации кнопки переключения видимости пароля.                                                                                  |
| `meter`            | Используется для кастомизации отображения «сложности пароля». Например, выводить индикатор прогресса или шкалу.                                      |
| `meterLabel`       | Используется для кастомизации только текстовой метки «сложности пароля».                                                                             |
| `conditionsNotMet` | Используется для кастомизации невыполненных правил (например, если в пароле нет цифры, недостаточная длина и т.п.).                                  |
| `errors`           | Используется для вывода сообщений об ошибках. В props `errors` передаются ошибки, которые затем выводятся в слоте.                                   |

### Emits

| Event                | Payload                                       | Description                                                                                     |
|----------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------|
| `update:model-value` | `payload: TInputPasswordProps['modelValue']`  | Событие срабатывает при обновлении значения `modelValue`.                                       |
| `focus`              | `event: Event`                                | Событие срабатывает когда компонент получает фокусировку.                                       |
| `blur`               | `event: Event`                                | Событие срабатывает когда компонент теряет фокусировку.                                         |
| `change`             | `event: Event`                                | Событие срабатывает когда значение компонента поменялось.                                       |

### Поддержка клавиатуры

Не требуется.

## Требования к тестированию:

- Покрыть компонент unit-тестами.

## Требования к документации

- Типы должны находится в отдельном файле `useInputPassword.d.ts`; 
- Добавить TSDoc-комментарии к типам, компоненту и composable. 
- Описание сценариев применения компонента.
