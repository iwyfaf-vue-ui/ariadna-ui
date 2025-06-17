import type { TSharedMenu } from '@/types/component';
import type { TMobileMenuItem } from '../../types/MobileMenu.types';
import type { Ref, UnwrapRef } from 'vue';

/**
 * @description
 * Return type for the `useMobileMenuStack` composable function.
 * Contains reactive properties and methods for MobileMenu component functionality.
 */
export type TUseMobileMenuStackReturn = {
  pageTranslateX: Ref<number, number>;
  calculateTranslateX: (skip?: number) => void;
  pageStackWithoutDelay:
    | Ref<any, any>
    | Ref<UnwrapRef<TMobileMenuItem>, TMobileMenuItem | UnwrapRef<TMobileMenuItem>>;
  isBackWithoutDelay: Ref<any, any> | Ref<UnwrapRef<boolean>, boolean | UnwrapRef<boolean>>;
  clearStack: () => void;
  toHome: () => void;
  addToStack: (item: TSharedMenu) => void;
  addToStackMenuItem: (menuItem: TMobileMenuItem, prevMenuItem: TMobileMenuItem | null) => void;
  backStack: () => void;
};
