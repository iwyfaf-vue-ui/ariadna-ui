import { describe, it, expect, beforeEach } from 'vitest';
import KeysCore from '../../core/keys/keys.core';

describe('KeysCore: Базовое тестирование.', () => {
  let keysCore: KeysCore;
  const tabsMock = [{ title: 'Первый Таб' }, { title: 'Второй Таб' }, { title: 'Первый Таб' }];
  const titleKey = 'title';

  beforeEach(() => {
    keysCore = new KeysCore(tabsMock, titleKey);
  });

  it('Should initialize the keys correctly.', () => {
    const keys = keysCore.keys;
    expect(keys).toEqual(['pervyy_tab', 'vtoroy_tab', 'pervyy_tab_1']);
  });

  it('Should update the keys when updateTabs is called.', () => {
    const newTabs = [{ title: 'Новый Таб' }, { title: 'Другой Таб' }, { title: 'Новый Таб' }];
    keysCore.updateTabs(newTabs);

    const keys = keysCore.keys;
    expect(keys).toEqual(['novyy_tab', 'drugoy_tab', 'novyy_tab_1']);
  });

  it('Should correctly handle tabs with spaces and special characters.', () => {
    const specialTabs = [
      { title: 'Таб с пробелами' },
      { title: 'Таб с !@#$%^&*()' },
      { title: 'Таб с пробелами' },
    ];
    keysCore.updateTabs(specialTabs);

    const keys = keysCore.keys;
    expect(keys).toEqual(['tab_s_probelami', 'tab_s_!@#$%^&*()', 'tab_s_probelami_1']);
  });

  it('Should return unique keys for duplicate headers.', () => {
    const duplicateTabs = [{ title: 'Дубликат' }, { title: 'Дубликат' }, { title: 'Дубликат' }];
    keysCore.updateTabs(duplicateTabs);

    const keys = keysCore.keys;
    expect(keys).toEqual(['dublikat', 'dublikat_1', 'dublikat_2']);
  });

  it('Should correctly handle an empty array of tabs.', () => {
    keysCore.updateTabs([]);

    const keys = keysCore.keys;
    expect(keys).toEqual([]);
  });
});
