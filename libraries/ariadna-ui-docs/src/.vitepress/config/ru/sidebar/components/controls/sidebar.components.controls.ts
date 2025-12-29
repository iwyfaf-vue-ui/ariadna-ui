import { DefaultTheme } from 'vitepress/theme';

const sidebarComponentsControls: DefaultTheme.SidebarItem = {
  text: 'Controls',
  collapsed: true,
  link: '/components/controls/',
  items: [
    {
      text: 'InputText',
      link: '/components/controls/input-text/',
    },
    {
      text: 'InputNumber',
      link: '/components/controls/input-number/',
    },
    {
      text: 'InputPassword',
      link: '/components/controls/input-password/',
    },
    {
      text: 'Textarea',
      link: '/components/controls/textarea/',
    },
    {
      text: 'Checkbox',
      link: '/components/controls/checkbox/',
    },
    {
      text: 'Radio',
      link: '/components/controls/radio/',
    },
    {
      text: 'Rating',
      link: '/components/controls/rating/',
    },
    {
      text: 'SelectSingle',
      link: '/components/controls/select-single/',
    },
    {
      text: 'SelectSingleGroup',
      link: '/components/controls/select-single-group/',
    },
    {
      text: 'SelectSingleFlat',
      link: '/components/controls/select-single-flat/',
    },
    {
      text: 'SelectMultiple',
      link: '/components/controls/select-multiple/',
    },
    {
      text: 'SelectMultipleGroup',
      link: '/components/controls/select-multiple-group/',
    },
    {
      text: 'SelectMultipleFlat',
      link: '/components/controls/select-multiple-flat/',
    },
    {
      text: 'Slider',
      link: '/components/controls/slider/',
    },
    {
      text: 'Chips',
      link: '/components/controls/chips/',
    },
  ],
};

export default sidebarComponentsControls;
