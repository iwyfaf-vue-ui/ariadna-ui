import type {
  ClassComponent,
  GlobalComponentConstructor,
  TSharedPropsModifier,
} from '../../../../types/component';
import type { VNode } from 'vue';
import type { ETimelinePropsDefault } from './types/Timeline.enums';
export type { TTimelineEvent } from './types/Timeline.types';

/**
 * Component props definition.
 */
export type TTimelineProps<Data> = {
  /**
   * Array of events.
   *
   * @type Array<Data>
   * @template Data - The type of the event data passed to the slots.
   * @default []
   * @required
   * @example :events="timelineEvents"
   *
   * type TTimelineExample = TTimelineEvent & {
   *   img: string;
   * };
   *
   * const timelineEvents = reactive<Array<TTimelineExample>>([
   *   {
   *     position: 'left',
   *     name: 'Событие 1',
   *     img: 'https://fakeimg.pl/200x100/',
   *   },
   *   {
   *     position: 'left',
   *     name: 'Событие 2',
   *     img: 'https://fakeimg.pl/200x100/',
   *   },
   *   {
   *     position: 'right',
   *     name: 'Событие 3',
   *     img: 'https://fakeimg.pl/200x100/',
   *   },
   *   {
   *     position: 'left',
   *     name: 'Событие 4',
   *     img: 'https://fakeimg.pl/200x100/',
   *   },
   * ]);
   *
   */
  events: Array<Data>;

  /**
   * Property used for the key during iteration.
   *
   * @type string
   * @default {@link ETimelinePropsDefault.KEY_PROPERTY}
   * @example key-property="lastname"
   */
  keyProperty?: string;

  /**
   * Redefines the CSS class of the root element and its descendants.
   *
   * @type string
   * @default {@link ETimelinePropsDefault.CSS_CLASS}
   * @example css-class="example"
   */
  cssClass?: string;

  /**
   * Modifier of the basic CSS class.
   *
   * @type TSharedPropsModifier
   * @default undefined
   * @example modifier="primary"
   */
  modifier?: TSharedPropsModifier;
};

/**
 * Component slots definition.
 */
export type TTimelineSlots<Data> = {
  /**
   * Slot for rendering a timeline event.
   *
   * @param {(Data) => void} props.event - The event data of type `Data` representing the current timeline event.
   * @param {(number) => void} props.index - The zero-based index of the event in the timeline.
   * @returns {VNode[]}
   *
   * @template Data - The type of the event data passed to the slots.
   */
  event?(props: { event: Data; index: number }): VNode[];

  /**
   * Slot for rendering a separator between timeline events.
   *
   * @param {(Data) => void} props.event - The event data of type `Data` representing the event preceding the separator.
   * @param {(number) => void} props.index - The zero-based index of the event preceding the separator.
   * @returns {VNode[]}
   *
   * @template Data - The type of the event data passed to the slots.
   */
  separator?(props: { event: Data; index: number }): VNode[];

  /**
   * Slot for additional content at the other side.
   *
   * @param {(Data) => void} props.event - The event data of type `Data` representing the current timeline event.
   * @param {(number) => void} props.index - The zero-based index of the event in the timeline.
   * @returns {VNode[]}
   *
   * @template Data - The type of the event data passed to the slots.
   */
  opposite?(props: { event: Data; index: number }): VNode[];
};

/**
 * Component events emitted.
 */
export type TTimelineEmits = {};

/**
 * Ariadna UI | Components | Timeline
 *
 * Timeline is a data-oriented component for visualizing a series of chained events.
 */
declare class Timeline extends ClassComponent<
  TTimelineProps,
  TTimelineSlots,
  TTimelineEmits,
  HTMLDivElement
> {}

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    Timeline: GlobalComponentConstructor<Timeline>;
  }
}

export default Timeline;
