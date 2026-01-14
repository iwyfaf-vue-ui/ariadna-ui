import { DefaultTheme } from 'vitepress/theme';

const sidebarThemes: DefaultTheme.SidebarItem[] | DefaultTheme.SidebarMulti = {
  '/themes/': [
    {
      items: [
        {
          text: 'Тема Ariadna',
          link: '/themes/ariadna/',
        },
      ],
    },
  ],
};

export default sidebarThemes;
