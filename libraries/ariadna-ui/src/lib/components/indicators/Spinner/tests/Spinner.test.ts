import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Spinner from '../../Spinner/Spinner.vue';
import { SpinnerSelectorTestData } from './test-data/Spinner.selector.test-data';
import { ESpinnerPropsDefault } from '../types/Spinner.enums';

const defaultMock = new SpinnerSelectorTestData();

describe('Spinner.vue: Basic render.', () => {
  const wrapper = mount(Spinner, {
    props: {},
  });

  it('Should mount without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render a div element.', () => {
    expect(wrapper.find(defaultMock.rootEl).exists()).toBe(true);
    expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('DIV');
  });

  it('Should have the default CSS class with predefined modifiers.', () => {
    expect(wrapper.classes()).toContain(ESpinnerPropsDefault.CSS_CLASS);
    expect(wrapper.classes()).toContain(defaultMock.themeModifier);
    expect(wrapper.classes()).toContain(defaultMock.sizeMediumModifier);
  });

  it('Should render loader div with correct class.', () => {
    expect(wrapper.find(defaultMock.loaderEl).exists()).toBe(true);
  });
});

describe('Spinner.vue: Props.', () => {
  it('size: Should apply small size modifier class when size="small".', () => {
    const wrapper = mount(Spinner, {
      props: {
        size: defaultMock.sizeProp,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
  });

  it('size: Should apply medium size modifier class when size="medium".', () => {
    const wrapper = mount(Spinner, {
      props: {
        size: (defaultMock.sizeProp = 'medium'),
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
  });

  it('size: Should apply large size modifier class when size="large".', () => {
    const wrapper = mount(Spinner, {
      props: {
        size: (defaultMock.sizeProp = 'large'),
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
  });

  it('cssClass: Should apply custom root class and generate BEM child classes.', () => {
    const _defaultMock = new SpinnerSelectorTestData(defaultMock.cssClassProp);
    const wrapper = mount(Spinner, {
      props: {
        cssClass: defaultMock.cssClassProp,
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
  });

  it('modifier: Should apply modifier class.', async () => {
    const wrapper = mount(Spinner, {
      props: {
        modifier: defaultMock.modifierProp,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
  });
});
