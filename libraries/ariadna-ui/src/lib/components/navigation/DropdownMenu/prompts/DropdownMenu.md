# Техническое задание

Необходимо полностью реализовать Vue 3 компонент DropdownMenu.vue по требованиям ниже, включая ВСЕ перечисленные в
структуре файлы.

## Структура:

```text
├── DropdownMenu                                             # Каталог с именем компонента
│   ├── components                                           # Каталог с составными компонентами DropdownMenu
│   │   ├── DropdownMenuList                                 # Каталог с компонентом DropdownMenuList
│   │   │   ├── DropdownMenuList.vue                         # Компонент: список пунктов меню (рекурсивный)
│   │   │   ├── DropdownMenuList.d.ts                        # Типы компонента DropdownMenuList
│   │   ├── DropdownMenuItem                                 # Каталог с компонентом DropdownMenuItem
│   │   │   ├── DropdownMenuItem.vue                         # Компонент: один пункт меню
│   │   │   ├── DropdownMenuItem.d.ts                        # Типы компонента DropdownMenuItem
│   │   ├── DropdownMenuItemIcon                             # Каталог с компонентом DropdownMenuItemIcon
│   │   │   ├── DropdownMenuItemIcon.vue                     # Компонент: иконка пункта меню
│   │   │   ├── DropdownMenuItemIcon.d.ts                    # Типы компонента DropdownMenuItemIcon
│   │   ├── DropdownMenuItemBadge                            # Каталог с компонентом DropdownMenuItemBadge
│   │   │   ├── DropdownMenuItemBadge.vue                    # Компонент: бейдж пункта меню
│   │   │   ├── DropdownMenuItemBadge.d.ts                   # Типы компонента DropdownMenuItemBadge
│   │   ├── DropdownMenuSeparator                            # Каталог с компонентом DropdownMenuSeparator
│   │   │   ├── DropdownMenuSeparator.vue                    # Компонент: разделитель пунктов меню
│   │   │   ├── DropdownMenuSeparator.d.ts                   # Типы компонента DropdownMenuSeparator
│   ├── composables                                          # Каталог с composables компонента
│   │   ├── useDropdownMenu                                  # Каталог с composable useDropdownMenu
│   │   │   ├── useDropdownMenu.ts                           # Composable: открытие/закрытие, позиция, клавиатура
│   │   │   ├── useDropdownMenu.types.ts                     # Типы composable useDropdownMenu
│   │   ├── useDropdownMenuItem                              # Каталог с composable useDropdownMenuItem
│   │   │   ├── useDropdownMenuItem.ts                       # Composable: состояние пункта, обработчики
│   │   │   ├── useDropdownMenuItem.types.ts                 # Типы composable useDropdownMenuItem
│   │   ├── useDropdownMenuItemIcon                          # Каталог с composable useDropdownMenuItemIcon
│   │   │   ├── useDropdownMenuItemIcon.ts                   # Composable: тип иконки (строка / компонент)
│   │   │   ├── useDropdownMenuItemIcon.types.ts             # Типы composable useDropdownMenuItemIcon
│   │   ├── useDropdownMenuItemBadge                         # Каталог с composable useDropdownMenuItemBadge
│   │   │   ├── useDropdownMenuItemBadge.ts                  # Composable: тип бейджа (строка|число / компонент)
│   │   │   ├── useDropdownMenuItemBadge.types.ts            # Типы composable useDropdownMenuItemBadge
│   ├── providers                                            # Директория с провайдерами
│   │   ├── DropdownMenu.provider.ts                         # Провайдер: cssClass, close, expandMode
│   ├── tests                                                # Каталог с Unit-тестами
│   │   ├── components                                       # Unit-тесты компонентов
│   │   │   ├── DropdownMenu.test.ts                         # Unit-тесты главного компонента
│   │   │   ├── DropdownMenuList.test.ts                     # Unit-тесты DropdownMenuList
│   │   │   ├── DropdownMenuItem.test.ts                     # Unit-тесты DropdownMenuItem
│   │   │   ├── DropdownMenuItemIcon.test.ts                 # Unit-тесты DropdownMenuItemIcon
│   │   │   ├── DropdownMenuItemBadge.test.ts                # Unit-тесты DropdownMenuItemBadge
│   │   ├── composables                                      # Unit-тесты composables
│   │   │   ├── useDropdownMenu.test.ts                      # Unit-тесты composable useDropdownMenu
│   │   │   ├── useDropdownMenuItem.test.ts                  # Unit-тесты composable useDropdownMenuItem
│   │   │   ├── useDropdownMenuItemBadge.test.ts             # Unit-тесты composable useDropdownMenuItemBadge
│   │   │   ├── useDropdownMenuItemIcon.test.ts              # Unit-тесты composable useDropdownMenuItemIcon
│   ├── types                                                # Каталог с типами компонента
│   │   ├── DropdownMenu.enums.ts                            # Enums со значениями props по умолчанию
│   │   ├── DropdownMenu.types.ts                            # Типы данных (TDropdownMenuItem и др.)
│   ├── DropdownMenu.vue                                     # Основной (входной) файл компонента
│   ├── DropdownMenu.d.ts                                    # Основной файл с типами компонента
```

---

## Тип данных элемента меню

```typescript
// types/DropdownMenu.types.ts

/**
 * Режим раскрытия подменю.
 */
export type TDropdownMenuPropsExpandMode = 'click' | 'hover';

/**
 * Горизонтальное выравнивание выпадающего списка относительно активатора.
 */
export type TDropdownMenuPropsAlign = 'start' | 'center' | 'end';

/**
 * Один пункт выпадающего меню.
 */
export type TDropdownMenuItem = {
  /**
   * Текст пункта меню.
   */
  label: string;

  /**
   * Иконка пункта: CSS-класс или Vue-компонент.
   */
  icon?: string | Component;

  /**
   * URL для перехода (рендерит <a> или <router-link>).
   */
  href?: string;

  /**
   * Атрибут target для ссылки (например, '_blank').
   */
  target?: string;

  /**
   * Функция, вызываемая при клике (рендерит <a> с обработчиком).
   */
  action?: () => void;

  /**
   * Отображаемый бейдж: текст, число или Vue-компонент.
   */
  badge?: string | number | Component;

  /**
   * Дополнительный CSS-класс на элемент пункта меню.
   */
  cssClass?: string;

  /**
   * Если true — пункт недоступен для взаимодействия.
   */
  disabled?: boolean;

  /**
   * Если true — вместо пункта рендерится разделитель <hr>.
   * Остальные поля игнорируются.
   */
  separator?: boolean;

  /**
   * Дочерние пункты (вложенное подменю).
   */
  children?: TDropdownMenuItem[];
};
```

---

## Компонент DropdownMenu.vue

### 1. Назначение

- Компонент `DropdownMenu` — выпадающее меню с поддержкой многоуровневой вложенности.
- Активатор (триггер открытия) задаётся через слот `activator`.
- Список пунктов передаётся декларативно через проп `data`.
- Поддерживает раскрытие подменю по клику или наведению.
- Закрывается по клику вне меню или по нажатию `Escape`.
- Поддерживает клавиатурную навигацию (стрелки, Enter, Escape).

### 2. Общие требования

- Компонент должен поддерживать SSR.
- Использование Composition API + `<script setup>`.
- Prop типизация через `defineProps<T>()`.
- Slots типизация через `defineSlots<T>()`.
- Emits типизация через `defineEmits<T>()`.

### 3. Функциональные требования

- Реактивный функционал реализуется в composable `useDropdownMenu`.
- Composable управляет состоянием открытия/закрытия меню, позицией выпадающего списка и клавиатурными событиями.
- Выпадающий список позиционируется автоматически относительно активатора.
- При нехватке места снизу — список открывается вверх (авто-флип по вертикали).
- Содержимое меню рендерится через компонент `DropdownMenuList`, который рекурсивно обрабатывает `children`.
- Состояние `cssClass`, функция `close` и режим `expandMode` передаются дочерним компонентам через `provide`.
- Компонент не содержит лишних DOM-обёрток для слота активатора (использует `<slot>` без враппера).
- Атрибут `role="menu"` устанавливается на контейнер списка; пункты получают `role="menuitem"`.
- При `disabled: true` у пункта — `aria-disabled="true"`, клик и ховер блокируются.

### 4. Пропсы

| Prop                  | Required | Type                       | Default                               | Description                                                          |
|-----------------------|----------|----------------------------|---------------------------------------|----------------------------------------------------------------------|
| `data`                | ✓        | `Array<TDropdownMenuItem>` | `undefined`                           | Массив пунктов меню.                                                 |
| `expandMode`          | -        | `'click' \| 'hover'`       | `'click'`                             | Режим раскрытия подменю второго и последующих уровней.               |
| `closeOnClickOutside` | -        | `boolean`                  | `true`                                | Закрывать меню при клике вне его области.                            |
| `closeOnEscape`       | -        | `boolean`                  | `true`                                | Закрывать меню при нажатии клавиши Escape.                           |
| `disabled`            | -        | `boolean`                  | `false`                               | Блокирует открытие меню.                                             |
| `cssClass`            | -        | `string`                   | `EDropdownMenuPropsDefault.CSS_CLASS` | Переопределяет базовый CSS-класс корневого элемента и всех потомков. |

### 5. Слоты

| Slot        | Description                                                                                |
|-------------|--------------------------------------------------------------------------------------------|
| `activator` | Элемент-триггер, открывающий меню. Получает текущее состояние и управляющие функции.       |
| `item`      | Кастомный рендер пункта меню. Если слот задан — стандартный рендер пункта не используется. |

### 6. События (Emits)

| Emit         | Payload             | Description                                                                                                                    |
|--------------|---------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `show`       | —                   | Событие срабатывает при открытии меню.                                                                                         |
| `hide`       | —                   | Событие срабатывает при закрытии меню.                                                                                         |
| `item-click` | `TDropdownMenuItem` | Событие срабатывает при клике на пункт меню (в т.ч. вложенный). Не эмитируется для пунктов-разделителей и отключённых пунктов. |

### 7. Expose (публичные методы)

| Method   | Type         | Description                            |
|----------|--------------|----------------------------------------|
| `open`   | `() => void` | Программно открывает меню.             |
| `close`  | `() => void` | Программно закрывает меню.             |
| `toggle` | `() => void` | Программно переключает состояние меню. |

---

## Компонент DropdownMenuList.vue

### 1. Назначение

- Рендерит список пунктов меню (`<ul>`).
- Используется рекурсивно для отображения подменю любого уровня вложенности.
- Является дочерним для `DropdownMenu` и для `DropdownMenuItem` (при наличии `children`).

### 2. Пропсы

| Prop     | Тип                        | Обязательный | По умолчанию  | Описание                                   |
|----------|----------------------------|--------------|---------------|--------------------------------------------|
| `data`   | `Array<TDropdownMenuItem>` | Да           | —             | Массив пунктов для отображения.            |
| `level`  | `number`                   | Нет          | `1`           | Уровень вложенности (1 = корневой список). |

### 3. Слоты

| Слот    | Параметры                                                        | Описание                                                     |
|---------|------------------------------------------------------------------|--------------------------------------------------------------|
| `item`  | `{ item: TDropdownMenuItem, level: number, close: () => void }`  | Прокидывается из родительского `DropdownMenu` через provide. |

### 4. События

Отсутствуют (клики пунктов всплывают через provide-инъекцию до корневого компонента).

---

## Компонент DropdownMenuItem.vue

### 1. Назначение

- Рендерит один пункт меню: иконку (`DropdownMenuItemIcon`), текст, бейдж (`DropdownMenuItemBadge`), индикатор
  подменю.
- Определяет тип элемента: `<a>`, `<router-link>`, `<button>` или `<div>` — в зависимости от полей `href`, `action`
  и наличия `children`.
- При наличии `children` — управляет видимостью вложенного `DropdownMenuList`.
- Получает `cssClass`, `close` и `expandMode` через `inject`.

### 2. Пропсы

| Prop    | Тип                 | Обязательный | По умолчанию | Описание                             |
|---------|---------------------|--------------|--------------|--------------------------------------|
| `item`  | `TDropdownMenuItem` | Да           | —            | Объект пункта меню.                  |
| `level` | `number`            | Нет          | `1`          | Уровень вложенности текущего пункта. |

### 3. Слоты

| Слот   | Параметры                                                       | Описание                                                              |
|--------|-----------------------------------------------------------------|-----------------------------------------------------------------------|
| `item` | `{ item: TDropdownMenuItem, level: number, close: () => void }` | Прокидывается из `DropdownMenu` через provide для кастомного рендера. |

### 4. Логика рендера элемента

| Условие                                      | Тег                                | Поведение                                                 |
|----------------------------------------------|------------------------------------|-----------------------------------------------------------|
| `item.separator === true`                    | `<li>` + `<DropdownMenuSeparator>` | Рендерит разделитель, остальные поля игнорирует.          |
| `item.action` задан                          | `<a>`                              | Вызывает `item.action()` при клике, затем закрывает меню. |
| `item.href` + внешняя ссылка / `item.native` | `<a href target>`                  | Открывает ссылку (target из item или `_blank`).           |
| `item.href` + внутренняя ссылка              | `<router-link>`                    | Навигация через Vue Router, затем закрывает меню.         |
| `item.children` задан                        | `<div>` или `<button>`             | Открывает/закрывает вложенный `DropdownMenuList`.         |
| Ни одно условие не совпало                   | `<div>`                            | Нет взаимодействия.                                       |

### 5. События

Отсутствуют (клик передаётся в корневой `DropdownMenu` через provide-инъекцию).

---

## Компонент DropdownMenuItemIcon.vue

### 1. Назначение

- Отображает иконку пункта меню.
- Если `icon` — строка, рендерит `<i class="{icon}">`.
- Если `icon` — Vue-компонент, рендерит его через `<component :is="icon" />`.
- Всегда имеет `aria-hidden="true"`.
- Не содержит лишних DOM-обёрток.

### 2. Пропсы

| Prop   | Тип                   | Обязательный  | По умолчанию  | Описание            |
|--------|-----------------------|:-------------:|---------------|---------------------|
| `icon` | `string \| Component` |      Да       | —             | Иконка пункта меню. |

### 3. Слоты / События

Отсутствуют.

---

## Компонент DropdownMenuItemBadge.vue

### 1. Назначение

- Отображает бейдж (счётчик, метку) у пункта меню.
- Если `badge` — строка или число, рендерит его как текст.
- Если `badge` — Vue-компонент, рендерит через `<component :is="badge" />`.
- Не содержит лишних DOM-обёрток.

### 2. Пропсы

| Prop    | Тип                             | Обязательный  | По умолчанию  | Описание           |
|---------|---------------------------------|:-------------:|---------------|--------------------|
| `badge` | `string \| number \| Component` |      Да       | —             | Бейдж пункта меню. |

### 3. Слоты / События

Отсутствуют.

---

## Компонент DropdownMenuSeparator.vue

### 1. Назначение

- Рендерит визуальный разделитель (`<hr>`) между пунктами меню.
- Получает `cssClass` через `inject` для формирования БЭМ-класса.
- Имеет `role="separator"` и `aria-orientation="horizontal"`.

### 2. Пропсы / Слоты / События

Отсутствуют (все параметры получает через `inject`).

---

## Провайдер DropdownMenu.provider.ts

```typescript
export type TDropdownMenuProvider = {
  /** Базовый CSS-класс компонента */
  cssClass: string;

  /** Режим раскрытия подменю */
  expandMode: TDropdownMenuPropsExpandMode;

  /** Функция закрытия корневого меню */
  close: () => void;

  /** Функция-эмиттер события item-click */
  emitItemClick: (item: TDropdownMenuItem) => void;

  /** Слот кастомного рендера пункта (если задан) */
  itemSlot?: TDropdownMenuSlots['item'];
};

export const DropdownMenuProviderKey: InjectionKey<TDropdownMenuProvider> =
  Symbol('DropdownMenuProvider');
```

---

## Composable useDropdownMenu

### Входные параметры

- `props: TDropdownMenuProps`
- `emits: TDropdownMenuEmits`
- `activatorRef: Ref<HTMLElement | null>` — ссылка на DOM-элемент активатора

### Возвращаемые значения

| Поле               | Тип                          | Описание                                   |
|--------------------|------------------------------|--------------------------------------------|
| `isOpen`           | `Ref<boolean>`               | Текущее состояние открытия меню.           |
| `open`             | `() => void`                 | Открыть меню и эмитировать `show`.         |
| `close`            | `() => void`                 | Закрыть меню и эмитировать `hide`.         |
| `toggle`           | `() => void`                 | Переключить состояние.                     |
| `menuStyles`       | `ComputedRef<CSSProperties>` | Стили позиционирования выпадающего списка. |
| `componentClasses` | `ComputedRef<string>`        | CSS-классы корневого элемента.             |
| `listClasses`      | `ComputedRef<string>`        | CSS-классы выпадающего списка.             |

---

## Composable useDropdownMenuItem

### Входные параметры

- `props: TDropdownMenuItemProps`
- `provider: TDropdownMenuProvider`

### Возвращаемые значения

| Поле               | Тип                                | Описание                                              |
|--------------------|------------------------------------|-------------------------------------------------------|
| `isSubOpen`        | `Ref<boolean>`                     | Открыто ли подменю текущего пункта.                   |
| `toggleSub`        | `() => void`                       | Переключить видимость подменю.                        |
| `openSub`          | `() => void`                       | Открыть подменю.                                      |
| `closeSub`         | `() => void`                       | Закрыть подменю.                                      |
| `clickHandler`     | `() => void`                       | Обработчик клика по пункту.                           |
| `hoverHandler`     | `() => void`                       | Обработчик наведения (для expandMode = 'hover').      |
| `leaveHandler`     | `() => void`                       | Обработчик ухода курсора.                             |
| `componentClasses` | `ComputedRef<string>`              | CSS-классы пункта меню.                               |
| `linkClasses`      | `ComputedRef<string>`              | CSS-классы ссылки / кнопки внутри пункта.             |
| `isDisabled`       | `ComputedRef<boolean>`             | Является ли пункт отключённым.                        |
| `hasChildren`      | `ComputedRef<boolean>`             | Есть ли у пункта вложенные пункты.                    |
| `renderTag`        | `ComputedRef<string \| Component>` | Тег для рендера пункта (a, router-link, div, button). |

---

## CSS-классы (БЭМ)

```
.ar-dropdown-menu                        — корневой элемент
.ar-dropdown-menu--open                  — состояние: открыто
.ar-dropdown-menu--disabled              — состояние: заблокировано

.ar-dropdown-menu__activator             — враппер активатора (если нужен)
.ar-dropdown-menu__list                  — выпадающий список (<ul>) первого уровня
.ar-dropdown-menu__list--sub             — выпадающий список подменю
.ar-dropdown-menu__list--level-{n}      — уровень вложенности (1, 2, 3...)
.ar-dropdown-menu__list--vertical-bottom-right — открывается вниз, расширяется вправо (по умолчанию)
.ar-dropdown-menu__list--vertical-bottom-left  — открывается вниз, расширяется влево (не хватает места справа)
.ar-dropdown-menu__list--vertical-top-right    — открывается вверх, расширяется вправо
.ar-dropdown-menu__list--vertical-top-left     — открывается вверх, расширяется влево

.ar-dropdown-menu__item                  — пункт меню (<li>)
.ar-dropdown-menu__item--active          — текущий активный маршрут
.ar-dropdown-menu__item--disabled        — пункт заблокирован
.ar-dropdown-menu__item--has-children    — пункт имеет подменю
.ar-dropdown-menu__item--sub-open        — подменю пункта открыто

.ar-dropdown-menu__link                  — ссылка / кнопка внутри пункта
.ar-dropdown-menu__icon                  — иконка пункта
.ar-dropdown-menu__label                 — текст пункта
.ar-dropdown-menu__badge                 — бейдж пункта
.ar-dropdown-menu__arrow                 — индикатор наличия подменю (стрелка)
.ar-dropdown-menu__separator             — разделитель (<hr>)
```

---

## Доступность (Accessibility)

- Корневой контейнер меню: `role="menu"`, `aria-orientation="vertical"`.
- Каждый пункт: `role="menuitem"`.
- Отключённый пункт: `aria-disabled="true"`, игнорирует Tab-focus.
- Разделитель: `role="separator"`, `aria-orientation="horizontal"`.
- Пункт с подменю: `aria-haspopup="menu"`, `aria-expanded="{isSubOpen}"`.
- Активатор (через слот): `aria-haspopup="menu"`, `aria-expanded="{isOpen}"` — пробрасываются пользователем через 
`v-bind` в слоте `activator`.

### Поддержка клавиатуры

| Key                     | Function                                                        |
|-------------------------|-----------------------------------------------------------------|
| `Escape`                | Закрытие корневого меню.                                        |

---

## Требования к тестированию

### DropdownMenu.test.ts

- Рендерится без ошибок.
- Слот `activator` рендерится и получает корректные параметры `{ opened, open, close, toggle }`.
- Меню закрыто по умолчанию.
- Вызов `toggle()` из слота открывает/закрывает список.
- Эмитируется `show` при открытии, `hide` при закрытии.
- При `disabled: true` — меню не открывается.
- `closeOnClickOutside: true` — клик вне меню закрывает его.
- `closeOnEscape: true` — нажатие Escape закрывает меню.
- Эмитируется `item-click` при клике на пункт.
- `item-click` не эмитируется для disabled-пунктов и разделителей.
- Публичные методы `open`, `close`, `toggle` работают корректно через `expose`.

### useDropdownMenu.test.ts

- `isOpen` изначально `false`.
- `open()` устанавливает `isOpen = true`.
- `close()` устанавливает `isOpen = false`.
- `toggle()` инвертирует `isOpen`.
- При `disabled: true` — `open()` не меняет состояние.
- `componentClasses` содержит корректные классы в зависимости от состояния.

### useDropdownMenuItem.test.ts

- `isDisabled` возвращает `true` при `item.disabled = true`.
- `hasChildren` возвращает `true` при наличии `item.children`.
- `renderTag` возвращает корректный тег в зависимости от полей `item`.
- `clickHandler` вызывает `item.action()` и закрывает меню.
- `clickHandler` не срабатывает при `item.disabled = true`.
- Hover-логика открывает/закрывает подменю при `expandMode = 'hover'`.

### DropdownMenuItem.test.ts

- Рендерится как `<a>` при наличии `item.action`.
- Рендерится как `<a href>` при наличии `item.href` (внешняя ссылка).
- Рендерится как `<router-link>` при наличии `item.href` (внутренняя ссылка).
- Рендерится как `<div>` при отсутствии `action` и `href`.
- Рендерится `DropdownMenuItemIcon` при наличии `item.icon`.
- Рендерится `DropdownMenuItemBadge` при наличии `item.badge`.
- Не рендерит интерактивные элементы при `item.disabled = true`.
- Рендерится `DropdownMenuSeparator` при `item.separator = true`.
- При наличии `item.children` — рендерит вложенный `DropdownMenuList`.

### DropdownMenuItemIcon.test.ts

- Рендерит `<i>` при строковом `icon`.
- Рендерит Vue-компонент при компонентном `icon`.
- Всегда имеет `aria-hidden="true"`.

### DropdownMenuItemBadge.test.ts

- Рендерит текст при строковом/числовом `badge`.
- Рендерит Vue-компонент при компонентном `badge`.

---

## Требования к документации

- Все типы — в отдельных `.d.ts` файлах с TSDoc-комментариями.
- JSDoc-комментарии на все пропсы, слоты и события с указанием типа, дефолта и примера.
- Описание сценариев применения:
  - Базовое использование с текстовыми пунктами.
  - Пункты со ссылками и действиями.
  - Многоуровневое (tiered) меню.
  - Кастомный рендер пунктов через слот `item`.
  - Программное управление через `expose`.
