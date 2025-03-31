import { LocaleConfig } from 'vitepress';
import { DefaultTheme } from 'vitepress/theme';

/**
 * @description Root locale config
 */
export const config: LocaleConfig<DefaultTheme.Config> = {
  en: {
    label: 'English',
    lang: 'en',
    title: 'Documentation Hub',
    description: "Author's documentation on web development",

    themeConfig: {
      outline: {
        label: 'On this page',
        level: 'deep',
      },

      docFooter: {
        prev: 'Previous page',
        next: 'Next page',
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
  en: {
    translations: {
      button: {
        buttonText: 'Search',
        buttonAriaLabel: 'Search',
      },
      modal: {
        resetButtonTitle: 'Reset search',
        backButtonTitle: 'Close search',
        noResultsText: 'No results for',
        footer: {
          selectText: 'to select',
          selectKeyAriaLabel: 'enter',
          navigateText: 'to navigate',
          navigateUpKeyAriaLabel: 'up arrow',
          navigateDownKeyAriaLabel: 'down arrow',
          closeText: 'to close',
          closeKeyAriaLabel: 'escape',
        },
      },
    },
  },
};
