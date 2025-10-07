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
      text: 'Slider',
      link: '/components/controls/slider/',
    },
  ],
};

export default sidebarComponentsControls;
