import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../Button.vue';
import { ButtonSelectorTestData } from './test-data/Button.selector.test-data';
import { EButtonPropsDefault } from '../types/Button.enums';
import type { TButtonPropsTag } from '../types/Button.types';

const defaultMock = new ButtonSelectorTestData();

describe('Button.vue: Basic render.', () => {
  const wrapper = mount(Button, {
    props: {},
  });

  it('Should mount without errors.', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('Should render a button element.', () => {
    expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('BUTTON');
    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toEqual('button');
  });

  it('Should have the default CSS class with predefined modifiers.', () => {
    expect(wrapper.classes()).toContain(EButtonPropsDefault.CSS_CLASS);
    expect(wrapper.classes()).toContain(defaultMock.themeModifier);
    expect(wrapper.classes()).toContain(defaultMock.sizeMediumModifier);
    expect(wrapper.classes()).toContain(defaultMock.iconPositionLeftModifier);
  });

  it('Should contain correct root and group elements.', () => {
    expect(wrapper.find(defaultMock.rootEl).exists()).toBeTruthy();
    expect(wrapper.find(defaultMock.groupEl).exists()).toBeTruthy();
  });

  it('Should contain correct text element.', () => {
    expect(wrapper.find(defaultMock.textEl).exists()).toBeFalsy();
  });

  it('Should not render icon or loading elements by default.', () => {
    expect(wrapper.find(defaultMock.groupIconEl).exists()).toBeFalsy();
    expect(wrapper.find(defaultMock.loadingEl).exists()).toBeFalsy();
  });
});

describe('Button.vue: Props.', () => {
  it('tag: Should render as a button element with type="button" and no disabled attribute by default.', () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'button',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('BUTTON');
    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toEqual('button');
    expect(wrapper.find(defaultMock.rootEl).attributes('disabled')).toBeFalsy();
  });

  it(`tag: Should render as an anchor (<a>) element without type or disabled attributes.`, () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'a',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('A');
    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toBeFalsy();
    expect(wrapper.find(defaultMock.rootEl).attributes('disabled')).toBeFalsy();
  });

  it('tag: Should render as a span element without type or disabled attributes.', () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'span',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).element.tagName).toEqual('SPAN');
    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toBeFalsy();
    expect(wrapper.find(defaultMock.rootEl).attributes('disabled')).toBeFalsy();
  });

  it('type: Should default to type="button" when tag="button" and no type is provided.', () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'button',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toEqual(EButtonPropsDefault.TYPE);
  });

  it('type: Should default to type="submit" when tag="button" and type is provided.', () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'button',
        type: 'submit',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toEqual('submit');
  });

  it('type: Should not apply type attribute when tag="a" (anchor).', () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'a',
        type: 'submit',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toBeUndefined();
  });

  it('type: Should not apply type attribute when tag="span".', () => {
    const wrapper = mount(Button, {
      props: {
        tag: 'span',
        type: 'submit',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).attributes('type')).toBeUndefined();
  });

  it('iconPosition: Should apply left icon position modifier class when iconPosition="left".', () => {
    const wrapper = mount(Button, {
      props: {
        iconPosition: 'left',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(
      defaultMock.iconPositionLeftModifier,
    );
  });

  it('iconPosition: Should apply right icon position modifier class when iconPosition="right".', () => {
    const wrapper = mount(Button, {
      props: {
        iconPosition: 'right',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(
      defaultMock.iconPositionRightModifier,
    );
  });

  it('iconPosition: Should apply top icon position modifier class when iconPosition="top".', () => {
    const wrapper = mount(Button, {
      props: {
        iconPosition: 'top',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(
      defaultMock.iconPositionTopModifier,
    );
  });

  it('iconPosition: Should apply bottom icon position modifier class when iconPosition="bottom".', () => {
    const wrapper = mount(Button, {
      props: {
        iconPosition: 'bottom',
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(
      defaultMock.iconPositionBottomModifier,
    );
  });

  it('size: Should apply small size modifier class when size="small".', () => {
    const wrapper = mount(Button, {
      props: {
        size: defaultMock.sizeProp,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeSmallModifier);
  });

  it('size: Should apply medium size modifier class when size="medium".', () => {
    const wrapper = mount(Button, {
      props: {
        size: (defaultMock.sizeProp = 'medium'),
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeMediumModifier);
  });

  it('size: Should apply large size modifier class when size="large".', () => {
    const wrapper = mount(Button, {
      props: {
        size: (defaultMock.sizeProp = 'large'),
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.sizeLargeModifier);
  });

  it('rounded: Should apply rounded modifier class when rounded="true".', () => {
    const wrapper = mount(Button, {
      props: {
        rounded: true,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.roundedModifier);
  });

  it('textual: Should apply textual modifier class when textual="true".', () => {
    const wrapper = mount(Button, {
      props: {
        textual: true,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.textualModifier);
  });

  it('outlined: Should apply outlined modifier class when outlined="true".', () => {
    const wrapper = mount(Button, {
      props: {
        outlined: true,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.outlinedModifier);
  });

  it('selected: Should apply selected modifier class and aria-selected when selected="true".', () => {
    const wrapper = mount(Button, {
      props: {
        selected: true,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).attributes('aria-selected')).toEqual('true');
    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.selectedModifier);
  });

  it('disabled: Should apply disabled modifier class and attributes when disabled="true".', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.disabledModifier);
    expect(wrapper.find(defaultMock.rootEl).attributes('disabled')).toEqual('');
  });

  it('loading: Should apply loading modifier class and aria-busy when loading="true".', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).attributes('aria-busy')).toEqual('true');
    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.loadingModifier);
  });

  it('cssClass: Should apply custom root class and generate BEM child classes.', () => {
    const _defaultMock = new ButtonSelectorTestData(defaultMock.cssClassProp);
    const wrapper = mount(Button, {
      props: {
        cssClass: defaultMock.cssClassProp,
        loading: true,
      },
      slots: {
        default: () => defaultMock.buttonContent(),
        icon: () => defaultMock.buttonContent(),
        loading: () => defaultMock.loadingContent(),
      },
    });

    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.rootEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.groupEl)).exists()).toBe(true);
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.groupIconEl)).exists()).toBe(
      true,
    );
    expect(wrapper.find(defaultMock.getSelectorWithDot(_defaultMock.loadingEl)).exists()).toBe(
      true,
    );
  });

  it('modifier: Should apply modifier class.', async () => {
    const wrapper = mount(Button, {
      props: {
        modifier: defaultMock.modifierProp,
      },
    });

    expect(wrapper.find(defaultMock.rootEl).classes()).toContain(defaultMock.primaryModifier);
  });
});

describe('Button.vue: Slots.', () => {
  it('default: Should render default slot content.', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => defaultMock.buttonContent(),
      },
    });

    expect(wrapper.find(defaultMock.groupEl).exists()).toBeTruthy();
  });

  it('icon: Should render icon slot with proper accessibility attributes.', () => {
    const wrapper = mount(Button, {
      slots: {
        icon: () => defaultMock.buttonContent(),
      },
    });

    expect(wrapper.find(defaultMock.groupIconEl).attributes('aria-hidden')).toEqual('true');
    expect(wrapper.find(defaultMock.groupIconEl).exists()).toBeTruthy();
  });

  it('loading: Should conditionally render loading slot only when loading prop & slot is true.', async () => {
    const wrapper = mount(Button, {
      slots: {
        loading: () => defaultMock.loadingContent(),
      },
    });

    expect(wrapper.find(defaultMock.loadingEl).exists()).toBeFalsy();
    expect(wrapper.find(defaultMock.rootEl).attributes('aria-busy')).toEqual('false');

    await wrapper.setProps({ loading: true });

    expect(wrapper.find(defaultMock.rootEl).attributes('aria-busy')).toEqual('true');
    expect(wrapper.find(defaultMock.loadingEl).exists()).toBeTruthy();
    expect(wrapper.find(defaultMock.loadingEl).classes()).toContain(
      `${defaultMock.className}__loading`,
    );
    expect(wrapper.find(defaultMock.loadingEl).text()).toEqual(defaultMock.loadingContent());
  });
});

describe('Button.vue: Emits.', () => {
  it('click: Should emit click event when button is clicked.', async () => {
    const wrapper = mount(Button, {
      props: {},
    });

    await wrapper.find(defaultMock.rootEl).trigger('click');

    expect(wrapper.emitted()).toHaveProperty('click');
    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')?.length).toBe(1);
  });

  it('click: Should not emit click event when disabled.', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    });

    await wrapper.find(defaultMock.rootEl).trigger('click');

    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('click: Should not emit click event when loading.', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    });

    await wrapper.find(defaultMock.rootEl).trigger('click');

    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('click: Should emit click event regardless of tag type.', async () => {
    const tags: TButtonPropsTag[] = ['button', 'a', 'span'];

    for (const tag of tags) {
      const wrapper = mount(Button, {
        props: {
          tag: tag,
        },
      });
      await wrapper.trigger('click');
      expect(wrapper.emitted('click')).toBeTruthy();
    }
  });
});
