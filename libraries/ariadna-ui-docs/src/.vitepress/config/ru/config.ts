import { LocaleConfig } from 'vitepress';
import { DefaultTheme } from 'vitepress/theme';
import sidebarUtilities from './sidebar/utilities/sidebar.utilities';

/**
 * @description Root locale config
 */
export const config: LocaleConfig<DefaultTheme.Config> = {
  root: {
    label: 'Русский',
    lang: 'ru',
    title: 'Ariadna UI Documentation',
    description: 'Документация UI библиотеки Ariadna UI для Vue 3',

    themeConfig: {
      sidebar: {
        ...sidebarUtilities,
      },

      outline: {
        label: 'На этой странице',
        level: 'deep',
      },

      docFooter: {
        prev: 'Предыдущая страница',
        next: 'Следующая страница',
      },
    },
  },
};

/**
 * @description Root search locale config
 */
export const searchLocale: Record<
  string,
  Partial<Omit<DefaultTheme.LocalSearchOptions, 'locales'>>
> = {
  root: {
    translations: {
      button: {
        buttonText: 'Поиск',
        buttonAriaLabel: 'Поиск',
      },
      modal: {
        resetButtonTitle: 'Сбросить',
        backButtonTitle: 'Закрыть',
        noResultsText: 'Нет результатов по запросу',
        footer: {
          selectText: 'для выбора',
          selectKeyAriaLabel: 'enter',
          navigateText: 'для навигации',
          navigateUpKeyAriaLabel: 'стрелка вверх',
          navigateDownKeyAriaLabel: 'стрелка вниз',
          closeText: 'закрыть',
          closeKeyAriaLabel: 'escape',
        },
      },
    },
  },
};
