# Техническое задание

Необходимо полностью реализовать Vue 3 компонент Textarea.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── Textarea                                          # Каталог с именем компонента
│   ├── composables                                   # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useTextarea                               # Каталог с composable useTextarea
│   │   │   ├── useTextarea.ts                        # Composable useTextarea
│   │   │   ├── useTextarea.types.ts                  # Типы composable useTextarea
│   ├── tests                                         # Каталог с Unit-тестами компонента
│   │   ├── components                                # Каталог с Unit-тестами для компонентов
│   │   │   ├── Textarea.test.ts                      # Unit-тесты главного компонента
│   │   ├── composables                               # Каталог с Unit-тестами для composables
│   │   │   ├── useTextarea.test.ts                   # Unit-тесты composable useTextarea
│   ├── types                                         # Каталог с типами компонента
│   │   ├── Textarea.enums.ts                         # Enums компонента
│   ├── Textarea.vue                                  # Основной (входной) файл элемента
│   ├── Textarea.d.ts                                 # Основной файл с типами элементов
```

## Компонент Textarea.vue
Техническое задание для компонента Textarea:

1. Назначение
    * Компонент `Textarea` предназначен для ввода многострочного текста пользователем. Используется в формах и 
   интерфейсах, где требуется ввод больших объемов текстовой информации с возможностью отображения ошибок и 
   кастомизации внешнего вида.
2. Общие требования:
    * Компонент должен поддерживать SSR.
    * Использование Composition API + `<script setup>`.
    * Prop типизация через `defineProps<T>()`.
    * Slots типизация через `defineSlots<T>()`.
    * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
    * Реактивный функционал должен быть реализован в composable `useTextarea`.
    * Отображение многострочного поля ввода (`<textarea>`).
    * Поддержка передачи `placeholder` как через пропс, так и через слот.
    * Управление состояниями: `disabled`, `readonly`, `invalid`.
    * Отображение ошибок валидации с анимацией появления/скрытия.
    * Поддержка передачи дополнительных атрибутов (`name`, `rows`, `cols`, `spellcheck`, `autocomplete`).
4. Пропсы:
    * `modelValue (Nullable<string>)`: Значение textarea (обязательный).
    * `label (string | undefined)`: Текст подписи к полю (по умолчанию `undefined`).
    * `id (string | undefined)`: `id` атрибут `textarea` (по умолчанию генерируется).
    * `placeholder (string | undefined)`: Текст `placeholder` (по умолчанию `undefined`).
    * `name (string | undefined)`: Имя поля (по умолчанию `undefined`).
    * `rows (Numberish)`: Количество строк `textarea` (по умолчанию `2`).
    * `cols (Numberish)`: Количество столбцов `textarea` (по умолчанию `20`).
    * `autocomplete (boolean)`: Включение автозаполнения (по умолчанию `false`).
    * `spellcheck (boolean)`: Включение проверки орфографии (по умолчанию `true`).
    * `disabled (boolean | undefined)`: Отключение поля (по умолчанию `false`).
    * `readonly (boolean | undefined)`: Только для чтения (по умолчанию `false`).
    * `valid (boolean | undefined)`: Состояние валидности поля (по умолчанию `false`).
    * `invalid (boolean | undefined)`: Состояние невалидности поля (по умолчанию `false`).
    * `errors (Array<string>)`: Список ошибок для отображения (по умолчанию `[]`).
    * `cssClass (string)`: CSS-класс для стилизации (по умолчанию `ar-textarea`).
    * `modifier` (тип: `TSharedPropsModifier`, по умолчанию: `undefined`): Модификатор базового CSS класса.
5. Слоты:
    * `placeholder`: Кастомный `placeholder` (опционально).
    * `errors`: Кастомное отображение ошибок, получает проп `errors`.
6. События:
   * `update:model-value` — событие вызывается при измнении vModel.
   * `focus` — событие вызывается при наличии фокуса на `<textarea>`.
   * `blur` — событие вызывается при потере фокуса с `<textarea>`.
   * `change` — событие вызывается по окончании изменения значения `<textarea>`.
7. Требования к стилям:
    * Отсутствуют.
8. Требования к тестированию:
    * Покрыть компонент unit-тестами:
9. Требования к документации:
    * Типы должны находится в отдельном файле `useTextarea.d.ts`;
    * Добавить TSDoc-комментарии к типам, компоненту и composable.
    * Описание сценариев применения компонента.
