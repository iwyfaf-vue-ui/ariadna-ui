# Техническое задание

Необходимо полностью реализовать Vue 3 компонент SidebarMenu.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── SidebarMenu                                       # Каталог с именем компонента
│   ├── components                                    # Каталог с составными компонента SidebarMenu
│   │   ├── SidebarMenuScroll                         # Каталог с компонентом SidebarMenuScroll
│   │   │   ├── SidebarMenuScroll.vue                 # Компонент SidebarMenuScroll
│   │   │   ├── SidebarMenuScroll.d.ts                # Типы компонента SidebarMenuScroll
│   │   ├── SidebarMenuItem                           # Каталог с компонентом SidebarMenuItem
│   │   │   ├── SidebarMenuItem.vue                   # Компонент SidebarMenuItem
│   │   │   ├── SidebarMenuItem.d.ts                  # Типы компонента SidebarMenuItem
│   │   ├── SidebarMenuItemLink                       # Каталог с компонентом SidebarMenuItemLink
│   │   │   ├── SidebarMenuItemLink.vue               # Компонент SidebarMenuItemLink
│   │   │   ├── SidebarMenuItemLink.d.ts              # Типы компонента SidebarMenuItemLink
│   │   ├── SidebarMenuItemBadge                      # Каталог с компонентом SidebarMenuItemBadge
│   │   │   ├── SidebarMenuItemBadge.vue              # Компонент SidebarMenuItemBadge
│   │   │   ├── SidebarMenuItemBadge.d.ts             # Типы компонента SidebarMenuItemBadge
│   │   ├── SidebarMenuItemIcon                       # Каталог с компонентом SidebarMenuItemIcon
│   │   │   ├── SidebarMenuItemIcon.vue               # Компонент SidebarMenuItemIcon
│   │   │   ├── SidebarMenuItemIcon.d.ts              # Типы компонента SidebarMenuItemIcon
│   │   ├── SidebarMenuItemAction                     # Каталог с компонентом SidebarMenuItemAction
│   │   │   ├── SidebarMenuItemAction.vue             # Компонент SidebarMenuItemAction
│   │   │   ├── SidebarMenuItemAction.d.ts            # Типы компонента SidebarMenuItemAction
│   ├── composables                                   # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useSidebarMenu                            # Каталог с composable useSidebarMenu
│   │   │   ├── useSidebarMenu.ts                     # Composable useSidebarMenu
│   │   │   ├── useSidebarMenu.types.ts               # Типы composable useSidebarMenu
│   │   ├── useSidebarMenuScroll                      # Каталог с composable useSidebarMenuScroll
│   │   │   ├── useSidebarMenuScroll.ts               # Composable useSidebarMenuScroll
│   │   │   ├── useSidebarMenuScroll.types.ts         # Типы composable useSidebarMenuScroll
│   │   ├── useSidebarMenuItem                        # Каталог с composable useSidebarMenuItem
│   │   │   ├── useSidebarMenuItem.ts                 # Composable useSidebarMenuItem
│   │   │   ├── useSidebarMenuItem.types.ts           # Типы composable useSidebarMenuItem
│   │   ├── useSidebarMenuItemLink                    # Каталог с composable useSidebarMenuItemLink
│   │   │   ├── useSidebarMenuItemLink.ts             # Composable useSidebarMenuItemLink
│   │   │   ├── useSidebarMenuItemLink.types.ts       # Типы composable useSidebarMenuItemLink
│   │   ├── useSidebarMenuItemBadge                   # Каталог с composable useSidebarMenuItemBadge
│   │   │   ├── useSidebarMenuItemBadge.ts            # Composable useSidebarMenuItemBadge
│   │   │   ├── useSidebarMenuItemBadge.types.ts      # Типы composable useSidebarMenuItemBadge
│   │   ├── useSidebarMenuItemIcon                    # Каталог с composable useSidebarMenuItemIcon
│   │   │   ├── useSidebarMenuItemIcon.ts             # Composable useSidebarMenuItemIcon
│   │   │   ├── useSidebarMenuItemIcon.types.ts       # Типы composable useSidebarMenuItemIcon
│   │   ├── useSidebarMenuItemAction                  # Каталог с composable useSidebarMenuItemAction
│   │   │   ├── useSidebarMenuItemAction.ts           # Composable useSidebarMenuItemAction
│   │   │   ├── useSidebarMenuItemAction.types.ts     # Типы composable useSidebarMenuItemAction
│   ├── providers                                     # Директория с провайдерами
│   │   ├── SidebarMenu.provider.ts                   # Провайдеры компонента SidebarMenu
│   ├── tests                                         # Каталог с Unit-тестами компонента
│   │   ├── SidebarMenu.test.ts                       # Unit-тесты главного компонента
│   │   ├── SidebarMenuItemIcon.test.ts               # Unit-тесты компонента SidebarMenuItemIcon
│   │   ├── useSidebarMenu.test.ts                    # Unit-тесты composable useSidebarMenu
│   │   ├── useSidebarMenuItem.test.ts                # Unit-тесты composable useSidebarMenuItem
│   │   ├── useSidebarMenuItemLink.test.ts            # Unit-тесты composable useSidebarMenuItemLink
│   │   ├── useSidebarMenuItemBadge.test.ts           # Unit-тесты composable useSidebarMenuItemBadge
│   ├── types                                         # Каталог с типами компонента
│   │   ├── SidebarMenu.enums.ts                      # Enums компонента со значениями props по умолчанию
│   ├── SidebarMenu.vue                               # Основной (входной) файл элемента
│   ├── SidebarMenu.d.ts                              # Основной файл с типами элементов
```

## Компонент SidebarMenuItemIcon.vue
Техническое задание для компонента SidebarMenuItemIcon:

1. Назначение
   * Компонент `SidebarMenuItemIcon` предназначен для отображения иконки в пункте бокового меню.
   * Компонент `SidebarMenuItemIcon` является дочерним для компонента Компонент `SidebarMenuItem`.
   * Иконка может быть задана как строка с CSS-классом или как Vue-компонент.
2. Общие требования:
   * Компонент должен поддерживать SSR.
   * Использование Composition API + `<script setup>`.
   * Prop типизация через `defineProps<T>()`.
   * Slots типизация через `defineSlots<T>()`.
   * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
   * Реактивный функционал должен быть реализован в composable `useSidebarMenuItemIcon`.
   * Компонент должен принимать prop `icon` (обязательный), который может быть строкой (CSS-класс) или Vue-компонентом.
   * Если `icon` — строка, отрисовать элемент `<i>` с соответствующим классом.
   * Если `icon` — компонент, отрисовать его через `<component :is="icon" />`.
   * Атрибут `aria-hidden="true"` должен быть установлен для иконки.
   * Не должно быть лишних обёрток в DOM.
4. Пропсы:
   * `icon: string | Component` — обязательный, без значения по умолчанию.
5. Слоты:
   * Отсутствуют.
6. События:
   * Отсутствуют.
7. Требования к стилям:
   * Отсутствуют.
8. Требования к тестированию:
   * Покрыть компонент unit-тестами:
9. Требования к документации:
   * Типы должны находится в отдельном файле `SidebarMenuItemIcon.d.ts`;
   * Добавить TSDoc-комментарии к типам, компоненту и composable.

## Компонент SidebarMenuItemBadge.vue
Техническое задание для компонента SidebarMenuItemBadge:

1. Назначение
   * Компонент `SidebarMenuItemIcon` предназначен для отображения бейджа (значка) в пункте бокового меню.
   * Компонент `SidebarMenuItemIcon` является дочерним для компонента Компонент `SidebarMenuItem`.
   * Бейдж может быть передан как строка или число (например, число уведомлений) или как Vue-компонент.
2. Общие требования:
   * Компонент должен поддерживать SSR.
   * Использование Composition API + `<script setup>`.
   * Prop типизация через `defineProps<T>()`.
   * Slots типизация через `defineSlots<T>()`.
   * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
   * Реактивный функционал должен быть реализован в composable `useSidebarMenuItemBadge`.
   * Компонент должен принимать prop `badge` (обязательный), который может быть строкой или Vue-компонентом.
   * Если `badge` — строка или число, отображает его как текст внутри.
   * Если `badge` — компонент, отображает его через.
4. Пропсы:
   * `badge: string | number | Component` (обязательный).
5. Слоты:
   * Отсутствуют.
6. События:
   * Отсутствуют.
7. Требования к стилям:
   * Отсутствуют.
8. Требования к тестированию:
   * Покрыть компонент unit-тестами:
9. Требования к документации:
   * Типы должны находится в отдельном файле `SidebarMenuItemBadge.d.ts`;
   * Добавить TSDoc-комментарии к типам, компоненту и composable.

## Компонент SidebarMenuItemAction.vue
Техническое задание для компонента SidebarMenuItemAction:

1. Назначение
   * Компонент `SidebarMenuItemAction` предназначен для отображения интерактивного элемента (иконки или компонента) в 
   сайдбаре, который выполняет заданное действие при клике.
2. Общие требования:
   * Компонент должен поддерживать SSR.
   * Использование Composition API + `<script setup>`.
   * Prop типизация через `defineProps<T>()`.
   * Slots типизация через `defineSlots<T>()`.
   * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
   * Вызов функции `action` при клике по элементу.
   * Поддержка передачи `actionIcon` как строки или Vue компонента.
   * Применение динамических CSS-классов через composable useSidebarMenuItemAction.
   * Элемент должен быть доступен для навигации с клавиатуры (`tabindex=0`).
4. Пропсы:
   * `action: Function` — функция, вызываемая при клике.
   * `actionIcon: string | Component` — иконка или компонент для отображения (по умолчанию `'...'`).
5. Слоты:
   * Отсутствуют.
6. События:
   * Отсутствуют.
7. Требования к стилям:
   * Отсутствуют.
8. Требования к тестированию:
   * Покрыть компонент unit-тестами:
9. Требования к документации:
   * Типы должны находится в отдельном файле `SidebarMenuItemAction.d.ts`;
   * Добавить TSDoc-комментарии к типам, компоненту и composable.

## Компонент SidebarMenuItemLink.vue
Техническое задание для компонента SidebarMenuItemLink:

1. Назначение
   * Компонент `SidebarMenuItemLink` предназначен для отображения элемента меню в компоненте `SidebarMenuItem`, который 
   может быть:
     - ссылкой (внешней или внутренней),
     - ссылкой с действием (без `href`),
     - простым текстовым элементом.
2. Общие требования:
   * Компонент должен поддерживать SSR.
   * Использование Composition API + `<script setup>`.
   * Prop типизация через `defineProps<T>()`.
   * Slots типизация через `defineSlots<T>()`.
   * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
   * Реактивный функционал должен быть реализован в composable `useSidebarMenuItemLink`.
   * Адаптация под разные типы ссылок и действий.
   * Компонент не должен содержать лишних обёрток в DOM.
   * Принимает обязательный prop `item` типа `TSidebarMenuItem`.
   * Определяет тип рендера:
      - Если задан `item.action`, рендерит `<a>` с обработчиком клика.
      - Если задан `item.href`:
        - Если это внешняя ссылка или нет роутера — `<a href>` с `target="_blank"`.
        - Если это внутренняя ссылка — `<router-link>`.
        - Если явно указан `item.native`, рендерит `<a href>` без дополнительных атрибутов.
      - Если не задано ни `action`, ни `href`, рендерит `<div>`.
   * Поддержка передачи содержимого через slot `default`.
   * Генерация CSS-классов на основе состояния (активная ссылка, текст и т.д.).
4. Пропсы:
   * `item: TSidebarMenuItem` — обязательный, объект элемента меню.
5. Слоты:
   * `default` — slot для содержимого ссылки/элемента.
6. События:
   * Отсутствуют.
7. Требования к стилям:
   * Отсутствуют.
8. Требования к тестированию:
   * Покрыть компонент unit-тестами:
9. Требования к документации:
   * Типы должны находится в отдельном файле `SidebarMenuItemLink.d.ts`;
   * Добавить TSDoc-комментарии к типам, компоненту и composable.

## Компонент SidebarMenuItem.vue
Техническое задание для компонента SidebarMenuItem:

1. Назначение
   * Компонент `SidebarMenuItem` предназначен для отображения элемента бокового меню (через компонент 
   `SidebarMenuItemLink`) с поддержкой вложенных подменю, иконок (через компонент `SidebarMenuItemIcon`) и бейджей 
   (через компонент `SidebarMenuItemBadge`).
2. Общие требования:
   * Компонент должен поддерживать SSR.
   * Использование Composition API + `<script setup>`.
   * Prop типизация через `defineProps<T>()`.
   * Slots типизация через `defineSlots<T>()`.
   * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
   * Реактивный функционал должен быть реализован в composable `useSidebarMenuItem`.
   * Отображение элемента меню с иконкой, заголовком и бейджем (если заданы).
   * Поддержка вложенных подменю с анимацией раскрытия/сворачивания (через Vue-компонент `<Transition>`).
   * Возможность скрытия элемента через вычисляемое свойство.
   * Обработка событий наведения мыши и клика по иконке раскрытия.
   * Передача кастомной иконки раскрытия через слот.
   * Поддержка передачи дополнительных параметров через пропсы (например, уровень вложенности).
4. Пропсы:
   * `item: TSidebarMenuItem` — объект элемента меню.
   * `level: number` — уровень вложенности (по умолчанию 1).
5. Слоты:
   * `dropdownIcon` — slot для иконки раскрытия, принимает параметр `{ isOpen: boolean }`.
6. События:
   * Отсутствуют.
7. Требования к стилям:
   * Отсутствуют.
8. Требования к тестированию:
   * Покрыть компонент unit-тестами:
9. Требования к документации:
   * Типы должны находится в отдельном файле `SidebarMenuItem.d.ts`;
   * Добавить TSDoc-комментарии к типам, компоненту и composable.
   * Описание сценариев интеграции в SidebarMenu.

## Компонент SidebarMenuScroll.vue
Техническое задание для компонента SidebarMenuScroll:

1. Назначение
   * Компонент `SidebarMenuScroll` предназначен для отображения скроллбара в компоненте `SidebarMenu`, обеспечивая 
   кастомное поведение прокрутки и визуализацию скроллбара поверх содержимого.
2. Общие требования:
   * Компонент должен поддерживать SSR.
   * Использование Composition API + `<script setup>`.
   * Prop типизация через `defineProps<T>()`.
   * Slots типизация через `defineSlots<T>()`.
   * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
   * Реактивный функционал должен быть реализован в composable `useSidebarMenuScroll`.
   * Используется только внутренняя логика, без сторонних библиотек для скроллбаров.
   * Отображение кастомного скроллбара только при необходимости (если содержимое не помещается).
   * Скроллбар появляется при наведении мыши на область скролла и исчезает при уходе мыши.
   * Поддержка `drag'n'drop` для перемещения скролл-тумба.
   * Клик по скроллбару перемещает скролл-тумб к позиции клика.
   * Реакция на изменение состояния сайдбара (например, `collapsed`).
   * Корректная работа с любым вложенным контентом через слот.
   * Корректная работа с touch-устройствами.
4. Пропсы:
   * Нет явных пропсов, все параметры (`cssClass`, `collapsed`, `sidebarWidth`) получаются через `inject`.
5. Слоты:
   * `default` — slot для произвольного содержимого.
6. События:
   * Отсутствуют.
7. Требования к стилям:
   * Отсутствуют.
8. Требования к тестированию:
   * Покрыть компонент unit-тестами:
9. Требования к документации:
   * Типы должны находится в отдельном файле `SidebarMenuScroll.d.ts`;
   * Добавить TSDoc-комментарии к типам, компоненту и composable.
   * Описание сценариев интеграции в SidebarMenu.