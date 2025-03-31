---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Ariadna UI Documentation'
  text: 'Документация UI библиотеки Ariadna UI для Vue 3'
  tagline: Документация UI библиотеки Ariadna UI для Vue 3

features:
  - title: ESM
    details: Все компоненты собраны как ES модули. Для работы в браузере нужна транспиляция.
  - title: TypeScript
    details: Все компоненты написаны с помощью TypeScript и имеют <code>.d.ts</code> файл с типизацией.
  - title: Unit Tests
    details: Все элементы библиотеки покрыты модульными тестами.

sections:
  - title: Компоненты
    details: Набор готовых Vue.js компонентов для организации UI.
    icon: '../icons/sections/components.svg'
    link: /components/
  - title: Директивы
    details: Набор готовых Vue.js директив для низкоуровнего доступа к элементам WEB-страниц.
    icon: '../icons/sections/directives.svg'
    link: /directives/
  - title: Composables
    details: Набор переиспользуемых функций для Vue.js.
    icon: '../icons/sections/composables.svg'
    link: /composables/
  - title: Утилиты
    details: Набор вспомогательных утилит для работы с HTML элементами и данными.
    icon: '../icons/sections/utilities.svg'
    link: /utilities/
---