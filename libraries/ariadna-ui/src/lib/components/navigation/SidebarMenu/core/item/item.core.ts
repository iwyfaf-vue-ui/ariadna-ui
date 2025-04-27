import type { TisMenuItemActive } from './item.core.types';

const isMenuItemActive: TisMenuItemActive = (item, route) => {
  if (!route) return false;
  if (!route.path) return false;
  if (item.expand) {
    return item.expand;
  }

  const href = item.href;
  if (href) {
    const normalizedHref = href.startsWith('/') ? href : '/' + href;
    if (route.path === normalizedHref) return true;

    if (normalizedHref !== '/' && route.path.startsWith(normalizedHref)) {
      const rest = route.path.slice(normalizedHref.length);
      if (rest === '' || rest.startsWith('/')) {
        const segment = rest.startsWith('/') ? rest.slice(1) : rest;
        if (!segment.includes('/')) return true;
      }
    }
  }

  if (item.children && Array.isArray(item.children)) {
    return item.children.some((child) => isMenuItemActive(child, route));
  }

  return false;
};

export default isMenuItemActive;
