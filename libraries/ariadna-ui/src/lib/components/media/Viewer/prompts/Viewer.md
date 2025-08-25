# Техническое задание

Необходимо полностью реализовать Vue 3 компонент Viewer.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура: 

```text
├── Viewer                                             # Каталог с именем компонента
│   ├── composables                                    # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useViewer                                  # Каталог с composable useViewer
│   │   │   ├── useViewer.ts                           # Composable useViewer
│   │   │   ├── useViewer.types.ts                     # Типы composable useViewer
│   │   ├── useViewerApi                               # Каталог с composable useViewerApi
│   │   │   ├── useViewerApi.ts                        # Composable useViewerApi
│   │   │   ├── useViewerApi.types.ts                  # Типы composable useViewerApi
│   │   ├── useViewerClasses                           # Каталог с composable useViewerClasses
│   │   │   ├── useViewerClasses.ts                    # Composable useViewerClasses
│   │   │   ├── useViewerClasses.types.ts              # Типы composable useViewerClasses
│   │   ├── useViewerClickZoom                         # Каталог с composable useViewerClickZoom
│   │   │   ├── useViewerClickZoom.ts                  # Composable useViewerClickZoom
│   │   │   ├── useViewerClickZoom.types.ts            # Типы composable useViewerClickZoom
│   │   ├── useViewerMove                              # Каталог с composable useViewerMove
│   │   │   ├── useViewerMove.ts                       # Composable useViewerMove
│   │   │   ├── useViewerMove.types.ts                 # Типы composable useViewerMove
│   │   ├── useViewerPosition                          # Каталог с composable useViewerPosition
│   │   │   ├── useViewerPosition.ts                   # Composable useViewerPosition
│   │   │   ├── useViewerPosition.types.ts             # Типы composable useViewerPosition
│   │   ├── useViewerSwipe                             # Каталог с composable useViewerSwipe
│   │   │   ├── useViewerSwipe.ts                      # Composable useViewerSwipe
│   │   │   ├── useViewerSwipe.types.ts                # Типы composable useViewerSwipe
│   │   ├── useViewerUX                                # Каталог с composable useViewerUX
│   │   │   ├── useViewerUX.ts                         # Composable useViewerUX
│   │   │   ├── useViewerUX.types.ts                   # Типы composable useViewerUX
│   │   ├── useViewerZoom                              # Каталог с composable useViewerZoom
│   │   │   ├── useViewerZoom.ts                       # Composable useViewerZoom
│   │   │   ├── useViewerZoom.types.ts                 # Типы composable useViewerZoom
│   ├── core                                           # Каталог с основными функциональными возможностям элемента
│   │   ├── move                                       # Каталог с функционалом движения и смещения для Viewer.
│   │   │   ├── move.zoom.core.ts                      # Главный файл
│   │   │   ├── move.zoom.core.types.ts                # Файл с типами
│   │   ├── position                                   # Каталог с функционалом позиционирования для Viewer.
│   │   │   ├── position.zoom.core.ts                  # Главный файл
│   │   │   ├── position.zoom.core.types.ts            # Файл с типами
│   │   ├── swipe                                      # Каталог с функционалом свайпа для Viewer.
│   │   │   ├── swipe.zoom.core.ts                     # Главный файл
│   │   │   ├── swipe.zoom.core.types.ts               # Файл с типами
│   │   ├── viewer                                     # Каталог с функционалом зума для Viewer.
│   │   │   ├── viewer.zoom.core.ts                    # Главный файл
│   │   │   ├── viewer.zoom.core.types.ts              # Файл с типами
│   ├── event-bus                                      # Директория с event-bus
│   │   ├── Viewer.event-bus.ts                        # Провайдеры event-bus Viewer
│   ├── providers                                      # Директория с провайдерами
│   │   ├── Viewer.provider.ts                         # Провайдеры компонента Viewer
│   ├── tests                                          # Каталог с Unit-тестами компонента
│   │   ├── components                                 # Каталог с Unit-тестами для компонентов
│   │   │   ├── Viewer.test.ts                         # Unit-тесты главного компонента
│   │   ├── composables                                # Каталог с Unit-тестами для composables
│   │   │   ├── useViewer.test.ts                      # Unit-тесты composable useViewer
│   │   │   ├── useViewerApi.test.ts                   # Unit-тесты composable useViewerApi
│   │   │   ├── useViewerClasses.test.ts               # Unit-тесты composable useViewerClasses
│   │   │   ├── useViewerClickZoom.test.ts             # Unit-тесты composable useViewerClickZoom
│   │   │   ├── useViewerMove.test.ts                  # Unit-тесты composable useViewerMove
│   │   │   ├── useViewerPosition.test.ts              # Unit-тесты composable useViewerPosition
│   │   │   ├── useViewerSwipe.test.ts                 # Unit-тесты composable useViewerSwipe
│   │   │   ├── useViewerUX.test.ts                    # Unit-тесты composable useViewerUX
│   │   │   ├── useViewerZoom.test.ts                  # Unit-тесты composable useViewerZoom
│   │   ├── core                                       # Каталог с Unit-тестами для core
│   │   │   ├── move.zoom.core.test.ts                 # Unit-тесты движения и смещения Viewer.
│   │   │   ├── position.zoom.core.test.ts             # Unit-тесты позиционирования Viewer.
│   │   │   ├── swipe.zoom.core.test.ts                # Unit-тесты свайпа Viewer.
│   │   │   ├── viewer.zoom.core.test.ts               # Unit-тесты зума Viewer.
│   ├── types                                          # Каталог с типами компонента
│   │   ├── Viewer.enums.ts                            # Enums компонента со значениями props по умолчанию
│   │   ├── Viewer.types.ts                            # Types компонента
│   ├── Viewer.vue                                     # Основной (входной) файл элемента
│   ├── Viewer.d.ts                                    # Основной файл с типами элементов
```

## Компонент Viewer.vue
Техническое задание для компонента Viewer:

1. Назначение
   * Компонент `Viewer` предназначен для просмотра медиа-контента (изображений и видео) в виде галереи с возможностью
   масштабирования, свайпа, циклического просмотра и кастомизации интерфейса через слоты. Он реализует функционал
   полноэкранного просмотрщика, позволяя пользователю листать слайды, увеличивать изображения, просматривать видео
   (в том числе через iframe), а также использовать различные пользовательские элементы управления (иконки, подписи,
   счетчики и т.д.).
2. Общие требования:
  * Компонент должен поддерживать SSR.
  * Использование Composition API + `<script setup>`.
  * Prop типизация через `defineProps<T>()`.
  * Slots типизация через `defineSlots<T>()`.
  * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
  * Реактивный функционал должен быть реализован в composable `useViewer`.
  * В
4. Пропсы:
  * 
5. Слоты:
  * 
6. События:
  * 
7. Требования к стилям:
  * Отсутствуют.
8. Требования к тестированию:
  * Покрыть компонент unit-тестами:
9. Требования к документации:
  * Типы должны находится в отдельном файле `Viewer.d.ts`;
  * Добавить TSDoc-комментарии к типам, компоненту и composable.
  * Описание сценариев применения компонента.
