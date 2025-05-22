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
