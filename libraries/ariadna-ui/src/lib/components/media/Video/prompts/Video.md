# Техническое задание

Необходимо полностью реализовать Vue 3 компонент Video.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура: 

```text
├── Video                                             # Каталог с именем компонента
│   ├── composables                                   # Каталог с описанием реактивной функциональности компонента (Vue 3)
│   │   ├── useVideo                                  # Каталог с composable useVideo
│   │   │   ├── useVideo.ts                           # Composable useVideo
│   │   │   ├── useVideo.types.ts                     # Типы composable useVideo
│   │   ├── useVideoClasses                           # Каталог с composable useVideoClasses
│   │   │   ├── useVideoClasses.ts                    # Composable useVideoClasses
│   │   │   ├── useVideoClasses.types.ts              # Типы composable useVideoClasses
│   │   ├── useVideoControls                          # Каталог с composable useVideoControls
│   │   │   ├── useVideoControls.ts                   # Composable useVideoControls
│   │   │   ├── useVideoControls.types.ts             # Типы composable useVideoControls
│   │   ├── useVideoFullscreen                        # Каталог с composable useVideoFullscreen
│   │   │   ├── useVideoFullscreen.ts                 # Composable useVideoFullscreen
│   │   │   ├── useVideoFullscreen.types.ts           # Типы composable useVideoFullscreen
│   │   ├── useVideoPlayback                          # Каталог с composable useVideoPlayback
│   │   │   ├── useVideoPlayback.ts                   # Composable useVideoPlayback
│   │   │   ├── useVideoPlayback.types.ts             # Типы composable useVideoPlayback
│   │   ├── useVideoTimeline                          # Каталог с composable useVideoTimeline
│   │   │   ├── useVideoTimeline.ts                   # Composable useVideoTimeline
│   │   │   ├── useVideoTimeline.types.ts             # Типы composable useVideoTimeline
│   │   ├── useVideoTimelinePopup                     # Каталог с composable useVideoTimelinePopup
│   │   │   ├── useVideoTimelinePopup.ts              # Composable useVideoTimelinePopup
│   │   │   ├── useVideoTimelinePopup.types.ts        # Типы composable useVideoTimelinePopup
│   │   ├── useVideoVolume                            # Каталог с composable useVideoVolume
│   │   │   ├── useVideoVolume.ts                     # Composable useVideoVolume
│   │   │   ├── useVideoVolume.types.ts               # Типы composable useVideoVolume
│   ├── tests                                         # Каталог с Unit-тестами компонента
│   │   ├── components                                # Каталог с Unit-тестами для компонентов
│   │   │   ├── Video.test.ts                         # Unit-тесты главного компонента
│   │   ├── composables                               # Каталог с Unit-тестами для composables
│   │   │   ├── useVideo.test.ts                      # Unit-тесты composable useVideo
│   │   │   ├── useVideoClasses.test.ts               # Unit-тесты composable useVideoClasses
│   │   │   ├── useVideoControls.test.ts              # Unit-тесты composable useVideoControls
│   │   │   ├── useVideoFullscreen.test.ts            # Unit-тесты composable useVideoFullscreen
│   │   │   ├── useVideoPlayback.test.ts              # Unit-тесты composable useVideoPlayback
│   │   │   ├── useVideoTimeline.test.ts              # Unit-тесты composable useVideoTimeline
│   │   │   ├── useVideoTimelinePopup.test.ts         # Unit-тесты composable useVideoTimelinePopup
│   │   │   ├── useVideoVolume.test.ts                # Unit-тесты composable useVideoVolume
│   ├── types                                         # Каталог с типами компонента
│   │   ├── Video.enums.ts                            # Enums компонента со значениями props по умолчанию
│   │   ├── Video.types.ts                            # Types компонента
│   ├── Video.vue                                     # Основной (входной) файл элемента
│   ├── Video.d.ts                                    # Основной файл с типами элементов
```

## Компонент Video.vue
Техническое задание для компонента Video:

1. Назначение
   * Компонент `Video` предназначен для отображения видеоплеера с пользовательскими контролами.
2. Общие требования:
  * Компонент должен поддерживать SSR.
  * Использование Composition API + `<script setup>`.
  * Prop типизация через `defineProps<T>()`.
  * Slots типизация через `defineSlots<T>()`.
  * Emits типизация через `defineEmits<T>()`.
3. Функциональные требования
  * Реактивный функционал должен быть реализован в composable `useVideo`.
  * Воспроизведение, пауза, остановка видео.
  * Управление полноэкранным режимом.
  * Управление громкостью и mute.
  * Перемотка вперед/назад на заданное количество секунд.
  * Отображение пользовательских контролов (play, pause, stop, volume, timeline, fullscreen и др.).
  * Автоматическое скрытие контролов при неактивности пользователя.
  * Поддержка пользовательских иконок и элементов управления через слоты.
  * Отображение текущего времени и длительности видео.
  * Поддержка постера и кастомных классов.
4. Пропсы:
  * `src` (`string`, обязательный) — источник видео (обязательный).
  * `preload` (`string`, по умолчанию '`EVideoPropsDefault.PRELOAD`') — атрибут `preload` для тега `<video>`.
  * `controls` (`boolean`, по умолчанию '`true`') — отображать ли контролы.
  * `showControlsAlways` (`boolean`, по умолчанию '`false`') — всегда показывать контролы.
  * `timeToHideControlsMs` (`number`, по умолчанию '`EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_MS`') — время до скрытия контролов при неактивности.
  * `timeToHideControlsOnOutsideMs` (`number`, по умолчанию '`EVideoPropsDefault.TIME_TO_HIDE_CONTROLS_ON_OUTSIDE_MS`') — время до скрытия контролов при уходе мыши.
  * `muted` (`boolean`, по умолчанию '`false`') — включить mute.
  * `autoplay` (`boolean`, по умолчанию '`false`') — автозапуск видео.
  * `loop` (`boolean`, по умолчанию '`false`') — зациклить видео.
  * `volume` (`number`, по умолчанию '`EVideoPropsDefault.VOLUME`') — громкость по умолчанию.
  * `fastForwardSeconds` (`number`, по умолчанию '`EVideoPropsDefault.FAST_FORWARD_SECONDS`') — шаг перемотки вперед.
  * `fastRewindSeconds` (`number`, по умолчанию '`EVideoPropsDefault.FAST_REWIND_SECONDS`') — шаг перемотки назад.
  * `height` (`number`, по умолчанию '`undefined`') — высота видео.
  * `width` (`number`, по умолчанию '`undefined`') — ширина видео.
  * `poster` (`string`, по умолчанию '`undefined`') — постер для видео.
  * `cssClass` (`string`, по умолчанию '`EDialogPropsDefault.CSS_CLASS`') — базовый CSS класс.
5. Слоты:
  * `default` — контент, отображаемый если тег `<video>` не поддерживается.
  * `playIcon` — иконка воспроизведения.
  * `stopIcon` — иконка остановки.
  * `volumeIcon` — иконка громкости (принимает проп volume).
  * `fullscreenIcon` — иконка перехода в полноэкранный режим.
  * `unFullscreenIcon` — иконка выхода из полноэкранного режима.
  * `loadingIcon` — иконка загрузки.
  * `time` — отображение времени (принимает пропсы: timePassedInSeconds, durationInSeconds, parseTime).
6. События:
  * `fullscreen` — переход в полноэкранный режим.
  * `unFullscreen` — выход из полноэкранного режима.
  * `play` — начало воспроизведения.
  * `playing` — видео воспроизводится (с payload).
  * `stop` — остановка воспроизведения.
  * `muted` — видео замьючено.
7. Требования к стилям:
  * Отсутствуют.
8. Требования к тестированию:
  * Покрыть компонент unit-тестами:
9. Требования к документации:
  * Типы должны находится в отдельном файле `Video.d.ts`;
  * Добавить TSDoc-комментарии к типам, компоненту и composable.
  * Описание сценариев применения компонента.
