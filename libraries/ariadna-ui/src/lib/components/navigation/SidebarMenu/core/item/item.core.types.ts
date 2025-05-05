import type { TSidebarMenuItem } from '../../types/SidebarMenu.item';

/**
 * Проверяет, активен ли пункт меню относительно текущего маршрута.
 *
 * @param {TSidebarMenuItem} item - Элемент меню для проверки.
 * @param {any} route - Объект маршрута, содержащий текущий путь (route.path).
 * @returns {boolean} Возвращает true, если пункт меню активен, иначе false.
 *
 * @example
 * const isActive = isMenuItemActive(item, {path: '/dashboard'});
 */
export type TisMenuItemActive = (item: TSidebarMenuItem, route: any) => boolean;
