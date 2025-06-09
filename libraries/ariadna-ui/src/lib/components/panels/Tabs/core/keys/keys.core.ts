import { Transliterate } from '@/shared/utils/string/transliterate/transliterate.utils';
import type { TKeysCore } from './keys.core.types';
import type { TTabItem } from '../../types/Tabs.types';

export default class KeysCore extends Transliterate implements TKeysCore {
  private tabs: Array<TTabItem> = [];
  private titleKey: string;
  private uniqueKeys: Array<{ index: number; key: string }> = [];

  public get keys(): Array<string> {
    return this.uniqueKeys.map((key) => {
      if (key.index === 0) return key.key;
      return `${key.key}_${key.index}`;
    });
  }

  constructor(tabs: Array<TTabItem>, titleKey: string) {
    super();

    this.titleKey = titleKey;
    this.tabs = tabs;
    this.updateKeys();
  }

  public toLatin(key: string): string {
    const newKey = super.toLatin(key).replace(/\s/g, '_');

    const oldKeys = this.uniqueKeys.filter((key) => key.key === newKey);

    if (oldKeys.length) {
      this.uniqueKeys.push({
        key: newKey,
        index: Math.max(...oldKeys.map((key) => key.index)) + 1,
      });
      return newKey;
    }

    this.uniqueKeys.push({
      key: newKey,
      index: 0,
    });
    return newKey;
  }

  public updateTabs(tabs: Array<TTabItem>) {
    this.tabs = tabs;
    this.updateKeys();
  }

  private updateKeys(): void {
    this.uniqueKeys = [];

    this.tabs.forEach((tab) => {
      this.toLatin(tab[this.titleKey]);
    });
  }
}
