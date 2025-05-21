# Техническое задание

Необходимо полностью реализовать Vue 3 компонент InputText.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── InputText                                         # Каталог с именем компонента
│   ├── composables                                   # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useInputText                              # Каталог с composable useInputText
│   │   │   ├── useInputText.ts                       # Composable useInputText
│   │   │   ├── useInputText.types.ts                 # Типы composable useInputText
│   ├── tests                                         # Каталог с Unit-тестами компонента
│   │   ├── components                                # Каталог с Unit-тестами для компонентов
│   │   │   ├── InputText.test.ts                     # Unit-тесты главного компонента
│   │   ├── composables                               # Каталог с Unit-тестами для composables
│   │   │   ├── useInputText.test.ts                  # Unit-тесты composable useInputText
│   ├── types                                         # Каталог с типами компонента
│   │   ├── InputText.enums.ts                        # Enums компонента со значениями props по умолчанию
│   ├── InputText.vue                                 # Основной (входной) файл элемента
│   ├── InputText.d.ts                                # Основной файл с типами элементов
```

## Компонент InputText.vue
Техническое задание для компонента InputText:

1. Назначение
    * Компонент InputText предназначен для ввода текстовой информации пользователем. Является универсальным контролом
   ввода с поддержкой темизации, различных размеров, состояния валидации, кастомизации отображения ошибок через слоты.
2. Общие требования:
    * Компонент должен поддерживать SSR.
    * Использование Composition API + `<script setup>`.
    * Prop типизация через `defineProps<T>()`.
    * Slots типизация через `defineSlots<T>()`.
    * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
    * Реактивный функционал должен быть реализован в composable `useInputText`.
    * Поддержка двух типов input: `text` и `email`.
    * Поддержка `label`, `placeholder`, `name`, `id`, `autocomplete`, `disabled`, `readonly`.
    * Поддержка размеров: `small`, `medium`, `large`.
    * Поддержка состояний: `valid`, `invalid`, `disabled`, `filled`, `focused`, `hovered`.
    * Отображение ошибок из массива `errors`, с возможностью кастомизации через слот.
    * Возможность кастомизации `placeholder` через слот.
    * Эмит событий: `update:model-value`, `focus`, `blur`, `change`.
    * Генерация уникального `id`, если не задан явно.
    * Анимация появления/скрытия блока ошибок.
4. Пропсы*:*
    * `modelValue: Nullable`  (обязательный).
    * `label?: string`.
    * `type?: 'text' | 'email'` (по умолчанию `'text'`).
    * `id?: string` (по умолчанию генерируется).
    * `placeholder?: string`.
    * `name?: string`.
    * `autocomplete?: boolean` (по умолчанию `false`).
    * `disabled?: boolean` (по умолчанию `false`).
    * `readonly?: boolean` (по умолчанию `false`).
    * `size?: 'small' | 'medium' | 'large'` (по умолчанию `'medium'`).
    * `valid?: boolean` (по умолчанию `false`).
    * `invalid?: boolean` (по умолчанию `false`).
    * `errors?: Array`  (по умолчанию `[]`).
    * `cssClass?: string` (по умолчанию `'ar-input-text'`) 
    * `modifier` (тип: `TSharedPropsModifier`, по умолчанию: `undefined`): Модификатор базового CSS класса.
5. Слоты:
    * `placeholder` — кастомный `placeholder`, если задан, prop `placeholder` игнорируется.
    * `errors` — кастомный вывод ошибок, получает prop `errors`.
6. События:
   * `update:model-value` — событие вызывается при измнении vModel.
   * `focus` — событие вызывается при наличии фокуса на `<input>`.
   * `blur` — событие вызывается при потере фокуса с `<input>`.
   * `change` — событие вызывается по окончании изменения значения `<input>`.
7. Требования к стилям:
    * Отсутствуют.
8. Требования к тестированию:
    * Покрыть компонент unit-тестами:
9. Требования к документации:
    * Типы должны находится в отдельном файле `InputText.d.ts`;
    * Добавить TSDoc-комментарии к типам, компоненту и composable.
    * Описание сценариев применения компонента.
