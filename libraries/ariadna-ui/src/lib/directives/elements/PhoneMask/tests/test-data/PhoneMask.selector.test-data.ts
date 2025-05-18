import { DataSelector } from '@/shared/tests/DataSelector';

export class PhoneMaskSelectorTestData extends DataSelector {
  public readonly className: string = '';
  public readonly rootEl: string = '';
  public readonly inputEl: string = '';
  public readonly inputClonedEl: string = '';

  constructor(className: string = 'mocked-input') {
    super();

    this.className = className;
    this.rootEl = `.${className}`;
    this.inputEl = `.${className}__input`;
    this.inputClonedEl = `.${className}__input-cloned`;
  }
}
