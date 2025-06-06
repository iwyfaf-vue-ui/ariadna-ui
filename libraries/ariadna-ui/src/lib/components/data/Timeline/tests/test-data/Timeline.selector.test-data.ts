import * as path from 'path';
import { DataSelector } from '@/shared/tests/DataSelector';
import type { TTimelineEvent, TTimelineProps } from '../../Timeline';
import { ETimelinePropsDefault } from '../../types/Timeline.enums';

export class TimelineSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly eventEl: string = '';
  public readonly eventFirstModifier: string = '';
  public readonly eventLastModifier: string = '';
  public readonly eventOppositeEl: string = '';
  public readonly eventOppositeRightModifier: string = '';
  public readonly eventOppositeLeftModifier: string = '';
  public readonly eventSpacerEl: string = '';
  public readonly eventContentEl: string = '';
  public readonly eventContentRightModifier: string = '';
  public readonly eventContentLeftModifier: string = '';
  public readonly eventSeparatorEl: string = '';
  public readonly themeModifier: string = '';
  public readonly primaryModifier: string = '';

  public cssClassProp: TTimelineProps<any>['cssClass'] = 'newCssClass';
  public modifierProp: TTimelineProps<any>['modifier'] = 'primary';

  constructor(className: string = ETimelinePropsDefault.CSS_CLASS) {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.eventEl = `.${className}__event`;
    this.eventFirstModifier = `${className}__event--first`;
    this.eventLastModifier = `${className}__event--last`;
    this.eventOppositeEl = `.${className}__event-opposite`;
    this.eventOppositeRightModifier = `${className}__event-opposite--right`;
    this.eventOppositeLeftModifier = `${className}__event-opposite--left`;
    this.eventSpacerEl = `.${className}__event-spacer`;
    this.eventContentEl = `.${className}__event-content`;
    this.eventContentRightModifier = `${className}__event-content--right`;
    this.eventContentLeftModifier = `${className}__event-content--left`;
    this.eventSeparatorEl = `.${className}__event-separator`;
    this.themeModifier = `${className}--theme`;
    this.primaryModifier = `${className}--primary`;
  }

  public mockProps: TTimelineProps<any> = {
    events: [],
    keyProperty: ETimelinePropsDefault.KEY_PROPERTY,
    cssClass: ETimelinePropsDefault.CSS_CLASS,
  };

  public events: Array<TTimelineEvent> = [
    { position: 'left', name: 'Event A' },
    { position: 'right', name: 'Event B' },
  ];

  static async getTimelineEventSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Timeline/slot.event.custom.html'))
    ).trim();
  }

  static async getTimelineSeparatorSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Timeline/slot.event.separator.html'))
    ).trim();
  }

  static async getTimelineOppositeSlotCustom(): Promise<string> {
    return (
      await this.readFile(path.resolve(__dirname, 'components/Timeline/slot.opposite.custom.html'))
    ).trim();
  }
}
