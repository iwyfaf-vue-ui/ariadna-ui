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

export type TSharedPropsModifier = 'primary' | 'secondary' | 'quaternary' | 'tertiary' | string;
