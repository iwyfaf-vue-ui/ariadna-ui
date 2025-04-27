import { describe, it, expect } from 'vitest';
import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';
import isMenuItemActive from '../../core/item/item.core';

describe('item.core.ts: isMenuItemActive.', () => {
  it('Should return false if route is not provided.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard' };

    expect(isMenuItemActive(item, undefined)).toBe(false);
  });

  it('Should return false if route.path is empty string.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard' };
    const route = { path: '' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return false if route.path is undefined.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard' };
    const route = { path: undefined };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return true if item.href matches route.path exactly.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard' };
    const route = { path: '/dashboard' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return false if item.href does not match route.path.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard' };
    const route = { path: '/profile' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return true if any child is active.', () => {
    const item: TSidebarMenuItem = {
      title: 'Parent',
      children: [
        { title: 'Child', href: '/child' },
        { title: 'Child2', href: '/child2' },
      ],
    };
    const route = { path: '/child2' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return false if no children are active.', () => {
    const item: TSidebarMenuItem = {
      title: 'Parent',
      children: [
        { title: 'Child', href: '/child' },
        { title: 'Child2', href: '/child2' },
      ],
    };
    const route = { path: '/other' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should handle href without leading slash.', () => {
    const item: TSidebarMenuItem = { title: 'NoSlash', href: 'about' };
    const route = { path: '/about' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should handle root href "/"', () => {
    const item: TSidebarMenuItem = { title: 'Root', href: '/' };
    const route = { path: '/' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return true for parent path if route is nested and matches.', () => {
    const item: TSidebarMenuItem = { title: 'Section', href: '/section' };
    const route = { path: '/section/sub' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return false for parent path if route is nested but not direct child.', () => {
    const item: TSidebarMenuItem = { title: 'Section', href: '/section' };
    const route = { path: '/section/sub/other' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return false if item has no href and no children.', () => {
    const item: TSidebarMenuItem = { title: 'NoHref' };
    const route = { path: '/any' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return false if item.href is empty string.', () => {
    const item: TSidebarMenuItem = { title: 'EmptyHref', href: '' };
    const route = { path: '/any' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return false if item.children is empty array.', () => {
    const item: TSidebarMenuItem = { title: 'EmptyChildren', children: [] };
    const route = { path: '/any' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return false if item.children is not array.', () => {
    const item: TSidebarMenuItem = { title: 'NotArray', children: undefined };
    const route = { path: '/any' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should handle child with href without leading slash.', () => {
    const item: TSidebarMenuItem = {
      title: 'Parent',
      children: [{ title: 'Child', href: 'child' }],
    };
    const route = { path: '/child' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should handle deeply nested children.', () => {
    const item: TSidebarMenuItem = {
      title: 'Parent',
      children: [
        {
          title: 'Child',
          children: [{ title: 'Grandchild', href: '/grandchild' }],
        },
      ],
    };
    const route = { path: '/grandchild' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return false if item.href is undefined.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard' };
    const route = { path: '/dashboard' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return false if route.path longer than href and next segment contains slash.', () => {
    const item: TSidebarMenuItem = { title: 'Section', href: '/section' };
    const route = { path: '/section/sub/other' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return true if route.path longer than href and next segment does not contain slash.', () => {
    const item: TSidebarMenuItem = { title: 'Section', href: '/section' };
    const route = { path: '/section/sub' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return true if item is disabled and active', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard', disabled: true };
    const route = { path: '/dashboard' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return true if item is hidden and active.', () => {
    const item: TSidebarMenuItem = { title: 'Dashboard', href: '/dashboard', hidden: true };
    const route = { path: '/dashboard' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return false if item.href is "/" and route.path is "/other".', () => {
    const item: TSidebarMenuItem = { title: 'Root', href: '/' };
    const route = { path: '/other' };

    expect(isMenuItemActive(item, route)).toBe(false);
  });

  it('Should return true for child with parent href without slash.', () => {
    const item: TSidebarMenuItem = {
      title: 'Parent',
      href: 'parent',
      children: [{ title: 'Child', href: 'parent/child' }],
    };
    const route = { path: '/parent/child' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });

  it('Should return true if item.expand is true.', () => {
    const item: TSidebarMenuItem = { title: 'EmptyHref', href: '', expand: true };
    const route = { path: '/any' };

    expect(isMenuItemActive(item, route)).toBe(true);
  });
});
