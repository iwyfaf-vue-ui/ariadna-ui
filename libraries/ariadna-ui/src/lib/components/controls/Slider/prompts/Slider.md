# Техническое задание

Необходимо полностью реализовать Vue 3 компонент Slider.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура: 

```text
├── Slider                                            # Каталог с именем компонента
│   ├── composables                                   # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useSlider                                 # Каталог с composable useSlider
│   │   │   ├── useSlider.ts                          # Composable useSlider
│   │   │   ├── useSlider.types.ts                    # Типы composable useSlider
│   │   ├── useSliderEvents                           # Каталог с composable useSliderEvents
│   │   │   ├── useSliderEvents.ts                    # Composable useSliderEvents
│   │   │   ├── useSliderEvents.types.ts              # Типы composable useSliderEvents
│   │   ├── useThumbEvents                            # Каталог с composable useThumbEvents
│   │   │   ├── useThumbEvents.ts                     # Composable useThumbEvents
│   │   │   ├── useThumbEvents.types.ts               # Типы composable useThumbEvents
│   │   ├── useWindowEvents                           # Каталог с composable useWindowEvents
│   │   │   ├── useWindowEvents.ts                    # Composable useWindowEvents
│   │   │   ├── useWindowEvents.types.ts              # Типы composable useWindowEvents 
│   ├── tests                                         # Каталог с Unit-тестами компонента
│   │   ├── components                                # Каталог с Unit-тестами для компонентов
│   │   │   ├── Slider.test.ts                        # Unit-тесты главного компонента
│   │   ├── composables                               # Каталог с Unit-тестами для composables
│   │   │   ├── useSlider.test.ts                     # Unit-тесты composable useSlider
│   │   │   ├── useSliderEvents.test.ts               # Unit-тесты composable useSliderEvents
│   │   │   ├── useThumbEvents.test.ts                # Unit-тесты composable useThumbEvents
│   │   │   ├── useWindowEvents.test.ts               # Unit-тесты composable useWindowEvents
│   ├── types                                         # Каталог с типами компонента
│   │   ├── Slider.enums.ts                           # Enums компонента со значениями props по умолчанию
│   │   ├── Slider.types.ts                           # Types компонента
│   ├── Slider.vue                                    # Основной (входной) файл элемента
│   ├── Slider.d.ts                                   # Основной файл с типами элементов
```

## Компонент Slider.vue
Техническое задание для компонента Slider:

1. Назначение
   * Компонент Slider предназначен для выбора числового значения или диапазона значений с помощью ползунка. 
   Используется для ввода данных пользователем в удобном визуальном формате с возможностью точной настройки.
2. Общие требования:
  * Компонент должен поддерживать SSR.
  * Использование Composition API + `<script setup>`.
  * Prop типизация через `defineProps<T>()`.
  * Slots типизация через `defineSlots<T>()`.
  * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
  * Реактивный функционал должен быть реализован в composable `useSlider`.
  * Компонент должен корректно работать на всех современных браузерах и поддерживать мобильные устройства (тач-события).
  * Отображение одного или нескольких треков с ползунками.
  * Возможность задать минимальное и максимальное значение.
  * Поддержка шага изменения значения (`step`) и произвольных точек (`points`).
  * Отображение меток и значений на треке.
  * Поддержка отключения компонента (`disabled`).
  * Визуальное отображение состояний валидации: валидный, невалидный.
  * Отображение ошибок при невалидном состоянии.
  * Эмит событий при начале изменения, изменении и завершении изменения значения.
4. Пропсы:
  * `modelValue` (`Array<[number, number] | number>`): Текущее значение или значения слайдера (для диапазона). 
Обязательный.
  * `tracks` (`Array<TSliderTrack>`): Конфигурация треков слайдера (ключ, наличие ползунка, метки, zIndex и т.д.). 
Обязательный.
  * `label (string | undefined)`: Текст подписи к полю (по умолчанию `undefined`).
  * `id (string | undefined)`: `id` атрибут `textarea` (по умолчанию генерируется).
  * `min` (`number`): Минимальное значение слайдера.
  * `max` (`number`): Максимальное значение слайдера.
  * `step` (`number | null`): Шаг изменения значения. Если `null`, шаг не применяется.
  * `points` (`Array<number> | null`): Массив точек, к которым можно привязывать значение, имеет приоритет над step.
  * `disabled (boolean | undefined)`: Отключение поля (по умолчанию `false`).
  * `valid (boolean | undefined)`: Состояние валидности поля (по умолчанию `false`).
  * `invalid (boolean | undefined)`: Состояние невалидности поля (по умолчанию `false`).
  * `errors (Array<string>)`: Список ошибок для отображения (по умолчанию `[]`).
  * `cssClass (string)`: CSS-класс для стилизации (по умолчанию `ESliderPropsDefault.CSS_CLASS`).
  * `modifier` (`TSharedPropsModifier`): Модификатор базового CSS класса.
5. Слоты:
  * `point`: Кастомизация отображения точек на треке.
  * `errors`: Кастомное отображение ошибок, получает проп `errors`.
6. События:
  * `update:model-value` — событие вызывается при измнении vModel.
  * `changeStart` — событие вызывается при начале изменения значения (например, при нажатии на ползунок).
  * `change` — событие вызывается при изменении значения в процессе перетаскивания ползунка.
  * `changeEnd` — событие вызывается при завершении изменения значения (например, при отпускании ползунка).
7. Требования к стилям:
  * Отсутствуют.
8. Требования к тестированию:
  * Покрыть компонент unit-тестами:
9. Требования к документации:
  * Типы должны находится в отдельном файле `Slider.d.ts`;
  * Добавить TSDoc-комментарии к типам, компоненту и composable.
  * Описание сценариев применения компонента.
