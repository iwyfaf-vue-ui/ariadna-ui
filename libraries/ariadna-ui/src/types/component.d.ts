import { PublicProps } from 'vue';

export class ClassComponent<Props, Slots, Emits, Element> {
  $props: Props & PublicProps;
  $slots: Slots;
  $emits: Emits;
  $el: Element;
}

export type GlobalComponentConstructor<T> = {
  new (): T;
};

/**
 * Type for Modifier prop.
 */
export type TSharedPropsModifier = 'primary' | 'secondary' | 'quaternary' | 'tertiary' | string;

/**
 * Type for Size prop.
 */
export type TSharedPropsSize = 'small' | 'medium' | 'large';

/**
 * Represents a menu item with nested children for hierarchical navigation.
 */
export type TSharedMenu = {
  /**
   * The display name of the menu item.
   */
  name: string;

  /**
   * Attributes related to the menu item.
   */
  attributes: {
    /**
     * The URL the menu item points to.
     */
    url: string | null;

    /**
     * Optional title attribute for the menu item.
     */
    title?: string;

    /**
     * Optional flag indicating if the link opens outside the app.
     */
    outside?: boolean;
  };

  /**
   * Icons displayed before and after the menu item name.
   */
  icon: {
    /**
     * Icon shown before the menu item.
     */
    before: string | null;

    /**
     * Icon shown after the menu item; null if none.
     */
    after: string | null;
  };

  /**
   * Nested child menu items for submenus.
   */
  children: Array<TSharedMenu>;
};
