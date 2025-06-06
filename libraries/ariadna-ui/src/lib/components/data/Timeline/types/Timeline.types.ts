/**
 * @description
 * Represents an event in the timeline with a position and an optional name. This type defines the structure of a
 * timeline event, specifying where the event should be positioned (left or right) and optionally providing a name for
 * the event.
 */
export type TTimelineEvent = {
  /**
   * The side of the timeline where the event is displayed.
   *
   * @type {'left' | 'right'}
   * @default 'right'
   */
  position: 'left' | 'right';

  /**
   * An optional descriptive name for the event.
   *
   * @type string
   * @default ''
   */
  name?: string;
};
