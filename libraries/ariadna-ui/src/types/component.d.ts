import { VNodeProps, AllowedComponentProps, ComponentCustomProps } from 'vue';

declare type PublicProps = VNodeProps & AllowedComponentProps & ComponentCustomProps;

export class ClassComponent<Props, Slots, Emits, Element> {
  $props: Props & PublicProps;
  $slots: Slots;
  $emits: Emits;
  $el: Element;
}

export type GlobalComponentConstructor<T> = {
  new (): T;
};
