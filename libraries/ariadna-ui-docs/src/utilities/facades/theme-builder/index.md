---
layout: doc
---

# ThemeBuilder

ThemeBuilder - это класс, отвечающий за создание и размещение темы на основе предоставленных опций и настроек.

Вес <Badge type="info">~ 9 kB gzipped.</Badge>

## Описание

Класс генерирует тему, которая построена на основе CSS Grid и содержит набор глобальных CSS переменных, а так же набор
вспомогательных миксинов.

::: details Философия
Хорошо организованный дизайн - это когда все структурировано и подчиняется одним общим правилам. Класс `ThemeBuilder`
генерирует темы, построенные на использовании CSS переменных.

Инструмент имеет единый файл конфигурации. Он заполняется значениями из дизайн-макета, например такими как:

* Media-запросы;
* Параметры сетки;
* Цветовые палитры;
* Свойства типографики;
* Свойства отступов;
* И прочие свойства, которые являются основой всего вашего макета.

После настройки и запуска генератора, вы получаете сгенерированный SCSS файл с набором миксинов.

В этих миксинах содержатся:

* Набор media-запросов - Забудьте про `@media`, вы будете использовать только миксины `@include theme.md {}`;
* Правила вашей сетки - Создавайте сетку под каждый media-запрос на лету с помощью миксина 
`@include theme.grid(1, 2, 2, 3);`
* Цветовые палитры - Используйте сколько угодно тем, сколько угодно CSS-переменных.
* Любые свойства - Генерируйте любые свойства из вашего макета, которые будут преобразованы в CSS переменные и помогут 
вам легко и быстро создавать UI любого уровня сложности.
* Вспомогательные миксины - это миксины содержащие в себе более удобный синтаксис для работы с вашей сеткой или CSS
переменными.
:::

::: details Паттерн
Класс `ThemeBuilder` написан с использованием паттерна "Фасад" (Facade). Этот паттерн предоставляет простой интерфейс 
для взаимодействия с более сложной системой или набором классов. В данном случае `ThemeBuilder` упрощает процесс 
создания темы и документации, скрывая сложность взаимодействия с такими компонентами, как `Builder`, 
`BuilderDocumentation` и `FilePlacer`.

1. Упрощение интерфейса:
   `ThemeBuilder` предоставляет простые методы (`buildTheme`, `buildDocs`, `buildAll`), которые скрывают сложность
   внутренней реализации. Пользователю не нужно знать, как работает `Builder`, `BuilderDocumentation` или `FilePlacer` — он просто вызывает
   методы `ThemeBuilder`.

2. Инкапсуляция сложности:
   Внутри `ThemeBuilder` используются несколько классов (`Builder`, `BuilderDocumentation`, `FilePlacer`), которые
   выполняют сложные задачи (построение темы, генерация документации, размещение файлов).
   Эти детали скрыты от пользователя.

3. Единая точка входа:
   `ThemeBuilder` выступает в роли единой точки входа для всех операций, связанных с созданием темы и документации.
:::

::: details Преимущества
* Полностью настраивается под ваш проект;
* Никаких `.col-sm-12.col-md-4.col-lg-3` классов в html-структуре;
* Легкий вес и никакого JavaScript кода. Класс `ThemeBuilder` генерирует только `SCSS` и `markdown` файл (при желании `markdown` можно не 
генерировать). 
:::

## Установка

<!--@include: ../../../shared/install.md-->

## Подключение

Создайте файл, например `theme.config.js` и поместите его, например в корень проекта. В содержимом созданного файла
напишите минимальный вызов класса `ThemeBuilder`:

```javascript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {},
).buildAll();
```

При такой инициализации, класс `ThemeBuilder` сгенерирует тему с media-запросами и свойствами сетки, которые указаны 
по-умолчанию. Далее мы разберем свойства сетки, чтобы вы могли настроить ее под ваш проект.

::: warning Важно!
Путь указанный в свойстве `destination`, должен быть заранее создан. Генератор не будет создавать директории в вашем 
проекте сам.
:::

Теперь запускаем выполнение класса в среде NodeJS:

```shell
node theme.config.js
```

Генератор создаст SCSS файл с набором миксинов и файл с авто-документацией в формате `md`, по указанному вами пути в 
свойстве `destination`, относительно размещения файла `theme.config.js`.

## Описание конфигуратора

::: tip Подсказка!
Все свойства конфигурации типизированы.
:::

### options

Опции темы. Состоят из следующих обязательных параметров:

* `projectName` - Название вашего проекта;
* `destination` - Путь (с закрывающей косой чертой), где будет размещена тема; 
* `themeName` - Имя файла с темой.


Типизацию аргумента `options` можно посмотреть в файле `TBuilderOptions`:

```typescript
import type { TBuilderOptions } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

### settings

Настройки темы. Состоят из следующих необязательных параметров:

* `breakPoints` - Набор брейкпоинтов для адаптивного дизайна;
* `gridSettings` - Настройки сетки;
* `themes` - Цветовые палитры (темы);
* `utilities` - Утилитарные свойства;
* `helpers` - Вспомогательные миксины;

Параметр `theme` можно оставить пустым, в этом случае будет сгенерирована сетка по умолчанию.

Типизации аргумента `options` можно посмотреть в файле `TBuilderOptions`:

```typescript
import type { TCustomSettings } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

#### breakPoints

Параметр `breakPoints` - содержит в себе объекты с набором необходимых брейкпоинтов, которые в последующем вам нужно 
будет применить в генераторе для переопределений различных свойств.

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
  },
).buildAll();
```
:::

Типизацию параметра `breakPoints` можно посмотреть в файле `TCustomSettingsBreakpoints`:

```typescript
import type { TCustomSettingsBreakpoints } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

#### gridSettings

Параметр `gridSettings` - содержит в себе объекты для инициализации сетки.

Типизацию параметра `gridSettings` можно посмотреть в файле `TCustomSettingsGrid`:

```typescript
import type { TCustomSettingsGrid } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

##### container

Данный параметр содержит в себе ширину контейнера сетки, с переопределением на необходимых брейкпоинтах, которые были 
указаны в параметре [breakpoints](#breakpoints).

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
    },
  },
).buildAll();
```
:::

##### fields

Данный параметр содержит в себе ширину полей (боковых отступов) сетки, с переопределением на необходимых брейкпоинтах,
которые были указаны в параметре [breakpoints](#breakpoints).

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
    },
  },
).buildAll();
```
:::

##### gap

Данный параметр содержит в себе расстояние между колонками сетки, с переопределением на необходимых брейкпоинтах,
которые были указаны в параметре [breakpoints](#breakpoints).

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
  },
).buildAll();
```
:::

#### themes

Параметр `themes` - содержит в себе набор свойств, которые в последующем будут преобразованы в CSS переменные для 
инициализации тем. Фактически в этом параметры вы определяете ваши цветовые палитры.

При составлении тем, необходимо соблюдать два правила:

1. Строгий уровень вложенности:
```text
├── themes                                              # Объект с темами
│   ├── Theme identifier                                # Название темы
|   |   |── Theme group category                        # Группы категорий темы
|   |   |   |── Color group category                    # Категория цветовой группы
|   |   |   |   |── Color subgroup category             # Категория цветовой подгруппы
|   |   |   |   |   |── Individual color property       # Индивидуальное свойство цвета
```
2. Для цвета по умолчанию указывать ключ цвета `default` - в миксине он будет вырезан.

Типизацию параметра `themes` можно посмотреть в файле `TCustomSettingsTheme`:

```typescript
import type { TCustomSettingsTheme } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    themes: {
      light: {
        color: {
          text: {
            default: {
              default: '#1e1f21',
              foreground: '#fff',
              disabled: '#afabac',
              weak: '#6d6e6f',
            },
            primary: {
              default: '#3f6ac4',
              hover: '#4464bb',
              strong: '#fff',
            },
            secondary: {
              default: '#6e66b1',
              hover: '#5e57a0',
              strong: '#fff',
            },
          },
          icon: {
            default: {
              default: '#6d6e6f',
              foreground: '#fff',
              hover: '#1e1f21',
              active: '#1e1f21',
              disabled: '#afabac',
              strong: '#6d6e6f',
            },
            primary: {
              default: '#3f6ac4',
              strong: '#fff',
            },
            secondary: {
              default: '#8d84e8',
              hover: '#7d75c8',
              strong: '#fff',
            },
          },
          background: {
            default: {
              weak: '#fff',
              medium: '#f9f8f8',
              strong: '#f5f3f3',
              hover: 'rgb(55 23 23 / 3%);',
              active: 'rgb(55 23 23 / 5%)',
            },
            primary: {
              default: '#4573d2',
              'strong-hover': '#426dc6',
              'strong-active': '#3f66ba',
            },
            secondary: {
              default: '#f6f4fd',
              hover: '#eae8fb',
              active: '#e0def9',
              strong: '#736bc4',
              'strong-hover': '#6860b0',
              'strong-active': '#5e57a0',
            },
          },
        },
      },
      dark: {
        color: {
          text: {
            default: {
              default: '#f5f4f3',
              foreground: '#f5f4f3',
              disabled: '#6a696a',
              weak: '#a2a0a2',
            },
            primary: {
              default: '#689af3',
              hover: '#5688e5',
              strong: '#fff',
            },
            secondary: {
              default: '#a499ed',
              hover: '#b6adf1',
              strong: '#fff',
            },
          },
          icon: {
            default: {
              default: '#a2a0a2',
              foreground: '#f5f4f3',
              hover: '#f5f4f3',
              active: '#f5f4f3',
              disabled: '#6a696a',
              strong: '#f5f4f3',
            },
            primary: {
              default: '#4573d2',
              strong: '#fff',
            },
            secondary: {
              default: '#a499ed',
              hover: '#b6adf1',
              strong: '#fff',
            },
          },
          background: {
            default: {
              weak: '#1e1f21',
              medium: '#252628',
              strong: '#2a2b2d',
              hover: 'rgb(255 255 255 / 6%)',
              active: 'rgb(255 255 255 / 11%)',
            },
            primary: {
              default: '#4573d2',
              'strong-hover': '#426dc6',
              'strong-active': '#3f66ba',
            },
            secondary: {
              default: '#332f50',
              hover: '#3c3766',
              active: '#443f74',
              strong: '#736bc4',
              'strong-hover': '#6860b0',
              'strong-active': '#5e57a0',
            },
          },
        },
      },
    }
  },
).buildAll();
```

Данная конфигурация создаст следующие миксины, по одному для каждой из тем:

```scss
@mixin theme-light() {
  & {
    --color-text-default: #1e1f21;
    --color-text-default-foreground: #fff;
    --color-text-default-disabled: #afabac;
    --color-text-default-weak: #6d6e6f;
    --color-text-primary: #3f6ac4;
    --color-text-primary-hover: #4464bb;
    --color-text-primary-strong: #fff;
    --color-text-secondary: #6e66b1;
    --color-text-secondary-hover: #5e57a0;
    --color-text-secondary-strong: #fff;
    --color-icon-default: #6d6e6f;
    --color-icon-default-foreground: #fff;
    --color-icon-default-hover: #1e1f21;
    --color-icon-default-active: #1e1f21;
    --color-icon-default-disabled: #afabac;
    --color-icon-default-strong: #6d6e6f;
    --color-icon-primary: #3f6ac4;
    --color-icon-primary-strong: #fff;
    --color-icon-secondary: #8d84e8;
    --color-icon-secondary-hover: #7d75c8;
    --color-icon-secondary-strong: #fff;
    --color-background-default-weak: #fff;
    --color-background-default-medium: #f9f8f8;
    --color-background-default-strong: #f5f3f3;
    --color-background-default-hover: rgb(55 23 23 / 3%);
    --color-background-default-active: rgb(55 23 23 / 5%);
    --color-background-primary: #4573d2;
    --color-background-primary-strong-hover: #426dc6;
    --color-background-primary-strong-active: #3f66ba;
    --color-background-secondary: #f6f4fd;
    --color-background-secondary-hover: #eae8fb;
    --color-background-secondary-active: #e0def9;
    --color-background-secondary-strong: #736bc4;
    --color-background-secondary-strong-hover: #6860b0;
    --color-background-secondary-strong-active: #5e57a0;
  }
}

@mixin theme-dark() {
  & {
    --color-text-default: #f5f4f3;
    --color-text-default-foreground: #f5f4f3;
    --color-text-default-disabled: #6a696a;
    --color-text-default-weak: #a2a0a2;
    --color-text-primary: #689af3;
    --color-text-primary-hover: #5688e5;
    --color-text-primary-strong: #fff;
    --color-text-secondary: #a499ed;
    --color-text-secondary-hover: #b6adf1;
    --color-text-secondary-strong: #fff;
    --color-icon-default: #a2a0a2;
    --color-icon-default-foreground: #f5f4f3;
    --color-icon-default-hover: #f5f4f3;
    --color-icon-default-active: #f5f4f3;
    --color-icon-default-disabled: #6a696a;
    --color-icon-default-strong: #f5f4f3;
    --color-icon-primary: #4573d2;
    --color-icon-primary-strong: #fff;
    --color-icon-secondary: #a499ed;
    --color-icon-secondary-hover: #b6adf1;
    --color-icon-secondary-strong: #fff;
    --color-background-default-weak: #1e1f21;
    --color-background-default-medium: #252628;
    --color-background-default-strong: #2a2b2d;
    --color-background-default-hover: rgb(255 255 255 / 6%);
    --color-background-default-active: rgb(255 255 255 / 11%);
    --color-background-primary: #4573d2;
    --color-background-primary-strong-hover: #426dc6;
    --color-background-primary-strong-active: #3f66ba;
    --color-background-secondary: #332f50;
    --color-background-secondary-hover: #3c3766;
    --color-background-secondary-active: #443f74;
    --color-background-secondary-strong: #736bc4;
    --color-background-secondary-strong-hover: #6860b0;
    --color-background-secondary-strong-active: #5e57a0;
  }
}
```
:::

#### utilities

Параметр `utilities` - содержит в себе набор утилитарных свойств, которые в последующем будут преобразованы в CSS 
переменные.

При составлении тем, необходимо соблюдать два правила:

1. Строгий уровень вложенности:
```text
├── utilities                                           # Объект с утилитарными свойствами
│   ├── Utility identifier                              # Название утилитарных свойств
|   |   |── Utility group                               # Группа утилитарных свойств
|   |   |   |── Utility subgroup                        # Подгруппа утилитарных свойств
|   |   |   |   |── Individual utility property         # Индивидуальное утилитарное свойство
```
2. Для переопределений значения CSS переменной на нужных брейкпоинтах, в свойствах нужно указывать имя нужного 
брейкпоинта, например `md`;

Типизацию параметра `utilities` можно посмотреть в файле `TCustomSettingsUtilities`:

```typescript
import type { TCustomSettingsUtilities } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    utilities: {
      font: {
        size: {
          h1: {
            h1: '48px',
            md: '38px'
          },
        },
        weight: {
          h1: {
            h1: '600',
          },
        },
        height: {
          h1: {
            h1: '56px',
            md: '46px'
          },
        },
      },
    },
  },
).buildAll();
```

Данная конфигурация создаст следующие миксины с переопределениями свойства на брейкпоинте `md`:

```scss
@mixin font-size() {
  & {
    --font-size-h1: 48px;

    @include md {
      --font-size-h1: 38px;
    }
  }
}

@mixin font-weight() {
  & {
    --font-weight-h1: 600;
  }
}

@mixin font-height() {
  & {
    --font-height-h1: 56px;

    @include md {
      --font-height-h1: 46px;
    }
  }
}
```
:::

##### font

Параметр `font` - утилитарное свойства, описанное на уровне генератора `ThemeBuilder`. С помощью него можно легко
настроить и стандартизировать работу с типографией.

Типизацию параметра `font` можно посмотреть в файле `TCustomSettingsUtilitiesFont`:

```typescript
import type { TCustomSettingsUtilitiesFont } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    utilities: {
      font: {
        family: {
          arial: {
            arial: 'Arial, Helvetica, sans-serif',
          },
        },
        size: {
          h1: {
            h1: '48px',
          },
          h2: {
            h2: '36px',
          },
          t1: {
            t1: '20px',
          },
          t2: {
            t2: '16px',
          },
        },
        weight: {
          h1: {
            h1: '600',
          },
          h2: {
            h2: '600',
          },
          t1: {
            t1: '400',
          },
          t2: {
            t2: '400',
          },
        },
        height: {
          h1: {
            h1: '56px',
          },
          h2: {
            h2: '40px',
          },
          t1: {
            t1: '28px',
          },
          t2: {
            t2: '24px',
          },
        },
      },
    },
  },
).buildAll();
```

Данная конфигурация создаст следующие миксины:

```scss
@mixin font-family() {
  & {
    --font-family-arial: arial, helvetica, sans-serif;
  }
}

@mixin font-size() {
  & {
    --font-size-h1: 48px;
    --font-size-h2: 36px;
    --font-size-t1: 20px;
    --font-size-t2: 16px;
  }
}

@mixin font-weight() {
  & {
    --font-weight-h1: 600;
    --font-weight-h2: 600;
    --font-weight-t1: 400;
    --font-weight-t2: 400;
  }
}

@mixin font-height() {
  & {
    --font-height-h1: 56px;
    --font-height-h2: 40px;
    --font-height-t1: 28px;
    --font-height-t2: 24px;
  }
}
```
:::

##### indent

Параметр `indent` - утилитарное свойства, описанное на уровне генератора `ThemeBuilder`. С помощью него можно легко
настроить и стандартизировать работу с отступами.

Типизацию параметра `indent` можно посмотреть в файле `TCustomSettingsUtilitiesIndent`:

```typescript
import type { TCustomSettingsUtilitiesIndent } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    utilities: {
      indent: {
        padding: {
          small: {
            small: '4px',
          },
          medium: {
            medium: '8px',
          },
          large: {
            large: '12px',
          },
          xlarge: {
            xlarge: '16px',
          },
        },
        margin: {
          small: {
            small: '4px',
          },
          medium: {
            medium: '8px',
          },
          large: {
            large: '12px',
          },
          xlarge: {
            xlarge: '16px',
          },
        },
      },
    },
  },
).buildAll();
```

Данная конфигурация создаст следующие миксины:

```scss
@mixin indent-padding() {
  & {
    --indent-padding-small: 4px;
    --indent-padding-medium: 8px;
    --indent-padding-large: 12px;
    --indent-padding-xlarge: 16px;
  }
}

@mixin indent-margin() {
  & {
    --indent-margin-small: 4px;
    --indent-margin-medium: 8px;
    --indent-margin-large: 12px;
    --indent-margin-xlarge: 16px;
  }
}
```
:::

##### custom

Параметр `custom` - любое утилитарное свойство, описанное на уровне вашего дизайн-макета. С помощью него можно легко
настроить и стандартизировать работу с различными свойствами проекта (`radius`, `transition`, `shadow` и т.д.).

Типизацию параметра можно посмотреть в файле `TCustomSettingsUtilitiesCustom`:

```typescript
import type { TCustomSettingsUtilitiesCustom } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    utilities: {
      radius: {
        default: {
          small: {
            small: '4px',
          },
          medium: {
            medium: '6px',
          },
          large: {
            large: '8px',
          },
          xlarge: {
            xlarge: '12px',
          },
        },
      },
      transition: {
        default: {
          linear: {
            linear: '0.2s linear',
          },
          ease: {
            ease: '0.2s ease',
          },
          easein: {
            easein: '0.2s cubic-bezier(0.4, 0, 1, 1)',
          },
          easeout: {
            easeout: '0.2s cubic-bezier(0.2, 0, 0, 1)',
          },
          easeinout: {
            easeinout: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
    },
  },
).buildAll();
```

Данная конфигурация создаст следующие миксины:

```scss
@mixin radius-default() {
  & {
    --radius-default-small: 4px;
    --radius-default-medium: 6px;
    --radius-default-large: 8px;
    --radius-default-xlarge: 12px;
  }
}

@mixin transition-default() {
  & {
    --transition-default-linear: 0.2s linear;
    --transition-default-ease: 0.2s ease;
    --transition-default-easein: 0.2s cubic-bezier(0.4, 0, 1, 1);
    --transition-default-easeout: 0.2s cubic-bezier(0.2, 0, 0, 1);
    --transition-default-easeinout: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```
:::

#### helpers

Параметр `helpers` - отвечает за активацию вспомогательных миксинов. По умолчанию все вспомогательные миксины 
выключены. Каждый миксин вам необходимо включить самостоятельно.

Типизацию параметра можно посмотреть в файле `TCustomSettingsHelpers`:

```typescript
import type { TCustomSettingsHelpers } from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';
```

::: details Пример
```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    breakPoints: {
      sm: {
        width: '640px',
      },
      md: {
        width: '768px',
      },
      lg: {
        width: '1024px',
      },
      xl: {
        width: '1280px',
      },
    },
    gridSettings: {
      container: {
        container: '100%',
        sm: '100%',
        md: '100%',
        lg: '100%',
        xl: '1600px',
      },
      fields: {
        fields: '16px',
      },
      gap: {
        gap: '18px',
      },
    },
    helpers: {
      textStyle: true,
      columnOffset: true,
    },
  },
).buildAll();
```

Данная конфигурация создаст следующие миксины:

```scss
@mixin text-style-helper($name) {
  font-size: var(--font-size-#{$name});
  font-weight: var(--font-weight-#{$name});
  line-height: var(--font-height-#{$name});
}

@mixin column-offset(
  $offset,
  $offset-sm: null,
  $offset-md: null,
  $offset-lg: null,
  $offset-xl: null
) {
  grid-column: string.unquote($offset);

  @if $offset-sm {
    @include sm {
      grid-column: string.unquote($offset-sm);
    }
  }

  @if $offset-md {
    @include md {
      grid-column: string.unquote($offset-md);
    }
  }

  @if $offset-lg {
    @include lg {
      grid-column: string.unquote($offset-lg);
    }
  }

  @if $offset-xl {
    @include xl {
      grid-column: string.unquote($offset-xl);
    }
  }
}
```
:::

## Работа с темой

После сборки темы, ее необходимо подключить к проекту:

```scss
@use './themes/example/example' as theme;

:root {
   @include theme.grid-settings;
}
```

### Применение контейнера

Для ограничения области контента доступны следующие миксины:

#### grid-container-fluid
```scss
.container-fluid {
   @include theme.grid-container-fluid;
}
```

Занимает 100% ширины и устанавливает боковые отступы из настроек сетки.

#### grid-container
```scss
.container {
  @include theme.grid-container;
}
```

Ограничен максимальной шириной из настроек, имеет выравнивание по центру (внутри себя вызывает 
`grid-container-fluid` для наследования стилей).

### Применение сетки

Для создания сетки используется миксин `grid`:

```scss
@use './themes/example/example' as theme;

&__example {
 @include theme.grid(2, 4, 6, 8, 12);
}
```

Он строит колоночную структуру на основе CSS Grid, принимает параметры в виде количества колонок на разных 
медиа-запросах, которые указаны в конфигурации вашей темы.

::: tip Подсказка!
Настройки задаются с учетом `mobile-first` подхода, параметры необходимо указывать в порядке от меньшего к большему. 
Количество параметров зависит от количества брейкпоинтов указанных в настройках.
:::

### Применение debug-режима

Генератор создает вспомогательный-миксин для debug-режима, в котором визуально будет отображена текущая сетка с 
переопределяемыми параметрами.

Сетку можно включить в любом месте глобально:

```scss
@use '../themes/asana/asana' as theme;

@include theme.debug(2, 4, 6, 8, 12);
```

Либо для каждой секции отдельно:

```scss
@use '../themes/asana/asana' as theme;

.header {
  @include theme.debug(2, 4, 6, 8, 12);
}
```

### Применение тем

Вызов группы переменных с темами через `@include`:

```scss
@use '../themes/asana/asana' as theme;

html {
  @include theme.theme-light;
}

html[data-theme='dark'] {
  @include theme.theme-dark;
}
```

Внутри можно создавать свои собственные CSS переменные:

```scss
@use '../themes/asana/asana' as theme;

html {
  @include theme.theme-light;
   --color: var(--colors-utility-black);
   --link: var(--colors-palette-primary-link);
}

html[data-theme='dark'] {
  @include theme.theme-dark;
   --color: var(--colors-utility-black);
   --link: var(--colors-palette-primary-link);
}
```

После этого, во всем вашем проекте, будут доступны CSS переменные как из генератора тем, так и ваши собственные.

### Применение утилитарных свойств

Набор утилитарных CSS переменных можно так же распаковать глобально:

```scss
@use './themes/asana/asana' as theme;

:root {
  @include theme.font-size;
  @include theme.font-weight;
  @include theme.font-height;
  @include theme.indent-padding;
  @include theme.indent-margin;
  @include theme.radius-default;
  @include theme.transition-default;
}
```

Либо для ограниченной области видимости на конкретном элементе:

```scss
@use './themes/asana/asana' as theme;

.element {
   @include theme.font-size;
   @include theme.font-weight;
   @include theme.font-height;
}
```

### Применение вспомогательных миксинов

За вспомогательные миксины отвечает параметр `helpers` в конфигураторе:

#### Text Style Helper

Подключение миксина:

```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    helpers: {
      textStyle: true,
    },
  },
).buildAll();
```

Миксин вызывается через `@include` и принимает в качестве параметра, один из стилей текста.

```scss
@use './themes/asana/asana' as theme;

h1 {
   @include theme.text-style-helper(h1);
}
```

Данный миксин будет работать только если вы использовали в конфигураторе описанные в типе `TCustomSettingsUtilitiesFont`
группы шрифтов:

```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    utilities: {
      font: {
        size: {},
        weight: {},
        height: {},
      },
    },
  },
).buildAll();
```

#### Column Offset Helper

Подключение миксина:

```typescript
import ThemeBuilder from '@iwyfaf-vue-ui/ariadna-ui/ThemeBuilder';

new ThemeBuilder(
  {
    projectName: 'My Project',
    destination: './assets/scss/themes/example/',
    themeName: 'example',
  },
  {
    helpers: {
      columnOffset: true,
    },
  },
).buildAll();
```

Миксин вызывается через `@include` и принимает в качестве параметров, порядок колонок, в которых необходимо расположить
элемент. Пример:

У родительского элемента определяем сетку:

```scss
@use './themes/asana/asana' as theme;

@include theme.grid(1,3,6,12);
```

В зависимости от количества указанных в сетке выше брейкпоинтов, необходимо определить расположение дочернего элемента
внутри колонок:

```scss
@use './themes/asana/asana' as theme;

@include theme.column-offset('1/2','1/4','1/7','3/11');
```

Порядок здесь будет следующим:

* На минимальном разрешении элемент занимает 1 колонку;
* На втором разрешении - 3 колонки;
* На третьем разрешении - 6 колонок;
* На четвертом разрешении - 8 колонок (с третьей по 10 колонку, в 12 колончатой сетке).

## Резюме

Несмотря на то, что в генератор уже заложена минимально необходимая база для создания тем, а именно:

* Описаны популярные брейкпоинты;
* Описаны настройки сетки;
* Описаны утилитарные группы:
  * `font-family` - семейство и стиль шрифта;
  * `font-size` - размер шрифта;
  * `font-weight` - жирность шрифта;
  * `font-height` - высота строки (line-height);
  * `indent` - отступы;

Вы можете:

* Задавать свои наборы брейкпоинтов;
* Задавать свои настройки для сетки;
* Создавать неограниченное количество тем;
* Создавать неограниченное количество собственных утилитарных наборов, не применяя уже описанные.