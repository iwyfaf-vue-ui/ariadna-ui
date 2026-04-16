import type { TDropdownMenuItem } from '@iwyfaf-vue-ui/ariadna-ui/DropdownMenu';
import { ref } from 'vue';

const dropdownMenuItems = ref<Array<TDropdownMenuItem>>([
  {
    label: 'My Account',
  },
  {
    label: 'Profile',
    href: '/',
  },
  {
    label: 'Billing',
    href: '/',
  },
  {
    label: 'Settings',
    href: '/',
  },
  {
    label: 'Keyboard shortcut',
    href: '/components/navigation/dropdown-menu',
  },
  {
    separator: true,
  },
  {
    label: 'Team',
  },
  {
    label: 'Invite users',
    children: [
      {
        label: 'Email',
        href: '/',
      },
      {
        label: 'Message',
        href: '/',
      },
      {
        label: 'More...',
        children: [
          {
            label: 'Email',
            href: '/',
          },
          {
            label: 'Message',
            href: '/',
          },
          {
            label: 'More...',
            children: [
              {
                label: 'Email',
                href: '/',
              },
              {
                label: 'Message',
                href: '/',
              },
              {
                label: 'More...',
                href: '/',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'New team',
    href: '/',
  },
  {
    separator: true,
  },
  {
    label: 'Github',
    href: '/',
  },
  {
    label: 'Support',
    href: '/',
  },
  {
    label: 'API',
    href: '/',
    disabled: true,
  },
  {
    separator: true,
  },
  {
    label: 'Log out',
    action: () => alert('log out'),
  },
]);

export { dropdownMenuItems };
